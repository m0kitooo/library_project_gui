import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import routes from "../routes.jsx";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', usernameRef.current.value);
    formData.append('password', passwordRef.current.value);

    try {
      const response = await fetch(`${CORE_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        credentials: 'include'
      });

      if (response.ok) {
        navigate(routes.app.path);
      } else {
        alert('Logowanie nie powiodło się');
      }

    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <>
      <form onSubmit={login}>
        <input type={'text'} placeholder={'login'} ref={usernameRef}/>
        <input type={'password'} placeholder={'hasło'} ref={passwordRef}/>
        <button type={'submit'}>Zaloguj</button>
      </form>
    </>
  );
}