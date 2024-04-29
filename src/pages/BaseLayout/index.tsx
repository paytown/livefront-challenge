import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/pokeball-icon.svg";
import "./base.scss";
import { useEffect, useState } from "react";

export default function BaseLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 30) setIsScrolled(true);
      else setIsScrolled(false);
    };
  }, []);

  return (
    <div>
      <header className={isScrolled ? "scrolled" : ""}>
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
