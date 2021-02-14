import React from 'react'
import {GeoLocation,Link,Linkdin,Facebook,Youtube} from '../icons/icons' 

function Location() {
    return (
        <div>
            <div>
                <span><GeoLocation/>{'  '}village+post - Taloon, district + Barwani(Madhyapradesh), Pin: 451551, India.</span>
                <br/>
                <br/>
                <div className="row" >
                <a className="col" data-toggle="tooltip" title="Find on google maps"  href="https://goo.gl/maps/jRn15qT3nipavgiDA" target="_blank"><GeoLocation/>{'  '}Reva Flora</a> 
                <a className="col" data-toggle="tooltip" title="Find on google maps" href="https://goo.gl/maps/PnUQM1D4Pa9u11AWA" target="_blank"><GeoLocation/>{'  '}B-kisan</a> 
                </div><br/>

                <div className="row" ></div>
                <a className="col" data-toggle="tooltip" title="LinkdIn"  href="https://linkedin.com/in/b-kisan-24a998200" target="_blank"><Linkdin/>{' '}Linkedin</a>
                <a className="col" data-toggle="tooltip" title="Kisanpathshala Website " href="http://www.kisanpathshala.com/" target="_blank"><Link/>{' '}Kisanpathshala</a>        
                <a className="col" data-toggle="tooltip" title="Facebook" href="https://www.facebook.com/B-kisan-378294852890092" target="__blank"><Facebook/>{' '}Facebook</a>        
                <a className="col" data-toggle="tooltip" title="Youtube Channel" href="https://www.youtube.com/channel/UCweQPKBI7cRH-zV70Xwfseg" target="_blank"><Youtube/>{' '}Youtube</a><br/>
            </div>    
        </div>
    )
}

export default Location
