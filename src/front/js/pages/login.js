import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        let result = await actions.login(email, password);
        if (result) {
            navigate("/");
        } else {
            // Consider adding logic to handle the error and show a message to the user.
            console.error("Login failed. Please check your credentials and try again.");
        }
    };

    async function login(email, password) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        try {
            const response = await fetch('https://miniature-enigma-qwrxrwpg5wqc9j65-3001.app.github.dev/api/login', options);
            if (response.status === 200) {
                const data = await response.json();
                // TODO: Store the token somewhere (e.g., in context, state, local storage).
                actions.setToken(data.token);
            } else {
                throw new Error(`Authentication failed: ${response.statusText}`);
            }
        } catch (error) {
            console.log("There was an error:", error.message);
            // Consider adding logic to handle the error and show a message to the user.
        }
    }

    return (
        <>
            {store.token && store.token !== "" && store.token !== undefined ? (
                "You are logged in with token: " + store.token
            ) : (
                <div className="container text-center">
                    <h1>Hello, login</h1>
                    <div>
                        <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
