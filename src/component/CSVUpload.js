import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../css/Card.css'

import '../css/Custom.css';
import AddHeader from './AddHeader';

import {BrowserRouter as Router,Redirect,useHistory } from 'react-router-dom';
const CSVUpload=(props)=> {
const[redirect,setRedirect]=useState(false)


  const handleFileUpload = e => {
    const file = e.target.files[0];
    console.log('event',e);
    const reader = new FileReader();
    
    reader.onload = (evt) => {
      
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      
     
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      sessionStorage.CSVData=data;
      setTimeout(setRedirect(true), 300);
      

    

    };
    reader.readAsBinaryString(file);
  }
  if(redirect){
    return <Redirect  to={{
        pathname: "/Table" 
      }} />
  }

  return (
<Router>
<div className="container">
        
          <form>
              <ul>
                  <li>
                      <label ><span>Upload CSV</span></label>
                      <p>Drag n Drop Your File or Select File</p>
    <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      /> </li>
               
                 
              </ul>
              
          </form>
        </div>

 
    </Router>
  );
}

export default CSVUpload;

