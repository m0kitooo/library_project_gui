import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import routes from "../../routes.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import styles from './Login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch(`${CORE_API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
                credentials: 'include'
            });

            if (response.ok) {
                login();
                navigate(routes.app.path);
            } else {
                let errorMessage = 'Logowanie nie powiodło się. Spróbuj ponownie.';
                if (response.status === 401) {
                    errorMessage = 'Nieprawidłowa nazwa użytkownika lub hasło.';
                }
                setError(errorMessage);
            }
        } catch (err) {
            setError('Wystąpił błąd sieci. Sprawdź połączenie i spróbuj ponownie.');
            console.error('Error: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={styles.loginFormWrapper}>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <input
                        type={'text'}
                        placeholder={'login'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                    <input
                        type={'password'}
                        placeholder={'hasło'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type={'submit'} disabled={isLoading}>
                        {isLoading ? 'Logowanie...' : 'Zaloguj'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </>
    );
}