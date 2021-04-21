import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'
 
//STREAM FORM WILL BE USED BY PARENT COMPONENTS STREAMCREATE AND STREAMEDIT

class StreamForm extends Component {

    //display or hide error message. when clicked into an input field the 'touched property' in the meta object is true, when click out it is false. The function displays the error message when you click in the input and cause the touched property to switch to true and then click out
    // touched means that it was clicked in and clicked out of
    // note: clicking submit will turn touched property to true
    //destructure the 'meta' object to {touched, error}
    renderError = ({touched,error}) =>{
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    // passing in props to allow for a controlled input element with regards to value and onchange 
    //destructure formProps to {input, label}
    renderInput = ({input, label,meta})=>{
        console.log(meta)
        // it is our job to hook up the redux input callback functions to the input element and functions as a jsx property
        // return <input 
        // onChange={formProps.input.onChange}
        // value={formProps.input.onChange}   
        // />
        // this is the spread operator approach to apply all the properties to the input element instead of assigning them one by one
        // destructure ...formProps.input to ...input
        const className = `field ${meta.error&&meta.touched?'error':''}`
        return (
            <div className={className}>
                <label>{label}</label>
              <input {...input} autoComplete='off'/>
              {/* if there is an object returned the reduxform will rerender and it will crossreferece the name property in the fields with the name of a property in the errors object and send that error message to the component property with the function renderinput in Field. that string will be displayed by redux-form under the input field with the meta.error call */}
              
              {/* call renderError to display or hide error message. when clicked into an input field the 'touched property' in the meta object is true, when click out it is false. The function displays the error message when you click in the input and cause the touched property to switch to true */}
              {this.renderError(meta)}
            </div>
        
        )
    }
// onsubmit is callback passed down as a prop from a parent component
     onSubmit = (formValues) =>{
        // reduxform calls preventDefault for you
        // anytime the user submits the form, make sure you call the actioncreator createStream
        // the actioncreator will make an async request to the api to PUT the new stream data with the formvalues passed in from the Field inputs
        this.props.onSubmit(formValues)
        
    }

    render() {
        return (
            // handleSubmit is a callback function in redux-form that is called when a form is submitted. it is passed the function that will handle the submission
            // 'error' classname must be present to prevent semanticui from hiding error messages
           <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
           {/* it can be anything that solicit an input. name is required and that is for the property that it will manage*/}
           {/* field component doesn't know how to show any type of form element. must assign a component prop, it's either a react component or a function for the field to call, needs to return an element that will be displayed as a type of input. In this case renderinput will be passed in and will be returned with an input*/}
           {/* when a prop 'label' is passed in to the field components that is not recognized it is automatically passed into the renderinput function through the default input props that are apart of reduxform */}
           {/* field will look for initialValues passed in from the parent component to see if they match with the name property. if so, the input will be villed with the value that matches. they're essentially initialvalues for the fields */}
               <Field name='title' component={this.renderInput} label='Enter Title'/>
               <Field name='description' component={this.renderInput} label='Enter Description'/>
               <button className='ui button primary'>Submit</button>
           </form>
        )
    }
}
// formvalues has all the values that exist in the form
// this function will validate the formvalues
// validate is called every time the form is initially rendered or if the user interacts with it
// if there is an object returned the reduxform will rerender and it will crossreferece the name property in the fields with the name of a property in the errors object and send that error message to the component property with the function renderinput in Field. that string will be displayed by redux-form under the input field with the meta.error call
const validate = (formValues) =>{
    // if there are no errors redux form will return an empty object. if there is an error we will return an object with the name of the field and the error
    const errors = {}
    if(!formValues.title){
        // only runs if the user does not enter a title
         //added to errors object

        errors.title = 'Enter title please'
    }
    if(!formValues.description){
        // only runs if the user does not enter a description
        //added to errors object
        errors.description = 'Enter description please'
    }
    return errors
}

//hooking up reduxform
export default reduxForm({
    // redux stores form values under a key with the name assigned to the form
    form:'streamForm',
    // passed into the helper function in order to wire it up to reduxform
    // validate: validate
    validate
})(StreamForm)


