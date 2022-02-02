import {createContext, useReducer} from "react"
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    user:{
        "_id":"61d023462897c3a27ccca373",
        "username":"jane",
        "email":"jane@gmail.com",
        "password":"12345678",
        "profilePicture":"person/1.jpeg ",
        "coverPicture":"",
        "followers":["61d0205fe7fecfeea08f2d52"],
        "following":["61d0205fe7fecfeea08f2d52"],
        "isAdmin":false,
    },
    
    isFetching: false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider value={{
            user: state.user, 
            isFetching:state.isFetching, 
            error:state.error,
            dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}