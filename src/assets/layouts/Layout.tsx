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
            <p>Gjord av S.E.K på Mittuniversitetet 2025</p>
        </footer>
    </>
  )
}

export default LoggedInLayout