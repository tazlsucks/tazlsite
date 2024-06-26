const siteKey = "0x4AAAAAAAZze-nCXeZF5jPy";
    
function init() {
    const turnstileContainer = document.getElementById('turnstile-container');
    if (turnstileContainer) {
        turnstileContainer.setAttribute('data-sitekey', siteKey);
    }
}
document.addEventListener('DOMContentLoaded', init);


document.addEventListener('DOMContentLoaded', function() {
    // Check if the page loaded with a hash and display the appropriate section
    toggleSectionBasedOnHash();
    window.onhashchange = toggleSectionBasedOnHash; // Handle hash change when the user navigates
});

function toggleSectionBasedOnHash() {
    const hash = window.location.hash;
    const page1 = document.querySelector('.page1');
    const about = document.querySelector('.about');
    const works = document.querySelector('.works');

    // Hide all sections initially
    about.style.display = 'none';
    works.style.display = 'none';
    page1.style.display = 'none';

    // Show the section based on the hash
    if (hash === '#about') {
        about.style.display = 'block';
    } else if (hash === '#works') {
        works.style.display = 'block';
    } else {
        page1.style.display = 'block'; // Show the main page by default
    }
}

function toggleAbout() {
    window.location.hash = 'about';
}

function toggleWork() {
    window.location.hash = 'works';
}

function toggleBack(){
    window.location.hash = '';
}

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