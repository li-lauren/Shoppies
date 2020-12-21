// Banner displayed when the user has finished a certain number of nominations
// In this case, 5 nominations.

const CompletedNomBanner = ({numNominations}) => {
    const nominationLimit = 5;
    // const [numNominations, setNumNominations] = useState(localStorage.length);
    
    useEffect(() => {
        console.log('LOCAL STORAGE CHANGED')
        console.log(numNominations)
        // setNumNominations(localStorage.length)
    }, [numNominations]);

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