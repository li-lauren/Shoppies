// Logout button

const Logout = ({setLoggedIn}) => {

    const logout = () => {
        setLoggedIn(false);
        localStorage.clear();
    };

    return(
        <button onClick={logout}>Logout</button>
    );
}