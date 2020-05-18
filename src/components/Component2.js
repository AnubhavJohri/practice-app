import React, { useState } from 'react';
import LeadListFilterForm from "./LeadList/LeadListForm";
import ReactTooltip from 'react-tooltip';


const Component1 = (props) => {
  const arr=['number 1','number 2']
  return (
    <React.Fragment>
      <div className='p-grid'>
        <h1>Welcome to Component 2</h1>
        <br/><br/><br/>
        <div className='p-col'>
          <span data-tip='tooltip'>{'Hover me'}</span>
          <ReactTooltip className="extraClass" effect="solid" type="dark" place="bottom">
            {arr.map(ele=><><span>{ele}</span><br/></>)}
          </ReactTooltip>
        </div>
        <div className='p-col'></div>
        <div className='p-col'></div>
      </div>
    </React.Fragment>
  )
}

export default Component1;
