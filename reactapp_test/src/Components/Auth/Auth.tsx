import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router-dom"
import { graphql } from "../../App";

const Auth = () => {
  const H = useHistory();
  const [account, setaccount] = React.useState(false);
  interface AuthTypes {
    username: string;
    password: string;
  }
  const [data, setdata] = React.useState<AuthTypes>({
    username: "",
    password: "",
  });
  const authstyles: React.CSSProperties = {
    width: "max-content",
    margin: "auto",
  };
  const handleChange = (
    e: React.ChangeEvent<{ value: string; name: string }>
  ) => {
    setdata((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  const auth = async () => {
    if (!account) {
      const body = {
        query: `
                mutation{
                    createUser(user:{
                        username:"${data.username}",
                        password:"${data.password}"
                    }){
                        token
                    }
                }
              `,
      };
      try {
        const data = await axios({
          method: "post",
          url: graphql,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: body
        });
        console.log(data);
        if(data.data.errors){
            H.push("/error");
        }
        else{
            console.log(data.data.data.createUser);
            localStorage.setItem("token",data.data.data.createUser.token);
            H.push("/booking");
        }
      } catch (error) {
        console.log(error);
        H.push("/error");
      }
    }
    else{
        console.log("hello");
        const body = {
            query: `
                    mutation{
                        login(login:{
                            username:"${data.username}",
                            password:"${data.password}"
                        }){
                            token
                        }
                    }
                  `,
          };
          try {
            const data = await axios({
              method: "post",
              url: graphql,
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              data: JSON.stringify(body),
            });
            console.log(data);
            if(data.data.errors){
                H.push("/error");
            }
            else{
                console.log(data.data.data.login);
                localStorage.setItem("token",data.data.data.login.token);
                H.push("/booking");
            }
            console.log(data);
          } catch (error) {
            console.log(error);
            H.push("/error");
          }
    }
  };
  return (
    <>
      <h1 className="text-center">{account ? "login" : "signup"}</h1>
      <div style={authstyles}>
        <input
          type="text"
          value={data.username}
          name="username"
          placeholder="username"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <input
          type="password"
          value={data.password}
          name="password"
          placeholder="password"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <button onClick={auth}>{account ? "login" : "signup"}</button>
      </div>
      <br />
      <a
        style={{ cursor: "pointer" }}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          setaccount((pre) => {
            return !pre;
          });
        }}
      >
        or
        {account ? "signup" : "login"}
      </a>
    </>
  );
};

export default Auth;
