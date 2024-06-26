import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [Username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault()
    axios.get('http://localhost:9000/getUser', { params: { Username, Password } })
        .then((res) => {            
          if(res.data){
            alert('Login Successful')
            localStorage.clear()
            localStorage.setItem('loggedInUser', res.data._id)
            navigate("/Home");
          }
          else
            alert('Wrong Credentials')
          })
      .catch((err) => alert('Error in Login'))
    
}

  return (
    <div className="Login"> 
      <header className='Login-header'>      
      <br/>
      Log In
        <form className='Login-form'>
          <label className='inputs'>
            User ID:  <br/>  <input type = "text" name = "Username" onChange={(e) => setUserName(e.target.value)}/>
          </label>
          <br/>

          <label className='inputs'>
            Password: <br/><input type = "text" name = "Password" onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <br/>
          <br/>
            <button className = 'LoginButton' onClick={(e) => handleLogin(e)}>
              Login
            </button>
        </form>
        <br/>
        <Link className='Signup-link' to="/SignUp"> SignUp</Link>
      </header>
    </div>
  );
}

export default Login;
