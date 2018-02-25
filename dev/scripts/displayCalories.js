import React from "react";

const DisplayCalories = (props) => {
    return (
       <li>
           {props.data}
           <button onClick={() => props.remove(props.index)}>X</button>
       </li>
    )
}

export default DisplayCalories;