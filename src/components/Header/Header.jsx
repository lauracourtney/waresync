import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header({ activePage }) {
  return (
    <header className="header">
      <h1 className="header__title">WareSync 🧙</h1>

      <nav className="header__menu">
        <div className="header__nav">
          <NavLink
            to="/warehouses"
            className={`header__link ${
              activePage === "warehouses" ? "active" : ""
            }`}
          >
            <h3 className="header__section">Warehouses</h3>
          </NavLink>
        </div>

        <div className="header__nav">
          <NavLink
            to="/inventory"
            className={`header__link ${
              activePage === "inventory" ? "active" : ""
            }`}
          >
            <h3 className="header__section">Inventory</h3>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
