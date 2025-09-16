import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../../firebase/auth";
import "./Login.css";
import loginImage from "../../../assets/Login.jpeg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false); // Add this state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await doSignInWithEmailAndPassword(email, password);
            // If "Remember me" is checked, store a flag in local storage
            if (rememberMe) {
                localStorage.setItem('userLoggedIn', 'true');
            }
            alert("Login successful");
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await doSignInWithGoogle();
            localStorage.setItem('userLoggedIn', 'true');
            alert("Google login successful");
            navigate("/dashboard");
        } catch (error) {
            alert("Google sign-in failed");
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Login</h2>
                <p>Login to Write Your Daily Task</p>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    Sign in with Google
                </button>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="remember-me">
                        <input 
                            type="checkbox" 
                            id="remember" 
                            checked={rememberMe} // Link the input to the state
                            onChange={(e) => setRememberMe(e.target.checked)} // Update the state on change
                        />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit">Login</button>
                </form>

                {/* <p className="forgot-password">
                    <a href="#">Forgot password?</a>
                </p> */}
                <p className="redirect">
                    Not registered yet? <a href="/register">Create an Account</a>
                </p>
            </div>

            <div className="graphics-container">
                <img 
                    src={loginImage}
                    alt="Decorative Image"
                    className="right-image"
                />
            </div>
        </div>
    );
};

export default Login;