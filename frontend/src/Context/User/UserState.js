import UserContext from "./UserContext";
import React, {useState} from 'react'

const UserState = (props) => {
    const host = 'http://localhost:3001'
    const [users, setUsers] = useState({})
    let user
    const getUser = async (email, password) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}) 
          });
        const json = await response.json()
        user = json.user
        setUsers(user)
        localStorage.setItem('user', user)
    }

    

  return (
    <UserContext.Provider value={{ users, getUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
