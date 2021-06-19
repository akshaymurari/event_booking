import React from 'react';
import {graphql} from "../../App";
import Backdrop from "../Backdrop/Backdrop";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {rootstate} from "../redux/store";
const Events = () => {
    const H = useHistory();
    const eventsdata = useSelector((state:rootstate)=>state.EventReducer);
    console.log(eventsdata);
    const dispatch = useDispatch();
    const [display,setdisplay] = React.useState<string>("none");
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
                    dispatch({payload:result.data.data.event,type:"addallevents"});

                }
            }catch(error){
                console.log(error);
                H.push("/error");
            }
        }
        getevents();
    },[]);
    const booknow = async (ele:events) => {
        try{
            const body = {
                query : `
                    mutation {
                        createBooking(book:{
                            eventId:"${ele.id}",
                            userUsername:"${ele.userUsername}"
                            token:"${localStorage.getItem("token")}"
                        }){
                            id
                        }
                    }
                `
            }
            const result = await axios({
                url:graphql,
                method:"post",
                data:JSON.stringify(body),
                headers:{
                    accept:"application/json",
                    "Content-Type":"application/json"
                }
            });
            console.log(result);
            if(result.data.error){
                console.log("error");
            }
            else{
                console.log(result.data.data.createBooking);
                dispatch({payload:[result.data.data.createBooking],type:"addbookings"});
            }
        }catch(error){
            console.log(error);
        }
    }
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
            <div className="eventsblog mb-5">
                {
                    eventsdata.map((ele:events)=>{
                        return (
                            <div style={{
                                background:"#ccc",
                                marginLeft:"4rem",
                                marginRight:"4rem",
                                marginTop:"2rem"
                            }}>
                                <p className="text-center">{ele.title}</p>
                                <div style={{display:"flex",flexWrap:"wrap",
                                    justifyContent:"space-around",margin:"1rem auto"
                                    }}>
                                    <div style={{width:"max-content"}}>
                                        owner : {ele.userUsername}
                                    </div>
                                    <div style={{width:"max-content"}}>
                                        events = ${ele.price}
                                    </div>
                                </div>
                                <div style={{width:"max-content",margin:"auto"}}>
                                        eventdate = {ele.date}
                                </div>
                                <div style={{width:"max-content",margin:"auto",padding:"1rem"}}>
                                    <button onClick={
                                        ()=>booknow(ele)
                                    }>booknow</button>
                                </div>
                                <p className="text-center pb-3">{ele.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Events
