import React, {useContext,useState } from 'react'
import {NavLink} from 'react-router-dom'

import {UserContext} from '../../contextapi'

import './NavBar.css'
import {Home,ContactUs,Telephone,Pencil,Email,OrderList} from '../icons/icons'


function TopNavBar()
  {
      const [state,setState] = useContext(UserContext)
      const logout_clicked=()=>{
        setState({show_logout_btn: false})  
        // alert("logout clicked"+ state.show_logout_btn)
    }

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

        return (
            <>
            <nav className="navbar">
              <div className="nav-container">
                <NavLink exact to="/" className="nav-logo">
                <img id='logoimg' src='./LOGO_NEW.jpg' alt='bkisan logo'/> 
                 {'  '}B-Kisan
                </NavLink>
      
                <ul className={click ? "nav-menu active" : "nav-menu"}>

                <li className="nav-item" activeClassName="active">
                  <div class="dropdown">
  <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown"><ContactUs/>{' '}Contact us{' '}
  <span class="caret"></span></button>
  <div class="dropdown-menu" style={{"width":"35vw"}}>
  <li><h4><Email/>{' '}Email : <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=bkisansmartfarming@gmail.com" target="__blank">
    bkisansmartfarming@gmail.com</a></h4></li><hr/>
    <li><h4><Email/>{' '}Email : <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=kisanpathshala@gmail.com" target="__blank">
    kisanpathshala@gmail.com</a></h4></li><hr/>   
  <li><h5>Office Contact :</h5><Telephone/> 9424538222</li><hr/>
  <h5>Other contacts: </h5>
  <ul style={{"list-style-type": "none"}}>
    <li><Telephone/>9754838222{' '}(Madhyapradesh)</li>
    <li><Telephone/>9754038222{' '}(Chattisgarh)</li>
    <li><Telephone/>9754138222{' '}(Uttarpradesh)</li>
    <li><Telephone/>7697438222{' '}(Maharashtra)</li>
    <li><Telephone/>8966838222{' '}(Gujrat)</li>
  </ul>
  </div>
</div>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/dashboard"
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                   <Home/>{' '}Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/form"
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      <Pencil/>{' '}Form
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/orders"
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                        <OrderList/>{' '}Orders
                    </NavLink>
                  </li>

                  <li className="n">
                  {state.show_logout_btn && <button className="btn btn-primary" style={{"margin":"0px 0px 10px 0px"}}  onClick={logout_clicked}>Logout</button>}
                  </li>
                </ul>
                <div className="nav-icon" onClick={handleClick}>
                  <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
              </div>
            </nav>
          </>
            )
        }
    export default TopNavBar