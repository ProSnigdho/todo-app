import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import Registration from "./components/auth/registration/Registration";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

const PrivateRoute = ({ children }) => {
    const { userLoggedIn, loading } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
    return userLoggedIn ? children : <Navigate to="/todo-app/login" />;
};

function App() {
    
    const basename = import.meta.env.VITE_BASE_PATH || "/";

    return (
        
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/todo-app/register" element={<Registration />} />
                <Route path="/todo-app/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/todo-app/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;