const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 backdrop-blur-md dark:backdrop-blur-md border border-gray-100 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;