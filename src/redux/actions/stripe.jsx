import axios from "../axiosConfig";

export const subscribe = (params, callback) => {
  axios
    .post("/stripe/subscribe", params)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback({
        result: false,
        data: error,
      });
    });
};
