// Listing for Each Nomination

const NominationListing = ({nomination}) => {
    return(
        <div>
            <span>{nomination.title} ({nomination.release_year})</span>
            {nomination.poster === 'N/A' ? <p>No Poster</p> : 
                <img 
                    src={nomination.poster} 
                    alt={`${nomination.title}-poster`}
                />
            }   
        </div> 
    )
}