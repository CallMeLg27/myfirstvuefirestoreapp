import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: process.env.VUE_APP_projectId,
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId: process.env.VUE_APP_messagingSenderId,
    appId: process.env.VUE_APP_appId,
    measurementId: process.env.VUE_APP_measurementId
}
firebase.initializeApp(firebaseConfig)

//utils
const db = firebase.firestore()
const auth = firebase.auth()

// colection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}