import React, { useState, useContext, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {

   const [currState, setCurrState] = useState("Login")
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [message, setMessage] = useState(null)

   const { register, login } = useContext(StoreContext)

   useEffect(() => {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e) => { if (e.key === 'Escape') setShowLogin(false) }
      document.addEventListener('keydown', onKey)
      return () => {
         document.body.style.overflow = prev
         document.removeEventListener('keydown', onKey)
      }
   }, [setShowLogin])

   const handleSubmit = (e) => {
      e.preventDefault()
      setMessage(null)
      if (currState === "Sign Up") {
         const res = register({ name: name.trim(), email: email.trim(), password })
         if (res.success) {
            setShowLogin(false)
         } else {
            setMessage(res.message)
         }
      } else {
         const res = login({ email: email.trim(), password })
         if (res.success) {
            setShowLogin(false)
         } else {
            setMessage(res.message)
         }
      }
   }

   const onOverlayClick = (e) => {
      if (e.target === e.currentTarget) setShowLogin(false)
   }

   return (
      <div className='login-popup' onClick={onOverlayClick}>
         <form className='login-popup-container' onSubmit={handleSubmit}>
            <div className="login-popup-title">
               <h2>{currState}</h2>
               <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
            </div>
            <div className="login-popup-input">
               {currState === "Login" ? null : (
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Your name' required />
               )}

               <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your email' required />
               <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required />
            </div>
            <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
            <div className="loging-popup-condition">
               <input type="checkbox" required />
               <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {message ? <div className="login-message">{message}</div> : null}
            {currState === "Login"
               ? <p>Create a new account? <span onClick={() => { setCurrState("Sign Up"); setMessage(null); }}>Click here</span></p>
               : <p>Already have an account? <span onClick={() => { setCurrState("Login"); setMessage(null); }}>Login here</span></p>}


         </form>
      </div>
   )
}

export default LoginPopup