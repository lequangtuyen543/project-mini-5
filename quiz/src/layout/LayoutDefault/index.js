import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);

  return (
    <>
      <div className="layout-default">
        <header className="header">
          <div className="logo">Quiz</div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers">Answers</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="account">
            {token ? (
              <>
                <NavLink to="/logout">Log out</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Log in</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer">Copyright @ 2025 by NakaiSoft</footer>
      </div>
    </>
  );
}

export default LayoutDefault;