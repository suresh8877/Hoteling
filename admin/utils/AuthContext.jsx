import {  createContext,useReducer,useEffect } from "react"


const INTIAL_STATE={
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading:false,
    error:false
}

export const AuthContext=createContext(INTIAL_STATE);

const AuthReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                loading:true,
                error:false
            }
        case "LOGIN_SUCCEED":
            return{
                user:action.payload,
                loading:false,
                error:false
            }    
        case "LOG_OUT":
            return{
                user:null,
                loading:false,
                error:false
            }     
        default:
            return state;    
    }
}

export const AuthContextProvider=({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INTIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.user))
    }, [state.user])
    

    return(
        <AuthContext.Provider value={{
            user:state.user,
            loading:state.loading,
            error:state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}