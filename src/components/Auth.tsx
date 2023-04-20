import {useState} from 'react'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
 
   const submitHandler = (e: React.SyntheticEvent) => {
       e.preventDefault()
 
       console.log('username: ', username, " password: ", password)
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type="text"
                   placeholder="username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   />
               <input
                   className='form-input'
                   type="text"
                   placeholder="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   />
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth