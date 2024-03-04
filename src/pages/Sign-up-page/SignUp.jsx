import { useState } from 'react';
import { register } from '../../ApiService/Auth'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import './SignUp.css';


export const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    
  const navigate = useNavigate();

  const handleRegisterClick = async() =>{


    if(username === '' || password === ''){
      alert("Please enter the username or password")
    }else{
    
    const { jwt, success} = await register({username, password})

    if (success){
      localStorage.setItem('jwtKey', jwt)
      navigate('/home')
    } else {
      alert('Error in signing up')
    }
  }
  }


  return (
    <div className='parent-container'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Sign Up</h3>

        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text" 
          placeholder="Username" 
          id="username" />

        
        <label htmlFor="password">Password</label>
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder="Password" 
          id="password" />
        
        <button type='button' onClick={() => handleRegisterClick()}>Sign Up</button>
        <div className="No-account">
        <Link to="/login"><h5 className='footer-title'>Have an account? Click here to login</h5></Link>
        </div>
      </form>
    </div>
  );
};

