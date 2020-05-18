import React, { useState } from 'react';
import  LeadListFilterForm  from "./LeadList/LeadListForm";



const Component1 = (props) => {
  return (
    <React.Fragment>
      <div className='p-grid'>
        <h1>Welcome to Component1</h1>
        <div className='p-col'></div>
        <div className='p-col' style={{backgroundColor:'lightgray'}}>
          <LeadListFilterForm />
        </div>
        <div className='p-col'></div>
      </div>
    </React.Fragment>
  )
}

export default Component1 ;
