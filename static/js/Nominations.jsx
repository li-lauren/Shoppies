// List of all current nominations

const Nominations = () => {
    const [nominations, setNominations] = useState(null);

    useEffect(() => {
        getNominations();
    }, []);

    const getNominations = () => {
        fetch('/nominations')
        .then(res => res.json())
        .then(data => setNominations(data));
    };

    return (
        <div>
            <span>Your Nominations</span>
            {nominations ? nominations.map(nomination => 
                <NominationListing 
                    nomination={nomination} 
                    key={nomination.imdb_id}
                />) : ''
            }
        </div>
    );
}