import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "./Components/Button/button";

function App() {
  interface Btype {
    buttontext:string,
    takebuttontext:boolean
  }
  let arr:(Btype)[]=[];
  arr.push({buttontext:"hello",takebuttontext:false});
  arr.push({buttontext:"hii",takebuttontext:true});
  return (
    <div className="App">
      <header className="App-header">
        {
          arr.map((ele:Btype)=>{
            return (
              <Button buttontext={ele.buttontext} takebuttontext={ele.takebuttontext}></Button>
            )
          })
        }
      </header>
    </div>
  );
}

export default App;
