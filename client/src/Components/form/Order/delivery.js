import React,{useState,useEffect} from 'react'
// import './delivery.css'
import '../form.css'
import '../order.css'
function Delivery(props) {
    // console.log('rendering delivery')

    const [err,seterr]=useState({
        err_DeliveryDate:{ show:true , message:'' },
        err_DeliveryPlace:{ show:true , message:'' },
    })

    
    function field_is_empty(value)
    {
        if(value === '' || value === null)
        {return true}
        else
        {return false}
    }  
    function validate_form(name,value){
        switch (name) {
            case 'DeliveryDate':if(field_is_empty(value) ){
                seterr((prevState)=>({
                    ...prevState,
                    err_DeliveryDate:{
                    ...prevState.err_DeliveryDate,
                    show:true,
                    message:'Delivery Date cant be blank!'    
                    }
                }))
                }
                    else{
                        seterr((prevState)=>({
                            ...prevState,
                            err_DeliveryDate:{
                            ...prevState.err_DeliveryDate,
                            show:false,
                            message:''    
                            }
                        }))

                }
    break;
    case 'DeliveryPlace':if(field_is_empty(value)){
        seterr((prevState)=>({
            ...prevState,
            err_DeliveryPlace:{
            ...prevState.err_DeliveryPlace,
            show:true,
            message:'Delivery Place cannot be blank!'    
            }
        }))
        }
            else{
                seterr((prevState)=>({
                    ...prevState,
                    err_DeliveryPlace:{
                    ...prevState.err_DeliveryPlace,
                    show:false,
                    message:''    
                    }
                }))
        }
        break;
    
        default:alert('unknown case encountered');
        break;
        }
    }


    function handle_input(e){
        var name = e.target.name
        var value= e.target.value
        validate_form(name, value) 
        // props.ssv({...props.sv, [e.target.name]: e.target.value})
        props.ssv((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }


    useEffect(() => {
        if( 
            !err.err_DeliveryDate.show &&  !err.err_DeliveryPlace.show   )
       {
           console.log('setting show b2 to true')
           props.show(true)
       }
       else{
           props.show(false)
           console.log('setting show b2 to false')
       }

   },[err])

    return (
        <div className = "frame1">
         <table>
        <tr className="del_cont">  
        <div className="del_dat">
        <td>Delivery Date :</td>  
        <td ><input style={{"min-width":"7vw"}} name="DeliveryDate" value={props.sv.DeliveryDate} onChange={handle_input}    type="date"/></td>
        {err.err_DeliveryDate.show ? <td>{err.err_DeliveryDate.message}</td>:''   }
        </div>
        <div className="del_add">
        <td>Delivery Address :</td>  
        <td ><input style={{"min-width":"25vw"}} name="DeliveryPlace" value={props.sv.DeliveryPlace} onChange={handle_input}    placeholder="Delivery Address" type="text"/></td> 
        {err.err_DeliveryPlace.show ? <td>{err.err_DeliveryPlace.message}</td>:''   }
        </div>
        </tr>

         </table>
        </div>
    )
}

export default  React.memo(Delivery)
