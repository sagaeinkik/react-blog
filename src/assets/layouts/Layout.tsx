import { Outlet } from 'react-router-dom'
import Header from "../components/Header"

const LoggedInLayout = () => {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
        <footer>
            <p>Sidfot</p>
        </footer>
    </>
  )
}

export default LoggedInLayout