import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';

export default function Notes() {  

    const [notes, setNotes] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/notes/notes/all');
                setNotes(response.data);
            }
            catch (err) {
                console.log("Error fetching notes");
            }
        };
        fetchNotes();
    }, [isAuthenticated]);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleCreateNote = async (e) => {
        try {
            if (!isAuthenticated) {
                alert("Must be logged in");
                navigate('../login');
                return;
            }
            const res = await api.post('/notes/notes', { title, body }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setNotes([...notes, res.data]);
            setTitle("");
            setBody("");
            console.log("Note created");
        }
        catch(err) {
            console.log("Error creating note");
        }
    };

    const handleDeleteNote = async (noteId) => {
        console.log("Bout to delete this shit");
        try {
            if (!isAuthenticated) {
                alert("Must be logged in");
                navigate("../login");
                return;
            }

            await api.delete(`/notes/notes/${noteId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setNotes(notes.filter(note => note._id !== noteId));
            console.log("Note deleted");
        } 
        catch (err) {
            console.log("Error deleting note");
        }
    };

    return (
        <section style={{ margin: "1rem" }}>
            <form onSubmit={ handleCreateNote }>
                <h1>Notes</h1>
                <input style={{ marginRight: "0.5rem"}} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input style={{ marginRight: "0.5rem"}} type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
                <button type="submit">Save</button>
            </form>

            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                {notes.map((note) => (
                    <Note key={note._id} note={note} onDelete={ handleDeleteNote }/>
                ))}
            </div>
        </section>
    );
};