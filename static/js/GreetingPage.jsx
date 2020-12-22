// Greeting page that loads on initial visit; contains login and sign up forms

const GreetingPage = ({setLoggedIn}) => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
        <div id='home-container'>
            <div id='header-section'>
                <h3 className='header'>Movie Awards</h3>
                <h1 id='shoppies-logo'>Shoppies</h1>
                <h3 className='header'>For the Entrepreneur</h3>
                <br/>
            </div>

            <div id='login-section'>
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
                    <div className='form-parent'>
                        <h3 className='login-header'>Sign Up</h3>
                        <div className='form-container'>
                            <Signup />
                            <br/>
                            <span 
                                className='login-toggle'
                                onClick={() => setShowLoginForm(true)}
                            >
                                Already a member? &nbsp;
                                <span className='yellow'>
                                    Login here.
                                </span>
                            </span>
                        </div>   
                    </div>
                }
            </div>
        </div>
    )
}