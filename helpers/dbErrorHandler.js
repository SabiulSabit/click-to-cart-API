"use strict";

const cookieParser = require("cookie-parser");

const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );

    output =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " already exists ";
  } catch (ex) {
    output = "Unique field already exists";
  }
  console.log(output)
  return output;
};
// 
exports.errorHandler = (error) => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
         console.log(message)
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message) {
        message = error.errorors[errorName].message;
      }
    }
  }

  return message;
};
