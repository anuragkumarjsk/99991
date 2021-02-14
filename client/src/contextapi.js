import React,{useState} from 'react';

const intitalstate = {
    show_logout_btn:false 
}

export const UserContext = React.createContext()

const Store = ({children}) =>{
    const [state,setState] = useState(intitalstate)
    return (
        <UserContext.Provider value={[state,setState]}>{children}</UserContext.Provider>
    )
}
 
export default Store