const TOKEN_KEY = "auth_token";
export const authService = {
    saveToken:(token) => localStorage.setItem(TOKEN_KEY,token),
    getToken:()=>localStorage.getItem(TOKEN_KEY),
    clearToken:()=>localStorage.removeItem(TOKEN_KEY),
    isLoggedIn:()=>!!localStorage.getItem(TOKEN_KEY)
}