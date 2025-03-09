import { NavLink } from "react-router-dom"
import { useAuth } from "../context/UserContext";
import Pegasus from "../images/pegasus.svg";
import "../scss/_Header.scss";

const Header = () => {
  const { username, isAuthenticated, logout} = useAuth(); 

  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/">Start</NavLink></li>
                <li><NavLink to="/posts">Alla inlägg</NavLink></li>
                {isAuthenticated && <li><NavLink to="/createpost">Skapa inlägg</NavLink></li>}
                {/* Om användaren är inloggad, vissa logga ut-knapp; annars, visa logga in-länk */}
                {isAuthenticated ? <li><button onClick={logout}>Logga ut</button></li> : <li><NavLink to="/login">Logga in</NavLink></li>}
            </ul>
        </nav>
        <div className="hero">
            <img src={Pegasus} alt="Pegasus" />
            <h1>En Bra Blogg</h1>
            {isAuthenticated && <p>Inloggad som {username}</p>}
        </div>
    </header>
  )
}

export default Header