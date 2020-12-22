// Logout button

const Logout = ({setLoggedIn}) => {

    const logout = () => {
        setLoggedIn(false);
        localStorage.clear();
    };

    return(
        <div className='logout-btn yellow' onClick={logout}>Logout</div>
    );
}