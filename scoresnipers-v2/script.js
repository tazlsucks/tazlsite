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