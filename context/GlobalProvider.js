import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    
    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                if (response) {
                    setIsLoggedIn(true);
                    setUser(response);
                }
            })
            .catch((error) => {console.log(error);})
            .finally(() => {setIsloading(false);});
    }, [])

    return (
      <GlobalContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}
      >
        {children}
      </GlobalContext.Provider>  
    );
}

export default GlobalProvider;