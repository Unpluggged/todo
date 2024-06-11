import './Input.css'
const Input = (props) => {
    return(
        <input type={props.type} onChange={(e) => props.func(e)}/>
    )
}

export default Input;



// {
//     "todos": [
//       {
//         "id": "e15f",
//         "title": "543534242",
//         "complete": false
//       }
//     ]
//   }