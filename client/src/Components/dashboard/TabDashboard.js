import React, { Component } from 'react'

import './dashboard.css'
import {Hammer,Love,Chat} from '../icons/icons' 
import ProductCard from './ProductCard'
import VideoCard from './videocard'
import Location from './Location'

function TabDashboard() {

        return (
        <div className="dash">
             <div className="hindi">
              <span>{'         '}</span>                    
                   <img className='hindi_logo' src='./logo.jpg' alt='bkisan logo'/>  
                   <span className="hindi_text">{' '}किसान खर्च आधा, उत्पादन ज्यादा।</span>
              <span>{'         '}</span>                    
              </div>

                
              <div className="video_container">
                <div className="vcontainer1">
                 {React.useMemo(()=><VideoCard/>)}
                </div>
                <div className="vcontainer2">
                  {React.useMemo(()=> <Location/>) }              
                 </div>
                </div>              

              <div className= "product_div">
              <h1 style={{"color":"rgba(30, 130, 76, 1)" }}>Our Products</h1>
              <h4 style={{"color":"rgba(0, 177, 106, 1)"}}>These products are organic affordable and help our farmers to make farming a profitable venture.</h4>  
              <div className="product_container">
              <ProductCard  img_src={"./products/PotassiumFluvate.jpg"} img_name={"Potassium Fluvate"}/>
              <ProductCard  img_src={"./products/PotassiumHumate.jpg"} img_name={"Potassium Humate"}/>
              <ProductCard  img_src={"./products/vaysinometa.jpeg"} img_name={"Vaysinometa"}/> 
              <ProductCard  img_src={"./products/reva+.jpg"} img_name={"reva +"}/>
              <ProductCard  img_src={"./products/revaG9.jpg"} img_name={"reva g9"}/>
              </div>
              </div> 

              <div className="oltu_container">
                <span> <Hammer/>{' with '}<Love/>{' by '}<img className="oltu_img" src="./products/oltu.jpg"/></span>{' | '}
                <span>{'reach out : '}<Chat/> <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=oltu.contact@gmail.com" target="_blank">oltu.contact@gmail.com</a></span>
              </div>
               

        </div>
        )

}
export default TabDashboard