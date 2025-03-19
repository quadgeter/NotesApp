import React from 'react';

export default function Notes({ note, onDelete }) {

    return (
        <div className="note-item" style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
            <h3>{ note.title }</h3>
            <p>{ note.body }</p>
            <small>Created at: { note.createdAt }</small>
            <svg class="delete-btn" xmlns="http://www.w3.org/2000/svg" height="25" fill="none" data-id= { note._id } onClick={() => onDelete(note._id)} viewBox="0 0 12 13"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.486 9.33 2.828 3.67M2.885 9.385l5.544-5.77"/></svg>
        </div>
    );
}