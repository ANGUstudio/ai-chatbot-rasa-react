// src/components/Navbar.jsx
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ui/ThemeToggle';

const Navbar = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center">
        <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
          <span className="font-bold">Ryu</span>
        </div>
        <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">RyuBot</span>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Navbar;