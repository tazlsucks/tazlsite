const siteKey = "0x4AAAAAAAZze-nCXeZF5jPy";
    
function init() {
    const turnstileContainer = document.getElementById('turnstile-container');
    if (turnstileContainer) {
        turnstileContainer.setAttribute('data-sitekey', siteKey);
    }
}
document.addEventListener('DOMContentLoaded', init);

    function onTurnstileSuccess(token) {
        const contactInfoContainer = document.getElementById('contact-info');
        if (contactInfoContainer) {
            contactInfoContainer.innerHTML = `
                <button class="button" id="turn" disabled onclick="window.location.href='mailto:tazl@tazldied.cc';">email me</button>
            `;
            const elements = document.querySelectorAll('.turn');
            elements.forEach(element => {
                element.classList.remove('disabled');
            });
        }
        document.getElementById('turn').disabled = false;
    }

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