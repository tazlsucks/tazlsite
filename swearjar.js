function toggleSectionBasedOnHash() {
    const hash = window.location.hash;
    const page1 = document.querySelector('.page1');
    const privacy = document.querySelector('.privacy');

    // Hide all sections initially
    privacy.style.display = 'none';
    page1.style.display = 'none';

    // Show the section based on the hash
    if (hash === '#privacy') {
        privacy.style.display = 'block';
    } else {
        page1.style.display = 'block';
    }
}

function toggleBack(){
    window.location.hash = '';
}

function togglePrivacy(){
    window.location.hash = 'privacy'
}