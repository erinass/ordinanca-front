function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Username and password are required');
    } else if (username === 'oltion' && password === '1234') {
        alert('Login successful');
        window.location.href ="../index.html";
    } else {
        alert('Invalid username or password');
    }
}