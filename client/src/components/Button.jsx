const Button = ({ label, onClick, type = "button", disabled, color }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        m-1
        text-white
        font-medium
        h-7
        px-3
        ${color ? color : "bg-blue-500"}
      `}
    >
      {label}
    </button>
  );
};
export default Button;
