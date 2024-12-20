import logo from './logo.svg';
import './App.css';
import React from "react";
import ListComponent from "./components/ListComponent";
import {Routes, Route} from "react-router-dom"
import AddComponent from "./components/AddComponent";
import {Link} from "react-router";
import HeaderComponent from "./components/HeaderCompoent";
function App() {
  return (
    <div className="App">
     <HeaderComponent/>
     <Routes>
       <Route path={"/list"} element={<ListComponent/>}/>
       <Route path={"/add"} element={<AddComponent/>}/>
     </Routes>
    </div>
  );
}

export default App;
