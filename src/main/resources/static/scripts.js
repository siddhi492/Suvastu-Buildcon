const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";

    fetch("https://suvastubuildcon.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => {
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
      .catch((err) => {
        console.error("JavaScript Fetch Error:", err);
        alert("Something went wrong.");
        button.disabled = false;
        button.textContent = "Submit";
      });
  });
}
