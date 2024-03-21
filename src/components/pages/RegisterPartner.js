import React, { useState } from 'react';
import './RegisterPartner.css';
import Navbar from '../Navbar';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');



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
    });
  };

  return (
   <div>
    <Navbar />
    <div class='header'>
      <h2>Partner Registration</h2>
    </div>
  
    <div className='form-container'>
      <div className='label-input-container'>
        <span className='label'>Blogshop Name:</span>
        <input className='input-field' type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='label-input-container'>
        <span className='label'>Date of establishment:</span>
        <input className='input-field' type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>

      <div className='label-input-container'>
        <span className='label'>Blogshop Email:</span>
        <input className='input-field' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>


      <div className='label-input-container'>
        <span className='label'>Password:</span>
        <input className='input-field' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className='label-input-container'>
        <span className='label'>Phone Number:</span>
        <input className='input-field' type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className='label-input-container'>
        <span className='label'>Category:</span>
        <select className='input-field' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value='' disabled>Select Category</option>
          <option value='Apparel'>Apparel</option>
          <option value='Food'>Food</option>
          <option value='Electronics'>Accessories</option>
        </select>
      </div>

      <div className='label-input-container'>
        <span className='label'>Social Links:</span>
        <input className='input-field' type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className='label-input-container'>
        <span className='label'>Country:</span>
        <select className='input-field' value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value='sg'>Singapore</option>
          
          {/* Add more countries as needed */}
        </select>
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
    </div>
  );
};

export default RegisterUser;
