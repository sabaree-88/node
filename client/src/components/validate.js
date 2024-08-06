function Validate(value) {
  let error = {}; // create a empty object for store the errors

  if (value.name === "") {
    // check if the name value is empty if it is empty show the error
    error.name = "Enter name!";
  } else {
    error.name = "";
  }

  if (value.email === "") {
    error.email = "Enter email!";
  } else if (
    // check extra validation to check if the entered email is valid or not
    !value.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    error.email = "Enter valid email address";
  } else {
    error.email = "";
  }

  if (value.phone_number === "") {
    error.phone_number = "Enter phone number!";
  } else if (!value.phone_number.match(/^[0-9]{10}$/)) {
    // check the phone number contains only 10 digits
    error.phone_number = "Enter valid phone number";
  } else {
    error.phone_number = "";
  }

  if (value.address === "") {
    error.address = "Enter address!";
  } else {
    error.address = "";
  }
  return error; // return the error object
}

export default Validate; //export the function
