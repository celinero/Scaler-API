// Require & then initialize
// Set up the Firebase Client
const firebaseClient = require('firebase/app');
// Initialize the Firebase Client
firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));

// Add the Firebase products that you want to use
const { getAuth, signInWithEmailAndPassword} = require('firebase/auth');

// Firebase Admin initialized elsewhere, just need to access its function
const firebaseAdmin = require('firebase-admin');



// signUpUser
async function signUpUser(userDetails){
  // Use the Firebase Admin to create the user
  return firebaseAdmin.auth().createUser({
      email: userDetails.email,
      emailVerified: true,
      password: userDetails.password,
      username: userDetails.username,
      // photoURL: "somefreestockwebsite.com/image/someimage.png"
  }).then(async (userRecord) => {
      // Set a "custom claim", or authorization/role data 
      let defaultUserClaims = firebaseAdmin.auth()
      .setCustomUserClaims(userRecord.uid, {admin:false, regularUser:true})
      .then(() => {
          console.log("Set default claims to the new user.");
      })
      return userRecord
  }).catch(error => {
      console.log(`Internal sign-up function error is:\n${error}`);
      return {error:error};
  })
}

async function signInUser(userDetails){
  const firebaseClientAuth = getAuth();

  let signInResult = signInWithEmailAndPassword(firebaseClientAuth, userDetails.email, userDetails.password)
    .then(async (userCredential) => {
      let userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(false);
      console.log(`userIdToken ob is \n ${JSON.stringify(userIdToken)}`);
      return {
          idToken: userIdToken.token,
          refreshToken: userCredential.user.refreshToken,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified,
          username: userCredential.user.username,
          // photoURL: userCredential.user.photoURL,
          uid: userCredential.user.uid
      }
  }).catch(error => {
      console.log(`Internal sign-up function error is:\n${error}`);
      return {error:error};
  })
  return signInResult;
}

// validate user session
async function validateUserSession(sessionDetails){
  let userRefreshToken = sessionDetails.refreshToken;
  let userIdToken = sessionDetails.idToken;

  return firebaseAdmin.auth().verifyIdToken(userIdToken, true)
    .then(async (decodedToken) => {
      console.log(`Decoded session token is ${JSON.stringify(decodedToken)}`);
      return {
          isValid: true,
          uid: decodedToken.uid,
          fullDecodedToken: decodedToken
      }
  }).catch((error) => {
      if (error.code == 'auth/id-token-revoked') {
          // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
          console.log("You must sign in again to access this. Full error is: \n" + error);
      } else {
          // Token is invalid.
          console.log("Session token is invalid. Full error is: \n" + error);
      }
        
      return {error:error};
  });
}

module.exports = {
  signUpUser, signInUser, validateUserSession
}