import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого место" />
      <div style={{ display: "flex" }}>
        <p className="header__email">{props.userData.data.email}</p>
        <Link
          to="/sign-in"
          className="header__nav-link"
          style={{ margin: 'auto 0 auto 24px'}}
          onClick={props.signOut}
        >
          Выйти
        </Link>
      </div>
    </header>
  );
}

export default Header;
