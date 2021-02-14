import React,{useState,useEffect,useRef} from 'react'

import './form.css'
function Bank(props) {

    const InputRef = useRef(null);
    function handle_input(e){
        var name = e.target.name
        var value= e.target.value
        validate_form(name, value) 
        props.ssv({...props.sv, [e.target.name]: e.target.value})
    }

    const [err,seterr]=useState({
        err_Ac:{ show:true , message:'Select atleast One Account' },
        err_AcHolder:{ show:true , message:'' },
        err_AcNo:{ show:true , message:'',message1:'' },
        err_IFSC:{ show:true , message:'',message1:'' },
        err_DealerName:{ show:true , message:'' },
        err_DealerContact:{ show:true , message:'',message1:'' },
    })

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
            case 'Ac':if(field_is_empty(value))
                      {
                          seterr((prevState)=>({
                            ...prevState,
                            err_Ac:{
                            ...prevState.err_Ac,
                            show:true,
                            message:'Deposit Account must be chosen'    
                            }
                          }))
                      }
                      else{
                          seterr((prevState)=>({
                            ...prevState,
                            err_Ac:{
                            ...prevState.err_Ac,
                            show:false    
                            }
                          }))
                      }
                break;
            case 'AcHolder':if(field_is_empty(value))
                      {
                           seterr((prevState)=>({
                               ...prevState,
                               err_AcHolder:{
                               ...prevState.err_AcHolder,
                               show:true,
                               message:'Account holder name must be filled'    
                               }
                           })) 
                      }
                      else{
                          seterr((prevState)=>({
                               ...prevState,
                               err_AcHolder:{
                               ...prevState.err_AcHolder,
                               show:false    
                               }
                           })) 
                      }
                break;
            case 'AcNo':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_AcNo:{
                                ...prevState.err_AcNo,
                                show:true,
                                message:'Account Number cannot be blank'   
                                }
                            })) 
                        }
                        else{
                            seterr((prevState)=>({
                                ...prevState,
                                err_AcNo:{
                                ...prevState.err_AcNo,
                                show:false,
                                message:''    
                                }
                                
                            })) 
                        }
                        if(count_digit(value) >= 9 && count_digit(value) <=18 )
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_AcNo:{
                                ...prevState.err_AcNo,
                                show:false    
                                }
                            }))
                        }
                        else
                        {
                             seterr((prevState)=>({
                                ...prevState,
                                err_AcNo:{
                                ...prevState.err_AcNo,
                                show:true,
                                message1:'| Account Number must be 9 to 18 digits'    
                                }
                            }))
                        }
                break;
            case 'IFSC':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_IFSC:{
                                ...prevState.err_IFSC,
                                show:true,
                                message:'IFSC Code cannot be blank'    
                                }
                            })) 
                        }
                        else{
                            seterr((prevState)=>({
                                ...prevState,
                                err_IFSC:{
                                ...prevState.err_IFSC,
                                show:false,
                                message:''    
                                }
                            })) 
                        }
                        if(value.match('([A-Za-z0]{4})(0\[0-9]{6})$') || value.match('([A-Za-z0]{4})(0\[A-Za-z]{6})$'))     
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_IFSC:{
                                ...prevState.err_IFSC,
                                show:false    
                                }
                            }))
                        } 
                        else{
                             seterr((prevState)=>({
                                ...prevState,
                                err_IFSC:{
                                ...prevState.err_IFSC,
                                show:true,
                                message1:'| IFSC Code not correct'    
                                }
                            }))
                        }
                break;  
            case 'DealerName':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_DealerName:{
                                ...prevState.err_DealerName,
                                show:true,
                                message:'Dealer name cannot be empty'    
                                }    
                            })) 
                        }
                        else{
                            seterr((prevState)=>({
                                ...prevState,
                                err_DealerName:{
                                ...prevState.err_DealerName,
                                show:false    
                                }
                            })) 
                        }
                break;
            case 'DealerContact':if(field_is_empty(value))
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_DealerContact:{
                                ...prevState.err_DealerContact,
                                show:true,
                                message:'Dealer Contact Number cannot be empty'    
                                }
                            })) 
                        }
                        else{
                            seterr((prevState)=>({
                                ...prevState,
                                err_DealerContact:{
                                ...prevState.err_DealerContact,
                                show:false,
                                message:'' 
                                }
                            })) 
                        }
                        if(count_digit(value) === 10)   
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_DealerContact:{
                                ...prevState.err_DealerContact,
                                show:false    
                                }
                            }))
                        }   
                        else
                        {
                            seterr((prevState)=>({
                                ...prevState,
                                err_DealerContact:{
                                ...prevState.err_DealerContact,
                                show:true,
                                message1:'| Dealer Contact Number must have 10 digits '    
                                }
                            }))
                        }  
                break;               
            default:alert('some unknown error happened')
                break;
        }
    }

    useEffect(() => {
      InputRef.current.focus()
    }, [])

    useEffect(() => {
        if( 
            !err.err_Ac.show &&  !err.err_AcHolder.show &&  !err.err_AcNo.show && 
            !err.err_IFSC.show && !err.err_DealerName.show &&  !err.err_DealerContact.show  )
       {
           console.log('setting show c to true')
           props.show(true)
       }
       else{
            console.log('setting show c to false')
            props.show(false)
       }

   },[err])

    return ( 
        <div className="frame">
            <h1>Bank details</h1>             
            {/* <input className="Input"  value={props.sv.Ac} name='Ac'onChange={handle_input} placeholder="Deposit Account" type="text"/> */}
            <label htmlFor="rows"style={{"float":"left","padding-left":"25px"}} ><h2>Deposit Account</h2></label>
             <div className="rows"> 
             <div className="cols">
             <input  type="radio" name="Ac" value="SBI" onChange={handle_input}/>
            <h4>SBI BANK ACCOUNT DETAILS</h4>
            <h5>IFSC: SBIN0030509 <br/> A/c Number: 38279304216</h5>
             </div>
             <div className="cols">
             <input   type="radio" name="Ac" value="HDFC" onChange={handle_input}/>
            <h4 >HDFC BANK ACCOUNT DETAILS</h4>
            <h5>IFSC:HDFC0004042  <br/> A/c Number: 502000377762797</h5>
             </div> 
            </div>

            { err.err_Ac.show ?<div>{err.err_Ac.message}</div>:'' }

            <input ref={InputRef} className="Input"  value={props.sv.AcHolder} name='AcHolder'     onChange={handle_input} placeholder="Account holder" type="text"/>
            { err.err_AcHolder.show ?<div>{err.err_AcHolder.message}</div>:'' }

            <input className="Input"  value={props.sv.AcNo} name='AcNo'         onChange={handle_input} placeholder="Account Number" type="text"/>
            { err.err_AcNo.show ?<div>{err.err_AcNo.message + err.err_AcNo.message1}</div>:'' }

            <input className="Input"  value={props.sv.IFSC} name='IFSC' maxLength="11" onChange={handle_input} placeholder="IFSC Code" type="text"/>
            { err.err_IFSC.show ?<div>{err.err_IFSC.message+ err.err_IFSC.message1}</div>:'' }

            <input className="Input"  value={props.sv.DealerName} name='DealerName'   onChange={handle_input} placeholder="Dealer Name" type="text"/>
            { err.err_DealerName.show ?<div>{err.err_DealerName.message }</div>:'' }

            <input className="Input"  value={props.sv.DealerContact} name='DealerContact'onChange={handle_input} placeholder="Dealer Contact" type="number"/>  
            { err.err_DealerContact.show ?<div>{err.err_DealerContact.message+ err.err_DealerContact.message1 }</div>:'' }
        </div>
    )
}

export default Bank


