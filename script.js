(function () {
  emailjs.init({ publicKey: "LpjT6PFXqnLEJni6E" }); // جایگزین کلید خود کنید
})();

const googleSheetWebhookURL = "https://script.google.com/macros/s/AKfycbxkFO4k5Gz6hBRnpsEaPb-bKsS7_Rd6kSl6EZ2zx-9KICNrNHgADnOu0FphfMfl2ikq/exec";

const msg = document.querySelector(".form-message");
const loader = document.querySelector(".loader");

paypal.HostedButtons({
  hostedButtonId: "8QMJ5AYWQ8UC6", // جایگزین دکمه PayPal خود کنید
}).render("#paypal-container-8QMJ5AYWQ8UC6");

// بعد از پرداخت موفق، دکمه Submit را نشان بده
window.addEventListener("message", function (event) {
  if (event.origin.includes("paypal.com")) {
    if (event.data && event.data.event === "hostedButtonPaymentAuthorized") {
      document.getElementById("submit-wrapper").style.display = "block";
      document.getElementById("paypal-container-8QMJ5AYWQ8UC6").style.display = "none";
    }
  }
});

window.onload = function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    loader.classList.add("show");
    msg.innerHTML = "";
    msg.classList.remove("show");

    const form = this;

    emailjs.sendForm("service_4yvzeq8", "template_px597ka", form).then(
      function () {
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());

        fetch(googleSheetWebhookURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formDataObj),
        })
          .then((res) => res.json())
          .then((data) => console.log("Saved to Google Sheet:", data))
          .catch((error) => console.error("Sheet Error:", error));

        loader.classList.remove("show");
        msg.innerHTML = "<span class='success-msg'>Email Sent and Data Saved!</span>";
        msg.classList.add("show");
        form.reset();
        setTimeout(() => msg.classList.remove("show"), 3000);
      },
      function (error) {
        loader.classList.remove("show");
        msg.innerHTML = "<span class='error-msg'>Email Not Sent</span>";
        msg.classList.add("show");
        console.error("EmailJS error:", error);
      }
    );
  });
};
