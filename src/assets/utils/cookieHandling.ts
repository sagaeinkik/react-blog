//JWT-data
interface JwtData {
    token: string;
}

//Skapa cookie med JWT
export function cookieCreator(data: JwtData): void {
    document.cookie = `jwt=${data.token}; max-age=10800; path=/;`;
}

//Radera JWT-cookie
export function cookieDestroyer(): void {
    document.cookie = 'jwt=; max-age=0; path=/;';
}

//Hämta cookievärde
export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() ?? null;
    }

    return null;
}

//Kolla om det finns en jwt-cookie
export function checkUser(): boolean {
    const tokenCookie = getCookie('jwt');

    if (!tokenCookie) {
        return false;
    } else {
        return true;
    }
}
