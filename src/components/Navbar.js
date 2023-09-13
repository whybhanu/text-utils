import React from 'react'
import PropTypes from 'prop-types'

export default function Navbar(props) {
  const handleBtnClick = ()=>{
    props.color("success");
  }
  return (
      <>
      {/* When i use the dollar sign i can use the variable... also when we use javascript we should close the sentence with curly braces */}
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}> 
        <div className="container-fluid">
          <a className="navbar-brand" href="/">{props.title}</a> 
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">{props.aboutText}</a>
              </li>
            
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-primary " type="submit">Search</button>
            </form> */}

            <div className="form-check mx-2">
              <input className="form-check-input" onClick={()=>{props.btnColor("danger")}} type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className={`form-check-label text-${props.mode === "light"? "dark": "light"}`} htmlFor="flexRadioDefault1">Red</label>
            </div>
            <div className="form-check mx-2">
              <input className="form-check-input" onClick={()=>{props.btnColor("success")}} type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
              <label className={`form-check-label text-${props.mode === "light"? "dark": "light"}`} htmlFor="flexRadioDefault2">Green</label>
            </div>
            <div className="form-check mx-2">
              <input className="form-check-input" onClick={()=>{props.btnColor("primary")}} type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
              <label className={`form-check-label text-${props.mode === "light"? "dark": "light"}`} htmlFor="flexRadioDefault3">Blue</label>
            </div>
            <div className="form-check mx-2">
              <input className="form-check-input" onClick={()=>{props.btnColor("warning")}} type="radio" name="flexRadioDefault" id="flexRadioDefault4"/>
              <label className={`form-check-label text-${props.mode === "light"? "dark": "light"}`}htmlFor="flexRadioDefault4">Yellow</label>
            </div>

            <div className="form-check form-switch">
              <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
               {/* if the prop mode is light then change it to dark or else change it to light  */}
              <label className={`form-check-label, text-${props.mode === "light"? "dark": "light"}`} htmlFor="flexSwitchCheckDefault">Dark Mode</label>
            </div>
          </div>
        </div>
      </nav>
      </>
  )
}

Navbar.propTypes = {title: PropTypes.string, aboutText: PropTypes.string};

Navbar.defaultProps = {
    title: "Set Title Here",
    aboutText: "set about"

};