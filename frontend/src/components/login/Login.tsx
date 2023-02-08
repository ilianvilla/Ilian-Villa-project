import axios from '../../api/Axios';
import React from 'react'
import "./login.scss";
import { useState, useEffect } from 'react';

const LOGIN_URL = '/login';

const Login: React.FC = () => {
    const userRef = React.useRef<undefined | any>(null);
    const errRef = React.useRef<undefined | any>(undefined);
    if (errRef.current !== undefined) {
    console.log('Ok');
   };

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [user, password])

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response: any = await axios.post(LOGIN_URL,
                JSON.stringify({ user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser('');
            setPassword('');
            setSuccess(true);
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
                        <label htmlFor="username">Email:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
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
                        <button>Sign In</button>
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
