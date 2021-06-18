import React from 'react';
import "./Main.scss";
import Events from "../Events/Events";
import Bookings from "../Bookings/Bookings";
import {useHistory} from "react-router-dom";

const Main = () => {
    const H = useHistory();
    const arr = [<Events/>,<Bookings/>] as const;
    const [current,setcurrent] = React.useState(0);
    const handleChange = (event:string) => {
        if(event==="logout"){
            localStorage.removeItem("token");
            H.push("/");
        }else if(event==="events"){
            setcurrent(0);
        }else{
            setcurrent(1);
        }
    }
    return (
        <>
            <div className="Main">
                <div style={{width:"max-content",marginLeft:"1rem"}}>
                    Event-Bookings
                </div>
                <div className="innermain" style={{width:"max-content"}}>
                    <div className="childmain" onClick={()=>handleChange("events")}>
                        Events
                    </div>
                    <div className="childmain" onClick={()=>handleChange("bookings")}>
                        Bookings
                    </div>
                    <div className="childmain" onClick={()=>handleChange("logout")}>
                        Logout
                    </div>
                </div>
            </div>
            <div style={{marginTop:"2rem"}}>
                {
                    arr[current]
                }
            </div>
        </>
    )
}

export default Main;
