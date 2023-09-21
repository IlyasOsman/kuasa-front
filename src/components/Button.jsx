/* eslint-disable react/prop-types */
const Button = ({type = "button", styles, text = "Get Started", onClick}) => (
  <button
    type={type}
    onClick={onClick}
    className={`py-2 px-4 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none capitalize transition-colors duration-300 transform hover:bg-green-400 active:bg-green-500 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50 ${styles}`}
  >
    {text}
  </button>
);

export default Button;
