import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import { FormGroup, MMInputText, Error } from "./LeadList/styles/LeadListFilterForm.styled";

const LeadListFilterForm = () => {
    const formik = useFormik({
        initialValues: {
            userName: '',
            pass: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            pass: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required')
        }),
        onSubmit: values => {
            console.log('onSubmit working fine!');
        },
    });

    return (
        <div className='p-grid'>
            <div className='p-col'></div>
            <div className='p-col'>
                <form onSubmit={formik.handleSubmit}>
                    {JSON.stringify(formik.values)}
                    <label htmlFor="userName">User Name</label><br />
                    <FormGroup>
                        <MMInputText
                            id="userName"
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            placeholder='User Name'
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <Error>{formik.errors.userName}</Error>
                        ) : null}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="pass">Password</label><br />
                        <MMInputText
                            id="pass"
                            name="pass"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            placeholder='Password'
                        />
                        {formik.touched.pass && formik.errors.pass ? (
                            <Error>{formik.errors.pass}</Error>
                        ) : null}
                    </FormGroup>
                    <Button
                        label="Submit"
                        icon="pi pi-check"
                        iconPos="right"
                        className="p-button-primary"
                        type='submit'
                    />
                </form>
            </div>
            <div className='p-col'></div>
        </div>
    );
};

export default LeadListFilterForm;