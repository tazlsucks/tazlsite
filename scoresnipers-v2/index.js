document.addEventListener('DOMContentLoaded', async () => {
    const apiEndpoint = 'https://api.tazl.cc/items';
    const usernameContainer = document.getElementById('username-container');
    let usernames = [];

    async function fetchUserInfo(username) {
        const errorMessageElement = document.getElementById('errorMessage') || document.createElement('div');
        if (!document.getElementById('errorMessage')) {
            errorMessageElement.id = 'errorMessage';
            document.body.appendChild(errorMessageElement);
        }
        errorMessageElement.textContent = '';

        if (!username) {
            errorMessageElement.textContent = 'Please enter a username';
            return;
        }

        const url = `https://api.tazl.cc/username/${username}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('User not found');
            }
            return await response.json();
        } catch (error) {
            errorMessageElement.textContent = `Error: ${error.message}`;
            return null;
        }
    }

    async function displayAllUsers() {
        usernameContainer.innerHTML = '';

        for (const item of usernames) {
            const username = item.username;
            const data = await fetchUserInfo(username);

            if (data) {
                const { userInfo, thumbnailUrl } = data;
                const boxLink = document.createElement('a');
                boxLink.href = `https://www.roblox.com/users/${userInfo.id}/profile`;
                boxLink.target = '_blank'; // Open in a new tab
                boxLink.classList.add('username-box');
                
                const boxDiv = document.createElement('div');
                boxDiv.innerHTML = `
                <p>${userInfo.displayName || userInfo.name}</p>
                <p>${userInfo.Username || userInfo.name}</p>
                <img src="${thumbnailUrl}" alt="${userInfo.displayName || userInfo.name}">
                <p>${userInfo.id || userInfo.name}</p>
                `;
                
                boxLink.appendChild(boxDiv);
                usernameContainer.appendChild(boxLink);
            } else {
                const errorBox = document.createElement('div');
                errorBox.classList.add('username-box');
                errorBox.textContent = 'Error fetching data';
                usernameContainer.appendChild(errorBox);
            }
        }
    }

    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        usernames = data;
        displayAllUsers();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
