// Contact form submission animation
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";

    fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    })
      .then(res => {
        if (res.ok) {
          button.textContent = "Message Sent!";
          button.style.backgroundColor = "#2ecc71";
          form.reset();
        } else {
          button.textContent = "Error Sending";
          button.style.backgroundColor = "#e74c3c";
        }

        setTimeout(() => {
          button.disabled = false;
          button.textContent = "Submit";
          button.style.backgroundColor = "";
        }, 2500);
      })
      .catch(err => {
        console.error("JavaScript Fetch Error:", err);
        alert("Something went wrong.");
        button.disabled = false;
        button.textContent = "Submit";
      });
  });
}
