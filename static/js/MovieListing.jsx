// Individual movie listing for a movie search result

const MovieListing = ({movie}) => {
    const [nominated, setNominated] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const imdbID = movie.imdbID;

    useEffect(() => {
        // initially set 'nominated' var. based on if movie has been nominated 
        // (i.e. if movie is already in local storage)

        setNominated(localStorage.getItem(imdbID) !== null);
    }, []);

    const nominateMovie = () => {
        
        const reqOptions = {
            method : 'POST', 
            header : {
                'Content-Type' : 'application/json'
            }, body : {
                'title' : movie.Title,
                'year' : movie.Year,
                'poster' : movie.Poster,
                'imdb_id' : movid.imdbID
            }
        };

        fetch('/nominations', reqOptions)
        .then(res => res.text())
        .then(data => {
            if (data === 'Error') {
                setErrorMsg('Your nomination could not be processed. Please try again.');
            } else {
                // nomination successfully processed 
                setNominated(true);

                // save nominated movie to local storage
                localStorage.setItem(movie.imdbID, movie.Title);
            };
        });
    };

    const unnominateMovie = () => {
        setNominated(false);

        // remove movie from local storage
        localStorage.removeItem(movie.imdbID);
    };

    return (
        <div>
            { movie.Poster === 'N/A' ? 
                <p>No poster</p> :
                <img src={movie.Poster} alt={`${movie.Title}-poster`} />
            }
            <span>{movie.Title} ({movie.Year})</span>

            { nominated ?
                <div>
                    <button disabled>Nominated</button>
                    <button onClick={unnominateMovie}>Trash</button>
                </div> : 
                <button onClick={nominateMovie}>Nominate</button>
            }
        </div>
    )
}