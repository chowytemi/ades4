import "./App.css";
import React from "react";
import {
  getCustomersInfo,
  getCurrentCustomer,
  deleteNextCustomer,
  addCustomer,
} from "./main";
var firstTime = true;

function Add(props) {
  const [name, setName] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const adding = () => {
    if (!name || !phoneNo || !email) return;
    addCustomer(name, phoneNo, email).then((res) => {
      setName("");
      setPhoneNo("");
      setEmail("");
      props.refresh();
    });
  };
  return (
    <>
      <h1>Home</h1>
      <p>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <label>Phone No.:</label>
        <input
          type="text"
          value={phoneNo}
          onChange={function (e) {
            setName(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <button onClick={adding}>Add</button>
      </p>
    </>
  );
}

function Info(props) {
  const del = () => {
    deleteNextCustomer().then((res) => props.refresh());
  };
  return (
    <>
      <h1>
        Info <button onClick={del}>Delete</button>
      </h1>
      <ul id="customers">
        <Customers customers={props.customers}></Customers>
      </ul>
    </>
  );
}

function Customers(props) {
  const customers = props.customers;
  // if (customers.length == 0) return <></>;
  const list = customers.map((customer) => {
    return customer ? (
      <CustomerInfo
        id={customer.id}
        name={customer.name}
        phoneNo={customer.phoneNo}
        email={customer.email}
      ></CustomerInfo>
    ) : (
      <></>
    );
  });
  return <>{list}</>;
}

function CustomerInfo(props) {
  return (
    <>
      <li>
        {props.id}&nbsp;{props.name}&nbsp;{props.phoneNo}&nbsp;{props.email}
      </li>
    </>
  );
}

function App() {
  const [customers, setCustomer] = React.useState([]);
  const refresh = () => {
    getCustomersInfo().then((res) => {
      setCustomer(res);
    });
  };
  if (firstTime) {
    getCustomersInfo().then((res) => {
      setCustomer(res);
      firstTime = false;
    });
  }
  return (
    <>
      <Add refresh={refresh}></Add>
      <Info customers={customers} refresh={refresh}></Info>
    </>
  );
}

export default App;
