import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material"
export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value },
            dispatch
        );
    };
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Node Social</h3>
                    <span className="loginDesc">Connect Everyone</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required />
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required minLength="6" />
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="15px" /> : "LogIn"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color="white" size="15px" /> : "Create a New Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
