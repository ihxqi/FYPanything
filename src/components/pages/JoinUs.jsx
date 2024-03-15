import React, {useEffect, useState} from "react";
import Navbar from "../Navbar";


const JoinUs = () => {  
  //Delete when done
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
  ).then(
    data=> {
      setBackendData(data)
    }
  )
  }, [])
  //Till here
  return (
    <div>
      <Navbar />
      <h1>Join Us!</h1>
    </div>
  );
};

export default JoinUs;
