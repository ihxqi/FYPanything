import React, { useState } from 'react';
import './RegisterPartner.css';
import Navbar from '../Navbar';

const RegisterPartner = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [UENNumber, setUENNumber] = useState('');



  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Registration data:', {
      name,
      category,
      dob,
      email,
      password,
      phoneNumber,
      country,
      UENNumber,
    });
  };

  return (
   <div>
    <Navbar />
    <div className="Partnerregistration-container">
  <div className="Partnerheader">
    <h2>Partner Registration</h2>
    </div>
    </div>
  
    <div className='Partnerform-container'>
      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Blogshop Name:</span>
        <input className='Partnerinput-field' type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Date of establishment:</span>
        <input className='Partnerinput-field' type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>

      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Blogshop Email:</span>
        <input className='Partnerinput-field' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>


      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Password:</span>
        <input className='Partnerinput-field' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Phone Number:</span>
        <input className='Partnerinput-field' type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>UEN Number:</span>
        <input className='Partnerinput-field' type='text' value={UENNumber} onChange={(e) => setUENNumber(e.target.value)} />
      </div>

      <div className='lPartnerabel-input-container'>
        <span className='Partnerlabel'>Category:</span>
        <select className='Partnerinput-field' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value='' disabled>Select Category</option>
          <option value='Apparel'>Apparel</option>
          <option value='Food'>Food</option>
          <option value='Electronics'>Accessories</option>
        </select>
      </div><br />

      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Social Links:</span>
        <input className='Partnerinput-field' type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className='Partnerlabel-input-container'>
        <span className='Partnerlabel'>Country:</span>
        <select className='Partnerinput-field' value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value='sg'>Singapore</option>
          
          {/* Add more countries as needed */}
        </select>
      </div>
      <button className="Partnerbutton" onClick={handleRegister}>Register</button>
    </div>
    </div>
  );
};

export default RegisterPartner;
