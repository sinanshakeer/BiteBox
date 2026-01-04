import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null)

const USERS_KEY = "fd_users";
const CURRENT_USER_KEY = "fd_current_user";

const readUsersFromStorage = () => {
   try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : {};
   } catch (e) {
      return {};
   }
}

const writeUsersToStorage = (users) => {
   localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const StoreContextProvider = (props) => {

   const [cartItems, setCartitems] = useState({});
   const [currentUser, setCurrentUser] = useState(null);
   const [showLogin, setShowLogin] = useState(false);

   useEffect(() => {
      try {
         const raw = localStorage.getItem(CURRENT_USER_KEY);
         if (raw) setCurrentUser(JSON.parse(raw));
      } catch (e) {
         setCurrentUser(null);
      }
   }, [])

   const addToCart = (itemId) => {
      if (!cartItems[itemId]) {
         setCartitems((prev) => ({ ...prev, [itemId]: 1 }))
      }
      else {
         setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
      }
   }

   const removeFromCart = (itemId) => {
      setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
   }

   const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
         if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item)
            totalAmount += itemInfo.price * cartItems[item]
         }

      }
      return totalAmount;
   }

   // Auth: register, login, logout using localStorage
   const register = ({ name, email, password }) => {
      if (!email || !password || !name) return { success: false, message: "Missing fields" };
      const users = readUsersFromStorage();
      const key = email.toLowerCase();
      if (users[key]) return { success: false, message: "User already exists" };
      users[key] = { name, email: key, password };
      writeUsersToStorage(users);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[key]));
      setCurrentUser(users[key]);
      return { success: true, message: "Registered" };
   }

   const login = ({ email, password }) => {
      if (!email || !password) return { success: false, message: "Missing fields" };
      const users = readUsersFromStorage();
      const key = email.toLowerCase();
      const user = users[key];
      if (!user) return { success: false, message: "No user with this email" };
      if (user.password !== password) return { success: false, message: "Incorrect password" };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      setCurrentUser(user);
      return { success: true, message: "Logged in" };
   }

   const logout = () => {
      localStorage.removeItem(CURRENT_USER_KEY);
      setCurrentUser(null);
   }

   const openLogin = () => setShowLogin(true)
   const closeLogin = () => setShowLogin(false)


   const contextValue = {
      food_list,
      cartItems,
      setCartitems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      // auth
      currentUser,
      register,
      login,
      logout
      ,
      // login popup control
      showLogin,
      setShowLogin,
      openLogin,
      closeLogin
   }

   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   )
}

export default StoreContextProvider