import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Crudnav_Updatebtn(props) {

    const [updated,setupdated]=useState(false)
    const [upform,upformset]=useState({
        OrderNo:'',
        Date:new Date().toLocaleString(),
        Name:'',
        AadharNo:null,
        Address:'',
        Tehsil:'',
        District:'',
        PinCode:null,
        State:'',
        Whatsapp :null,
        Contact:null,
        CompanyName:'',

        OrderTable:[],
        Order_Details:'',
        Order_Quantity:null,
        Order_Rate:null,
        Order_Amount:null,

        TotalAmt:null,
        Advance:null, 
        BillAmt:null,
        TransportChrg:null,
        DueAmt:null,
        DeliveryDate:new Date(0),
        DeliveryPlace:'',

        DepositTable:[],
        Deposit_Date:new Date(0),
        Deposit_Amount:null,
        Deposit_UTRNo:'',
        Deposit_Bank:'',


        Ac:'',
        AcHolder:'',
        AcNo:null,
        IFSC:'',
        DealerName:'',
        DealerContact:null,
    })

    function Set_BillAmt(){
        var result=0
        result = upform.OrderTable.map((i)=>{return result + i.Order_Amount})
        var sum = result.reduce(function(a, b){
            return a + b;
        }, 0);
        upformset( prevState => ({
            ...prevState,
            BillAmt:sum
        }))
    }
    function add_order(event){
        event.preventDefault()    
        var payload = {
                       Order_Details:upform.Order_Details,
                       Order_Quantity:upform.Order_Quantity,
                       Order_Rate:upform.Order_Rate,
                       Order_Amount:upform.Order_Quantity * upform.Order_Rate
                    }
        upform.OrderTable.push(payload)
        Set_BillAmt()

        upformset( prevState => ({
            ...prevState,
           Order_Details:'',Order_Quantity:'',Order_Rate:'',Order_Amount:''
        }))
    }

    function delete_order(e,indx){
        e.preventDefault()
        var data = [...upform.OrderTable];
        data.splice(indx, 1);
        upformset( prevState => ({
            ...prevState,
           OrderTable:data
        }))
        upformset( prevState => ({
            ...prevState,
           BillAmt:upform.BillAmt - upform.OrderTable[indx].Order_Amount 
        }))
    }

    function add_deposit(e){
        e.preventDefault()
        var payload = {
            Deposit_Date:upform.Deposit_Date,
            Deposit_Amount:upform.Deposit_Amount,
            Deposit_UTRNo:upform.Deposit_UTRNo,
            Deposit_Bank:upform.Deposit_Bank
        }
        var dat = [...upform.DepositTable,payload]
        upformset( prevState => ({
            ...prevState,
            DepositTable:dat
        }));
    }
    function delete_deposit(e,indx){
        e.preventDefault()
        var data = [...upform.DepositTable];
        data.splice(indx, 1);
        upformset( prevState => ({
            ...prevState,
            DepositTable:data
        }));
    }

    function  handle_input_change(event){
        const {name , value} = event.target
        upformset( prevState => ({
            ...prevState,
            [name] : value
        }))
    }



    function show_record(e){
        // alert('inside show'+props.Active)
        e.preventDefault()
            switch(props.Active)
                {
                case 1:axios.get(`/order/show/1/${props.contact}`).then((d)=>{console.log(d.data);localStorage.setItem('updateItem',JSON.stringify(d.data));upformset(d.data) }).catch((err)=>{console.log(err)})
                        break
                case 2:axios.get(`/order/show/2/${props.order}`).then((d)=>{console.log(d.data);localStorage.setItem('updateItem',JSON.stringify(d.data));upformset(d.data) }).catch((err)=>{console.log(err)})
                        break                
                case 3:axios.get(`/order/show/3/${props.adhaar}`).then((d)=>{console.log(d.data);localStorage.setItem('updateItem',JSON.stringify(d.data));upformset(d.data) }).catch((err)=>{console.log(err)})
                        break
                default: alert('uable to find the case for show record')
                    break
                    }
    }

    function update_record(e){
        // alert('inside update'+props.adhaar+JSON.stringify(upform))
        e.preventDefault();
        switch(props.Active){
            case 1:axios.put(`/order/update/1/${props.contact}`,upform).then((d)=>{console.log('updated record '+d)}).catch((err)=>{console.log(err)})
                   break
           case 2:axios.put(`/order/update/2/${props.order}`,upform).then((d)=>{console.log('updated record '+d)}).catch((err)=>{console.log(err)})
                   break                
           case 3:axios.put(`/order/update/3/${props.adhaar}`,upform).then((d)=>{console.log('updated record '+d)}).catch((err)=>{console.log(err)})
                   break
           default: alert('update case not available')        
                   }       
                   setupdated(true)
    }

    useEffect(() => {
      document.getElementById('close_modal_button').click()
    }, [updated])

    return (<>
        <button class="btn btn-outline-success my-2 mr-sm-0" type="submit" onClick={show_record} data-toggle="modal" data-target="#update_form"><b>Update</b></button>
       
        <div class="modal" id="update_form">
            <div class=" modal-dialog modal-lg ">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Modal Heading</h4>
                    <button id="close_modal_button" type="button" class="btn btn-danger" data-dismiss="modal" >Close</button>
                </div>
                <div class="modal-body"> 
                     <form>
                    <label htmlFor="dat_"> Date:</label>
                    <input type="date" className="form-control" id="dat_"  name="Date" value={upform.Date} onChange={handle_input_change} />
                    <label htmlFor="uname"> Name:</label>
                    <input type="text" className="form-control" placeholder="Name" id="uname" name="Name"  value={upform.Name} onChange={handle_input_change}/>
                    <label htmlFor="adhno">Adhaar No:</label>
                    <input type="text" className="form-control" placeholder="AadharNo" id="adhno" name="AadharNo"  value={upform.AadharNo} onChange={handle_input_change}/>
                    <label htmlFor="addr">Address:</label>
                    <input type="text" className="form-control" placeholder="Address" id="addr" name="Address" value={upform.Address}  onChange={handle_input_change}/>
                    <label htmlFor="tehsil">Tehsil:</label>
                    <input type="text" className="form-control" placeholder="Tehsil" id="tehsil" name="Tehsil" value={upform.Tehsil}  onChange={handle_input_change}/>
                    <label htmlFor="dist">District:</label>
                    <input type="text" className="form-control" placeholder="District" id="dist" name="District" value={upform.District}  onChange={handle_input_change}/>
                    <label htmlFor="pincode">Pincode:</label>
                    <input type="number" className="form-control" placeholder="Enter Pincode" id="pincode" name="PinCode"value={upform.PinCode}  onChange={handle_input_change}/>
                    <label htmlFor="state">State:</label>
                    <input type="text" className="form-control" placeholder="State" id="state" name="State" value={upform.State}  onChange={handle_input_change}/>
                    <label htmlFor="watsApp">Watsapp:</label>
                    <input type="tel" className="form-control"  id="whatsApp" pattern="[0-9]{10}" placeholder="WhatsApp Number" name="Watsapp" value={upform.Whatsapp}  onChange={handle_input_change}/>                            
                    <label htmlFor="contNum">Contact No:</label>
                    <input type="tel" className="form-control"  id="contNum" pattern="[0-9]{10}" placeholder="Contact Number" name="Contact" value={upform.Contact}  onChange={handle_input_change}/>
                    <label htmlFor="compNam">Company Name:</label>
                    <input type="text" className="form-control" placeholder="Enter Company Name" id="compNam" name="CompanyName" value={upform.CompanyName}  onChange={handle_input_change}/>      

                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">Srl No</th>
                                            <th scope="col ">Details</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ordr_body">
                                        <tr id="ordr_row">
                                            <th scope="col"><tr><button className="btn btn-info" onClick={add_order} ><em>+</em>new </button></tr></th>
                                            <th scope="col"><input type="text" className="form-control" name="Order_Details" placeholder={`Details `}  value={upform.Order_Details } onChange={handle_input_change}   id="det1"  /></th>
                                            <th scope="col"><input type="number" className="form-control" name="Order_Quantity" placeholder={`Quantity`} value={upform.Order_Quantity } onChange={handle_input_change}  id="qt1"/></th>
                                            <th scope="col"><input type="number" className="form-control" name="Order_Rate" placeholder={`Rate `}   value={upform.Order_Rate } onChange={handle_input_change}  id="rt1"/></th>
                                            <th scope="col"><input type="number" className="form-control" name="Order_Amount" placeholder={`Amount `} value={upform.Order_Quantity * upform.Order_Rate } onChange={handle_input_change}  id="at1"/></th>
                                        </tr>
                                        
                                        { upform.OrderTable.map((onearr,idnexval)=>{
                                            return(<tr key={idnexval}>
                                            <td><button className="btn-sm btn-danger"onClick={(e)=>delete_order(e,idnexval)}>delete {idnexval+1}</button></td>
                                            <td>{onearr.Order_Details}</td>
                                            <td>{onearr.Order_Quantity}</td>
                                            <td>{onearr.Order_Rate}</td>
                                            <td>{onearr.Order_Amount}</td>
                                            </tr>)
                                        })
                                        }
                                        </tbody>
                                        </table>



<div className="row" >
<div className="col"></div>
<div className="col"></div>
<div className="col"><h5>Bill Amount:</h5></div>
                                        <div className="col">
                                        <input type="number"  className="form-control" placeholder="Bill Amount" id="bill" value={upform.BillAmt} onChange={handle_input_change}/>
                                        </div>
                                    
</div>
<div className="row" >
<div className="col"></div>
<div className="col"><h6>Transport Charge:</h6></div>
                                        <div className="col">
                                        <input type="number"  className="form-control" id="transport" placeholder="Transport Charge" name="TransportChrg" value={upform.TransportChrg} onChange={handle_input_change}/>
                                        </div>
                                    
<div className="col"></div>
<div className="col"><h6>Total Amount:</h6></div>
                                        <div className="col">
                                        <input type="number" className="form-control" placeholder="Total Amount" id="total" name="TotalAmt" value={ parseFloat(upform.BillAmt) + parseFloat(upform.TransportChrg)} onChange={handle_input_change}/>
                                        </div>                           
</div>

<div className="row" >
<div className="col"></div>
<div className="col"><h6>Advance :</h6></div>
                                        <div className="col">
                                        <input type="number"  className="form-control" placeholder="Advance Payment" id="advPay" name="Advance" value={upform.Advance} onChange={handle_input_change} />
                                        </div>          
<div className="col"></div>
<div className="col"><h6>Due Amount:</h6></div>
                                        <div className="col">
                                        <input type="number"  className="form-control" placeholder="Due Amount" id="dueAmt" name="DueAmt" value={ parseFloat(upform.BillAmt) + parseFloat(upform.TransportChrg)  - parseFloat(upform.Advance) } onChange={handle_input_change}/>
                                        </div>                                                            
</div>



                                    <div className="card">
                                    <label for="delDt" style={{marginLeft:0,borderLeft:0}}>Delivery Date:<input type="date" className="form" id="delDt" name="DeliveryDate" value={upform.DeliveryDate} onChange={handle_input_change}/></label> 
                                    <input type="text" className="form-control" placeholder="Delivery Address" id="deladdr" name="DeliveryPlace" value={upform.DeliveryPlace} onChange={handle_input_change}  />
                                    </div>
        
                                    <table className="table  table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Deposite Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">UTR, IMPS, REF.NO</th>
                                            <th scope="col">Bank Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="col"><button className="btn btn-info" onClick={add_deposit} >+</button></th>
                                            <th scope="col"><input type="date" className="form-control" name="Deposit_Date" value={upform.Deposit_Date} onChange={handle_input_change}  id="depdt1"/></th>
                                            <th scope="col"><input type="number" className="form-control" name="Deposit_Amount" value={upform.Deposit_Amount} onChange={handle_input_change}   id="famt1"/></th>
                                            <th scope="col"><input type="text" className="form-control" name="Deposit_UTRNo" value={upform.Deposit_UTRNo} onChange={handle_input_change}   id="ref1"/></th>
                                            <th scope="col"><input type="text" className="form-control" name="Deposit_Bank" value={upform.Deposit_Bank} onChange={handle_input_change}   id="bank1"/></th>
                                        </tr>
                                        { upform.DepositTable.map((onearr,idnexval)=>{
                                            return(<tr key={idnexval}>
                                            <td><button className="btn-sm btn-danger"onClick={(e)=>delete_deposit(e,idnexval)}>delete {idnexval+1}</button></td>
                                            <td>{onearr.Deposit_Date}</td>
                                            <td>{onearr.Deposit_Amount}</td>
                                            <td>{onearr.Deposit_UTRNo}</td>
                                            <td>{onearr.Deposit_Bank}</td>
                                            </tr>)
                                        })
                                        }

                                        </tbody>
                                    </table>
 



                
                    <label for="acc_nam">Account Name:</label>
        <select className="form-control" name="Ac" id="acc_nam">
                    <option value="HDFC">HDFC</option>
                    <option value="SBI">SBI</option>
                    </select><br/>   
                    <label htmlFor="accName">Account Holder Name:</label>
                    <input type="text" className="form-control" placeholder="A/c Holder Name" id="accName" name="AcHolder" value={upform.AcHolder}   onChange={handle_input_change}/>
                    <label htmlFor="accNo">Account Number:</label>
                    <input type="number" className="form-control" placeholder="A/c Number" id="accNo" name="AcNo" value={upform.AcNo}  onChange={handle_input_change}/>
                    <label htmlFor="ifsc">IFSC:</label>
                    <input type="text" className="form-control" placeholder="IFSC " id="ifsc" name="IFSC" value={upform.IFSC}  onChange={handle_input_change}/>
                    <label htmlFor="dealer">Dealer:</label>
                    <input type="text" className="form-control" placeholder="Dealer Name" id="dealer" name="DealerName" value={upform.DealerName}  onChange={handle_input_change}/>
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="tel" className="form-control"  id="mobile" pattern="[0-9]{10}" placeholder="Mobile Number" name="DealerContact" value={upform.DealerContact} onChange={handle_input_change}/>

                    <button className="btn btn-danger" onClick={update_record}>Re-submit</button>   
                    </form>      
                    <hr/>


                    {/* onClick={()=>{alert(JSON.stringify(upform))}} */}
                    {/* {localStorage.getItem("updateItem")}       */}
                </div>
                </div>
            </div>
            </div>    
         </>
        )
}
