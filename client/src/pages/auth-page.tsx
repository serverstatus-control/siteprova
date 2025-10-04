import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../hooks/use-auth';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Mail, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';

type LoginForm = {
  username: string;
  password: string;
};

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export default function AuthPage() {
  const [isActive, setIsActive] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const { loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  const { t } = useSettings();

  const loginSchema = z.object({
    username: z.string().min(1, t.usernameRequired),
    password: z.string().min(6, t.passwordMinLength)
  });

  const registerSchema = z.object({
    username: z.string().min(3, t.usernameMinLength),
    email: z.string().email(t.emailInvalid),
    password: z.string().min(6, t.passwordMinLength)
  });

  const goBack = () => {
    navigate('/');
  };

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onLoginSubmit = (data: LoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  const onRegisterSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div 
        className={`relative w-full h-screen border-2 border-orange-500 shadow-lg shadow-orange-500/30 overflow-hidden ${isActive ? 'active' : ''}`}
        style={{ boxShadow: '0 0 25px #e46033' }}
      >
        
        {/* Back Arrows */}
        <motion.button
          type="button"
          aria-label="Go back"
          onClick={goBack}
          className="absolute z-50 grid transition-colors border-2 border-orange-600 rounded-full pointer-events-auto top-6 left-6 place-items-center w-11 h-11 text-white/90 hover:text-white hover:bg-orange-600/20 active:bg-orange-600/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isActive ? 0 : 1, x: isActive ? -40 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Go back"
          onClick={goBack}
          className="absolute z-50 grid transition-colors border-2 border-orange-600 rounded-full pointer-events-auto top-6 right-6 place-items-center w-11 h-11 text-white/90 hover:text-white hover:bg-orange-600/20 active:bg-orange-600/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 40 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Curved Shape 1 */}
        <motion.div
          className="absolute right-0 -top-[5%] h-[160%] w-[160%] bg-gradient-to-br from-gray-900 to-orange-600 origin-bottom-right z-10"
          style={{
            transform: isActive ? 'rotate(0deg) skewY(0deg)' : 'rotate(10deg) skewY(40deg)',
          }}
          animate={{
            transform: isActive ? 'rotate(0deg) skewY(0deg)' : 'rotate(10deg) skewY(40deg)',
          }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: isActive ? 0.2 : 0.6 }}
        />

        {/* Curved Shape 2 */}
        <motion.div
          className="absolute left-[35%] top-full h-[170%] w-[170%] bg-gray-900 border-t-2 border-orange-600 origin-bottom-left z-10"
          style={{
            transform: isActive ? 'rotate(-11deg) skewY(-41deg)' : 'rotate(0deg) skewY(0deg)',
          }}
          animate={{
            transform: isActive ? 'rotate(-11deg) skewY(-41deg)' : 'rotate(0deg) skewY(0deg)',
          }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: isActive ? 0.5 : 0.2 }}
        />

        {/* Login Form */}
        <div className="absolute top-0 left-0 z-30 flex flex-col justify-center w-1/2 h-full px-12 xl:px-20">
          <motion.div
            className="max-w-[480px] xl:max-w-[560px] mx-auto space-y-8"
            initial={{ x: -40, opacity: 0 }}
            animate={{
              x: isActive ? '-120%' : '0%',
              opacity: isActive ? 0 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: isActive ? 0 : 0.15,
            }}
          >
            <motion.h2 
              className="mb-8 text-5xl font-bold text-center text-white xl:text-6xl"
              style={{ '--delay': 0, '--stagger': 21 } as React.CSSProperties}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                x: isActive ? '-120%' : '0%',
                opacity: isActive ? 0 : 1,
              }}
              transition={{ duration: 0.5, delay: isActive ? 0 : 0.2 }}
            >
              {t.login}
            </motion.h2>

            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
              <motion.div 
                className="relative mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '-120%' : '0%',
                  opacity: isActive ? 0 : 1,
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.1 : 0.3 }}
              >
                <Input
                  {...loginForm.register('username')}
                  type="text"
                  autoComplete="username"
                  spellCheck={false}
                  required
                  className="w-full h-12 px-0 pr-6 text-lg font-semibold text-white bg-transparent border-b-2 border-white border-none rounded-none auth-input xl:h-14 xl:text-xl peer focus:border-orange-600 focus:ring-0 focus:outline-none valid:border-orange-600"
                  placeholder=""
                />
                <label 
                  className={`absolute left-0 pointer-events-none transition-all duration-500 peer-focus:top-[-5px] peer-focus:text-orange-600 peer-focus:text-sm peer-valid:top-[-5px] peer-valid:text-orange-600 peer-valid:text-sm ${
                    loginForm.watch('username') 
                      ? 'top-[-5px] text-orange-600 text-sm' 
                      : 'top-1/2 -translate-y-1/2 text-white text-base'
                  }`}
                >
                  {t.username}
                </label>
                <User 
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 xl:w-6 xl:h-6 transition-colors duration-500 peer-focus:text-orange-600 peer-valid:text-orange-600 ${
                    loginForm.watch('username') ? 'text-orange-600' : 'text-white'
                  }`}
                />
                {loginForm.formState.errors.username && (
                  <p className="mt-1 text-xs text-red-400">
                    {loginForm.formState.errors.username.message}
                  </p>
                )}
              </motion.div>

              <motion.div 
                className="relative mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '-120%' : '0%',
                  opacity: isActive ? 0 : 1,
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.2 : 0.4 }}
              >
                <Input
                  {...loginForm.register('password')}
                  type={showLoginPassword ? "text" : "password"}
                  autoComplete="current-password"
                  spellCheck={false}
                  required
                  className="w-full h-12 px-0 pr-12 text-lg font-semibold text-white bg-transparent border-b-2 border-white border-none rounded-none auth-input xl:h-14 xl:text-xl peer focus:border-orange-600 focus:ring-0 focus:outline-none valid:border-orange-600"
                  placeholder=""
                />
                <label 
                  className={`absolute left-0 pointer-events-none transition-all duration-500 peer-focus:top-[-5px] peer-focus:text-orange-600 peer-focus:text-sm peer-valid:top-[-5px] peer-valid:text-orange-600 peer-valid:text-sm ${
                    loginForm.watch('password') 
                      ? 'top-[-5px] text-orange-600 text-sm' 
                      : 'top-1/2 -translate-y-1/2 text-white text-base'
                  }`}
                >
                  {t.password}
                </label>
                <div className="absolute right-0 flex items-center space-x-1 -translate-y-1/2 top-1/2">
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="p-1 transition-colors rounded hover:bg-white/10"
                    tabIndex={-1}
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4 xl:w-5 xl:h-5 text-white/70 hover:text-white" />
                    ) : (
                      <Eye className="w-4 h-4 xl:w-5 xl:h-5 text-white/70 hover:text-white" />
                    )}
                  </button>
                  <Lock 
                    className={`w-5 h-5 xl:w-6 xl:h-6 transition-colors duration-500 peer-focus:text-orange-600 peer-valid:text-orange-600 ${
                      loginForm.watch('password') ? 'text-orange-600' : 'text-white'
                    }`}
                  />
                </div>
                {loginForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-400">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '-120%' : '0%',
                  opacity: isActive ? 0 : 1,
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.3 : 0.5 }}
              >
                <Button
                  type="submit"
                  className="relative w-full h-12 xl:h-14 bg-transparent border-2 border-orange-600 text-white font-semibold text-lg xl:text-xl rounded-full cursor-pointer overflow-hidden z-10 hover:before:top-0 before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-gray-900 before:via-orange-600 before:to-gray-900 before:top-[-100%] before:left-0 before:-z-10 before:transition-all before:duration-500"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? t.loggingIn : t.login}
                </Button>
              </motion.div>

              <motion.div 
                className="mt-5 text-sm text-center text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '-120%' : '0%',
                  opacity: isActive ? 0 : 1,
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.4 : 0.6 }}
              >
                <p>
                  {t.dontHaveAccount}{' '}
                  <button
                    type="button"
                    onClick={() => setIsActive(true)}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    {t.signUp}
                  </button>
                  <br />
                  <span className="text-white/70">{t.or}</span>{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-orange-400 hover:text-orange-300 hover:underline"
                  >
                    {t.forgotPassword}
                  </button>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Login Info Content */}
        <div className="absolute top-0 right-0 z-20 flex flex-col justify-center w-1/2 h-full px-10 text-right pr-14 xl:px-12 xl:pr-20">
          <motion.div
            className="max-w-[360px] xl:max-w-[420px] ml-auto"
            initial={{ x: 40, opacity: 0, filter: 'blur(10px)' }}
            animate={{
              x: isActive ? '120%' : '0%',
              opacity: isActive ? 0 : 1,
              filter: isActive ? 'blur(10px)' : 'blur(0px)',
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: isActive ? 0 : 0.2,
            }}
          >
            <motion.h2 
              className="mb-4 text-4xl font-bold leading-tight text-white uppercase xl:text-5xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                x: isActive ? '120%' : '0%',
                opacity: isActive ? 0 : 1,
              }}
              transition={{ duration: 0.5, delay: isActive ? 0 : 0.3 }}
            >
              {t.welcomeBack}
            </motion.h2>
            <motion.p 
              className="text-lg leading-relaxed xl:text-xl text-white/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                x: isActive ? '120%' : '0%',
                opacity: isActive ? 0 : 1,
              }}
              transition={{ duration: 0.5, delay: isActive ? 0.1 : 0.4 }}
            >
              {t.welcomeBackDescription}
            </motion.p>
          </motion.div>
        </div>

        {/* Register Form */}
        <div className="absolute top-0 right-0 z-30 flex flex-col justify-center w-1/2 h-full px-20 xl:px-24">
          <motion.div
            className="max-w-[480px] xl:max-w-[560px] mx-auto space-y-8"
            initial={{ x: 40, opacity: 0 }}
            animate={{
              x: isActive ? '0%' : '120%',
              opacity: isActive ? 1 : 0,
              filter: isActive ? 'blur(0px)' : 'blur(10px)',
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: isActive ? 0.2 : 0,
            }}
          >
            <motion.h2 
              className="mb-6 text-5xl font-bold text-center text-white xl:text-6xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                x: isActive ? '0%' : '120%',
                opacity: isActive ? 1 : 0,
                filter: isActive ? 'blur(0px)' : 'blur(10px)',
              }}
              transition={{ duration: 0.5, delay: isActive ? 0.25 : 0 }}
            >
              {t.register}
            </motion.h2>

            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-5">
              <motion.div 
                className="relative mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '0%' : '120%',
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.35 : 0.1 }}
              >
                <Input
                  {...registerForm.register('username')}
                  type="text"
                  autoComplete="username"
                  spellCheck={false}
                  required
                  className="w-full h-12 px-0 pr-6 text-lg font-semibold text-white bg-transparent border-b-2 border-white border-none rounded-none auth-input xl:h-14 xl:text-xl peer focus:border-orange-600 focus:ring-0 focus:outline-none valid:border-orange-600"
                  placeholder=""
                />
                <label 
                  className={`absolute left-0 pointer-events-none transition-all duration-500 peer-focus:top-[-5px] peer-focus:text-orange-600 peer-focus:text-sm peer-valid:top-[-5px] peer-valid:text-orange-600 peer-valid:text-sm ${
                    registerForm.watch('username') 
                      ? 'top-[-5px] text-orange-600 text-sm' 
                      : 'top-1/2 -translate-y-1/2 text-white text-base'
                  }`}
                >
                  {t.username}
                </label>
                <User 
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 xl:w-6 xl:h-6 transition-colors duration-500 peer-focus:text-orange-600 peer-valid:text-orange-600 ${
                    registerForm.watch('username') ? 'text-orange-600' : 'text-white'
                  }`}
                />
                {registerForm.formState.errors.username && (
                  <p className="mt-1 text-xs text-red-400">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </motion.div>

              <motion.div 
                className="relative mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '0%' : '120%',
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.45 : 0.15 }}
              >
                <Input
                  {...registerForm.register('email')}
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  className="w-full h-12 px-0 pr-6 text-lg font-semibold text-white bg-transparent border-b-2 border-white border-none rounded-none auth-input xl:h-14 xl:text-xl peer focus:border-orange-600 focus:ring-0 focus:outline-none valid:border-orange-600"
                  placeholder=""
                />
                <label 
                  className={`absolute left-0 pointer-events-none transition-all duration-500 peer-focus:top-[-5px] peer-focus:text-orange-600 peer-focus:text-sm peer-valid:top-[-5px] peer-valid:text-orange-600 peer-valid:text-sm ${
                    registerForm.watch('email') 
                      ? 'top-[-5px] text-orange-600 text-sm' 
                      : 'top-1/2 -translate-y-1/2 text-white text-base'
                  }`}
                >
                  {t.email}
                </label>
                <Mail 
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 xl:w-6 xl:h-6 transition-colors duration-500 peer-focus:text-orange-600 peer-valid:text-orange-600 ${
                    registerForm.watch('email') ? 'text-orange-600' : 'text-white'
                  }`}
                />
                {registerForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div 
                className="relative mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '0%' : '120%',
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.55 : 0.2 }}
              >
                <Input
                  {...registerForm.register('password')}
                  type={showRegisterPassword ? "text" : "password"}
                  autoComplete="new-password"
                  spellCheck={false}
                  required
                  className="w-full h-12 px-0 pr-12 text-lg font-semibold text-white bg-transparent border-b-2 border-white border-none rounded-none auth-input xl:h-14 xl:text-xl peer focus:border-orange-600 focus:ring-0 focus:outline-none valid:border-orange-600"
                  placeholder=""
                />
                <label 
                  className={`absolute left-0 pointer-events-none transition-all duration-500 peer-focus:top-[-5px] peer-focus:text-orange-600 peer-focus:text-sm peer-valid:top-[-5px] peer-valid:text-orange-600 peer-valid:text-sm ${
                    registerForm.watch('password') 
                      ? 'top-[-5px] text-orange-600 text-sm' 
                      : 'top-1/2 -translate-y-1/2 text-white text-base'
                  }`}
                >
                  {t.password}
                </label>
                <div className="absolute right-0 flex items-center space-x-1 -translate-y-1/2 top-1/2">
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="p-1 transition-colors rounded hover:bg-white/10"
                    tabIndex={-1}
                  >
                    {showRegisterPassword ? (
                      <EyeOff className="w-4 h-4 xl:w-5 xl:h-5 text-white/70 hover:text-white" />
                    ) : (
                      <Eye className="w-4 h-4 xl:w-5 xl:h-5 text-white/70 hover:text-white" />
                    )}
                  </button>
                  <Lock 
                    className={`w-5 h-5 xl:w-6 xl:h-6 transition-colors duration-500 peer-focus:text-orange-600 peer-valid:text-orange-600 ${
                      registerForm.watch('password') ? 'text-orange-600' : 'text-white'
                    }`}
                  />
                </div>
                {registerForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-400">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '0%' : '120%',
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.65 : 0.3 }}
              >
                <Button
                  type="submit"
                  className="relative w-full h-12 xl:h-14 bg-transparent border-2 border-orange-600 text-white font-semibold text-lg xl:text-xl rounded-full cursor-pointer overflow-hidden z-10 hover:before:top-0 before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-gray-900 before:via-orange-600 before:to-gray-900 before:top-[-100%] before:left-0 before:-z-10 before:transition-all before:duration-500"
                  disabled={registerForm.formState.isSubmitting}
                >
                  {registerForm.formState.isSubmitting ? t.creatingAccount : t.register}
                </Button>
              </motion.div>

              <motion.div 
                className="mt-4 text-sm text-center text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  x: isActive ? '0%' : '120%',
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.75 : 0.35 }}
              >
                <p>
                  {t.alreadyHaveAccount} <br />
                  <button
                    type="button"
                    onClick={() => setIsActive(false)}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    {t.signIn}
                  </button>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Register Info Content */}
        <div className="absolute top-0 left-0 z-20 flex flex-col justify-center w-1/2 h-full px-10 text-left pointer-events-none pl-14 xl:px-12 xl:pl-20">
          <motion.div
            className="max-w-[360px] xl:max-w-[420px]"
            initial={{ x: -40, opacity: 0, filter: 'blur(10px)' }}
            animate={{
              x: isActive ? '0%' : '-120%',
              opacity: isActive ? 1 : 0,
              filter: isActive ? 'blur(0px)' : 'blur(10px)',
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: isActive ? 0.25 : 0,
            }}
          >
            <motion.h2 
              className="mb-4 text-4xl font-bold leading-tight text-white uppercase xl:text-5xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                x: isActive ? '0%' : '-120%',
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.5, delay: isActive ? 0.35 : 0 }}
            >
              {t.welcomeNew}
            </motion.h2>
            <motion.p 
              className="text-lg leading-relaxed xl:text-xl text-white/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                x: isActive ? '0%' : '-120%',
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.5, delay: isActive ? 0.45 : 0.1 }}
            >
              {t.welcomeNewDescription}
            </motion.p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}