const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <React.Fragment>
            { loggedIn ? 
                <Dashboard setLoggedIn={setLoggedIn} />
                : 
                <GreetingPage setLoggedIn={setLoggedIn} />
            }
        </React.Fragment>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));