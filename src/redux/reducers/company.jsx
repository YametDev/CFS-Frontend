const initialState = {
  exist: 0,
  _id: "",
  name: "",
  logo: "",
  button: "",
  star: "",
  google: "",
  managers: [],
  alertEmail: false,
  alertSMS: false,
  display: "",
};

const reducer = ( state = initialState, action ) => {
  if(action.type === "CompanyData"){
    const company = action.payload;
    state = {
      ...initialState,
      _id: company._id,
      name: company.name,
      logo: company.logo,
      button: company.button,
      star: company.star,
      google: company.google,
      managers: company.managers,
      alertEmail: company.alertEmail,
      alertSMS: company.alertSMS,
      display: company.display,
    };
  } else if(action.type === "CompanyExist") {
    state = {
      ...initialState,
      exist: action.payload
    }
  }
  return state;
}

export default reducer;