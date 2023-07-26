import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import NoteState from './Context/Notes/NoteState';
import './index.css'
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import UserState from './Context/User/UserState';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <UserState>
          <BrowserRouter>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <div className='container'>
              <Routes>
                <Route path="/" element={<Home showAlert={showAlert} />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login showAlert={showAlert} />} />
                <Route path='/signup' element={<Signup showAlert={showAlert} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </UserState>
      </NoteState>
    </>
  );
}

export default App;
