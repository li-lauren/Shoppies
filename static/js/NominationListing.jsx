// Listing for Each Nomination

const NominationListing = ({nomination}) => {
    return(
        <div className="listing-container">
            {nomination.poster === 'N/A' ? 
                <div className="no-poster"></div>  : 
                <img 
                    className="poster"
                    src={nomination.poster} 
                    alt={`${nomination.title}-poster`}
                />
            }   

            <span className="material-icons trophy">emoji_events</span>

            <span className="title">{nomination.title} ({nomination.release_year})</span>
        </div> 
    )
}