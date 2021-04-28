import react,{ useState, useEffect} from 'react';
import '../css/Custom.css';
import styled from 'styled-components'
import DataTable from 'react-data-table-component';

import {useLocation,useHistory } from 'react-router-dom';
import $ from 'jquery';
import 'jquery-ui-bundle';
const Button = styled.button`  background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0.5em 1em;
padding: 0.25em 1em;
background: palevioletred;
color: white;`
const customStyles = {

  rows: {
    style: {
      minHeight: '72px',
      border:'1px solid black' // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '4px', // override the cell padding for head cells
      paddingRight: '4px',
      border:'1px solid black',
     backgroundColor:'darkcyan'

    },
  },
  cells: {
    style: {
      paddingLeft: '4px', // override the cell padding for data cells
      paddingRight: '4px',
      border:'1px solid black',
      width:'auto'

    },
  },
};
const Table = props => {

  let history = useHistory();
  const location = useLocation();
  
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < 11; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
        sessionStorage.dataJson=JSON.stringify(list);
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
  }
 
//  if(sessionStorage.CSVData){
//   processData(sessionStorage.CSVData);
  
//  }
const downloadFile = async () => {

  const fileName = "csvdatatoJSon";
  const json = sessionStorage.dataJson ;
  console.log(sessionStorage.dataJson );
  const blob = new Blob([json],{type:'application/json'});
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

useEffect(()=>
{
  processData(sessionStorage.CSVData);
}, []);
 
 const headerssessions=JSON.parse(sessionStorage.headers);
const listItems = headerssessions.map((headerssession) =>
<em key={headerssession.id} className='draggable-head' style={{zIndex:'2'}}>{headerssession.headername}</em>

 );
  
$(".draggable-head").draggable({
helper:function(){
  $('.drag-head').removeClass('drag-head');
  $(this).addClass('drag-head');
  let container= $('<div />').attr('id','draggingContainer');
  $(container).append($(this).clone().removeClass('drag-head'));
  $(container).addClass('draggedContainer');
  return container;
}
});
setTimeout(function(){
 $("[role='columnheader']").parent().droppable({
  drop:function(event, ui) {
  console.log("event :: " + $(event.target), "ui :: " + $(ui.draggable));
  $(event.target).find('[role="columnheader"]').find('div').text($(ui.draggable).text())
  }
  }) }, 300);

    return (
      <div style={{margin:"0 auto 10px",width:'75%'}}>
        
      Headers: 
       
  {listItems}

<div style={{float:'right'}}>
        <Button  onClick={downloadFile}>Download Json</Button>   
        </div>
      {/* <Button  onClick={downloadFile} style={{backgroundColor:'Green'}}>Back</Button> */}
   
<DataTable style={{margin:"0 auto 10px"}}
title="CSV Data(Drag n Drop Table header listed above to customize.)"
        pagination
        highlightOnHover
        columns={columns}
        data={data}
        customStyles={customStyles}

       
       />
      </div> 
      
    )
}
export default Table;