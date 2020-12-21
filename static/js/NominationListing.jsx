const NominationListing = ({nomination}) => {
    return(
        <div>
            <span>{nomination.title} ({nomination.release_year})</span>
            <img src={nomination.poster} alt={`${nomination.title}-poster`}/>
        </div> 
    )
}