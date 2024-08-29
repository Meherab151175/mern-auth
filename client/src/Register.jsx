import {useState} from 'react'
import axios from 'axios'

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/register", user)
        .then(res=> console.log(res.data))
    }
    
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={(e) => setUser({...user, username: e.target.value})} value={user.username} type="text" placeholder="username" />
        <input name="email" onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} type="email" placeholder="email" />
        <input name="password" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} type="password" placeholder="password" />
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}
