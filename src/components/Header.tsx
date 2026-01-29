import headerImg from "../assets/investment-calculator-logo.png";

const Header = () => {
  return (
    <header id="header">
      <img src={headerImg} alt="Logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;
