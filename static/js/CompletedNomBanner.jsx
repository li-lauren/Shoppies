// Banner displayed when the user has finished a certain number of nominations
// In this case, 5 nominations.

const CompletedNomBanner = ({numNominations}) => {
    const nominationLimit = 5;

    return( 
        <div id='banner'>
            {(numNominations === nominationLimit + 1) ? // + 1 b/c 'user' is a key in localStorage
              `Congrats! You've completed your ${nominationLimit} Shoppie nominations!` 
              : ''
            }
        </div> 
    )
}