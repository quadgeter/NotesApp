import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav style={{ display: "flex", gap: "15px", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <Link to="/">Home</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/collaborate">Collaborate</Link>
            {token ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/Register">Register</Link>
                </>
            )}   
        </nav>
    );
};

export default Navbar;

