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

            { showLoginForm ? 
                <Login 
                    setShowLoginForm={setShowLoginForm}
                    setLoggedIn={setLoggedIn} 
                />    
                : 
                <Signup 
                    setShowLoginForm={setShowLoginForm} 
                    setLoggedIn={setLoggedIn}
                />     
            }
        </div>  
    )
}