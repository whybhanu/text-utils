import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = () => {
        console.log("Button is clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to upper case", "success");
    } 
    const handleClick = () => {
        console.log("Button is clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lower case", "success");
    } 
    
    const handleClearClick = () =>{
      setText("");
    }
    const handleOnChange = (event) =>{ 
        setText(event.target.value);
    }
  const [text, setText] = useState("");
//   text = "This is the wrong way to change the text"
//   setText("This is the right way to change the text");
  
  return (
    <>
    <div className = "container" style={{color : props.mode === "dark"? "white": "#042743"}}>
        <h2 >{props.heading}</h2>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor : props.mode === "dark"? "grey": "white", color: props.mode === "dark"? "white": "#042743"}} id="myBox" rows="8"></textarea>
        </div>
        <button className={`btn btn-${props.color} mx-1`} onClick={handleUpClick}>Convert to UpperCase</button>
        <button className={`btn btn-${props.color} mx-1`} onClick={handleClick}>Convert to LowerCase</button>
        <button className={`btn btn-${props.color} mx-1`} onClick={handleClearClick}>Clear Text</button>
    </div>
    <div className="container my-3" style = {{color: props.mode==="dark"? "white": "#042743"}}>
      <h1>Your text summary</h1>
      <p>{text.split(" ").length} words and {text.length} characters</p>
      <p>Minutes to read this is: {text.split(" ").length*0.008} minutes </p>
      <h2>Preview:</h2>
      <p>{text}</p>
    </div>
    </>
  )
}