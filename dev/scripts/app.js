import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.js";
import DaysOfWeek from "./daysOfWeek.js"

const config = {
  apiKey: "AIzaSyBul9-cw7kIEXR3mjRZ1sUSxb4mhEf1GiY",
  authDomain: "calorie-counter-45cf1.firebaseapp.com",
  databaseURL: "https://calorie-counter-45cf1.firebaseio.com",
  projectId: "calorie-counter-45cf1",
  storageBucket: "",
  messagingSenderId: "442356233068"
};

firebase.initializeApp(config);

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
        BMR:"",
        loggedIn:false,
        user:{}
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitMetrics = this.submitMetrics.bind(this);
      this.signOut = this.signOut.bind(this);
  } 

  handleChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
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

    const dbRef = firebase.database().ref(this.state.user.uid);

    const personalInfo = {
      name: this.state.name,
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      exercise: this.state.exercise,
      gender: this.state.gender,
      BMR: newBMR
    }

    dbRef.push(personalInfo);

    this.setState({
      weight: "",
      height: "",
      age: "",
      name: "",
      exercise: 1.2
    });

  }

  signIn () {
    console.log("signing in");
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account"
    });

    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        console.log(res);
      });
  }

  signOut () {
    console.log("this is working");
    firebase.auth().signOut();
    this.setState({
      loggedIn:false
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((res) => {
      console.log(res);
      if (res) {
        this.setState({
          loggedIn: true,
          user:res
        })
      } else {
        this.setState({
          loggedIn: false,
          user:{}
        })
      }
    });
    
    const dbRef = firebase.database().ref();

    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const state=[];
      let newBMR;

      for(let key in data) {
        const userKey= data[key];

        for (let item in userKey) {
          newBMR = userKey[item].BMR
        }
      }
      this.setState({
        BMR:newBMR
      })
    })

  }

  render() {
    return(
      <div>
        <Header />
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signOut}>Sign Out</button>
        <form onSubmit={this.submitMetrics} className="personal-info">
          <div className="personal-info-left-grid">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input type="text" id="age" value={this.state.age} onChange={this.handleChange}/>
            </div>
            <div>
              <label htmlFor="weight">Weight</label>
              <input type="text" id="weight" value={this.state.weight} onChange={this.handleChange}/>
            </div>
            <div>
              <label htmlFor="height">Height</label>
              <input type="text" id="height" value={this.state.height} onChange={this.handleChange}/>
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" value={this.state.gender} onChange={this.handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="exercise">Exercise</label>
              <select name="exercise" id="exercise" value={this.state.exercise} onChange={this.handleChange}>
                <option value="1.2">Little to none</option>
                <option value="1.375">Light level of exercise (1-3 days/week)</option>
                <option value="1.55">Moderate level of exercise (3-5 days/week)</option>
                <option value="1.725">Heavy level of exercise (5-7 days/week)</option>
                <option value="1.9">Extreme level of exercise (twice/day)</option>
              </select>
            </div>
            <div>
              <input type="submit" value="Submit"/>
            </div>
          </div>
          {
          this.state.loggedIn === true ?
          <div className="personal-info-right-grid">
            <h2>Hey, {this.state.user.displayName}, your BMR is <span>{this.state.BMR}</span></h2>
            <h2>BMR (Basal Metabolic Rate) is equivalent to the number of calories expended if you coded all day and wanted to maintain your body weight</h2>
          </div>
          :
          null
          }
        </form>
        <DaysOfWeek userid={this.state.user.uid} />
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
