// Login form

const Login = ({setLoggedIn}) => {
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            email: '', 
            password: ''
        }
    );

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInput({[name]: value});
    };

    const login = e => {
        e.preventDefault();

        const reqOptions = {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(userInput)
        };

        fetch('/login', reqOptions)
        .then(res => res.json())
        .then(data => {
            if (data.err) {
                // error occurred during login
                setErrorMsg(data.err);
            } else {
                // successful login
                setLoggedIn(true);

                if (data.nominations) {
                    // add pre-existing nominations to local storage
                    for (nomination of data.nominations) {
                        localStorage.setItem(nomination, '')
                    }
                }
            }
        });
    };

    return(
        <div>
            <form onSubmit={login}>
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={userInput.email}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={userInput.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}