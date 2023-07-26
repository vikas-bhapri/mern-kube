import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] })
  }

  const onkeyup = () => {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=cpassword]');
    if (confirm.value === password.value) {
      confirm.setCustomValidity('')
    } else{
      confirm.setCustomValidity('Do not match')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password } = credentials
    name = name.toString()
    email = email.toString()
    password = password.toString()
    console.log(name, email, password)
    const response = await fetch("http://localhost:3001/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // Get the token and redirect
      localStorage.setItem('token', json.jwtData);
      navigate('/')
      props.showAlert("Account created successfully. Login with the same credentials", 'success')
    }
    else {
      props.showAlert("Invalid Details", 'danger')
    }

  }


  return (
    <div className='container'>
      <h2 className='my-2'>
        Sign Up to use iNotebook
      </h2>
      <form className='my-5' autoComplete='off' onSubmit={handleSubmit}>
        <div className="row my-2">
          <label htmlFor="name" className="form-label col-sm-4 credLabel">User Name</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required />
          </div>
        </div>
        <div className="row my-2">
          <label htmlFor="email" className="form-label col-sm-4 credLabel">Email address</label>
          <div className="col-sm-4">
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
          </div>

        </div>
        <div className="row my-2">
          <label htmlFor="password" className="form-label col-sm-4 credLabel">Password</label>
          <div className="col-sm-4">
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} onKeyUp={onkeyup} required minLength={8} />
          </div>
        </div>
        <div className="row my-2">
          <label htmlFor="cpassword" className="form-label col-sm-4 credLabel">Confirm Password</label>
          <div className="col-sm-4">
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} onKeyUp={onkeyup} required minLength={8} />
          </div>
        </div>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        <button type="submit" id='signupBtn' className="btn btn-success my-3">Submit</button>
      </form>
    </div>
  )
}

export default Signup