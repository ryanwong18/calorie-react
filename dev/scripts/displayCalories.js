import React from "react";

const DisplayCalories = (props) => {
    return (
       <li>
           {props.data}
           <button onClick={(e) => props.remove(e,props.index)}>X</button>
       </li>
    )
}

export default DisplayCalories;