// Search bar for movies and movie listings for subsequent results

const MovieSearch = ({numNominations, setNumNominations}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    const [showResHeading, setShowResHeading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    const searchForMovies = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);

        if (e.target.value) {
            fetch(`/search/${e.target.value}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.error);
                    setSearchRes([]);
                    setShowResHeading(false);
                } else {
                    setShowResHeading(true);
                    setSearchRes(data.res.Search);
                    setErrorMsg('');
                }    
            });
        } else {
            setErrorMsg('');
        };
    };

    return (
        <div id="search-container">

            {/* Search Bar */}
            
            <input 
                id="search-bar"
                type="text"
                placeholder="Movie Title"
                onChange={searchForMovies}
            />
            

            { showResHeading ? 
                <p id="res-heading">
                    Results for <span className="yellow">"{searchTerm}"</span>
                </p> : ''
            }

            {/* Movie Search Results */}
            <div id="search-res-container">
                {searchRes ? searchRes.map(movie => 
                    <MovieListing
                        key={movie.imdbID} 
                        movie={movie} 
                        numNominations={numNominations}
                        setNumNominations={setNumNominations} 
                    />
                ) : ''}

                {errorMsg ? <p>{errorMsg}</p> : ''}
            </div>    
        </div>
    );
}