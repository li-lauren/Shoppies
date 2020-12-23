// List of all current nominations

const Nominations = ({numNominations, setNumNominations}) => {
    const [nominations, setNominations] = useState(null);

    useEffect(() => {
        getNominations();
    }, [numNominations]);

    const getNominations = () => {
        fetch('/nominations')
        .then(res => res.json())
        .then(data => setNominations(data));
    };

    return (
        <div id="nom-container">
            {nominations ? nominations.map(nomination => 
                <NominationListing 
                    key={nomination.imdb_id}
                    nomination={nomination}
                    setNumNominations={setNumNominations} 
                />) : ''
            }
        </div>
    );
}