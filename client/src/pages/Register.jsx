import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username:"",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     history.push("/");
  //   }
  // }, [history]);

  async function registerHandler() {
    const { fname, lname,username, email, password, reEnterPassword } = user;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== reEnterPassword) {
      setUser({ ...user, password: "", reEnterPassword: "" });
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }
    // console.log("Hello doign register");

    try {
      // console.log("Hello doign register");
      const { data } = await axios.post(
        "/api/auth/register",
        { fname, lname, username, email, password },
        config
      );

      // localStorage.setItem("authToken",data.token);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            name="fname"
            type="text"
            onChange={handleChange}
            placeholder="First name"
            value={user.fname}
          />
          <Input
            name="lname"
            type="text"
            onChange={handleChange}
            placeholder="Last name"
            value={user.lname}
          />
          <Input
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="username"
            value={user.username}
          />
          <Input
            name="email"
            type="email"
            onChange={handleChange}
            value={user.email}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="password"
            value={user.password}
          />
          <Input
            name="reEnterPassword"
            type="password"
            onChange={handleChange}
            placeholder="confirm password"
            value={user.reEnterPassword}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {error && <span>{error}</span>}
          <Button onClick={registerHandler}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
