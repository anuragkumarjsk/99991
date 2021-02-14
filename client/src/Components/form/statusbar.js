import React,{useEffect, useState} from 'react'
import './statusbar.css'
import {Correct, Incorrect} from './icons'
function Status(props) {
        // var f =[false,false,false,false,false];

        var  [f0,setf0] =useState(false);
        var  [f1,setf1] =useState(false);
        var  [f2,setf2] =useState(false);
        var  [f3,setf3] =useState(false);
        var  [f4,setf4] =useState(false);

        var {
            OrderNo,
            Date,
            Name,
            AadharNo,
            Address,
            Tehsil,
            District,
            PinCode,
            State,
            Watsapp,
            Contact,
            CompanyName,

            OrderTable,
            OrderCount, 
            TotalAmt,
            Advance, 
            BillAmt,
            TransportChrg,
            DueAmt,

            DeliveryDate,
            DeliveryPlace,

            DepositTable,
            DepositCount,
            
            Ac,
            AcHolder,
            AcNo,
            IFSC,
            DealerName,
            DealerContact

        } = {...props.fields}

       function check_validity()
       {
          if(
            Date !=='' &&
            Name !=='' &&
            AadharNo !==null &&
            Address !=='' &&
            Tehsil !=='' &&
            District !=='' &&
            PinCode !==null &&
            State !=='' &&
            Watsapp !==null &&
            Contact !==null &&
            CompanyName !==''
          )
          {
            setf0(true)
          }
          else{
            setf0(false)
          }

          if(OrderTable.length >=1 )
          {
            setf1(true);
          }
          else{
            setf1(false)
          }
          if(
            DeliveryDate !== '' &&
            DeliveryPlace !== ''
          )
          {
            setf2(true) 
          }
          else
          {
            setf2(false)
          }

          if(
            DepositTable.length >=1
          )
          {
            setf3(true) 
          }
          else
          {
            setf3(false)
          }

          if(
            Ac !== '' &&
            AcHolder !== '' &&
            AcNo !== null &&
            IFSC !== '' &&
            DealerName !== '' &&
            DealerContact !== null
            )
          {
            setf4(true) 
          }
          else
          {
            setf4(false)
          }
          
       } 

       useEffect(() => {
        check_validity()  
       },[props])
       return (
        <>
        <div className="table_stats" >
        <span  className={`tr_stats ${f0 ? "back1" :"back2"}`}>Step 1 : {f0 ?  <Correct/>:<Incorrect/>}</span>
        <span  className={`tr_stats ${f1 ? "back1" :"back2"}`}>Step 2 : {f1 ? <Correct/>:<Incorrect/>}</span>
        <span  className={`tr_stats ${f2 ? "back1" :"back2"}`}>Step 3 : {f2 ?  <Correct/>:<Incorrect/>}</span>
        <span  className={`tr_stats ${f3 ? "back1" :"back2"}`}>Step 4 : {f3 ? <Correct/>:<Incorrect/>}</span>
        <span  className={`tr_stats ${f4 ? "back1" :"back2"}`}>Step 5 : {f4 ?  <Correct/>:<Incorrect/>}</span>
        </div>
        </>
    )
}

export default Status
