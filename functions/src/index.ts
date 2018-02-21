//import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const functions = require('firebase-functions');
    const admin = require('firebase-admin');
    const cors = require('cors')({origin: true});
    admin.initializeApp(functions.config().firebase);

  
  exports.helloWorld = functions.https.onRequest((req, res) => {
      cors(req, res, () => {
          res.status(500).send("Firebase test");
      });
  });
  
  