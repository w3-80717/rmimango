import React from 'react'
import './Contact.css'
import Button from './Button'

const Contact = () => {
  return (
       <div>
        <p className='container'>Phone no: +91-22-48962640

Email ID: support@blobcity.com

Address: NIBR Corporate Park 1Aerocity, Andheri - Kurla Rd, Safed Pool, Shivaji Nagar, Jarimari, Saki Naka, Mumbai, Maharashtra 400072. 

Headquarters: WeWork, Enam Sambhav, C-20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051.</p>
       <section className='contact'>
      <form>
        <h2>Contact Form</h2>
        <div className='input-box'>
          <label>Name</label>
          <input type="text" className="field" placeholder="Name" required="" />
        </div>

        <div className='input-box'>
          <label>Email</label>
          <input type="text" className="field" placeholder="Email" required="" />
        </div>

        <div className='input-box'>
          <label>Phone Number</label>
          <input type="text" className="field" placeholder="Phone number" required="" />
        </div>

        <div className='input-box'>
          <label>City</label>
          <input type="text" className="field" placeholder="City" required="" />
        </div>

        <div className='input-box'>
          <label>Pincode</label>
          <input type="text" className="field" placeholder="Pincode" required="" />
        </div>

        <div className='input-box'></div>
        <label>State</label>
        <input type="text" className="field" placeholder="State" required="" />

        <div className='input-box'>
          <label>Comment</label>
          <input type="text" className="field" placeholder="Write here comment message" required="" />
        </div>

        <Button type="submit">Send</Button>

      </form>
    </section>
    </div>
  )
}

export default Contact
