import React,{useEffect,useState,useMemo} from 'react'
import {useTable,useGlobalFilter,useSortBy,usePagination } from 'react-table'
import Crudnav from '../crudnav/crudnav'
import  {GlobalFilter} from '../others/GlobalFilter'
// import axios from 'axios'

// import {arrow_up, arrow_down} from '../icons/icons'
// import {format} from 'date-fns'
import './react-table.css'

function ShowOrders() {

const GroupedColumns = [
  {
     Header:"Personal Details",
     columns:[
      {Header:'ORDER NUM', accessor:'OrderNo'}, 
      {Header:'ORDER DATE', accessor:'Date',
      //  Cell:(value)=>{ return format(new Date(value.date),'dd/mm/yyyy')} 
    }, 

      {Header:'NAME', accessor:'Name'}, 
      {Header:'ADHAR', accessor:'AadharNo'}, 
      {Header:'CONTACT', accessor:'Contact'}, 
      {Header:'ADDRESS', accessor:'Address'}, 
      {Header:'TEHSIL', accessor:'Tehsil'}, 
      {Header:'DISTRICT', accessor:'District'}, 
      {Header:'PINCODE', accessor:'PinCode'}, 
      {Header:'STATE', accessor:'State'}, 
      {Header:'WATSAPP', accessor:'Watsapp'}, 
      {Header:'COMPANY', accessor:'CompanyName'}
     ]
  },
  {
    Header:"Order Details",
    columns:[
      {Header:'ORDER TABLE', accessor:'OrderTable',
                Cell: (cell ) => (                  
                  <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ORDER 
                  </button>
                  <div class="dropdown-menu lg" aria-labelledby="dropdownMenuButton">
                  <table className="embedded">
                    <tr>
                      <th>Srlno</th>
                      <th>Details</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                    
                    { cell.row.values.OrderTable.map(function(row,index){return <tr>
                       <td>{index}</td>
                       <td>{row.Order_Details}</td>
                       <td>{row.Order_Quantity}</td>
                       <td>{row.Order_Rate}</td>
                       <td>{row.Order_Amount}</td>                      
                       </tr>})}
                  </table>
                  </div>
                </div>
                )


                },
                {Header:'BILL AMOUNT', accessor:'BillAmt'},  
                {Header:'TRANSPORT CHARGE', accessor:'TransportChrg'}, 
                {Header:'TOTAL AMOUNT', accessor:'TotalAmt'}, 
                {Header:'ADVANCE PAID', accessor:'Advance'}, 
                {Header:'DUE AMOUNT', accessor:'DueAmt'  }, 
                {Header:'DELIVERY DATE', accessor:'DeliveryDate' },  
                {Header:'DELIVERY PLACE', accessor:'DeliveryPlace'}, 
                 {Header:'DEPOSIT TABLE', accessor:'DepositTable',Cell: ({ cell }) => (    

                  <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Deposit
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <table className="embedded">
                    <tr>
                      <th>Srlno</th>
                      <th>Date</th>
                      <th>Bank</th>
                      <th>UTR Number</th>
                      <th>Amount</th>
                    </tr>

                        { cell.row.values.DepositTable.map(function(row,index){return <tr>
                       <td>{index}</td>
                       <td>{row.Deposit_Date}</td>
                       <td>{row.Deposit_Bank}</td>
                       <td>{row.Deposit_UTRNo}</td>
                       <td>{row.Deposit_Amount}</td>                      
                       </tr>})}
                  </table>
                  </div>
                </div>


                )  }
    ]
  },
  {
    Header:"Bank Details",
    columns:[
      {Header:'BANK ACCOUNT', accessor:'Ac'             }, 
                {Header:'ACCOUNT HOLDER', accessor:'AcHolder'     }, 
                {Header:'ACCOUNT NUMBER', accessor:'AcNo'         },  
                {Header:'IFSC CODE', accessor:'IFSC'              },  
                {Header:'DEALER NAME', accessor:'DealerName'      },    
                {Header:'DEALER CONTACT', accessor:'DealerContact'}
    ]
  },
]  

  const [RowData,setRowData] = useState([])


  const fetch_data=async()=>{
    try{
      let ref = await fetch('/order/show')
    ref = await ref.json();
    // console.log(ref);
    setRowData(ref);
    }
    catch(e){
     console.error(e);
    } 
  }
  useMemo(() => {
     fetch_data()   
  }, [])



  const columns = useMemo(()=> GroupedColumns,[]  )
  // const data = useMemo( () => RowData,[] )

  // const columns = GroupedColumns
  const data = RowData


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    state,
    setGlobalFilter, 
    prepareRow,
  } = useTable({
    columns,
    data,
  },
  useGlobalFilter,useSortBy,usePagination)
  const {pageIndex} = state 
  const {globalFilter} = state

  // Render the UI for your table

  return (
    <>
    <Crudnav/>
    <div style={{ "background-color": "wheat"}}>
    <table className="grid_table" {...getTableProps()}>
      <thead className="grid_thead">
        {headerGroups.map(headerGroup => (
          <tr className="grid_tr" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="grid_th" {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' v':' ^'):''}
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr className="grid_tr" {...row.getRowProps()}>
              {row.cells.map((cell ,i) => {
                return <td className="grid_td" {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr> 
          )
        })}
      </tbody>
    </table>  



    <div className="search-bar row" style={{"padding":"5px"}}>
    <div className="col" style={{"padding":"7px"}}>
          <GlobalFilter  filter={globalFilter} setFilter={setGlobalFilter}/>
    </div> 
      <div className="col" style={{"paddingTop":"7px"}}>
        <span>
         {' '}Page{' '}
         <strong>{' '}
           {pageIndex + 1} of {pageOptions.length} 
         </strong>
        </span>
        <span>
        {' '}|{' '}Go to Page :
          <input style={{"min-width":"15vw"}}   type="number" defaultValue={pageIndex+1}
          onChange={e=>{ 
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
          }}
            /> 
        </span>
        </div>
        <div className="col" style={{"paddingTop":"5px"}}>
        <button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        </div>
        <div className="col">
        </div> 
        <div className="col" style={{"paddingTop":"5px"}}>
        <button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ShowOrders
