import React from 'react'

 export const GlobalFilter = ({filter,setFilter}) => {
    return (

        <span>
         Search :{' '}
         <input style={{"min-width":"15vw", "text-align":"centre"}}  value={filter || ''} 
         onChange={e=>setFilter(e.target.value)} 
         /> 
        </span>
        )
}

