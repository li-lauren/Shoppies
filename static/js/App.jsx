// entry component to the application

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // check if a user is already logged in
        if (localStorage.getItem('user')) {
            setLoggedIn(true);
        };
    }, []);

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