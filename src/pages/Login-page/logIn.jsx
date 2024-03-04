import './logIn.css';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { LogIn } from '../../ApiService/Auth'
 

export const LogInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleLoginClick = async() => {

    if (username === '' || password === ''){
      alert("Please enter the username or password")
    } else{

      const { jwt, success} = await LogIn({username, password})
  
      if (success){
        localStorage.setItem('jwtKey', jwt)
        navigate('/home')
      } else {
        alert('Error logging in')
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
        <h3>Log In</h3>
        <label htmlFor="username">Username</label>
        <input 
        type="text" 
        placeholder="Username" 
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        placeholder="Password" 
        id="password" 
        onChange={(e) => setPassword(e.target.value)}
        />        
        <button type='button' onClick={() => handleLoginClick()}>Log In</button>
        <div className="No-account">
        <Link to="/"><h1 className='footer-title'>Do not have an account? Make one here!</h1></Link>
        </div>
      </form>
    </div>
  );
};

