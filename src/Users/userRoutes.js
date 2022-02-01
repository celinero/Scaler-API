const express = require("express");
const routes = express.Router();
const {
  signUpUser,
  signInUser,
  validateUserSession,
} = require("./userFunctions");
const { User } = require("../database/schemas/UserSchema");

// SIGN UP new user
// Create a user, a session token
routes.post("/sign-up", async (request, response) => {
  // Process posted form/json data
  let newUserDetails = {
    email: request.body.email,
    password: request.body.password,
    displayName: request.body.displayName,
  };

  if (newUserDetails.password.length < 8) {
    console.log("Password too short!");
    response.status(500).send({ error: "Password is too short!" });
  }

  // Hand data to a sign-up function
  let signUpResult = await signUpUser(newUserDetails);

  // Return error or token as response
  if (signUpResult.error != null) {
    console.log("An error occured during the sign up process");
    response.status(500).send(signUpResult);
    return;
  }

  // Sign in to get latest user claims (authorization).
  let signInResult = await signInUser(newUserDetails);

  // If an error message exists, return that.
  if (signInResult.error != null) {
    console.log("An error occured during the sign in process");
    response.status(500).send(signInResult);
    return;
  }

  // On success, return a signed-in session to the brand-new user:
  response.json(signInResult);
});

// SIGN IN existing User
// Create a session token
routes.post("/sign-in", async (request, response) => {
  let existingUserDetails = {
    email: request.body.email,
    password: request.body.password,
  };

  // Hand data to a sign-in function
  let signInResult = await signInUser(existingUserDetails);

  // If an error message exists, return that.
  if (signInResult.error != null) {
    console.log("An error occured during the sign in process");
    response.status(500).send(signInResult);
    return;
  }

  // On success, return a signed-in session to the brand-new user:
  response.json(signInResult);
});

// VALIDATE SESSION
// Create a session token
routes.post("/validate-session", async (request, response) => {
  // Hand data to a validation function
  let validationResult = await validateUserSession({
    idToken: request.body.idToken,
  });

  // Return error or token as response
  response.json(validationResult);
});

routes.get("/:userID", async (request, response) => {
  const user = await User.findById(request.params.userID).exec();
  response.json(user);
});

module.exports = routes;
