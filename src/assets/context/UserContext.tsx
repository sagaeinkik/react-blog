import { LoginCredentials, LoginResponse, UserContextType } from '../types/user.type';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cookieCreator, cookieDestroyer, checkUser } from "../utils/cookieHandling"

//Skapa context
const AuthContext = createContext<UserContextType>({
    username: null, 
    isAuthenticated: false,
    loading: false,
    error: null,
    success: null,
    login: async () => {},
    logout: () => {}
}); 

let apiUrl = "https://blogapi.up.railway.app/login";

//Provider
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    //States
    const [username, setUsername] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    //Funktioner

    //Kolla om användaren redan är inloggad
    const checkAuth = () => {
        const isLoggedIn = checkUser(); 

        if(isLoggedIn) {
            setIsAuthenticated(true);
            setUsername(localStorage.getItem("username"));
        } else {
            setIsAuthenticated(false);
            setUsername(null);
        }
    }

    //Logga in
    const login = async (credentials: LoginCredentials) => {
        //Nollställ fel
        setError(null); 

        try {
            //Sätt loading till true
            setLoading(true);
            
            const response = await fetch(apiUrl, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(credentials)
            }); 

            const data: LoginResponse = await response.json();
            console.log(data);

            //Felmeddelande från API
            if(!response.ok) {
                setError(data.message || "Kunde inte logga in...");
                return;
            }

            //Om token finns har allt gått bra
            if(data.token) {
                cookieCreator({token: data.token});
                setSuccess(data.message);

                //Sätt autentiserad
                setIsAuthenticated(true);

                //Lagra användarnamn
                setUsername(data.user?.username || null);
                if(data.user?.username) {
                    localStorage.setItem("username", data.user?.username);
                }
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : "Något gick fel vid inloggning.");
        } finally {
            //Oavsett resultat, sätt loading till false 
            setLoading(false);
        }
    }

    //Logga ut
    const logout = () => {
        //Ta bort token-cookie
        cookieDestroyer();
        //Sätt autentiserad till false
        setIsAuthenticated(false);
        setUsername(null);
        localStorage.removeItem("username");
    }
    
    //UseEffect
    useEffect(() => {
        checkAuth();
    }, [])


    return (
        <AuthContext.Provider value={{username, isAuthenticated, loading, error, success, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


//Hook
export const useAuth = () => useContext(AuthContext);