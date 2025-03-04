import { NavLink } from "react-router-dom"

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
    </header>
  )
}

export default Header