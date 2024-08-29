import {useState} from 'react'
import axios from 'axios'

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/login", user)
        .then(res=> console.log(res.data))
    }
    
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} type="email" placeholder="email" />
        <input name="password" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} type="password" placeholder="password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}
