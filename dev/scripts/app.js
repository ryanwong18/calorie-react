import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.js";
import DaysOfWeek from "./daysOfWeek.js"

class Metrics extends React.Component {
  constructor() {
    super();
      this.state = {
        name:"",
        age:"",
        weight:"",
        height:"",
        exercise:1.2,
        gender:"male",
        BMR:""
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitMetrics = this.submitMetrics.bind(this);
  } 

  handleChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  calc () {
    
  }

  submitMetrics (e) {
    e.preventDefault();
    
    //conversion from lbs to kg
    const newWeight = Number(this.state.weight) / 2.2;
  
    //conversion from feet and inches to cm
    const changeHeight = this.state.height.split("'");
    const feetToCm = Number(changeHeight[0]) * 30.48;
    const inchesToCm = Number(changeHeight[1]) * 2.54;
    const newHeight = feetToCm + inchesToCm;  
  
    //calculation of BMR using the Mifflin St Jeor Equation
    let newBMR;
    if(this.state.gender==="male") {
      newBMR = Math.round((10 * newWeight + 6.25 * newHeight - 5 * this.state.age + 5) * this.state.exercise);
    }
    else {
      newBMR = Math.round((10 * this.state.weight + 6.25 * this.state.height - 5 * this.state.age - 161) * this.state.exercise);
    }
  
    //Object for Firebase
    // const metrics = {
    //   name:this.state.name,
    //   height:this.state.height,
    //   weight:this.state.weight,
    //   gender:this.state.gender,
    //   exercise:this.state.exercise,
    //   age:this.state.age,
    //   BMR:this.state.BMR
    // }

    this.setState({
      weight: "",
      height: "",
      age:"",
      name:"",
      BMR:newBMR
    });
  }
  
  render() {
    return(
      <div>
        <Header />
        <form onSubmit={this.submitMetrics}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>

          <label htmlFor="age">Age</label>
          <input type="text" id="age" value={this.state.age} onChange={this.handleChange}/>

          <label htmlFor="weight">Weight (lbs)</label>
          <input type="text" id="weight" value={this.state.weight} onChange={this.handleChange}/>

          <label htmlFor="height">Height(feet and inches)</label>
          <input type="text" id="height" value={this.state.height} onChange={this.handleChange}/>

          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" value={this.state.gender} onChange={this.handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="exercise">Exercise</label>
          <select name="exercise" id="exercise" value={this.state.exercise} onChange={this.handleChange}>
            <option value="1.2">Little to none</option>
            <option value="1.375">Light level of exercise (1-3 days/week)</option>
            <option value="1.55">Moderate level of exercise (3-5 days/week)</option>
            <option value="1.725">Heavy level of exercise (5-7 days/week)</option>
            <option value="1.9">Extreme level of exercise (twice/day)</option>
          </select>
          <input type="submit" value="submit"/>
        </form>
        <div>
          <h2>Your BMR is <span>{this.state.BMR}</span></h2>
          <h2>BMR (Basal Metabolic Rate) would be the equivalent to the number of calories expended if you coded all day and wanted to maintain your body weight</h2>
        </div>
        <DaysOfWeek />
      </div>
    )
  }
}

class App extends React.Component {
    render() {
      return (
        <div>
          <Metrics />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
