//import { body } from 'express-validator'
import { React, useState, useContext } from 'react'
import userContext from '../Context/User/UserContext'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const context = useContext(userContext)
  const { getUser } = context
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = async (e) => {
    credentials.email = credentials.email.toString();
    credentials.password = credentials.password.toString();
    // console.log(credentials.email, credentials.password)
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    if (json.success) {
      // Get the token and redirect
      localStorage.setItem('token', json.jwtData);
      navigate('/')
      props.showAlert("Logged in successfully", 'success')
      getUser(credentials.email, credentials.password)
    }
    else {
      props.showAlert("Enter Correct Credentials", 'danger')
      setCredentials({ email: "", password: "" })
    }

  }
  return (
    <div className='container'>
      <h2 className='my-2' style={{ textAlign: 'center' }}>
        Login to access your notes
      </h2>
      <form className='my-5' onSubmit={handleSubmit}>
        <div className="mb-3 row mx-auto">
          <label style={{ textAlign: 'right', fontWeight: '600', fontSize: '20px' }} htmlFor="email" className="form-label col-sm-4 ">Email address</label>
          <div className="col-sm-4">
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
          </div>
        </div>

        <div className="mb-3 row mx-auto">
          <label style={{ textAlign: 'right', fontWeight: '600', fontSize: '20px' }} htmlFor="password" className="form-label col-sm-4 ">Password</label>
          <div className="col-sm-4">
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-5'></div>
          <button id='loginBtn' type="submit" className="btn btn-primary col-sm-2" >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login