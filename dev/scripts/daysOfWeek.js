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
        this.remove = this.remove.bind(this);
        this.reset = this.reset.bind(this);
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

    remove(index) {
        const userInputDay = this.state.day;
        const targetDay = Object.assign({}, this.state[userInputDay]);
        let daySum;

        targetDay.calories.splice(index, 1);
        console.log(index);
        console.log(targetDay.calories);
        daySum = targetDay.calories.reduce((acc, curr) => {
            return Number(acc) + Number(curr);
        })
        this.state[userInputDay].sum = daySum;
    }

    submitCalories(e) {
        e.preventDefault();
        const userInputDay = this.state.day;
        const targetDay = Object.assign({}, this.state[userInputDay]);
        let daySum;

        //make copy of the array that was chosen
        for(let property in this.state) {
            if(property === userInputDay) {
                targetDay.calories.push(this.state.calories);
                daySum = targetDay.calories.reduce((acc, curr) => {
                    return Number(acc) + Number(curr);
                })
                this.state[userInputDay].sum = daySum;
            }
        }

        this.setState({
            targetDay,
            calories:""
        })
    }

    reset () {
        this.setState({
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
            calories: "",
            day: ""
        })
    }

    render () { 
        return (
            <div>
                <div className="days-of-week">
                    <div onClick={this.handleClick} id="Monday">
                        <h3 id="Monday">Monday</h3>
                        <ul>
                            {this.state.Monday.calories.map((value,i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove}/>})}
                        </ul>
                        <h4>Total: {this.state.Monday.sum}</h4>
                    </div>
                    <div onClick={this.handleClick} id="Tuesday">
                        <h3 id="Tuesday">Tuesday</h3>
                        <ul>
                            {this.state.Tuesday.calories.map((value, i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove} />
                            })}
                        </ul>
                        <h4>Total: {this.state.Tuesday.sum}</h4>
                    </div>
                    <div onClick={this.handleClick} id="Wednesday">
                        <h3 id="Wednesday">Wednesday</h3>
                        <ul>
                            {this.state.Wednesday.calories.map((value, i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove} />
                            })}
                        </ul>
                        <h4>Total: {this.state.Wednesday.sum}</h4>
                    </div>
                    <div onClick={this.handleClick} id="Thursday">
                        <h3 id="Thursday">Thursday</h3>
                        <ul>
                            {this.state.Thursday.calories.map((value, i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove} />
                            })}
                        </ul>
                        <h4>Total: {this.state.Thursday.sum}</h4>
                    </div>
                    <div onClick={this.handleClick} id="Friday">
                        <h3 id="Friday">Friday</h3>
                        <ul>
                            {this.state.Friday.calories.map((value, i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove} />
                            })}
                        </ul>
                        <h4>Total: {this.state.Friday.sum}</h4>
                    </div>
                    <div onClick={this.handleClick} id="Saturday">
                        <h3 id="Saturday">Saturday</h3>
                        <ul>
                            {this.state.Saturday.calories.map((value, i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove} />
                            })}
                        </ul>
                        <h4>Total: {this.state.Saturday.sum}</h4>
                    </div>
                    <div onClick={this.handleClick} id="Sunday">
                        <h3 id="Sunday">Sunday</h3>
                        <ul>
                            {this.state.Sunday.calories.map((value, i) => {
                                return <DisplayCalories key={i} index={i} data={value} remove={this.remove} />
                            })}
                        </ul>
                        <h4>Total: {this.state.Sunday.sum}</h4>
                    </div>
                </div>
                <div className="calorie-input">
                    <form onSubmit={this.submitCalories}>
                        <label htmlFor="calories">Calories</label>
                        <input type="text" id="calories" onChange={this.handleChange} value={this.state.calories}/>
                    </form>
                    <div className="reset">
                        <button onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DaysOfWeek;