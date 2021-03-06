import React from 'react'
// import reactDOM for a modal
import ReactDOM from 'react-dom'
import history from '../history'

// REMOVE ANYTHING HARDCODED SO THAT THIS MODAL CAN BE USED AS A CUSTOM MODAL

const Modal = props => {
    // to create a portal
    // takes two arguments. the first being the jsx, second argument is the reference to the element(div) that you want to render the portal into
 return ReactDOM.createPortal(
    //  first argument
    //  background aspect of the modal
    // clicking on the background or container div of the modal will close the modal by programmatically directing the user to the main page. you do this by utilizing the onClick eventlistener and then using history.push
    // event propagation or event bubbling will result in unexpected behavior. when you click on a child element and it has a parent with a onClick listener, it will bubble up to the parent element and trigger it. to prevent that you provide a click event to the child element to instruct it to stopPropagation
    // to customize onClick pass in the onclick function from the parent component. That function will allow it to be customized to be directed to any desired page or outcome
    <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
    {/* modal itself */}
    {/* click event stops the  event propagation of clicking on the child and causing it to bubble to the parent */}
    {/* use props  passed to modal component to customize it, the props.action are buttons passed in from parent component */}
    <div onClick={(e)=>e.stopPropagation()}className="ui standard modal visible active">
            <div className="header">{props.title}</div>
            <div className="content">{props.content}</div>
            <div className="actions">
            {props.actions}
            </div>
        </div>
    </div>,
    // 2nd argument
    // manually open index.html and under the root div, create a new div with id as a child of the body element to place the modal into
    // provide a reference to the #modal div in index.html
    document.querySelector('#modal')
 )


}

export default Modal
