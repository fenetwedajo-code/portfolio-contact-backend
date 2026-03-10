// Select the contact form and the demo paragraph for messages
const form = document.querySelector('.contact-form');
const demo = document.getElementById('demo');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page reload

  // Get values from inputs
  const name = document.getElementById('name').value.trim();
  const email = document.querySelector('.email-input').value.trim();
  const message = document.getElementById('message').value.trim();

  // Simple validation
  if (!name || !email || !message) {
    demo.textContent = "Please fill all fields!";
    demo.style.color = 'red';
    return;
  }

  // Prepare data to send
  const formData = { name, email, message };

  // Send POST request to backend
  fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      demo.textContent = data.message || 'Message sent successfully!';
      demo.style.color = 'green';
      form.reset(); // clear form
    })
    .catch(err => {
      console.error(err);
      demo.textContent = 'Error sending message.';
      demo.style.color = 'red';
    });

    // to print the form data in the console for debugging
       console.log("Name:", name);
       console.log("Email:", email);
        console.log("Message:", message);
});