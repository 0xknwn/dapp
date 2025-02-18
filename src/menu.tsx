import { NavLink } from "react-router";

const Menu = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/contracts">Contracts</NavLink>
    </nav>
  );
};

export default Menu;
