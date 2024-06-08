    const auth0Domain = 'dev-cgplpr7zt7i7xj7h.us.auth0.com';
    const auth0ClientID = '6keazZlI4G0jRM6ySKJpbS5haMHOSpuj';
    const namespace = 'https://api.tazl.cc/roles';
    
    async function fetchUserInfo() {
    const input = document.getElementById('inputField').value;
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';
    document.getElementById('userInfo').style.display = 'none'; 

    if (!input) {
        errorMessageElement.textContent = 'Please enter a username';
        return;
    }

    let url;
    if (/^\d+$/.test(input)) {
        url = `https:/api.tazl.cc/userid/${input}`; // this no work :(
    } else {
        url = `https://api.tazl.cc/username/${input}`;
    }

    try {
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

async function addUser() {
    const input = document.getElementById('inputField').value;
    const errorMessageElement = document.getElementById('errorMessage');
    const successMessageElement = document.getElementById('successMessage');
    errorMessageElement.textContent = '';
    successMessageElement.textContent = '';

    if (!input) {
        errorMessageElement.textContent = 'Please enter a username';
        return;
    }
    
    try {
        const response = await fetch('https://hat.tazl.cc/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer F8SAN6301BB'
            },
            body: JSON.stringify({ username: input })
        });
    
        if (response.status === 500) {
            errorMessageElement.textContent = 'Error: User already added!';
        } else if (response.ok) {
            successMessageElement.textContent = 'User added successfully!';
        } else {
            const errorText = await response.text();
            errorMessageElement.textContent = `Error: ${errorText}`;
        }
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
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById("username-container")) {
    const apiEndpoint = 'https://api.tazl.cc/items';
    const usernameContainer = document.getElementById('username-container');

    try {
        // Fetch the JSON data from the API
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        // Loop through the data and create boxes
        data.forEach(item => {
            const username = item.username;
            const url = `https://api.tazl.cc/username/${username}`;

            // Create a box div
            const boxDiv = document.createElement('div');
            boxDiv.classList.add('username-box');

            // Create a link
            const link = document.createElement('a');
            link.href = url;
            link.textContent = username;

            // Append the link to the box
            boxDiv.appendChild(link);

            // Append the box to the container
            usernameContainer.appendChild(boxDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}});


