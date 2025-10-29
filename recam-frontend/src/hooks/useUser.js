import { useState } from "react";
import { login } from "../apis/auth.api";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";


export function useUser() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const res = await login(data);
            const { token } = res.data;
            authService.saveToken(token);
            navigate("/dashboard");

        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }

    }

    const handleLogout = () => {
        authService.clearToken();
        navigate("/");
    }

    return { loading, error, handleLogin, handleLogout };
}

