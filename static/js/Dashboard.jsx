// Component for user to search for and nominate movies or view existing
// nominations

const Dashboard = ({setLoggedIn}) => {
    const [showSearch, setShowSearch] = useState(true);

    const [numNominations, setNumNominations] = useState(null);
    
    // reload after first render, so updated length is stored as numNominations
    useEffect(() => setNumNominations(localStorage.length), []);


    return (
        <div>
            <Logout setLoggedIn={setLoggedIn} />

            {/* Banner Displayed When Nomination Limit is Reached */}
            <CompletedNomBanner numNominations={numNominations} />

            {/* Toggle Display Between Search Bar and Nominations */}
            <p>
                <span onClick={() => setShowSearch(true)}>Search &#38; Nominate</span>
                 / 
                <span onClick={() => setShowSearch(false)}>My Nominations</span>
            </p>

            { showSearch ? 
                <MovieSearch 
                    numNominations={numNominations}
                    setNumNominations={setNumNominations}
                /> : <Nominations />
            }
            
        </div> 
    )
}