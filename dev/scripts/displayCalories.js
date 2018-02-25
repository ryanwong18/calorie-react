import React from "react";

const DisplayCalories = (props) => {
    return (
        <li>
            {props.array}
            {console.log(props.array)}
        </li>
    )
}

export default DisplayCalories;