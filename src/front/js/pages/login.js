import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";


const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(" ");

    const handleLogin = () => {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };
        console.log('Email:', email);
        console.log('Password:', password);

        fetch('https://miniature-enigma-qwrxrwpg5wqc9j65-3001.app.github.dev/api/login', options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Authentication failed: ${response.statusText}`);
                }
            })
            .then(data => {
                console.log('access token:', data);
            })
            .catch(error => {
                console.log("There was an error: ", error.message);
            });
    }



    return (
        <>
            <div className='container text-center'>
                <h1> hello login</h1>
                <div>
                    <input type="test" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
                    <input type="test" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
                    <button onClick={handleLogin}> login</button>
                </div>
            </div>
        </>
    );
};

export default Login;