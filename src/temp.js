import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Input} from 'reactstrap';
const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required') 
});

export const ValidationSchemaExample = (props) => (
  <div>
    <h1>Signup</h1>
     <Formik
       initialValues={{ name: '' }}
       onSubmit={(values, actions) => {
         console.log(values)
       }}
       validationSchema={SignupSchema}
     >
       {(props) => (
         <form onSubmit={props.handleSubmit}>
           <Input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.name}
             name="name"
           />
           {props.errors.name && <div id="feedback">{props.errors.name}</div>}
           <button type="submit">Submit</button>
         </form>
       )}
     </Formik>
  </div>
);
export default ValidationSchemaExample;