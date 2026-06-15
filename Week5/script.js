
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import {getDatabase, ref, set, update, remove} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCftOZTYHAX2viJZn5qMMO5mNv0ZwCcuTM",
    authDomain: "mobile-programming-9adc0.firebaseapp.com",
    projectId: "mobile-programming-9adc0",
    storageBucket: "mobile-programming-9adc0.firebasestorage.app",
    messagingSenderId: "173192569288",
    appId: "1:173192569288:web:850535c0360304e900a0fd"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);; 

console.log("Firebase initialized successfully!");
console.log(db);


//Function to write user data to Firebase Realtime Database
function writeUserData(userId, firstname, lastname, Email) {
    // Get the database instance
    const db = getDatabase();
  
    // Create a reference/points to 'users/{userId}' and set the data (name and email)
 set(ref(db, 'users/' + userId), {
      firstname: firstname,      
      lastname: lastname,
      Email: Email
    });
  }

const users = [
  { firstname: "Abisar", lastname: "Khadka", Email: "abisar.khadka@example.com" },
  { firstname: "Aarnav", lastname: "Pradhan", Email: "aarnav.sharma@example.com" },
  { firstname: "Saurav", lastname: "Bashyal", Email: "surav.bashyal@example.com" },
  { firstname: "Sanku", lastname: "Bhudathoki", Email: "sanku.bhudathoki@example.com" },
  { firstname: "Razan", lastname: "Tandan", Email: "razan.tandan@example.com" },
  { firstname: "Mahesh", lastname: "Ayer", Email: "mahesh.ayer@example.com" },
  { firstname: "Manisha", lastname: "karki", Email: "manisha.karki@example.com" },
  { firstname: "Bishal", lastname: "Gautam", Email: "bishal.karki@example.com" },
  { firstname: "vedu", lastname: "Rai", Email: "vedu.rai@example.com" },
  { firstname: "Prasun", lastname: "Jholey", Email: "prasun.jholey@example.com" }
];

users.forEach((user, index) => {
  writeUserData(index + 1, user.firstname, user.lastname, user.Email  );
});


function updateUserData(userId, firstname, lastname) {
  update(ref(db, 'users/' + userId), {
    firstname: firstname,
    lastname: lastname
  })
  .then(() => {
    console.log("User updated successfully");
  })
  .catch((error) => {
    console.error(error);
  });
}
updateUserData(1, "Ishmriti", "Chims");

function deleteUser(userId) {
  remove(ref(db, 'users/' + userId))
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error(error);
    });
}
deleteUser(1);