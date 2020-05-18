import React, { useState, useCallback } from 'react';
import  LeadListFilterForm  from "./LeadList/LeadListForm";
import Dropzone from './Dropzone' ;
import XLSX from 'xlsx' ;

const Component3 = (props) => {
  const [table,setTable] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var wb = XLSX.read(data, {type: 'array'}); 
      const sheetName = wb.SheetNames[0] ;
      const sheet = wb.Sheets[sheetName] ;
      //Converys sheets into array of row objects;
      const sheetArr = XLSX.utils.sheet_to_json(sheet) ;
      /* output format determined by filename */
      // XLSX.writeFile(wb, 'out.xlsb');
      /* at this point, out.xlsb will have been downloaded */
      setTable(XLSX.utils.sheet_to_html(sheet));
      console.log('sheets Range=',sheet['!ref'],wb['!cols'],wb['!rows']);
      console.log('wb name=',sheet);    
    };
    reader.readAsArrayBuffer(acceptedFiles);
  }, []);
  return (
    <React.Fragment>
      <div className='p-grid'>
        <div className='p-col'></div>
        <div className='p-col'>
        <h1>XLSX Package</h1>
          <br/>
          <br/>
          <br/>
            <Dropzone onDrop={onDrop}/>
            <br/>
            <br/>
             {table}
        </div>
        <div className='p-col'></div>
      </div>
    </React.Fragment>
  )
}

export default Component3 ;
