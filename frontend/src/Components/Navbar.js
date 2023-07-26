import React, {useContext} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import userContext from '../Context/User/UserContext';

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const context = useContext(userContext)
    const { users } = context
    React.useEffect(() => {
    }, [location]);
    const handleLogout = () =>{
        localStorage.removeItem('token')
        navigate('/login')
        props.showAlert("Successfully logged out", 'success')
    }
    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    { !localStorage.getItem('token') ? <Link to="/login" style={{cursor:'pointer'}} className="navbar-brand">iNotebook</Link> : <Link className="navbar-brand" to="/">iNotebook</Link>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            { localStorage.getItem('token') ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li> : ''}
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>

                        </ul>
                        { !localStorage.getItem('token') ? <>
                            
                            <Link className="nav-link link-info mx-2" to="login">Login</Link>
                            <Link className="nav-link link-info mx-2" to="signup">Signup</Link>
                        </> : <> <a style={{textDecoration:'none', cursor:'pointer'}} className=' nav-link link-light mx-3' onClick={handleLogout}>Logout</a> </> }
  
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar