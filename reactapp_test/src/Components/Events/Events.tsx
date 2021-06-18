import React from 'react';
import Backdrop from "../Backdrop/Backdrop";

const Events = () => {
    const [display,setdisplay] = React.useState<string>("none");
    return (
        <div>
            <h1>in events</h1>
            <div style={{width:"max-content",margin:"1rem auto"}}>
                <button onClick={
                    ()=>{
                        setdisplay("block");
                    }
                }>add events</button>
            </div>
            <div onClick={(e:React.MouseEvent)=>{
                e.preventDefault();
                // console.log(e.currentTarget);
                // console.log(e.target);
                if(e.target==e.currentTarget){
                    setdisplay("none");
                }
            }} style={{display,position:"fixed",width:"100vw",height:"100vh",zIndex:999,top:0,
                background:"rgba(10, 10, 10, 0.541)"
            }}>
                <Backdrop />
            </div>
        </div>
    )
}

export default Events
