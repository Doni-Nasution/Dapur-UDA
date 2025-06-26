// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#haburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active')
    e.preventDefault();
};

// clas actife serch form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#serch-box');

document.querySelector('#Search-button').onclick = (e) =>{
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// shoping card active
const shopingCard = document.querySelector('.shopping-card');

document.querySelector('#card-button').onclick = (e) => {
    shopingCard.classList.toggle('active');
    e.preventDefault();
}




// klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#haburger-menu');
const sb = document.querySelector('#Search-button');
const shb = document.querySelector('#card-button');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!shb.contains(e.target) && !shopingCard.contains(e.target)) {
        shopingCard.classList.remove('active');
    }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-buttom');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
});


// klik tombol close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

// klik di luar modal
// const modal = document.querySelector('3item-detail-buttom');
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        // modal.style.display = 'none';
        itemDetailModal.style.display = 'none';
    }
};