const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    return(
        <div id='home-container'>
            <h3 className='header'>Movie Awards</h3>
            <h1 id='shoppies-logo'>Shoppies</h1>
            <h3 className='header'>For the Entrepreneur</h3>
            
            { loggedIn ? 
                <div>
                    <Logout setLoggedIn={setLoggedIn} />
                    <MovieSearch />
                </div> 
                : 
                <div id='login-container'>
                    <div className="login-toggle">
                        <span onClick={() => setShowLoginForm(true)}>
                            Login
                        </span>
                        <span>/</span> 
                        <span onClick={() => setShowLoginForm(false)}>
                            Sign Up
                        </span>
                    </div>
                    { showLoginForm ? 
                        <Login setLoggedIn={setLoggedIn} /> : <Signup />
                    }
                </div>
            }
        </div>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));