import React from 'react';
import {graphql} from "../../App";
import Backdrop from "../Backdrop/Backdrop";
import axios from "axios";
import {useHistory} from "react-router-dom";
const Events = () => {
    const H = useHistory();
    const [display,setdisplay] = React.useState<string>("none");
    const [eventsdata,seteventsdata] = React.useState([]);
    interface events {
        id:string,
        userUsername:string,
        title:string,
        description:string,
        price:number,
        date:string
    }
    React.useEffect(()=>{
        const getevents = async () => {
            const body = {
                query : `
                    query {
                        event {
                            id
                            userUsername
                            title
                            description
                            price
                            date
                        }
                    }
                `
            }
            try{
                const result = await axios({
                    method:"post",
                    url:graphql,
                    headers:{
                        accept:"application/json",
                        "Content-Type":"application/json"
                    },
                    data:body
                });
                console.log(result);
                if(result.data.error){
                    H.push("/error");
                }
                else{
                    seteventsdata(result.data.data.event);
                }
            }catch(error){
                console.log(error);
                H.push("/error");
            }
        }
        getevents();
    },[]);
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
            <div className="eventsblog">
                {
                    eventsdata.map((ele:events)=>{
                        
                    })
                }
            </div>
        </div>
    )
}

export default Events
