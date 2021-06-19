import React from 'react';
import "./Backdrop.scss";
import {graphql} from "../../App";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
const Backdrop = () => { 
    let currenttime = new Date();
    const dispatch = useDispatch();
    const H = useHistory();
    // console.log(currenttime);
    let time:string = currenttime.toISOString().slice(0, 10)+" "+currenttime.getHours()+":"+currenttime.getMinutes()+":"+currenttime.getSeconds();
    // console.log(time);
    const [data,setdata] = React.useState({
        userUsername:"",
        title:"",
        price:0,
        date:time,
        description:""
    });
    const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setdata((pre)=>{
            return {
                ...pre,
                [e.target.name]:e.target.value
            }
        })
    }
    const addEvent = async () => {
        console.log(data);
        try{
            const body = {
                query:`
                    mutation {
                        create(event:{
                            title:"${data.title}",
                            description:"${data.description}",
                            price:${new Number(data.price)},
                            date:"${data.date}",
                            userUsername:"${data.userUsername}"
                            token:"${localStorage.getItem('token')}"
                        }){
                            title
                            description
                            price
                            date
                        }
                    }
                `
            }
            const result = await axios({
                method:"post",
                url:graphql,
                headers:{
                    "Content-Type": "application/json",
                    accept:"application/json"
                },
                data:JSON.stringify(body)
            });
            console.log(result);
            if(result.data.errors){
                H.push("/error");
            }
            else{
                console.log(result.data.data);
                dispatch({payload:[result.data.data],type:"addevent"})
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <>
                <div className="eventsform">
                    <h1 className="text-center">AddEvent</h1>
                    <div>
                        <input type="text" name="userUsername" placeholder="userUsername" value={data.userUsername}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input type="text" name="title" placeholder="title" 
                        onChange={handleChange}
                        value={data.title}
                        />
                    </div>
                    <div>
                        <input type="number" name="price" placeholder="price" 
                        value={data.price}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input type="datetime" name="date" id="" placeholder="date" 
                        onChange={handleChange}
                        value={data.date}
                        />
                    </div>
                    <div>
                        <textarea name="description" placeholder="description"
                        onChange={handleChange}
                        value={data.description}
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={
                            addEvent
                        }>save</button>
                    </div>
                </div>
        </>
    )
}

export default Backdrop;
