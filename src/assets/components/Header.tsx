import { NavLink } from "react-router-dom"
import Pegasus from "../images/pegasus.svg";
import "../scss/_Header.scss";

const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/">Start</NavLink></li>
                <li><NavLink to="/posts">Alla inlägg</NavLink></li>
                <li><NavLink to="/login">Logga in</NavLink></li>
            </ul>
        </nav>
        <div className="hero">
            <img src={Pegasus} alt="Pegasus" />
            <h1>En Bra Blogg</h1>
        </div>
    </header>
  )
}

export default Header