import React,{useState,useEffect} from 'react'
import '../form.css'
import '../order.css'
function Deposit(props) {
    const initial_bnk = {
        Deposit_Date:'',
        Deposit_Amount:0,
        Deposit_UTRNo:'',
        Deposit_Bank:''  
    }
const [bnk,setbnk] = useState(initial_bnk)

const [bnk_count,set_bnk_count] = useState(0)
const [del_bnk_count,set_del_bnk_count]=useState(0)

const [is_valid,set_is_valid]=useState('')

    const [err,seterr]=useState({
        err_Deposit_Date  :{ show:true , message:''},
        err_Deposit_Amount :{ show:true , message:''},
        err_Deposit_UTRNo :{ show:true , message:''},
        err_Deposit_Bank:{show:true, message:''}
    })

    function handle_bnk_input(e){
        var name = e.target.name
        var value= e.target.value
        validate_form(name, value) 
        setbnk((prevState)=>({
            ...prevState,
            [name]:value
        })) 
    }

    function add_bnk(e){
        e.preventDefault()
        set_bnk_count(bnk_count+1)
        var payload = {
            Deposit_Date:bnk.Deposit_Date,
            Deposit_Amount:bnk.Deposit_Amount,
            Deposit_UTRNo:bnk.Deposit_UTRNo,
            Deposit_Bank:bnk.Deposit_Bank 
        }
        var f1=async(payload)=>{
           await props.sv.DepositTable.push(payload)
        }
        f1(payload);
        // props.sv.DepositTable.push(payload)
        // alert(JSON.stringify(payload))
        setbnk(initial_bnk)
    }
    function delete_bnk(e,indx){
        e.preventDefault()
        set_del_bnk_count(del_bnk_count+1)
        var data = [...props.sv.DepositTable];
        data.splice(indx, 1);
        props.ssv({DepositTable:data})
    }


    function field_is_empty(value)
{
    if(value === '' || value === null)
    {return true}
    else
    {return false}
}  
    function validate_form(name,value){
    // console.log(name,value)
    switch (name) {
    case 'Deposit_Date':if(field_is_empty(value) && bnk_count === 0){
        seterr((prevState)=>({
            ...prevState,
            err_Deposit_Date:{
            ...prevState.err_Deposit_Date,
            show:true,
            message:'Deposit Date cannot be blank!'    
            }
        }))
        }
            else{
                seterr((prevState)=>({
                    ...prevState,
                    err_Deposit_Date:{
                    ...prevState.err_Deposit_Date,
                    show:false,
                    message:''    
                    }
                }))
        }
break;

case 'Deposit_Amount':if(field_is_empty(value) && bnk_count === 0){
    seterr((prevState)=>({
        ...prevState,
        err_Deposit_Amount:{
        ...prevState.err_Deposit_Amount,
        show:true,
        message:'Deposit Amount cannot be blank!'    
        }
    }))
    }
        else{
            seterr((prevState)=>({
                ...prevState,
                err_Deposit_Amount:{
                ...prevState.err_Deposit_Amount,
                show:false,
                message:''    
                }
            }))
    }
break;

case 'Deposit_UTRNo':if(field_is_empty(value) && bnk_count === 0){
seterr((prevState)=>({
    ...prevState,
    err_Deposit_UTRNo:{
    ...prevState.err_Deposit_UTRNo,
    show:true,
    message:' UTR/IMPS/RTGS/Ref no number  cannot be blank!'    
    }
}))
}
    else{
        seterr((prevState)=>({
            ...prevState,
            err_Deposit_UTRNo:{
            ...prevState.err_Deposit_UTRNo,
            show:false,
            message:''    
            }
        }))
}
break;
case 'Deposit_Bank':if(field_is_empty(value) && bnk_count === 0){
seterr((prevState)=>({
...prevState,
err_Deposit_Bank:{
...prevState.err_Deposit_Bank ,
show:true,
message:' Bank Name cannot be blank!'    
}
}))
}
else{
    seterr((prevState)=>({
        ...prevState,
        err_Deposit_Bank:{
        ...prevState.err_Deposit_Bank,
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

function table_len(){
    var len = props.sv.DepositTable.length;
    if (len >=1 )
    return true
    else
    return false
    }    
useEffect(() => {
    if(table_len())
   {
       console.log('setting show b3 to true')
       props.show(true)
   }
   else{
    console.log('setting show b3 to false')
    props.show(false)   
   }

},[bnk_count,del_bnk_count])

useEffect(() => {
    if( bnk.Deposit_Date === '' || bnk.Deposit_Amount === 0 || bnk.Deposit_UTRNo === '' || bnk.Deposit_Bank === '' )
        {
            set_is_valid('')
        }
        else
        {
           set_is_valid('form is valid')
        }    
}, [bnk])

return (
    <>
                        <h1>Deposit details</h1>  
        <div className = "frame1">           
            <table>
                {/* {JSON.stringify(props.sv.DepositTable)} */}
                <tr className="tablebox">
                    <th className="tablecell"><span>[+/-]</span></th>
                    <th className="tablecell"><span>Deposit Date</span></th>
                    <th className="tablecell"><span>Amount</span></th>
                    <th className="tablecell"><span>UTR/RTGS/IMPS</span></th>
                    <th className="tablecell"><span>Bank Name</span></th>
                </tr>
                <tr className="tablebox">
                    <td className="tablecell">{}</td>
                    <td className="tablecell">{err.err_Deposit_Date.show ?<span>{err.err_Deposit_Date.message}</span>:''}</td>
                    <td className="tablecell">{err.err_Deposit_Amount.show ?<span>{err.err_Deposit_Amount.message}</span>:''} </td>
                    <td className="tablecell">{err.err_Deposit_UTRNo.show ?<span>{err.err_Deposit_UTRNo.message}</span>:''}</td>
                    <td className="tablecell">{err.err_Deposit_Bank.show ?<span>{err.err_Deposit_Bank.message}</span>:''}</td>
                </tr>  
                <tr className="tablebox" id="sdfh">
                    <td className="tablecell">
                        <button className="btn_add" onClick={add_bnk} disabled={!`${is_valid}`}>+</button>
                    </td>
                    <td className="tablecell">
                        <input style={{"min-width":"10vw"}} name="Deposit_Date" value={bnk.Deposit_Date} onChange={handle_bnk_input} placeholder="Deposit Date"  className="in" type="date"/>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_Amount" value={bnk.Deposit_Amount} onChange={handle_bnk_input} placeholder="Deposit Amount"  className="inp" type="number"/>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_UTRNo" value={bnk.Deposit_UTRNo} onChange={handle_bnk_input} placeholder="UTR/IMPS/RTGS/REF No" className="inp" type="text"/>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_Bank" value={ bnk.Deposit_Bank}  onChange={handle_bnk_input} placeholder="Bank Name"  className="inp"  type="text"/>
                    </td>
                </tr>
                {
                     props.sv.DepositTable.map((k,indx)=>{
                       return (<tr className="tablebox" key={"indx"+indx}>
                           <td className="tablecell" ><button className="del_btn" onClick={(e,indx)=>delete_bnk(e,indx)}>delete{' '}{indx+1}</button></td>
                           <td className="tablecell">{k.Deposit_Date}</td>
                           <td className="tablecell">{k.Deposit_Amount}</td>
                           <td className="tablecell">{k.Deposit_UTRNo}</td>
                           <td className="tablecell">{k.Deposit_Bank}</td>
                       </tr>)
                     })
                     }
            </table>    
        </div>
        </>
    )
}

export default  React.memo(Deposit)
