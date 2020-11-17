// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";

// Auto generated firebaseConfig in project settings
firebase.initializeApp({
  // @todo (goalie-app) Should use different firebase configs for the diff environments
  apiKey: "AIzaSyBMgYS3k6ZC4whTEwll120-oLheCmuEMwU",
  authDomain: "ekd-goalie.firebaseapp.com",
  databaseURL: "https://ekd-goalie.firebaseio.com",
  projectId: "ekd-goalie",
  storageBucket: "ekd-goalie.appspot.com",
  messagingSenderId: "751902461041",
  appId: "1:751902461041:web:41cbba8eb6266405995fd0",
});

// @todo Firebase auth lib should have a created or loaded hook, to prevent this stupid loading shit.

/**
 * Function is async to ensure that boot only continues after auth state has changed
 * It waits for firebase to finish initialization and loading auth lib before continuing with boot
 * So that the router navigation wont break due to invalid auth, where auth lib not loaded and initialized yet
 * This function should only be ran once. If ran more then once, it will get stuck here until firebase's auth state changes again...
 */
export default async () =>
  new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      // Use the firebase.Unsubscribe function returned from adding auth state change listner to unsubscribe
      unsubscribe();
      resolve();
    });
  });
