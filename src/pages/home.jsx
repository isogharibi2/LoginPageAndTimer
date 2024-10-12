import { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentDate, setCurrentDate] = useState([]);

  // const [ key , setKey ] = useState([])
  // const [ value , setValue ] = useState([])
  // const [ ttl , setTtl ] = useState([])

  // useEffect(() => {
  //   function setWithExpiry() {
  //     const now = new Date()

  //     const item = {
  //       value: value,
  //       expiry: now.getTime() + ttl,
  //     }
  //     localStorage.setItem(key, JSON.stringify(item))
  //   }

  //   function getWithExpiry(key) {
  //     const itemStr = localStorage.getItem(key)

  //     if (!itemStr) {
  //       return null
  //     }
  //     const item = JSON.parse(itemStr)
  //     const now = new Date()

  //     if (now.getTime() > item.expiry) {

  //       localStorage.removeItem(key)
  //       return null
  //     }
  //     return item.value
  //   }

  //   getWithExpiry()
  //   setWithExpiry()
  // })

  const FechtLogins = async () => {

    try {
      const Res = await axios.post(`http://localhost:3000/logins`, {
        email: email,
        password: password,
      });
      const users = Res.data;

      const MatchUser = users.find(
        (data) => data.email === email && data.password === password
      );

      if (MatchUser) {
        axios.patch(`http://localhost:3000/users/${MatchUser.id}`, {
          token: Math.random() * 4500,
        });

        console.log("Its ok", MatchUser);
      } else {
        console.log("You have a Some prob!");
      }
    } catch (err) {
      console.log(err);
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("date", currentDate);

    if (
      localStorage.getItem("email") !== null &&
      localStorage.getItem("password", password)
    ) {
      toast.success("login has succesful congrugaltion", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      return <h1>pls login and contine</h1>;
    }

    if (localStorage.getItem("email")) {
      const GetUsers = async () => {
        try {
          const Response = await axios.get(`http://localhost:3000/logins`);
          const users = Response.data;

          const MatchUser = users.find(
            (data) => data.email === email && data.password === password
          );

          if (MatchUser) {
            axios.patch(`http://localhost:3000/users/${MatchUser.id}`, {
              token: Math.random() * 4500,
            });

            console.log("Its ok", MatchUser);
          } else {
            console.log("You have a Some prob!");
          }
        } catch (err) {
          console.log(err);
        }
      };
      GetUsers();
    } else {
      alert("you have some prob");
    }
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getHours() + 1;
    const year = today.getMinutes();
    const date = today.getSeconds();
    setCurrentDate(`${month}/${date}/${year}`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={(event) => FechtLogins(event.target.value)}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
