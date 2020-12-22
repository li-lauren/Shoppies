// Search bar for movies and movie listings for subsequent results

const MovieSearch = ({numNominations, setNumNominations}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    const [showResHeading, setShowResHeading] = useState(false);
    
    const searchForMovies = e => {
        e.preventDefault();

        fetch(`/search/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            setSearchRes(data.Search);
            setShowResHeading(true);
        });
    };

    const handleChange = e => {
        setSearchTerm(e.target.value)
    };

    return (
        <div id="search-container">
            {/* Search Bar */}
            <form onSubmit={searchForMovies} id="search-form">
                <input 
                    id="search-bar"
                    type="text"
                    placeholder="Movie Title"
                    onChange={handleChange}
                />
                <input type="submit" style={{display: "none"}}/>
            </form>

            { showResHeading ? 
                <p>
                    Results for <span className="yellow">{searchTerm}</span>
                </p> : ''
            }

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
    );
}