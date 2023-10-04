import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const Signup = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(" ");
    return (
        <>
            <div className='container text-center'>
                <h1> hello Signup!</h1>
                <div>
                    <input type="test" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button> Sign up</button>
                </div>
            </div>
        </>
    );
};

export default Signup;