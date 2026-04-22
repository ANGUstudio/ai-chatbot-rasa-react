import { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear error when typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation (just for UI demonstration)
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // In a real app, you would handle login logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Forgot password?
                </a>
              </div>

              <Button type="submit">Sign In</Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <hr className="w-full border-gray-200 dark:border-gray-700" />
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Or</span>
              <hr className="w-full border-gray-200 dark:border-gray-700" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.56V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.56C14.73 18.21 13.48 18.59 12 18.59C9.07 18.59 6.6 16.64 5.73 14H2.06V16.87C3.87 20.44 7.62 23 12 23Z" fill="#34A853"/>
                  <path d="M5.73 14C5.52 13.35 5.4 12.66 5.4 11.95C5.4 11.24 5.52 10.55 5.73 9.9V7.03H2.06C1.38 8.54 1 10.21 1 11.95C1 13.69 1.38 15.36 2.06 16.87L5.73 14Z" fill="#FBBC05"/>
                  <path d="M12 5.32C13.62 5.32 15.06 5.9 16.21 7L19.36 3.85C17.46 2.05 14.97 1 12 1C7.62 1 3.87 3.56 2.06 7.13L5.73 10C6.6 7.36 9.07 5.32 12 5.32Z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#1877F2"/>
                </svg>
                Facebook
              </button>
            </div>
          </Card>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CompanyName. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;