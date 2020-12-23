// Listing for Each Nomination

const NominationListing = ({nomination, setNumNominations}) => {
    const [errorMsg, setErrorMsg] = useState('');
    const imdbID = nomination.imdb_id

    const unnominateMovie = () => {
        fetch(`/nominations/delete/${imdbID}`)
        .then(res => res.text())
        .then( data => {
            if (data !== 'Success') {
                setErrorMsg('Error in removing nomination. Please try again.');
            } else {
                // remove movie from local storage
                localStorage.removeItem(imdbID);
                setNumNominations(localStorage.length);
            };
        });  
    };

    return(
        <div className="listing-container">
            {nomination.poster === 'N/A' ? 
                <div className="no-poster">
                    <span className="material-icons film-icon">
                        theaters
                    </span>
                </div>  : 
                <img 
                    className="poster"
                    src={nomination.poster} 
                    alt={`${nomination.title}-poster`}
                />
            }   

            <span className="material-icons trophy">emoji_events</span>

            <span className="title">{nomination.title} ({nomination.release_year})</span>

            <button className="btn btn-light nom-btn" onClick={unnominateMovie}>Remove</button>

            { errorMsg ? 
                <p className="nom-err">{errorMsg}</p> : ''
            }
        </div> 
    )
}