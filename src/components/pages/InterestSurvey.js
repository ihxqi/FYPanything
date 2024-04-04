import React, { useState } from 'react';
import UserSidebarNavbar from "../UserSidebarNavbar";
import './InterestSurvey.css';
import Select from 'react-select'; // Import React-Select
import UserFooter from "../UserFooter";


const tagOptions = [
  { value: 'rings', label: '#rings' },
  { value: 'necklace', label: '#necklace' },
  { value: 'bracelet', label: '#bracelet' }
];

const blogshopOptions = [
  { value: 'bf', label: 'bf blogshop' },
  { value: 'lyla', label: 'dear lyla' },
  { value: 'diem', label: 'carpe diem' }
];




const InterestSurvey = () => {
  const [budget, setBudget] = useState(50);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically gather the form data and send it to a server
    console.log('Form submitted');
  };

  return (
    <div>
      <UserSidebarNavbar />
      <div className="Interestsurvey-header">
        <h2>Interest Survey</h2>
      </div>

      <div className="Interestsurvey-form-container">
        <form className="Interestsurvey-form" onSubmit={handleSubmit}>


          <label for="clothing_style">How would you describe your clothing style? *</label>
          <select id="clothing_style" name="clothing_style">
            <option value="formal">formal</option>
            <option value="classy">classy</option>
            <option value="cute">cute</option>
          </select>

          <br /><br />

          <label for="clothing_interest">What type of clothing are you most interested in? *</label>
          <select id="clothing_interest" name="clothing_interest">
            <option value="dress">dress</option>
            <option value="shorts">shorts</option>
            <option value="pants">pants</option>
          </select>

          <br /><br />

          <label>
            What is your budget for clothing items? *
            <input type="range" name="budget" min="0" max="100" value={budget} onChange={(e) => setBudget(e.target.value)} />
            <span>${budget}</span>
          </label>


          {/* Replace the dropdown for adding tags with React-Select */}
          <label for="itag">Add in your favorite tags:</label>
          <Select id="itag" name="itag" options={tagOptions} isMulti /><br />



          <label for="materials">Do you have any preferences for specific fabrics or materials?</label>
          <select id="materials" name="materials">
            <option value="cotton">cotton</option>
            <option value="wool">wool</option>
            <option value="denim">denim</option>
          </select>

          <br /><br />

          {/* Replace the dropdown for adding tags with React-Select */}
          <label for="itag">Select the blogshop(s) you are interested in:</label>
          <Select id="itag" name="itag" options={blogshopOptions} isMulti /><br />

          <br /><br />

          <button type="submit" className="InterestButton">Submit Survey</button>
        </form>
        <UserFooter />
      </div>
    </div>
  );
}

export default InterestSurvey;