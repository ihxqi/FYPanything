import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUser.css';
import Navbar from "../Navbar";
import GeneralFooter from "../GeneralFooter";


const RegisterUser = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('/registeruser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          gender,
          dob,
          email,
          password,
          phone,
          country,
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        const successMessage = await response.text();
        window.alert(successMessage);
        navigate('/login');
        // Optionally, you can redirect the user to a different page upon successful registration
        // window.location.href = '/successPage'; // Redirect to success page
      } else {
        const errorMessage = await response.text();
        window.alert(errorMessage);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    }
  };


  return (
    <div>
      <Navbar/>
      <div className="Userregistration-container">
  <div className="Userheader">
    <h2>User Registration</h2>
    </div>
    </div>
    <div className='Userform-main'>
    <div className='Userform-container'>
      
      <div className='Userlabel-input-container'>
        <span className='Userlabel'>Name:</span>
        <input className='Userinput-field' type='text' value={name} onChange={(e) => setName(e.target.value)} required/>
      </div>

      <div className='Usergender-selection'>
  <div className='Userlabel'>Gender:</div>
  <select name='gender' className='gender-dropdown' value={gender} onChange={(e) => setGender(e.target.value)} required>
  <option value=''>Select Gender</option>
    <option value='Male'>Male</option>
    <option value='Female'>Female</option>
  </select>
</div><br />

      <div className='Userlabel-input-container'>
        <span className='Userlabel'>Date of Birth:</span>
        <input className='Userinput-field' type='date' value={dob} onChange={(e) => setDob(e.target.value)} required/>
      </div>

      <div className='Userlabel-input-container'>
        <span className='Userlabel'>Email:</span>
        <input className='Userinput-field' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className='Userlabel-input-container'>
        <span className='Userlabel'>Password:</span>
        <input className='Userinput-field' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>

      <div className='Userlabel-input-container'>
        <span className='Userlabel'>Phone Number:</span>
        <input className='Userinput-field' type='text' pattern="\d{8}" value={phone} onChange={(e) => setPhoneNumber(e.target.value)} required/>
      </div>

      <div className='Userlabel-input-container'>
        <span className='Userlabel'>Country:</span>
        <select className='Userinput-field' value={country} onChange={(e) => setCountry(e.target.value)} required>
        <option value=''>Select Country</option>
          <option value='sg'>Singapore</option>
          <option value='my'>Malaysia</option>
          
          {/* Add more countries as needed */}
        </select>
      </div>
      <button className="Userbutton" onClick={handleRegister}>Register</button>
    </div>
    
    </div>
    
    <GeneralFooter />
    </div>
    
  );
};

export default RegisterUser;
