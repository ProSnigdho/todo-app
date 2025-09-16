import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassward } from "../../../firebase/auth";
import { Link } from "react-router-dom";
import "./Registration.css";
import loginImage from "../../../assets/Login.jpeg";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        
        if (password.length < 6) {
            alert("Password should be at least 6 characters long.");
            return;
        }

        try {
            await doCreateUserWithEmailAndPassward(email, password);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            
            alert("Registration failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="register-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Create a New Account</h2>
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    <p>
                        Already have an account? <Link to="/todo-app/login" className="login">Login</Link>
                    </p>
                </form>
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

export default Registration;