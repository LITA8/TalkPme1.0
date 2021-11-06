import { createContext } from "react";
import { useReducer } from 'react';
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
        user:null
}

export const AuthContext = createContext(INITIAL_STATE);


export const AuthContextProvider =({children}) =>{
        const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

        return(
                <AuthContext.Provider
                        value={{
                        user:state.user, 
                        isFeching:state.isFeching, 
                        error:state.error,
                        dispatch,
                        }}>
                        {children}
                </AuthContext.Provider>
        )
}