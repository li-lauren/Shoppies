// Search bar for movies and movie listings for subsequent results

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    
    const searchForMovies = e => {
        e.preventDefault();

        fetch(`/search/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.Search)
            setSearchRes(data.Search)
        });
    };

    const handleChange = e => {
        setSearchTerm(e.target.value)
    };

    return (
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
                <MovieListing movie={movie} key={movie.imdbID} />
            )}

        </div>
    );
}