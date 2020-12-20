const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchRes, setSearchRes] = useState([])
    
    const searchForMovies = () => {
        fetch(`/search/${searchTerm}`)
        .then(res => res.json())
        .then(data => setSearchRes(data))
    }

    
    return (
        <div>
            {/* Search Bar */}
            <form onSubmit={searchForMovies}>
                <input type="text"/>
                <input type="submit" style={{display: "none"}}/>
            </form>

            {/* Movie Search Results */}
            {searchRes.map(movie => {
                console.log(movie)
            })}

        </div>
    )
}