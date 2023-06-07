import React, { useEffect, useState } from 'react'
import newAxios from '../components/Axios'

export const authContext = React.createContext()

export const UserContext = ({children}) => {
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await newAxios.get('/users/player', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie}`
              },
              withCredentials: true
            });
            if (response.status === 200) {
              const user = response.data;
              setUserDetails(user);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchUser();
      }, []);
    
    
  return (
    <authContext.Provider value={{ setUserDetails, userDetails }}>
        {children}
    </authContext.Provider>
  )
}
