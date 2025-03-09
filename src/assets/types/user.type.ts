//Allt om användare i databas
export interface User {
    _id: string;
    username: string;
    password: string;
    registered: string;
}

//Skickas med i POST-anrop
export interface LoginCredentials {
    username: string;
    password: string;
}

//Respons från API
export interface LoginResponse {
    message: string;
    //Om lyckad inloggning
    user?: {
        username: string;
    };
    token?: string;

    //Om egna error från API:et
    https_response?: {
        message: string;
        code: number;
    };

    //Server-error eller andra fel från Fastify
    statusCode?: number;
    code?: string;
    error?: number;
}

//Context type
export interface UserContextType {
    username: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    success: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}
