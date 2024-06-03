    const auth0Domain = 'dev-cgplpr7zt7i7xj7h.us.auth0.com';
    const auth0ClientID = '6keazZlI4G0jRM6ySKJpbS5haMHOSpuj';
    const namespace = 'https://api.tazl.cc/roles';
    
    async function fetchUserInfo() {
    const input = document.getElementById('inputField').value;
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = ''; // Clear previous error message
    document.getElementById('userInfo').style.display = 'none'; // Hide user info initially

    if (!input) {
        errorMessageElement.textContent = 'Please enter a username';
        return;
    }

    let url;
    if (/^\d+$/.test(input)) {
        url = `https:/api.tazl.cc/userid/${input}`;
    } else {
        url = `https://api.tazl.cc/username/${input}`;
    }

    try {
        // Fetch user info
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();
        const { userInfo, thumbnailUrl } = data;
        // Display user info
        document.getElementById('username').innerText = userInfo.displayName || userInfo.name;
        document.getElementById('user').innerText = userInfo.Username || userInfo.name;
        document.getElementById('id').innerText = userInfo.id || userInfo.name;
        document.getElementById('userThumbnail').src = thumbnailUrl;
        document.getElementById('userDescription').innerText = userInfo.description || 'No description available';
        document.getElementById('userInfo').style.display = 'block';
    } catch (error) {
        errorMessageElement.textContent = `Error: ${error.message}`;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("greeting")) {
    function getGreeting() {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 0 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 18) {
            return "Good afternoon";
        } else {
            return "Good night";
        }
    }

    const greetingElement = document.getElementById("greeting");
    greetingElement.textContent = getGreeting();
}});

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("greeting")) {
    const openBoxBtn = document.getElementById("openBoxBtn");
    const closeBoxBtn = document.getElementById("closeBoxBtn");
    const overlay = document.getElementById("overlay");

    openBoxBtn.addEventListener("click", function() {
        overlay.style.display = "flex";
    });

    closeBoxBtn.addEventListener("click", function() {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    
    });
}});
