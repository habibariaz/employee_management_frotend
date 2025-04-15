// import axios from 'axios'
// import React, { createContext, useContext, useEffect, useState } from 'react'

// const userContext = createContext()

// const authContext = ({ children }) => {

//     // const [user, setUser] = useState(null)

//     const [user, setUser] = useState(() => {
//         // Retrieve user from localStorage on initial load
//         const savedUser = localStorage.getItem("user")
//         return savedUser ? JSON.parse(savedUser) : null
//     });

//     const [loading, setLoading] = useState(true)

//     //verifying a user on token base....
//     useEffect(() => {
//         const verifyUser = async () => {
//             try {
//                 //getting token from localstorage
//                 const token = localStorage.getItem("token")
//                 if (token) {
//                     const response = await axios.get("http://localhost:3000/api/auth/verify", {
//                         //token is set to the headers
//                         headers: {
//                             "Authorization": `Bearer ${token}`
//                         }
//                     })
//                     //if token exists then show the user data
//                     if (response.data.success) {
//                         setUser(response.data.user)
//                         localStorage.setItem("user", JSON.stringify(response.data.user))
//                     }
//                     //else set a user to null
//                 } else {
//                     setUser(null)
//                     localStorage.removeItem("user") // Remove user if verification fails
//                     // setLoading(false)
//                 }
//             } catch (error) {
//                 if (error.response && !error.response.data.error) {
//                     setUser(null)
//                 }
//             } finally {
//                 setLoading(false)
//             }
//         }
//         verifyUser()
//     }, [])

//     const login = () => {
//         setUser(user)
//         localStorage.setItem("token", user.token);
//     }

//     const logout = () => {
//         setUser(null)
//         localStorage.removeItem("token")
//         localStorage.removeItem("user")

//     }

//     return (
//         //we pass the values of the user,login,logout ,loading from this that u can access anywhere
//         <userContext.Provider value={{ user, login, logout,loading }}>
//             {children}
//         </userContext.Provider>
//     )
// }

// //by using useAuth we can access all the values of user, login, logout anywhere
// export const useAuth = () => useContext(userContext)

// export default authContext


import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/auth/verify", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (response.data.success) {
                        setUser(response.data.user);
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                    } else {
                        setUser(null);
                        localStorage.removeItem("user");
                    }
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Verification failed:", error);
                setUser(null);
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);

export default AuthProvider;
