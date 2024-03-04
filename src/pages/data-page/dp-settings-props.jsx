import { removeJwt } from "../../ApiService/Jwt";
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
    const navigate = useNavigate();

    const logOut = () => {

      if (window.confirm('Are you sure?')) {
        removeJwt();
        navigate('/login', { state: { loggedOut: true } }); 
      
      }
    }

    return (
        <div className="settings-section">
            <div className="logOut" onClick={logOut}>
                Log Out <span className="material-symbols-outlined">logout</span>
            </div>
        </div>
    );
};
