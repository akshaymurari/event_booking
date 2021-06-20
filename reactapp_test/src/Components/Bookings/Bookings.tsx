import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootstate } from "../redux/store";
import axios from "axios";
import {graphql} from "../../App";

const Bookings = () => {
  const bookings = useSelector((state: rootstate) => state.BookingReducer);
  const dispatch = useDispatch();
  console.log(bookings);
  interface bookings {
    id: string;
    event:{
        owner: string;
        date: string;
        title: string;
    }
  }
  React.useEffect(()=>{
      const getbookings = async () => {
          try{
              const body = {
                  query : `
                    mutation {
                        getmybookings(
                            token:"${localStorage.getItem("token")}"
                        ){
                            id
                            event {
                                owner
                                date
                                title
                            }
                        }
                    }
                  `
              }
              const result = await axios({
                  method:"post",
                  url:graphql,
                  headers: {
                      "Content-Type": "application/json",
                      accept:"application/json"
                  },
                  data:JSON.stringify(body)
              })
              console.log(result);
              if(result.data.data.error){
                  console.log("error in bookings");
              }else{
                dispatch({payload:result.data.data.getmybookings,type:"addallbookings"});
              }
          }catch(error){
              console.log(error);
          }
      }
      getbookings();
  },[]);
  const cancelbooking = async (id:string|number) => {
      try{
          const body = {
              query : ` 
                mutation create($id:ID!) {
                    cancelbooking(cancel:{
                        id:$id
                    })
                }
              `,
              variables: {
                id
              }
          }
          const result = await axios({
              url:graphql,
              method:"post",
              headers:{
                  "accept":"application/json",
                  "Content-Type": "application/json",
                  'Authorization':"Berear "+localStorage.getItem("token")
              },
              data:JSON.stringify(body)
          });
          console.log(result);
          const data = bookings.filter((ele:bookings)=>{
              return (ele.id!=id)
          });
          if(result.data.data.cancelbooking){
              dispatch({payload:data,type:"addallbookings"});
          }
      }catch(error){
          console.log(error);
      }
  }
  return (
    <div>
      <h1>in bookings</h1>
      {bookings.map((ele:bookings) => {
        return (
          <div
            style={{
              background: "#ccc",
              marginLeft: "4rem",
              marginRight: "4rem",
              marginTop: "2rem",
            }}
          >
            <p className="text-center">{ele.event.title}</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                margin: "1rem auto",
              }}
            >
              <div style={{ width: "max-content" }}>owner : {ele.event.owner}</div>
              <div style={{ width: "max-content" }}>eventdate = {ele.event.date}</div>
            </div>
            <div
              style={{ width: "max-content", margin: "auto", padding: "1rem" }}
            >
              <button
                onClick={
                  ()=>cancelbooking(ele.id)
                }
              >
                cancelbooking
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bookings;
