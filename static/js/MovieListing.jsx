// Individual movie listing for a movie search result

const MovieListing = ({movie, numNominations, setNumNominations}) => {
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
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                'title' : movie.Title,
                'year' : movie.Year,
                'poster' : movie.Poster,
                'imdb_id' : imdbID
            })
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
                localStorage.setItem(imdbID, movie.Title);
                setNumNominations(localStorage.length);
            };
        });
    };

    const unnominateMovie = () => {
        fetch(`/nominations/delete/${imdbID}`)
        .then(res => res.text())
        .then( data => {
            if (data !== 'Success') {
                setErrorMsg('Error in removing nomination. Please try again.');
            } else {
                setNominated(false);

                // remove movie from local storage
                localStorage.removeItem(imdbID);
                setNumNominations(localStorage.length);
            };
        });  
    };

    return (
        <div className="listing-container">
    
            { movie.Poster === 'N/A' ? 
                <div className="no-poster"></div> :
                <img
                    className="poster" 
                    src={movie.Poster} 
                    alt={`${movie.Title}-poster`} 
                />
            }

            {/* show a trophy icon if the movie has been nominated */}
            {nominated ? <span className="material-icons trophy">emoji_events</span> : ''}

            <span className="title">{movie.Title} ({movie.Year})</span>
            

            { nominated ? 
                <button className="btn btn-light nom-btn" onClick={unnominateMovie}>Remove</button>
                : 
                // disable nomination button when nomination limit of 5 is reached
                numNominations === 5 ? 
                    <button className="btn btn-light nom-btn" disabled>Limit Reached</button> :
                    <button className="btn btn-light nom-btn" onClick={nominateMovie}>Nominate</button>
            }

            { errorMsg ? 
                <p className="nom-err">{errorMsg}</p> : ''
            }
        </div>
    )
}