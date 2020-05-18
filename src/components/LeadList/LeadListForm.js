import React , {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import  {FormGroup,MMInputText,Error,MMSortList}  from "./styles/LeadListFilterForm.styled";
import SortButton from './SortButton';

const LeadListFilterForm = () => {
    const [displayLeadStatus,setdisplayLeadStatus] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      chb1:[],
      sortParameter:''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
//   const LeadStatusOptions = [
//     {'name':'Applied',value:'Applied'},
//     {'name':'LO Approved',value:'LO Approved'},
//     {'name':'MO Approved',value:'MO Approved'},
//     {'name':'Not Applied',value:'Not Applied'}
// ];
const sortOptions =[
    {label:'Select',order:'',value:''},
    {label:'Name',order:'A-Z',value:'name'},
    {label:'Purchase Time',order:'Recent First',value:'purchasetime'},
    {label:'Recent Interaction',order:'Recent First',value:'recentinteraction'},
    {label:'Order Amount',order:'Greater First',value:'orderamount'},
]

  return (
    <form onSubmit={formik.handleSubmit}>
      {JSON.stringify(formik.values)}
      <label htmlFor="firstName">First Name</label><br/>
      <FormGroup>
      <MMInputText
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
        placeholder='First Name'
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <Error>{formik.errors.firstName}</Error>
      ) : null}
      </FormGroup>
      <FormGroup>
      <label htmlFor="lastName">Last Name</label><br/>
      <MMInputText
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        placeholder='Last Name'
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <Error>{formik.errors.lastName}</Error>
      ) : null}
      </FormGroup>
      <FormGroup>
      <label htmlFor="email">Email Address</label><br/>
      <MMInputText
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        placeholder='Email'
      />
      {formik.touched.email && formik.errors.email ? (
        <Error>{formik.errors.email}</Error>
      ) : null}
      </FormGroup>
      <FormGroup>
          <div className='p-grid'>
              <div className='p-col'>
                  <Checkbox 
                  name='chb1' 
                  id='chb1'
                  value='Hot'
                  onChange={formik.handleChange}
                  checked={formik.values.chb1.includes('Hot')}
                  ></Checkbox>
                  <label htmlFor='chb1'><b>Hot</b></label>
              </div>
              <div className='p-col'>
                  <Checkbox 
                  name='chb1' 
                  id='chb1'
                  value='Mild'
                  onChange={formik.handleChange}
                  checked={formik.values.chb1.includes('Mild')}
                  ></Checkbox>
                  <label htmlFor='chb1'><b>Mild</b></label>
              </div>
              <div className='p-col'>
                  <Checkbox 
                  name='chb1'
                  id='chb1'
                  value='Cool'
                  onChange={formik.handleChange}
                  checked={formik.values.chb1.includes('Cool')}
                  ></Checkbox>
                  <label htmlFor='chb1'><b>Cool</b></label>
              </div>
          </div>
      </FormGroup>
      <SortButton/>
      <Button 
      label="Submit" 
      icon="pi pi-check" 
      iconPos="right" 
      className="p-button-primary"
      type='submit'
      />
    </form>
  );
};

export default LeadListFilterForm;