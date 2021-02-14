import React,{useEffect,useState,useRef} from 'react'
// import ScriptTag from 'react-script-tag'

import './form.css'

function Personal(props) {

const InputRef = useRef(null)

const [err,seterr]=useState({err_OrderNo:{show:true ,message:''},
                            err_Date:{show:true ,message:''},
                            err_Name:{show:true ,message:''},
                            err_AadharNo:{show:true ,message:'',message1:''},
                            err_Address:{show:true ,message:''},
                            err_Tehsil:{show:true ,message:''},
                            err_District:{show:true ,message:''},
                            err_PinCode:{show:true ,message:'',message1:''},
                            err_State:{show:true ,message:''},
                            err_Watsapp:{show:true ,message:'',message1:''},
                            err_Contact:{show:true ,message:'',message1:''},
                            err_CompanyName:{show:true ,message:''}})

                            function count_digit(n) {
                                var count = 0;
                                if (n >= 1) ++count;
                              
                                while (n / 10 >= 1) {
                                  n /= 10;
                                  ++count;
                                }
                              
                                return count;
                              }                
                                function field_is_empty(value)
                                {
                                    if(value === '' || value === null)
                                    {return true}
                                    else
                                    {return false}
                                }
    function validate_form(name,value){
     switch (name) {
        case 'OrderNo': if(field_is_empty(value))
                        {
                            err.err_OrderNo.show=false
                            err.err_OrderNo.message='this field cannot be empty.'
                        }
                       else
                        {
                            err.err_OrderNo.show=false
                        }  
            break; 
        case 'Date':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Date:{
                                ...prevState.err_Date,
                                show:true,
                                message:'Date field cannot be empty'    
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Date:{
                                ...prevState.err_Date,
                                show:false    
                                }
                            }))
                        }
            break; 
        case 'Name':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Name:{
                                    ...prevState.err_Name,
                                    show:true,
                                    message:'Name field cannot be empty'
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Name:{
                                ...prevState.err_Name,
                                show:false    
                                }
                            }))
                        }
            break; 
        case 'AadharNo':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_AadharNo:{
                                    ...prevState.err_AadharNo,
                                    show:true,
                                    message:'Adhaar Number cannot be blank'
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_AadharNo:{
                                 ...prevState.err_AadharNo,
                                 show:false
                                }
                            }))
                        }
                        if(count_digit(value) === 12)
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_AadharNo:{
                                ...prevState.err_AadharNo,
                                show:false,
                                message1:''    
                                }
                            }))
                        }
                        else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_AadharNo:{
                                ...prevState.err_AadharNo,
                                show:true,
                                message1:'|  Aadhaar Number must be of 12 digits'    
                                }
                            }))
                        }
            break;  
        case 'Address':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Address:{
                                ...prevState.err_Address,
                                show:true,
                                message:'Address field cannot be empty'    
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Address:{
                                ...prevState.err_Address,
                                show:false    
                                }
                            }))
                        }
            break; 
        case 'Tehsil':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                            ...prevState,
                            err_Tehsil:{
                            ...prevState.err_Tehsil,
                            show:true,
                            message:'Tehsil must not be empty'
                            }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                            ...prevState,
                            err_Tehsil:{
                            ...prevState.err_Tehsil,
                            show:false    
                            }
                            }))
                            err.err_Tehsil.show=false
                        }
            break; 
        case 'District':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_District:{
                                ...prevState.err_District,
                                show:true,
                                message:'District field cannot be blank'    
                                }
                            }))
                     
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_District:{
                                ...prevState.err_District,
                                show:false    
                                }
                            }))
                        }
            break; 
        case 'PinCode':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_PinCode:{
                                ...prevState.err_PinCode,
                                show:true,
                                message: 'Pincode cannot be empty'   
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_PinCode:{
                                ...prevState.err_PinCode,
                                show:false    
                                }
                            }))
                        }
                    if(count_digit(value) === 6)
                    {
                        seterr((prevState)=>({
                            ...prevState,
                            err_PinCode:{
                                ...prevState.err_PinCode,
                                show:false  
                                
                            }
                        }))
                    }
                    else
                    {
                        seterr((prevState)=>({
                            ...prevState,
                            err_PinCode:{
                            ...prevState.err_PinCode,
                            show:true,
                            message1:'| Pincode must be 6 digits' 
                            }
                        }))
                    }    
            break;  
        case 'State':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_State:{
                                ...prevState.err_State,
                                show:true,
                                message:'State field cannot be empty'
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_State:{
                                    ...err.err_State,
                                    show:false
                                }
                            }))
                        }
            break; 
        case 'Watsapp':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Watsapp:{
                                ...prevState.err_Watsapp,
                                show:true,
                                message:'Watsapp Number field cannot be empty'    
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_Watsapp:{
                                ...prevState.err_Watsapp,
                                show:false    
                                }
                            }))
                        }
                    if(count_digit(value) === 10 )
                    { 
                        seterr((prevState)=>({
                           ...prevState,
                           err_Watsapp:{
                               ...prevState.err_Watsapp,
                               show:false,
                               message1:''
                           }
                        }))
                    }
                    else
                    {    
                        seterr((prevState)=>({
                            ...prevState,
                            err_Watsapp:{
                                ...prevState.err_Watsapp,
                                show:true,
                                message1:'| Number must be 10 digits'
                            }

                        }))
                     }    
            break;  
        case 'Contact':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                    err_Contact:{
                                ...prevState.err_Contact,
                                    show:true,
                                    message:'Contact field cannot be blank '      
                                }
                            }))
                        }
                    else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                    err_Contact:{
                                     ...prevState.err_Contact,
                                     show:false,
                                     message:''
                                    }
                            }))
                        }
                    if(count_digit(value) === 10 )
                        {   
                            seterr((prevState)=>({
                                ...prevState,
                                err_Contact:{
                                ...prevState.err_Contact,
                                show:false,
                                message1:''    
                                }
                            }))
                            }
                     else
                        {  
                            seterr((prevState)=>({
                                ...prevState,
                                    err_Contact:{
                                        ...prevState.err_Contact,
                                        show:true,
                                        message1:'| Contact number must have 10 digits'
                                    }
                                }
                            ))   
                         }  
            break;  
        case 'CompanyName':if(field_is_empty(value))
                        {

                             seterr((prevState) => ({
                                 ...prevState,
                                 err_CompanyName: {
                                   ...prevState.err_CompanyName,
                                   show: true,
                                   message: "Company Name cannot be empty"}
                                 }
                                 ))

                            // err.err_CompanyName.show=true
                            // err.err_CompanyName.message='this field cannot be empty'
                        }
                    else
                        {
                             seterr((prevState) => ({
                                 ...prevState,
                                 err_CompanyName: {
                                   ...prevState.err_CompanyName,
                                   show: false,
                                   message: ""}
                                 }
                                 ))
                            // err.err_CompanyName.show=false
                        }
            break;
         default: alert('unknown error occured')
             break;
     }
    }


    function handle_change(e){
        var name = e.target.name
        var value= e.target.value
        validate_form(name, value) 
        props.ssv({...props.sv, [e.target.name]: e.target.value})
    }
    
    useEffect(() => {
        InputRef.current.focus()
    }, [])
   
    useEffect(() => {
         if( 
             !err.err_OrderNo.show &&  !err.err_Date.show &&  !err.err_Name.show &&  !err.err_AadharNo.show && 
             !err.err_Address.show &&  !err.err_Tehsil.show && !err.err_District.show &&  !err.err_PinCode.show && 
             !err.err_State.show &&    !err.err_Watsapp.show &&  !err.err_Contact.show &&  !err.err_CompanyName.show )
        {
            console.log('setting show a to true')
            props.show(true)
        }
        else{
            props.show(false)
            console.log('setting show a to false')
        }

    },[err])

    return (
        <div className="frame">
            <h1>Personal details</h1>  
            <input className="Input"  ref={InputRef} name="OrderNo" value={props.sv.OrderNo} onChange={handle_change}   placeholder="Order No" type="text"/>
            { err.err_OrderNo.show ?<div>{err.err_OrderNo.message}</div>:'' }
           
            <input className="Input"  name="Date" value={props.sv.Date} onChange={handle_change}  placeholder="Date" type="date"/>
            { err.err_Date.show ?<div>{err.err_Date.message}</div>:'' }

            <input className="Input"  name="Name" value={props.sv.Name}  onChange={handle_change} placeholder="Name" type="text" />     
            { err.err_Name.show ?<div>{err.err_Name.message}</div>:'' }

            <input className="Input"  name="AadharNo" value={props.sv.AadharNo} maxlength="12"  onChange={handle_change} placeholder="Adhaar No" type="tel"  />
            { err.err_AadharNo.show ?<div>{err.err_AadharNo.message + err.err_AadharNo.message1}</div>:'' }

            <input className="Input"  name="Address" value={props.sv.Address}  onChange={handle_change} placeholder="Address" type="text" />  
            { err.err_Address.show ?<div>{err.err_Address.message}</div>:'' }

            <input className="Input"  name="Tehsil"  value={props.sv.Tehsil}  onChange={handle_change} placeholder="Tehsil" type="text" />  
            { err.err_Tehsil.show ?<div>{err.err_Tehsil.message}</div>:'' }

            <input className="Input"  name="District" value={props.sv.District}  onChange={handle_change} placeholder="District" type="text" /> 
            { err.err_District.show ?<div>{err.err_District.message}</div>:'' }

            <input className="Input"  name="PinCode"  value={props.sv.PinCode}  maxlength="6" onChange={handle_change} placeholder="Pincode" type="tel" /> 
            { err.err_PinCode.show ?<div>{err.err_PinCode.message + err.err_PinCode.message1}</div>:'' }

            <input className="Input"  name="State" value={props.sv.State}  onChange={handle_change} placeholder="State" type="text" />
            { err.err_State.show ?<div>{err.err_State.message}</div>:'' }

            <input className="Input"  name="Watsapp"   value={props.sv.Watsapp}  maxlength="10"  onChange={handle_change} placeholder="Watsapp" type="tel" />
            { err.err_Watsapp.show ?<div>{err.err_Watsapp.message + err.err_Watsapp.message1 }</div>:'' }

            <input className="Input"  name="Contact"   value={props.sv.Contact}  maxlength="10"  onChange={handle_change} placeholder="Contact" type="tel" />
            { err.err_Contact.show ?<div>{err.err_Contact.message + err.err_Contact.message1}</div>:'' }

            <input className="Input"  name="CompanyName"   value={props.sv.CompanyName}  onChange={handle_change} placeholder="Company Name" type="text" />
            { err.err_CompanyName.show ?<div>{err.err_CompanyName.message}</div>:'' }
       
            {/* <input className="Input"  type="submit" onClick={()=>{alert( JSON.stringify(props.sv))}}/> */}
        </div>
    )
}

export default Personal
