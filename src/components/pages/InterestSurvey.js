import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './InterestSurvey.css';

function InterestSurvey() {
  const [budget, setBudget] = useState(50);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically gather the form data and send it to a server
    console.log('Form submitted');
  };

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      <h2>Interest Survey</h2>

      <label>
        How would you describe your clothing style? *
        <input type="text" name="clothing_style" required />
      </label>

      <label>
        What type of clothing are you most interested in? *
        <input type="text" name="clothing_interest" required />
      </label>

      <label>
        What is your budget for clothing items? *
        <input type="range" name="budget" min="0" max="100" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <span>${budget}</span>
      </label>

      <label>
        Which of the following fashion style best represents your taste? *
        <div>
          <input type="radio" name="style" value="Formal" required /> Formal
          <input type="radio" name="style" value="Casual" /> Casual
        </div>
      </label>

      <label>
        Do you have favorite accessories that you often pair with your outfits?
        <input type="text" name="accessories" />
      </label>

      <label>
        Do you have any preferences for specific fabrics or materials?
        <input type="text" name="materials" />
      </label>

      <label>
        Please type blogshop(s) you are interested in
        <textarea name="blogshops" />
      </label>

      <button type="submit">Submit Survey</button>
    </form>
  );
}

export default InterestSurvey;
