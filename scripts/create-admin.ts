import { storage } from "../server/storage";
import { hashPassword } from "../server/auth";
import { UserRole } from "../shared/schema";

// Script to create an admin user for testing
async function createAdminUser() {
  console.log("Checking if admin user already exists...");
  
  const existingAdmin = await storage.getUserByUsername("admin");
  if (existingAdmin) {
    console.log("Admin user already exists");
    return;
  }
  
  console.log("Creating admin user...");
  
  // Hash the password
  const hashedPassword = await hashPassword("admin123");
  
  // Create the user
  await storage.createUser({
    username: "admin",
    password: hashedPassword,
    email: "admin@example.com",
    role: UserRole.ADMIN,
  });
  
  console.log("Admin user created successfully!");
}

// Run the script
createAdminUser()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });