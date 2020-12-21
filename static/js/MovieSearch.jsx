// Search bar for movies and movie listings for subsequent results

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    const [showSearch, setShowSearch] = useState(true);

    const [numNominations, setNumNominations] = useState(null);
    
    // reload after first render, so updated length is stored as numNominations
    useEffect(() => setNumNominations(localStorage.length), []);

    const searchForMovies = e => {
        e.preventDefault();

        fetch(`/search/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            setSearchRes(data.Search)
        });
    };

    const handleChange = e => {
        setSearchTerm(e.target.value)
    };

    return (
        <div>
            {/* Banner Displayed When Nomination Limit is Reached */}
            <CompletedNomBanner numNominations={numNominations} />

            {/* Toggle Display Between Search Bar and Nominations */}
            <p>
                <span onClick={() => setShowSearch(true)}>Search &#38; Nominate</span>
                 / 
                <span onClick={() => setShowSearch(false)}>My Nominations</span>
            </p>

            { showSearch ?
                <div>
                    {/* Search Bar */}
                    <form onSubmit={searchForMovies}>
                        <input 
                            type="text"
                            onChange={handleChange}
                        />
                        <input type="submit" style={{display: "none"}}/>
                    </form>

                    {/* Movie Search Results */}
                    {searchRes.map(movie => 
                        <MovieListing
                            key={movie.imdbID} 
                            movie={movie} 
                            numNominations={numNominations}
                            setNumNominations={setNumNominations} 
                        />
                    )}
                </div>
                : 
                <div>
                    {/* Movie Nominations */}
                    <Nominations />
                </div>       
            }

        </div>
    );
}