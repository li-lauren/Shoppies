const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return(
        <div>
            Shoppies
            { loggedIn ? 
                <div>
                    <Logout />
                    <MovieSearch />
                </div> 
                : 
                <div>
                    <Login setLoggedIn={setLoggedIn} />
                    <Signup />
                </div>
            }
        </div>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));