import React, { useState } from 'react';
import LeadListFilterForm from "./LeadList/LeadListForm";
import Component1 from "./Component1";
import Component2 from "./Component2";
import { Button } from 'primereact/button';
import { Redirect , useHistory } from 'react-router-dom';

const Home = (props) => {
  const [displayComponent, setdisplayComponent] = useState('');
  const history = useHistory();
  const handleClick = (event) => {
    const componentName = event.target.name;
    console.log(event);
    if (componentName === 'Component1')
      setdisplayComponent('Component1');
    else if (componentName === 'Component2')
      setdisplayComponent('Component2');
    else if (componentName === 'Component3')
    setdisplayComponent('Component3');
  }
  if (displayComponent !== '')
    {
      const url='/'+displayComponent;
      return <Redirect push to={url}/>
    }
  else
    console.log('i am null');
  return (
    <React.Fragment>
      <div className='p-grid'>
        <div className='p-col'>
          {/* Type1:-USE useHistory() hook to push */}
          <Button primary id='Component1' name='Component1' label='Display Component 1' onClick={()=>history.push('/Component1')} />
          <br />
          <br />
          {/* TYPE1:-USE push prop in Redirect */}
          <Button primary id='Component2' name='Component2' label='Display Component 2' onClick={()=>setdisplayComponent('Component2')} />
          <br/>
          <br />
          <Button primary id='Component3' name='Component3' label='Display Component 3' onClick={()=>setdisplayComponent('Component3')} />
        </div>
        <div className='p-col'>
          <Button label='Click To Go to Login' onClick={()=>setdisplayComponent('login')}/>
        </div>
        <div className='p-col'></div>
      </div>
    </React.Fragment>
  )
}

export default Home;
