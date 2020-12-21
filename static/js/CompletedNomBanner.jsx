// Banner displayed when the user has finished a certain number of nominations
// In this case, 5 nominations.

const CompletedNomBanner = ({numNominations}) => {
    const nominationLimit = 5;

    return(
        <React.Fragment>
            { (numNominations === nominationLimit) ? 
            <div>
                {`Congrats! You have completed your ${nominationLimit} Shoppie nominations!`}
            </div> : ''
            }
        </React.Fragment>    
    )
}