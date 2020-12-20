// Logout button

const Logout = ({setLoggedIn}) => {

    const logout = () => {

        const reqOptions = {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(localStorage.getItem('nominatedMovieIDs'))
        };
        
        fetch('/logout', reqOptions)
        .then(res => res.text())
        .then(data => {
            if (data === 'success') {
                setLoggedIn(false);
                localStorage.clear();
            }
        });
    };

    return(
        <button onClick={logout}>Logout</button>
    );
}