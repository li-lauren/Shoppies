const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <React.Fragment>
            { loggedIn ? 
                <div>
                    <Logout setLoggedIn={setLoggedIn} />
                    <MovieSearch />
                </div> 
                : 
                <GreetingPage setLoggedIn={setLoggedIn} />
            }
        </React.Fragment>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));