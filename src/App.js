import React, { useState } from 'react';
import CSVUpload from './component/CSVUpload.js'
import './css/Custom.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Table from './component/Table.js';
import AddHeader from './component/AddHeader';
const App=(props)=> {


  return (
    <div>
      <h3 className="header">CSV Uploader</h3>
      <Router>
     <Route path="/" exact component={AddHeader} />
     <Route path="/Upload" component={CSVUpload} />
     <Route path="/Table" render={(props) => <Table {...props}/>} />
     </Router>
      {/* <DataTable
    
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      /> */}
    </div>
  );
}

export default App;