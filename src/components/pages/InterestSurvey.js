import React, { useState } from 'react';
import UserNavbar from "../UserNavbar";
import './InterestSurvey.css';
import Select from 'react-select'; // Import React-Select

const tagOptions = [
  { value: 'rings', label: '#rings' },
  { value: 'necklace', label: '#necklace' },
  { value: 'bracelet', label: '#bracelet' }
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
       <UserNavbar />
    <form className="survey-form" onSubmit={handleSubmit}>
      <h2>Interest Survey</h2>

 

      <label for="clothing_style">How would you describe your clothing style? *</label>
    <select id="clothing_style" name="clothing_style">
      <option value="formal">formal</option>
      <option value="classy">classy</option>
      <option value="cute">cute</option>
    </select>


    <label for="clothing_interest">What type of clothing are you most interested in? *</label>
    <select id="clothing_interest" name="clothing_interest">
      <option value="dress">dress</option>
      <option value="shorts">shorts</option>
      <option value="pants">pants</option>
    </select>

      <label>
        What is your budget for clothing items? *
        <input type="range" name="budget" min="0" max="100" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <span>${budget}</span>
      </label>

     {/* Replace the dropdown for adding tags with React-Select */}
      <label for="itag">Add in your favorite tags:</label>
      <Select id="itag" name="itag" options={tagOptions} isMulti /><br/>

    <label for="materials">Do you have any preferences for specific fabrics or materials?</label>
    <select id="materials" name="materials">
      <option value="cotton">cotton</option>
      <option value="wool">wool</option>
      <option value="denim">denim</option>
    </select> 

    <label for="blogshops">Please select the blogshop(s) you are interested in</label>
    <select id="blogshops" name="blogshops">
      <option value="lyla">dearlyla</option>
      <option value="bf">bf blogshop</option>
      <option value="diem">carpe diem</option>
    </select> 

      <button type="submit">Submit Survey</button>
    </form>
    </div>
  );
}

export default InterestSurvey;
