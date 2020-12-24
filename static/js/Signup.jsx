// Signup form for users to become Shoppie judges

const Signup = ({setShowLoginForm, setLoggedIn}) => {
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            fname: '', 
            lname: '', 
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

    const signup = e => {
        e.preventDefault();
        
        const reqOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInput)
        };

        fetch('/users', reqOptions)
        .then(res => res.json())
        .then(data => {
            if (data.successMsg) {
                // user created
                setErrorMsg('');
                setSuccessMsg("You're now a new member! Logging you in...");
                setTimeout(() => {
                    setLoggedIn(true);
                }, 2000);
            } else {
                // error in creating user
                setErrorMsg(data.error_msg);
            }; 
            
            setUserInput({
                fname: '', 
                lname: '',
                email: '', 
                password: ''
            });
        });
    };

    return (
        <div className='form-wrapper'>
            <h3 className='form-header'>Sign Up</h3>

            <form className='form-container' onSubmit={signup}>
                <input 
                    type="text" 
                    placeholder="First"
                    name="fname" 
                    value={userInput.fname} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    placeholder="Last"
                    name="lname" 
                    value={userInput.lname} 
                    onChange={handleChange} 
                />
                <br/>

                <input 
                    type="text" 
                    placeholder="Email"
                    name="email" 
                    value={userInput.email} 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password" 
                    value={userInput.password} 
                    onChange={handleChange} 
                />
                <br/>

                <button type="submit" className="btn btn-outline-warning btn-sm">
                    Join the Shoppies
                </button>
             
                <p>{successMsg}</p>
                <p>{errorMsg}</p>
                <br/>

                {/* Redirect to Login */}
                <span 
                    className='login-toggle'
                    onClick={() => setShowLoginForm(true)}
                >
                    Already a member? &nbsp;
                    <span className='yellow'>
                        Login here.
                    </span>
                </span>
            </form>
        </div>
    )
}