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
    <div className='form-container'>
      <div className='label-input-container'>
        <span className='label'>Name:</span>
        <input className='input-field' type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='label-input-container gender'>
  <span className='label gender'>Gender:</span>
  <div className='radio-group'>
    <label>
      <input type='radio' value='male' checked={gender === 'male'} onChange={() => setGender('male')} />
      Male
    </label>
    <label>
      <input type='radio' value='female' checked={gender === 'female'} onChange={() => setGender('female')} />
      Female
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
          <option value='usa'>USA</option>
          <option value='canada'>Canada</option>
          <option value='uk'>UK</option>
          {/* Add more countries as needed */}
        </select>
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
    </div>
  );
};

export default RegisterUser;
