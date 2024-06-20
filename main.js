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
        // Enable the email button
        document.getElementById('emailButton').disabled = false;
    }