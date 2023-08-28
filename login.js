const firebaseConfig = {
    apiKey: "AIzaSyCu2VZ10_21pPczxx1uY11AcpU9n9ZTdLo",
    authDomain: "smit-b9-hackathon.firebaseapp.com",
    databaseURL: "https://smit-b9-hackathon-default-rtdb.firebaseio.com",
    projectId: "smit-b9-hackathon",
    storageBucket: "smit-b9-hackathon.appspot.com",
    messagingSenderId: "363545317203",
    appId: "1:363545317203:web:381bab194ad253b06ddba6"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// logout automatically
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "./all.html";
    }
});

// show Password
function showPassword(event) {
    event.target.className = "eye bi bi-eye-slash";
    event.target.previousElementSibling.type = "text";
    event.target.removeEventListener('click', showPassword);
    event.target.addEventListener('click', hidePassword);
}

// hide password
function hidePassword(event) {
    event.target.className = "eye bi bi-eye";
    event.target.previousElementSibling.type = "password";
    event.target.removeEventListener('click', hidePassword);
    event.target.addEventListener('click', showPassword);
}

function login(event) {
    event.preventDefault()
    let email = document.getElementById("email-login").value
    let password = document.getElementById("password-login").value
    let message = document.querySelector(".validationMessage");

    if (!(email.endsWith("@gmail.com"))) {
        message.innerText = `Invalid email address`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    if (
        email.trim() === '' ||
        password.trim() === ''
        // || password.length > 8 || password.length < 4
    ) {
        message.innerText = `Please fill required fields`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    // firebase

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // console.log("Login successful");
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'Login Successfull',
                confirmButtonColor: "#0079ff"
            })
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.log("Login error:", error);
            Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'Invalid email or password. Please enter correct credentials',
                    confirmButtonColor: "#0079ff"
                })
                // alert("Invalid email or password. Please enter correct credentials.");
        });

    document.getElementById("email-login").value
    document.getElementById("password-login").value
}