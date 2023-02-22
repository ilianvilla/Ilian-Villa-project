import axios from '../../api/Axios';
import React from 'react'
import "./login.scss";
import { useState, useEffect } from 'react';

const LOGIN_URL = 'http://localhost:1000/login';

const Login: React.FC = () => {
    const userRef = React.useRef<undefined | any>(null);
    const errRef = React.useRef<undefined | any>(undefined);
    if (errRef.current !== undefined) {
    console.log('Ok');
   };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password  
        }
        try {
            const response = await axios.post(LOGIN_URL, data);
            if (response.status === 200) {
                if (response.data.error) {
                    setErrorMessage(response.data.error);
                } else if (response.data.isAdmin) {
                    window.location.href = "/users";
                    localStorage.setItem('role','admin');

                } else if (response.data.hasOwnProperty('username') && response.data.username === username) {
                    setUsername('');
                    setPassword('');
                    setSuccess(true);
                }
                    else if (!response.data.isAdmin) {
                        localStorage.setItem('user',response.data.user)
                        localStorage.setItem('role','user');
                        window.location.href = "/";
                    }
                 else {
                    setErrorMessage('Incorrect credentials');
                }
            }
        } catch (err) {
            if (!(err as any)?.response) {
                setErrorMessage('No Server Response');
            } else if ((err as any).response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if ((err as any).response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            errRef.current.focus();
        }
    }
    
    return (
        <>
        <div className='login'>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button className='sign-in'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {}
                            <a href="/signup">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
            </div>
            </>
    )
 }
            
 export default Login;
