import axios from "axios";
const backend = "http://127.0.0.1:8000";

export function getCustomersInfo() {
  return axios
    .get(`${backend}/api/customers`)
    .then(function (response) {
    //   console.log(response.data);
      return response.data;
    })
    .then(function (json) {
      if (json.error) {
        throw new Error(json.error);
      }
      return json.customers;
    });
}

export function addCustomer(customerName, customerPhoneNo, customerEmail) {
  return axios({
    method: "POST",
    url: `${backend}/api/customers/${encodeURIComponent(
      customerName
    )}/${encodeURIComponent(customerPhoneNo)}/${encodeURIComponent(customerEmail)}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: customerName,
      phoneNo: customerPhoneNo,
      email: customerEmail,
    },
  })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .then(function (json) {
      if (json.error) {
        throw new Error(json.error);
      }
      return json.id;
    });
}

export function getCurrentCustomer() {
  return axios
    .get(`${backend}/api/customers/current`)
    .then(function (response) {
      if (response.status === 400) {
        return { customer: {} };
      }
      return response.data;
    })
    .then(function (json) {
      if (json.error) {
        throw new Error(json.error);
      }
      return json.customer;
    });
}

export function deleteNextCustomer() {
  return axios({
    method: "DELETE",
    url: `${backend}/api/customers/`,
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (json) {
      if (json.error) {
        throw new Error(json.error);
      }
      return json.customer;
    });
}
