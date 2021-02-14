import React from 'react'
import axios from 'axios'

export default function crudnav_deletebtn(props) {
    function delete_record(){
        switch(props.Active){
       case 1: axios.delete(`/order/delete/mob/${props.contact}`).then((d)=>{console.log('deleted record '+d)}).catch((err)=>{console.log(err)});
               break
       case 2: axios.delete(`/order/delete/ordr/${props.order}`).then((d)=>{console.log('deleted record '+d)}).catch((err)=>{console.log(err)})
               break                
       case 3: axios.delete(`/order/delete/adhr/${props.adhaar}`).then((d)=>{console.log('deleted record '+d)}).catch((err)=>{console.log(err)})
               break
       default: alert('couldnot find a delete prop')        
               }            
   }
    return (<button class="btn btn-outline-danger my-2 mr-sm-2" type="submit" onClick={delete_record}>
        <b>Delete</b>
        </button>)
}
