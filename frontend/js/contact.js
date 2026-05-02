document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const responseMsg = document.getElementById('response-msg');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            responseMsg.style.color = 'green';
            responseMsg.innerText = data.message;
            document.getElementById('contactForm').reset();
        } else {
            throw new Error(data.error || 'Failed to send message');
        }
    } catch (error) {
        responseMsg.style.color = 'red';
        responseMsg.innerText = error.message;
    }
});