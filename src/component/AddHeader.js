import react,{useState} from 'react';
import '../css/header.css';
import HeaderTable from './HeaderTable';
import styled from 'styled-components';
import CSVUpload from './CSVUpload';
import {BrowserRouter as Router,Redirect,useHistory } from 'react-router-dom';
const Button = styled.button`  background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0.5em 1em;
padding: 0.25em 1em;
background: palevioletred;
color: white;`
const AddHeader=()=>{
    const[headerinput,setHeaderInput]=useState();
    let arr = [];
    console.log(sessionStorage.headers);
    if(sessionStorage.headers) {
        arr = JSON.parse(sessionStorage.headers);
    }
    console.log("Array :: " + arr);
    const [headers,setHeaders]=useState(arr);
    const addHeader=(event)=>{
        event.preventDefault(event);
        const copy_headers=[...headers];
        copy_headers.push({"id":headers.length,"headername":headerinput});
        setHeaders(copy_headers);
        sessionStorage.headers=JSON.stringify(copy_headers);
        setHeaderInput('');
    }
    const handleInputChange=(event)=>{
        
        let inputvalue=event.target.value;
        setHeaderInput(inputvalue);
       
    }
    const OnDeleteHeaders=(id)=>{
        const copy_headers=[...headers];
        copy_headers.splice(id,1);
        setHeaders(copy_headers?copy_headers:null);
        sessionStorage.headers=JSON.stringify(copy_headers);
    }
 

  function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

const export_table_to_csv=()=> {
    if(headers.length){
	let csv = [];
	let rows = document.querySelectorAll("table tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    // Download CSV
    download_csv(csv.join("\n"), 'csvSample.csv');
}
else{
    return;
}
}

return(
    <div>
    <div className="container">
        
  <Button  onClick={export_table_to_csv}>Download CSV Sample</Button>
    <form>
        <ul>
            <li>
                <label ><span>Header Name <span className="required-star">*</span></span></label>
                <input type="text" id="name" name="user_name" value={headerinput} onChange={(event)=>handleInputChange(event)}/>
            </li>
            <li>
                <input type="submit" value='Add' onClick={(event)=>addHeader(event)} />
                <a href='/Upload' >Click Here To Uplaod File(.csv/.xlsx/.xls)</a>
            </li>
           
        </ul>
        
    </form>
  </div>
  
  <HeaderTable mapheaders={headers} onDeleteHeader={OnDeleteHeaders}/>
  </div>

);
}

export default AddHeader;