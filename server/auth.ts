import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { UserRole, insertUserSchema, type User } from "../shared/schema";
import { fromZodError } from "zod-validation-error";

const scryptAsync = promisify(scrypt);

// Utility function for password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

// Utility function to verify password
export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Session configuration
  // Cookie di sessione: in produzione servono cross-site (GH Pages -> Railway),
  // quindi SameSite=None e Secure=true per permettere l'invio del cookie.
  const isProd = process.env.NODE_ENV === "production";
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    },
    store: storage.sessionStore,
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up authentication strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username", // In realtà riceviamo l'email dal frontend
      },
      async (email, password, done) => {
        try {
          // Cerchiamo l'utente tramite email
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Email non registrata" });
          }
          // Verifica password
          const isValid = await comparePasswords(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Password non valida" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialize user to store in session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUserById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Register endpoint
  app.post("/api/register", async (req, res) => {
    try {
      // Validate user input
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessage = fromZodError(parseResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email già registrata" });
      }

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username già in uso" });
      }

      // Hash password
      const hashedPassword = await hashPassword(req.body.password);

      // Create user
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
      });

      // Login the user
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login fallito dopo la registrazione" });
        }
        
  // Return user without password (cast to any to avoid strict typing here)
  const u: any = user;
  const { password: _password, ...userWithoutPassword } = u;
  res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registrazione fallita" });
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Autenticazione fallita" });
      }
      
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        
  // Return user without password (cast to any to avoid strict typing here)
  const u2: any = user;
  const { password: _password2, ...userWithoutPassword } = u2;
  return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout fallito" });
      }
      res.status(200).json({ message: "Logout effettuato con successo" });
    });
  });

  // Current user info endpoint
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    if (req.user) {
      const user = req.user as User;
      const { password: _password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: "Non autenticato" });
    }
  });
}