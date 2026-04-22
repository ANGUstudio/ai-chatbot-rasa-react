const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>


  );
};

export default Button;