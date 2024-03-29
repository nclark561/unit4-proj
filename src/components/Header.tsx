import { NavLink } from "react-router-dom";
import { useContext } from "react";

import logo from "../assets/dm-logo-white.svg";
import AuthContext from "../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }: { isActive: boolean }) => {
    return {
      color: isActive ? "#f57145" : "",
    };
  };

  return (
    <header className="header flex-row">
      <div className="flex-row">
        <img src={logo} alt="dm-logo" className="logo" />
        <h2>Social Mountain</h2>
      </div>
      <nav>
        <ul className="main-nav">
          <li>
            <NavLink style={styleActiveLink} to="/">
              Home
            </NavLink>
          </li>
          {authCtx.token ? (
            <>
              <li>
                <NavLink style={styleActiveLink} to="profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink style={styleActiveLink} to="form">
                  Add Post
                </NavLink>
              </li>
            </>
          ) : null}
          {!authCtx.token ? (
            <li>
              <NavLink style={styleActiveLink} to="auth">
                Login or Register
              </NavLink>
            </li>
          ) : null}
          {authCtx.token ? (
            <li>
              <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
