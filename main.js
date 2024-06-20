    function toggleWork() {
    // Toggle the display of both pages
    var page1 = document.querySelector('.page1');
    var works = document.querySelector('.works');

    if (page1.style.display === 'none') {
        page1.style.display = 'block';
        works.style.display = 'none';
    } else {
        page1.style.display = 'none';
        works.style.display = 'block';
    }
}
    function toggleAbout() {
        // Toggle the display of both pages
        var page1 = document.querySelector('.page1');
        var about = document.querySelector('.about');

        if (page1.style.display === 'none') {
            page1.style.display = 'block';
            about.style.display = 'none';
        } else {
            page1.style.display = 'none';
            about.style.display = 'block';
        }
    }

    function onTurnstileSuccess(token) {
        document.getElementById('turn').disabled = false;
    }

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