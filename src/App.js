import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
// import About from './components/About';
import Alert from './components/Alert';
import React, {useState} from 'react'; 

function App() {
  const [mode, setMode] = useState("light")
  const toggleMode = ()=>{
    if (mode === "light"){
      setMode("dark");
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  }

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const [color, setColor] = useState("danger")
  const btnColor = (color) =>{
    setColor(color);
  }

  return (
    <>
      <Navbar btnColor={btnColor} handleBtnClick={btnColor} title = {btnColor} mode = {mode} toggleMode= {toggleMode} aboutText = "About TextUtils"/>
      <Alert alert={alert} type="warning"/>
      <div className="container">
      <TextForm color= {color} showAlert={showAlert} heading = "Enter your text here" mode = {mode}/>
      </div> 
      {/* <About/> */}
    </>
  );
}
export default App;