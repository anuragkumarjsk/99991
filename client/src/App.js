import './App.css';
import ContextApi from './contextapi' 
import React,{ Suspense } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import TopNavBar from './Components/topnav/TopNavBar'
import Loading from './Loading'
// import Dashboard from './Components/dashboard/TabDashboard'
// import OrderForm from './Components/topnav/TabForm'
// import ShowOrders from './Components/grid/TabShoworders'

const Dashboard  = React.lazy(()=>import('./Components/dashboard/TabDashboard'))
const OrderForm  = React.lazy(()=>import('./Components/topnav/TabForm'))
const ShowOrders = React.lazy(()=>import('./Components/grid/TabShoworders'))

function App() {
  return (
    <>
    <div className="App">
      <ContextApi>
      <BrowserRouter>
         <TopNavBar/>
         <Suspense fallback={<div><Loading/></div>}>
         <div className="pages">
         <Switch>
         <Route exact path="/" component={Dashboard}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/form" component={OrderForm}></Route>
                <Route path="/orders" component={ShowOrders}></Route>
         </Switch>
         </div>
         </Suspense>
         </BrowserRouter>
      </ContextApi>
    </div>
    </>
  );
}

export default App;
