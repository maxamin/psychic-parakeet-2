import background from '/background.png'
import msg from "/Message.svg"
import { useState } from 'react'
import emailjs from '@emailjs/browser';// Import the emailjs-com library
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact(){

const [ContactMessage , SetContactMessage] = useState({
    name: "", 
    email: "",
    message: ""
})

function setForm(e){
    const {name , value}= e.target
    SetContactMessage((preContactMessage)=>{
        return{
            ...preContactMessage ,
            [name] : value
        }
    })
}


function handleSubmit(event){
    event.preventDefault()


    

    // Use the emailjs API to send the email
    emailjs.send('service_szvhi9j', 'template_s9wip8j', ContactMessage , 'vmGCwKud98zeLonhl')
      .then((response) => {
        console.log('Email sent successfully!', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    

      toast.success("Email sent successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000 // Duration for how long the toast will be displayed (in milliseconds)
      });
}

    return(
        <div>

            <div className='About-bg'>
            <img className="background" src={background} />

            <div className="contact-container">

<div className='contact-heading'><div className='contact-h1'>CONTACT</div><div className='contact-h2'>Feel free to Contact me by submitting the form below</div></div>

<form className='form-flex' onSubmit={handleSubmit}>
<div> <input  placeholder="Name" className="name-email" type='text' name="name" value={ContactMessage.name} onChange={setForm}></input></div>
<div> <input placeholder="Email" className="name-email" type='text' name="email" value={ContactMessage.email} onChange={setForm}></input></div>
<div>  <textarea  placeholder="Message" className="message" type='text' name="message" value={ContactMessage.message} onChange={setForm}/></div>
<button className='info-button'>Send</button>

</form>            </div>

          </div>

        </div>
    )
}