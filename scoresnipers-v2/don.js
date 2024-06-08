document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://api.tazl.cc/donators';
    const activeContainer = document.getElementById('active-container');
    const usernameContainer = document.getElementById('username-container');
    const activeUsernames = [''];
    let usernames = [];    

    async function fetchUserInfo(username) {
        const errorMessageElement = document.getElementById('errorMessage');
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

    async function displayUsers(users, container) {
        container.innerHTML = '';

        // Sort usernames alphabetically
        users.sort((a, b) => a.username.localeCompare(b.username));

        // Fetch user data in parallel
        const userPromises = users.map(item => fetchUserInfo(item.username));
        const userDataArray = await Promise.all(userPromises);

        userDataArray.forEach((data, index) => {
            if (data) {
                const { userInfo, thumbnailUrl } = data;
                const boxLink = document.createElement('a');
                boxLink.href = `https://www.roblox.com/users/${userInfo.id}/profile`;
                boxLink.target = '_blank';
                boxLink.classList.add('username-box');
                
                const boxDiv = document.createElement('div');
                boxDiv.innerHTML = `
                <p>${userInfo.displayName || userInfo.name}</p>
                <p>${userInfo.username || userInfo.name}</p>
                <img src="${thumbnailUrl}" alt="${userInfo.displayName || userInfo.name}">
                <p>${userInfo.id || userInfo.name}</p>
                `;
                
                boxLink.appendChild(boxDiv);
                container.appendChild(boxLink);
            } else {
                const errorBox = document.createElement('div');
                errorBox.classList.add('username-box');
                errorBox.textContent = 'Error fetching data';
                container.appendChild(errorBox);
            }
        });
    }

    async function displayAllUsers() {
        const activeUsers = usernames.filter(item => activeUsernames.includes(item.username));
        const regularUsers = usernames.filter(item => !activeUsernames.includes(item.username));

        await displayUsers(activeUsers, activeContainer);
        await displayUsers(regularUsers, usernameContainer);
    }

    async function fetchAndDisplayUsers() {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();

            // Assuming data is an array of objects with a username property
            usernames = data.map(donator => ({ username: donator.donator }));

            // Alternatively, if the donator data structure is different, adjust the mapping accordingly.
            // For example, if it's { name: 'example' } instead of { username: 'example' }, use:
            // usernames = data.map(donator => ({ username: donator.name }));

            displayAllUsers();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Call the function to initiate the process
    fetchAndDisplayUsers();
});
