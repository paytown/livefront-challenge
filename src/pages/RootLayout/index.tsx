import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/pokeball-icon.svg";
import "./root.scss";

export default function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" className={"logo-link"}>
            <img src={Logo} />
            Pokédex
          </NavLink>
          <a
            href="https://github.com/paytown/livefront-challenge"
            target="_blank"
          >
            Github
          </a>
        </nav>
      </header>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
