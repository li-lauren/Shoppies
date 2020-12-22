const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    return(
        <div>
            <h1>Shoppies</h1>
            { loggedIn ? 
                <div>
                    <Logout setLoggedIn={setLoggedIn} />
                    <MovieSearch />
                </div> 
                : 
                <div>
                    <p>
                        <span onClick={() => setShowLoginForm(true)}>
                            Login
                        </span>
                        <span>/</span> 
                        <span onClick={() => setShowLoginForm(false)}>
                            Sign Up
                        </span>
                    </p>
                    { showLoginForm ? 
                        <Login setLoggedIn={setLoggedIn} /> : <Signup />
                    }
                </div>
            }
        </div>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));