import React, { useState } from 'react';
import './RegisterUser.css';
import Navbar from "../Navbar";


const RegisterUser = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');



  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Registration data:', {
      name,
      gender,
      dob,
      email,
      password,
      phoneNumber,
      country,
    });
  };

  return (
    <div>
      <Navbar/>
      <div class ="header">
    <h2>User Registration</h2>
    </div>
    <div className='form-main'>
    <div className='form-container'>
      <div className='label-input-container'>
        <span className='label'>Name:</span>
        <input className='input-field' type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div class="gender-selection">
    <div class="gender-label">Gender:</div>
    <div class="gender-radios">
      <label class="gender-radio"> Male
        <input type="radio" name="gender" value="Male" />
        
      </label>
      <label class="gender-radio">Female
        <input type="radio" name="gender" value="Female" />
        
      </label>
    </div>
  </div>

      <div className='label-input-container'>
        <span className='label'>Date of Birth:</span>
        <input className='input-field' type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>

      <div className='label-input-container'>
        <span className='label'>Email:</span>
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
        <span className='label'>Country:</span>
        <select className='input-field' value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value='sg'>Singapore</option>
          
          {/* Add more countries as needed */}
        </select>
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
    </div>
    </div>
  );
};

export default RegisterUser;
