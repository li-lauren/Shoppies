// Component for user to search for and nominate movies or view existing
// nominations

const Dashboard = ({setLoggedIn}) => {
    const [showSearch, setShowSearch] = useState(true);

    const [numNominations, setNumNominations] = useState(null);
    
    // reload after first render, so updated length is stored as numNominations
    useEffect(() => setNumNominations(localStorage.length), []);


    return (
        <div className='dash-container'>
            <Logout setLoggedIn={setLoggedIn} />
            <h1 className='dash-header-top'>Welcome to the </h1>
            <h1 className='dash-header'>Shoppies</h1>
            
            {/* Banner Displayed When Nomination Limit is Reached */}
            <CompletedNomBanner numNominations={numNominations} />

            {/* Toggle Display Between Search Bar and Nominations */}
            <div className='dash-toggle'>
                <span 
                    className={showSearch ? "underline" : "norm"}
                    onClick={() => setShowSearch(true)}
                >
                    Search &#38; Nominate
                </span>
                <span>/</span>
                <span 
                    className={showSearch ? "norm" : "underline"}
                    onClick={() => setShowSearch(false)}
                >
                    My Nominations
                </span>
            </div>

            { showSearch ? 
                <MovieSearch 
                    numNominations={numNominations}
                    setNumNominations={setNumNominations}
                /> 
                : 
                <Nominations 
                    numNominations={numNominations}
                    setNumNominations={setNumNominations}
                />
            }
            
        </div> 
    )
}