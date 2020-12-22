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
                    {/* <div className="login-toggle">
                        <span onClick={() => setShowLoginForm(true)}>
                            Login
                        </span>
                        <span>/</span> 
                        <span onClick={() => setShowLoginForm(false)}>
                            Sign Up
                        </span>
                    </div> */}
                    { showLoginForm ? 
                        <div className='form-parent'>
                            <h3 className='login-header'>Login</h3>
                            <div className='form-container'>
                                <Login setLoggedIn={setLoggedIn} /> 
                                <span 
                                    className='login-toggle'
                                    onClick={() => setShowLoginForm(false)}
                                >
                                    New here? &nbsp;
                                    <span className='yellow'>
                                        Let's set you up.
                                    </span>
                                </span>
                            </div>    
                        </div>
                        : 
                        <div>
                            <h3 classNane='login-header'>Sign Up</h3>
                            <Signup />
                            <span onClick={() => setShowLoginForm(true)}>
                                Already a member? Login here.
                            </span>
                        </div>
                    }
                </div>
            }
        </div>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));