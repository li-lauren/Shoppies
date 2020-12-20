const Logout = ({setLoggedIn}) => {
    const logout = () => {
        fetch('/logout')
        .then(res => res.text())
        .then(data => {
            if (data === 'success') {
                setLoggedIn(false)
            }
        })
    }
    
    return(
        <button onClick={logout}>Logout</button>
    )
}