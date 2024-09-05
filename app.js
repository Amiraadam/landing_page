// Switching between Sign Up and Sign In forms
document.getElementById('showSignUp').addEventListener('click', function () {
    document.getElementById('signUpSection').style.display = 'block';
    document.getElementById('signInSection').style.display = 'none';
});

document.getElementById('showSignIn').addEventListener('click', function () {
    document.getElementById('signInSection').style.display = 'block';
    document.getElementById('signUpSection').style.display = 'none';
});

// Sign Up Form Submission
document.getElementById('signUpForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    // Client-side validation
    if (!username || !email || !password) {
        showError('signUpError', 'Please fill in all required fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        if (response.ok) {
            alert('Sign Up successful! Please Sign In.');
            document.getElementById('showSignIn').click();  // Switch to Sign In page
        } else {
            const error = await response.json();
            showError('signUpError', error.message);
        }
    } catch (error) {
        showError('signUpError', 'An error occurred. Please try again.');
    }
});

// Sign In Form Submission
document.getElementById('signInForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    // Client-side validation
    if (!email || !password) {
        showError('signInError', 'Please fill in both email and password.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);  // Store the token
            window.location.href = '/dashboard';  // Redirect to dashboard
        } else {
            const error = await response.json();
            showError('signInError', error.message);
        }
    } catch (error) {
        showError('signInError', 'An error occurred. Please try again.');
    }
});

// Function to display error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
