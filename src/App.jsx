import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import Registration from "./components/auth/registration/Registration";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

const PrivateRoute = ({ children }) => {
    const { userLoggedIn, loading } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
    return userLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;