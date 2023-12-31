import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/Kangal.png";
import { useContext } from "react";
import { AuthContext, useAuthDispatch, useAuthState } from "../state/context";
import { ProfileImage } from "./ProfileImage";

//Sayfalar arası geçiş
export function NavBar() {
  const { t } = useTranslation();
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  const onClickLogout = () => {
    dispatch({ type: "logout-success" });
  };

  return (
    <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} width={60} />
          Kangal
        </Link>
        <ul className="navbar-nav">
          {authState.id === 0 && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  {t("login")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  {t("signUp")}
                </Link>
              </li>
            </>
          )}
          {authState.id > 0 && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/user/${authState.id}`}>
                  <ProfileImage width={30} />
                  <span className="ms-2">{authState.username}</span>
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  role="button"
                  onClick={onClickLogout}
                >
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
