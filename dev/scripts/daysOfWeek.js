import React from "react";
import DisplayCalories from "./displayCalories.js";

class DaysOfWeek extends React.Component {
    constructor() {
        super();
        this.state = {
            Monday: {
                calories: [],
                sum: 0
            },
            Tuesday: {
                calories: [],
                sum: 0
            },
            Wednesday: {
                calories: [],
                sum: 0
            },
            Thursday: {
                calories: [],
                sum: 0
            },
            Friday: {
                calories: [],
                sum: 0
            },
            Saturday: {
                calories: [],
                sum: 0
            },
            Sunday: {
                calories: [],
                sum: 0
            },
            calories:"",
            day:""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitCalories = this.submitCalories.bind(this);
    }

    handleClick (e) {
        this.setState({
            day: e.target.id
        })
    }

    handleChange (e) {
        this.setState({
            calories:e.target.value
        })
    }

    submitCalories(e) {
        e.preventDefault();
        const userInputDay = this.state.day;
        const userInputDayCalories = this.state[userInputDay].calories
        let dayArray;

        //make copy of the array that was chosen
        for(let property in this.state) {
            if(property === userInputDay) {
                dayArray = Array.from(this.state[userInputDay].calories);
                dayArray.push(this.state.calories);
            }
        }
        
        const Sum = dayArray.reduce((acc,curr) => {
            return acc + curr;
        });

        this.setState ({
            [userInputDay].calories: dayArray
        })

    }

    render () { 
        // console.log(this.state.Monday)
        return (
            <div>
                <div>
                    <div onClick={this.handleClick} id="Monday">
                        <h3 id="Monday">Monday</h3>
                        <ul>

                        </ul>
                    </div>
                    <div onClick={this.handleClick} id="Tuesday">
                        <h3 id="Tuesday">Tuesday</h3>
                        <ul>

                        </ul>
                    </div>
                    <div onClick={this.handleClick} id="Wednesday">
                        <h3 id="Wednesday">Wednesday</h3>
                        <ul>

                        </ul>
                    </div>
                    <div onClick={this.handleClick} id="Thursday">
                        <h3 id="Thursday">Thursday</h3>
                        <ul>

                        </ul>
                    </div>
                    <div onClick={this.handleClick} id="Friday">
                        <h3 id="Friday">Friday</h3>
                        <ul>

                        </ul>
                    </div>
                    <div onClick={this.handleClick} id="Saturday">
                        <h3 id="Saturday">Saturday</h3>
                        <ul>

                        </ul>
                    </div>
                    <div onClick={this.handleClick} id="Sunday">
                        <h3 id="Sunday">Sunday</h3>
                        <ul>

                        </ul>
                    </div>
                </div>
                <form onSubmit={this.submitCalories}>
                    <label htmlFor="calories">Calories</label>
                    <input type="text" id="calories" onChange={this.handleChange} value={this.state.calories}/>

                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

export default DaysOfWeek;