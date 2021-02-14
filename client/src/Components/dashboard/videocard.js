import React,{useState} from 'react'
import {ChevronRight} from '../icons/icons'

import './dashboard.css'
function VideoCard() {
    const id=['2e9viAUvwq4','B6j3nphJwCw','FFkOKY5JLwQ']
    const video_url = 'https://www.youtube.com/embed/';
    var [ind,setind]=useState(0);
    const handleclick=()=>{
        if(ind >= id.length-1)
        {
            setind(0)
        }
        else
        {
            setind(ind+1)
        }
    }
    return (
        < >
        <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"flex-start","margin":"5px 3px 5px 3px"}}>
           <iframe className="iframe" 
            type="text/html"  width="100%" height="360"
            src={`https://youtube.com/embed/${id[ind]}?autoplay=0?controls=1?fs=1`}>
            </iframe>
          < button className="btn btn-outline-info " onClick={handleclick} style={{"height":360, "margin":"5px 0px 5px 5px " }} data-toggle="tooltip" title="Next Video"><ChevronRight /></button>
        </div>
        </>
    )
}

export default  VideoCard