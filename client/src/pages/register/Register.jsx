import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import "./register.css";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Password dont match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }

        }

    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Lamasocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handleClick} className="loginBox">
                        <input placeholder="Username" ref={username} className="loginInput" required />
                        <input placeholder="Email" type="email" ref={email} className="loginInput" required />
                        <input placeholder="Password" type="password" ref={password} className="loginInput" required minLength="6" />
                        <input placeholder="Password Again" type="password" ref={passwordAgain} className="loginInput" required />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}