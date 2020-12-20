const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return(
        <div>
            Shoppies
            <Login setLoggedIn={setLoggedIn} />
            <Signup />
            <Logout />
            <MovieSearch />
 
        </div>
    ) 
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));