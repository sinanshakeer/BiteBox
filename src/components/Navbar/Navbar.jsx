import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
   const [menu, setMenu] = useState("home")

   const { getTotalCartAmount, currentUser, logout } = useContext(StoreContext)
   const [userMenuOpen, setUserMenuOpen] = useState(false)
   const [mobileOpen, setMobileOpen] = useState(false)
   const closeMenuTimeoutRef = useRef(null)

   return (
      <div className='navbar'>
         <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
         <ul className="navbar-menu">
            <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile app</a>
            <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
         </ul>
         <div className='navbar-right'>
            {/* <img src={assets.search_icon} alt="" /> */}
            <div className="navbar-search-icon">
               <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
               <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {currentUser ? (
               <div
                  className='navbar-user'
                  onMouseLeave={() => {
                     closeMenuTimeoutRef.current = setTimeout(() => setUserMenuOpen(false), 150);
                  }}
                  onMouseEnter={() => {
                     if (closeMenuTimeoutRef.current) clearTimeout(closeMenuTimeoutRef.current);
                     setUserMenuOpen(true);
                  }}
               >
                  <button className='navbar-username' onClick={() => setUserMenuOpen((s) => !s)}>
                     Hi, {currentUser.name || currentUser.email}
                  </button>
                  {userMenuOpen && (
                     <div className='user-dropdown'>
                        <button className='dropdown-btn' onClick={() => { logout(); setUserMenuOpen(false); }}>Logout</button>
                     </div>
                  )}
               </div>
            ) : (
               <button className='signin-btn' onClick={() => setShowLogin(true)}>sign in</button>
            )}
            <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen((s) => !s)} aria-label="Toggle menu">
               <span></span>
               <span></span>
               <span></span>
            </button>
         </div>
         {/* Mobile menu backdrop */}
         {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}></div>}

         {/* Mobile menu */}
         <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
            <div className="mobile-menu-header">
               {/* <h3>Menu</h3> */}
               <div></div>
               <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <div className="mobile-menu-inner">
               <nav className="mobile-links">
                  <Link to='/' onClick={() => { setMenu('home'); setMobileOpen(false); }}>Home</Link>
                  <a href='#explore-menu' onClick={() => { setMenu('menu'); setMobileOpen(false); }}>Menu</a>
                  <a href='#app-download' onClick={() => { setMenu('mobile-app'); setMobileOpen(false); }}>Mobile app</a>
                  <a href='#footer' onClick={() => { setMenu('contact-us'); setMobileOpen(false); }}>Contact us</a>
               </nav>
               <div className="mobile-divider"></div>
               <div className="mobile-actions">
                  {currentUser ? (
                     <div className="mobile-user">
                        <div className="mobile-username">Hello, {currentUser.name || currentUser.email}</div>
                        <button className='mobile-logout' onClick={() => { logout(); setMobileOpen(false); }}>Logout</button>
                     </div>
                  ) : (
                     <button className='mobile-signin' onClick={() => { setShowLogin(true); setMobileOpen(false); }}>Sign in</button>
                  )}
               </div>
            </div>
         </div>
      </div>

   )
}

export default Navbar