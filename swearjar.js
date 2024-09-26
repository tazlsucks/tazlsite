document.addEventListener('DOMContentLoaded', function() {
    toggleSectionBasedOnHash();
    window.onhashchange = toggleSectionBasedOnHash;
});


function toggleSectionBasedOnHash() {
    const hash = window.location.hash;
    const page1 = document.querySelector('.page1');
    const privacy = document.querySelector('.privacy');

    privacy.style.display = 'none';
    page1.style.display = 'none';

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