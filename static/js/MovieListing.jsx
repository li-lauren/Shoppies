const MovieListing = ({movie}) => {

    return (
        <div>
            { movie.Poster === 'N/A' ? 
                <p>No poster</p> :
                <img src={movie.Poster} alt={`${movie.Title}-poster`} />
            }
            <span>{movie.Title} ({movie.Year})</span>
        </div>
    )
}