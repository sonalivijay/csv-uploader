import { render } from '@testing-library/react';
import React from 'react';
import '../css/Custom.css';

export default class HeaderTable extends React.Component{
  
   render(){
       let headers=this.props.mapheaders.length?this.props.mapheaders:[];
   
   const listItems = (headers.map((header) =>
     <div className='emCaps' key={header.id}><span>{header.headername}</span><button style={{float:"right"}} onClick={(id)=>{this.props.onDeleteHeader(header.id)}}>X</button></div>
   ));
   const tableItems = (headers.map((header) =>
   <th key={header.id}>{header.headername}</th>
 ));
return (
<div><table style={{display:'none'}}>
    <thead>
  <tr>
 {tableItems}
  </tr>
 </thead>
</table>
<div>
   {listItems}
</div>
</div>
);
}
}