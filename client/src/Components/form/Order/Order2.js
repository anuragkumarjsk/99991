import React,{useState,useEffect,useRef} from 'react'
import './../order.css'

function Order(props) {

    const InputRef = useRef(null)

    const [err,seterr]=useState({
        err_Order_Details:{ show:true , message:'' },
        err_Order_Quantity:{ show:true , message:'' },
        err_Order_Rate:{ show:true , message:'' }
    })

    const [Order_Details ,set_Order_Details ]=useState(''); 
    const [Order_Quantity,set_Order_Quantity]=useState(0); 
    const [Order_Rate    ,set_Order_Rate    ]=useState(0); 
    const [Order_Amount  ,set_Order_Amount  ]=useState(0); 
    
    const [TotalAmt    ,set_TotalAmt     ]=useState(0); 
    const [BillAmt     ,set_BillAmt      ]=useState(0);  
    const [TransportChrg,set_TransportChrg]=useState(0);
    const [Advance     ,set_Advance      ]=useState(0);
    const [DueAmt      ,set_DueAmt       ]=useState(0);  

    const [order_count,set_order_count]=useState(0);

    const [is_valid,set_is_valid]=useState('')

    function handlechange(e){
        var name =e.target.name;
        var value=e.target.value;
        validate_form(name , value);
        switch(name){
            case 'Order_Details':set_Order_Details(value) 
                break;
            case 'Order_Quantity':set_Order_Quantity(parseFloat(value)) 
                break;
            case 'Order_Rate':set_Order_Rate(parseFloat(value))
                break;

            case 'TransportChrg':
                                    if(Number.isNaN(value))
                                    {
                                        set_TransportChrg(0)
                                        props.ssv({...props.sv,TransportChrg:Number(0)})
                                    }
                                    else{
                                        set_TransportChrg(value)
                                        props.ssv({...props.sv,TransportChrg:Number(value)})
                                    }
                break;    
            case 'Advance': if(Number.isNaN(value))
                                    {
                                        set_Advance(0)
                                        props.ssv({...props.sv,Advance:Number(0)})
                                    }
                                    else{
                                        set_Advance(value)
                                        props.ssv({...props.sv,Advance:Number(value)})
                                    }
            break;    

            default:alert('unknown case')
        }
        // console.log(e.target.name,e.target.value)
    }
    //.......err code....................
    function field_is_empty(value)
    {
        if(value === '' || value === null || value === 0)
        {return true}
        else
        {return false}
    }  
    function get_table_length()
    {
        return(props.sv.OrderTable.length)
    }
    function validate_form(name, value) 
    {
        switch (name) {
            case 'Order_Details': if(field_is_empty(value) && props.sv.OrderCount===0)
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Details  :{
                                    ...prevState.err_Order_Details ,
                                    show:true ,
                                    message:'order details cant be blank'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Details  :{
                                    ...prevState.err_Order_Details ,
                                    show:false ,
                                    message:''    
                                    }
                                }))
                            }
            break;

        case 'Order_Quantity':if(field_is_empty(value) && props.sv.OrderCount===0)
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Quantity  :{
                                    ...prevState.err_Order_Quantity ,
                                    show:true ,
                                    message:'Quantity cant be blank'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Quantity:{
                                    ...prevState.err_Order_Quantity ,
                                    show:false ,
                                    message:''    
                                    }
                                }))
                            }
            break;

        case 'Order_Rate':if(field_is_empty(value) && props.sv.OrderCount===0)
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Rate  :{
                                    ...prevState.err_Order_Rate ,
                                    show:true ,
                                    message:'Rate cant be blank'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Rate  :{
                                    ...prevState.err_Order_Rate ,
                                    show:false,
                                    message:''    
                                    }
                                }))
                            }
            break;
            case 'TransportChrg':break;
            case 'Advance':break;
            case 'Order_Amount':break;        
            default:alert('unknown case encountered');
            break;
    }
    }



    //...................................

    function add_ordr(e){
        console.log('orc',props.sv.OrderCount)
        e.preventDefault()
        set_order_count (prevval => prevval+1)

        var payload={
            Order_Details :Order_Details ,
            Order_Quantity:Order_Quantity,
            Order_Rate    :Order_Rate    ,
            Order_Amount  :Order_Amount  
        }

        const  temp = [...props.sv.OrderTable,payload]
        // console.log(temp)
        props.ssv({OrderTable:temp})
    }

    function delete_order(e,indx){
        e.preventDefault()
        set_order_count (prevval => prevval-1)
        const temp = [...props.sv.OrderTable]
        temp.splice(indx,1)
        props.ssv({OrderTable:temp})
    }

    useEffect(() => {
       InputRef.current.focus()
    }, [])

    useEffect(() => {
        if(Order_Details ==='' || Order_Quantity === 0 || Order_Rate===0  )
        {
            set_is_valid('')
        }
        else
        {
           set_is_valid('form is valid')
        }  
    }, [Order_Details,Order_Quantity,Order_Rate])   

    useEffect(() => {
       set_Order_Amount(Order_Quantity * Order_Rate);
        }, [Order_Quantity,Order_Rate])


        function table_len(){
            if (get_table_length() >=1 )
            return true
            else
            return false
            }    
        
    useEffect(()=>{
        if(table_len())
        {
            console.log('setting show b1 to true')
            props.show(true)
        }
        else{
            props.show(false)
            console.log('setting show b1 to false')
        }
        // props.ssv({...props.sv,OrderCount:Number(props.sv.OrderTable.length)})

       var temp = 0;
       props.sv.OrderTable.map((k)=>{
        temp = temp + k.Order_Amount ;
       })
       //console.log(temp)
       set_BillAmt(temp)
       props.ssv({...props.sv,BillAmt:temp})

       if( props.sv.OrderTable.length === 0)
       {
        set_TransportChrg(0);
        set_Advance(0);   
        props.ssv({...props.sv,TransportChrg:0})
        props.ssv({...props.sv,Advance:0})
       }
       set_Order_Details('');set_Order_Quantity(0);set_Order_Rate(0);
    },[order_count])    

    useEffect(() => {
        var temp = 0;
        temp = Number(TransportChrg) + BillAmt
        set_TotalAmt(temp)
        props.ssv({...props.sv,TotalAmt:temp})
    }, [BillAmt,TransportChrg])

    useEffect(() => {
        var temp = 0;
        temp = TotalAmt - Advance
        set_DueAmt(temp)
        props.ssv({...props.sv,DueAmt:temp})
    }, [TotalAmt,Advance])



    return (
        <>
                    <h1>Order details</h1>  
        <table >
               <tr className="tablebox">
                    <th className="tablecell" >[+/-]</th>
                    <th className="tablecell">Descrtiption</th>
                    <th className="tablecell">Quantity</th>
                    <th className="tablecell">Rate</th>
                    <th className="tablecell">Amount</th>
                </tr>
                <tr className="tablebox">
                    <td className="tablecell">{}</td>
                    <td className="tablecell">{err.err_Order_Details.show ? err.err_Order_Details.message :''}</td>
                    <td className="tablecell">{err.err_Order_Quantity.show ? err.err_Order_Quantity.message :''}</td>
                    <td className="tablecell">{err.err_Order_Rate.show ? err.err_Order_Rate.message :''}</td>
                    <td className="tablecell">{}</td>
                </tr>
                <tr className="tablebox">
                    <th className="tablecell" ><button onClick={add_ordr} className="btn_add" disabled={!`${is_valid}`}>+</button></th>
                    <th className="tablecell" ><input ref={InputRef} name="Order_Details"  value={Order_Details} onChange={handlechange} placeholder="Desctiption" type="text" className="inp"/></th>
                    <th className="tablecell" ><input name="Order_Quantity" value={Order_Quantity ||0} onChange={handlechange} placeholder="Quantity" type="number" className="inp"/></th>
                    <th className="tablecell" ><input name="Order_Rate"  value={Order_Rate||0} onChange={handlechange} placeholder="Rate" type="number" className="inp"/></th>
                    <th className="tablecell" ><input name="Order_Amount" value={Order_Amount} placeholder="Order Amount" disabled type="number" className="inp"/></th>
                </tr>
                  {     
                    props.sv.OrderTable.map((k,indx)=>{
                       return (<tr className="tablebox" key={"k"+indx}>
                           <td className="tablecell" ><button className="del_btn" onClick={(e)=>delete_order(e,indx)}>delete{' '}{indx+1}</button></td>
                           <td className="tablecell">{k.Order_Details}</td>
                           <td className="tablecell">{k.Order_Quantity}</td>
                           <td className="tablecell">{k.Order_Rate}</td>
                           <td className="tablecell">{k.Order_Amount}</td>   
                       </tr>)
                     })
                  }
                   <tr className="tablebox">
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell">Bill Amount :{''}</td>
                                <td className="tablecell">{BillAmt}</td>
                            </tr>    
                   <tr className="tablebox">
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell">Transport Charges</td>
                                <td className="tablecell">{
                                <input className="inp" name="TransportChrg" value={TransportChrg ||0} onChange={handlechange} placeholder="Transport Charge"  className="inp" type="number"/>
                                }</td>  
                            </tr>      
                   <tr className="tablebox">
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell">Total Amount :{''}</td>
                                <td className="tablecell">{TotalAmt}</td>
                            </tr>         
                    <tr className="tablebox">
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell">Advance</td>
                                <td className="tablecell">{
                                <input className="inp" name= "Advance" value={Advance || 0} onChange={handlechange} placeholder="Advance"  className="inp" type="number"/>
                                }</td>  
                            </tr>   
                    <tr className="tablebox">
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell"></td>
                                <td className="tablecell">Due Amount :{''}</td>
                                <td className="tablecell">{DueAmt}</td>
                            </tr>                   
        </table>
        </>
    )
}

export default Order
