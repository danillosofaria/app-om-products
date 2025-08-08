import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { supabase } from "../supabaseClient";
import "./NavBar.css";

export default function NavBar({ user, onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true }); // redireciona sem recarregar a página
  };

  return (
    <div className="navbar">
      <div className="content-navbar container">
        {/* Logo */}
        <Link to="/">
          <img
            src="src/assets/logo_OM_branco.svg"
            alt="logo_om"
            style={{ width: "98px", margin: "26px 0px" }}
          />
        </Link>

        {/* Barra de pesquisa só na página inicial */}
        {location.pathname === "/" && <SearchInput onSearch={onSearch} />}

        {/* Links de navegação */}
        <ul className="navbar-text">
          {user ? (
            <>
              <li>
                <Link to="/add">+ add</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
