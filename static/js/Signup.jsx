const Signup = () => {
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
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

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
                setSuccessMsg(data.success_msg);
            } else {
                setErrorMsg(data.error_msg);
            }; 
            
            setUserInput({
                fname: '', 
                lname: '',
                email: '', 
                password: ''
            });
        })
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <label>First Name</label>
                <input 
                    type="text" 
                    name="fname" 
                    value={userInput.fname} 
                    onChange={handleChange} 
                />
                <label>Last Name</label>
                <input 
                    type="text" 
                    name="lname" 
                    value={userInput.lname} 
                    onChange={handleChange} 
                />
                <br/>

                <label>Email</label>
                <input 
                    type="text" 
                    name="email" 
                    value={userInput.email} 
                    onChange={handleChange} 
                />
                <label>Password</label>
                <input 
                    type="password" 
                    name="pw" 
                    value={userInput.pw} 
                    onChange={handleChange} 
                />
                <br/>

                <button type="submit">Become a Shoppie Judge</button>
            </form> 
        </div>
    )
}