import { useState } from 'react';
import './App.css';

function App() {

  // set variable
  const [data,setData] = useState([]);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [numberOfJoke,setNumberOfJoke] = useState(0);

  // fetch data
  async function fetchdata(firstName,lastName) {
    const res = await fetch(`http://api.icndb.com/jokes/?firstName=${firstName}&lastName=${lastName}`);
    const response = await res.json();
    setData(randomMember(response.value,numberOfJoke))
    // console.log('Fetch123')
  }

  // random member selectedArr[] from rawData[]
  const randomMember = (Data,numberOfJoke) => {
    const myArr = Data.sort(() => 0.5-Math.random());
    const selectedArr = myArr.slice(0, numberOfJoke);
    // console.log(selectedArr)
    return selectedArr
  } 
  
  const getJoke = (e) => {
    e.preventDefault();
    fetchdata(firstName,lastName);

    setFirstName('');
    setLastName('');
    // setNumberOfJoke(0)
  }

  return (

    <div className="container">
      <h1>JOKE from Chuck Norris API</h1>
      <form onSubmit={getJoke}>
        <div className="form">
          <label className="text-input">First Name:</label>
          <input type="text" placeholder="first-name" onChange={(e) =>setFirstName(e.target.value)} value={firstName}></input>      
        </div>
        <div className="form">
          <label className="text-input">Last Name:</label>
          <input type="text" placeholder="last-name" onChange={(e) =>setLastName(e.target.value)} value={lastName}></input>      
        </div>
        <div className="form">
          <label className="text-input">Number of Jokes:</label>
          <input type="number" placeholder="number of joke" onChange={(e) =>setNumberOfJoke(e.target.value)} value={numberOfJoke}></input>
        </div>
        <div className="form">
          <button className="btn-submit" type="submit">Get JOKE</button>
        </div>
      </form>
      
      <div className="Jokes"> 
      <ul>
        {data.map(element =>(
          <li key={element.id}>{element.joke}</li>
        ))}
      </ul>
      </div>
      
    </div>
  );
}

export default App;
