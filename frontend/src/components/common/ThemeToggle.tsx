import { Moon, Sun } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative group flex justify-center items-center rounded-full border-none bg-transparent shadow-none hover:bg-blue-600/5 md:h-10 md:w-10 mt-4 mr-4"
    >
      <div className="relative h-6 w-6 ">
        <Moon 
          className={`absolute h-6 w-6 transition-all duration-300 group-hover:text-blue-500
            ${theme === 'dark' 
              ? 'rotate-0 scale-100 text-white' 
              : 'rotate-90 scale-0 text-black'
            }`} 
        />
        <Sun 
          className={`absolute h-6 w-6 transition-all duration-300 group-hover:text-blue-500
            ${theme === 'light' 
              ? 'rotate-0 scale-100 text-black' 
              : '-rotate-90 scale-0'
            }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}