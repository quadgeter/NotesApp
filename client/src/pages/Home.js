export default function Home() {
    return (
        <div class="home-container">
            <h1>Welcome to Notely</h1>
            <div className="button-group">
                <button>Host a Room</button>
                <p>Or</p>
                <button>Join a Room</button>
            </div>
            <a className="notes-link" href="/notes">Skip to Your Notes</a>
        </div>
        
       
    );
};