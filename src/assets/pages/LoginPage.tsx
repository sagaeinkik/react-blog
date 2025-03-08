import { useState, useEffect } from 'react'
import { useAuth } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import "../scss/_LoginPage.scss"

const LoginPage = () => {
  const { isAuthenticated, loading, error, login} = useAuth();

  //Lokala states för formulärfält
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const navigate = useNavigate();
  //Funktion för inloggning
  const handleSubmit = async (e: any) => { 
    e.preventDefault();

    //Kolla inputfält
    if(username.trim() === "" || password.trim() === "") {
      return;
    } 

    //Skicka med inputfälten till login-funktionen
    await login({ username, password });

    //Om inloggning lyckas, skicka användaren till startsidan
    if(isAuthenticated) {
      navigate("/");
    }
  }

  //Omedelbar redirect om inloggad
  useEffect(() => {
    if(isAuthenticated) {
      navigate("/");
    }

  })

  return (
    <div className="page-wrap">
    <form className="login-form">
      { error && <p className="error">{error}</p> }
      <div className="form-group">
        <label htmlFor="username">Användarnamn</label>
        <input type="text" name="username" id="username" required onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Lösenord</label>
        <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input onClick={handleSubmit} type="submit" value={loading ? "Loggar in..." : "Logga in"} disabled={loading}/>
    </form>
    </div>
  )
}

export default LoginPage