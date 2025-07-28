function sendMail(){
    let parms = {
        name : document.getElementById("name").vulue,
        email : document.getElementById("email").vulue,
        subject : document.getElementById("subject").vulue,
    }
    
    emailjs.send("service_5slwirv","template_31o0qns",parms).then(alert("Email Sent!!"))
}
