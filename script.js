const movies = [
    {
        id: 1,
        title: 'Titanic',
        year: 1997,
        rating: 7.9,
        category: 'Romance / Drama',
        image: 'images/titanic.jpg',
        video: 'https://www.youtube.com/embed/kVrqfYjkTdQ',
        desc: 'A timeless love story aboard the legendary ship.'
    },
    {
        id: 2,
        title: 'A Quiet Place',
        year: 2018,
        rating: 7.5,
        category: 'Horror / Thriller',
        image: 'images/quiet-place.jpg',
        video: 'https://www.youtube.com/embed/WR7cc5t7tv8',
        desc: 'A family must live in silence to survive mysterious creatures.'
    },
    {
        id: 3,
        title: 'The Conjuring',
        year: 2013,
        rating: 7.5,
        category: 'Horror / Supernatural',
        image: 'images/conjuring.jpg',
        video: 'https://www.youtube.com/embed/k10ETZ41q5o',
        desc: 'Paranormal investigators face a terrifying haunted house case.'
    },
    {
        id: 4,
        title: 'The Nun',
        year: 2018,
        rating: 5.3,
        category: 'Horror / Supernatural',
        image: 'images/nun.jpg',
        video: 'https://www.youtube.com/embed/pzD9zGcUNrw',
        desc: 'A dark chapter from The Conjuring universe.'
    },
    {
        id: 5,
        title: 'Inception',
        year: 2010,
        rating: 8.8,
        category: 'Sci-Fi / Action',
        image: 'images/inception.jpg',
        video: 'https://www.youtube.com/embed/YoHD9XEInc0',
        desc: 'A thief enters dreams to plant an impossible idea.'
    },
    {
        id: 6,
        title: 'Interstellar',
        year: 2014,
        rating: 8.7,
        category: 'Sci-Fi / Drama',
        image: 'images/interstellar.jpg',
        video: 'https://www.youtube.com/embed/zSWdZVtXT7E',
        desc: 'Explorers travel through space to save humanity.'
    },
    {
        id: 7,
        title: 'Iron Man 3',
        year: 2013,
        rating: 7.1,
        category: 'Action / Superhero',
        image: 'images/ironman3.jpg',
        video: 'https://www.youtube.com/embed/Ke1Y3P9D0Bc',
        desc: 'Tony Stark faces a powerful enemy and his own fears.'
    },
    {
        id: 8,
        title: 'Avengers: Endgame',
        year: 2019,
        rating: 8.4,
        category: 'Action / Superhero',
        image: 'images/endgame.jpg',
        video: 'https://www.youtube.com/embed/TcMBFSGVi1c',
        desc: 'The Avengers make one final stand to restore the universe.'
    },
    {
        id: 9,
        title: 'Fast X',
        year: 2023,
        rating: 5.8,
        category: 'Action / Crime',
        image: 'images/fastx.jpg',
        video: 'https://www.youtube.com/embed/32RAq6JzY-w',
        desc: 'Dom Toretto faces a dangerous enemy from the past.'
    },
    {
        id: 10,
        title: 'John Wick 4',
        year: 2023,
        rating: 7.7,
        category: 'Action / Thriller',
        image: 'images/johnwick4.jpg',
        video: 'https://www.youtube.com/embed/qEVUtrk8_B4',
        desc: 'John Wick fights his way toward freedom.'
    },
    {
        id: 11,
        title: 'Mission Impossible',
        year: 2023,
        rating: 7.7,
        category: 'Action / Adventure',
        image: 'images/mission.jpg',
        video: 'https://www.youtube.com/embed/avz06PDqDbM',
        desc: 'Ethan Hunt faces a mission with global consequences.'
    }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function getFavorites() {
    return JSON.parse(localStorage.getItem('moviehub_favs') || '[]');
}

function saveFavorites(favorites) {
    localStorage.setItem('moviehub_favs', JSON.stringify(favorites));
}

function isFavorite(movieId) {
    return getFavorites().includes(movieId);
}

function toggleFavorite(movieId, event) {
    if (event) {
        event.stopPropagation();
    }

    let favorites = getFavorites();

    if (isFavorite(movieId)) {
        favorites = favorites.filter((id) => id !== movieId);
    } else {
        favorites.push(movieId);
    }

    saveFavorites(favorites);
    renderAllSections();
}

function openMovie(movieId) {
    localStorage.setItem('moviehub_selected', movieId);
    window.location.href = 'watch.html';
}

function createMovieCard(movie) {
    const fullStars = Math.round(movie.rating / 2);
    const emptyStars = 5 - fullStars;

    return `
        <article class="card" onclick="openMovie(${movie.id})">
            <div class="poster-wrap">
                <img src="${movie.image}" alt="${movie.title}">
                <span class="badge">⭐ ${movie.rating}</span>

                <button
                    class="fav-btn ${isFavorite(movie.id) ? 'active' : ''}"
                    onclick="toggleFavorite(${movie.id}, event)">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>

            <div class="card-info">
                <h3 class="card-title">${movie.title}</h3>
                <p class="meta">${movie.year} • ${movie.category}</p>
                <p class="stars">${'★'.repeat(fullStars)}${'☆'.repeat(emptyStars)}</p>
            </div>
        </article>
    `;
}

function renderGrid(selector, movieList) {
    const grid = $(selector);

    if (!grid) {
        return;
    }

    if (movieList.length === 0) {
        grid.innerHTML = '<div class="empty">No movies found.</div>';
        return;
    }

    grid.innerHTML = movieList.map(createMovieCard).join('');
}

function renderAllSections() {
    renderGrid('#trending-grid', movies.slice(0, 6));
    renderGrid('#top-movies-grid', [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6));
    renderGrid('#all-movies-grid', movies);
    renderGrid('#watch-grid', movies);
    renderGrid('#top-movies-full', [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6));
    renderGrid('#top-series-full', [...movies].sort((a, b) => a.year - b.year).slice(0, 5));

    renderFavoritesPage();
    renderRatingsPage();
    renderWatchPage();
}

function renderFavoritesPage() {
    const grid = $('#favorites-grid');

    if (!grid) {
        return;
    }

    const favoriteIds = getFavorites();
    const favoriteMovies = movies.filter((movie) => favoriteIds.includes(movie.id));

    if (favoriteMovies.length === 0) {
        grid.innerHTML = `
            <div class="empty favorites-empty">
                <h2>No favorites yet</h2>
                <p>Press the heart icon on any movie.</p>
                <a class="btn-primary" href="movies.html">Browse Movies</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = favoriteMovies.map(createMovieCard).join('');
}

function renderRatingsPage() {
    const tableBody = $('#ratings-body');

    if (!tableBody) {
        return;
    }

    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);

    tableBody.innerHTML = sortedMovies.map((movie, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${movie.title}</strong></td>
            <td>${movie.year}</td>
            <td>${movie.category}</td>
            <td>⭐ ${movie.rating}</td>
            <td>
                <button class="btn-secondary" onclick="openMovie(${movie.id})">Watch</button>
            </td>
        </tr>
    `).join('');
}

function renderWatchPage() {
    const playerSection = $('#player-section');

    if (!playerSection) {
        return;
    }

    const urlId = new URLSearchParams(window.location.search).get('id');
    const savedId = localStorage.getItem('moviehub_selected');
    const movieId = Number(urlId || savedId || 1);
    const movie = movies.find((item) => item.id === movieId) || movies[0];

    localStorage.setItem('moviehub_selected', movie.id);

    playerSection.innerHTML = `
        <div class="player-box">
            <iframe
                class="youtube-player"
                src="${movie.video}"
                title="${movie.title} trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>

        <aside class="side-panel">
            <img src="${movie.image}" alt="${movie.title}" class="watch-poster">
            <h1>${movie.title}</h1>
            <p class="meta">${movie.year} • ${movie.category}</p>
            <p class="stars">⭐ ${movie.rating} / 10</p>
            <p>${movie.desc}</p>

            <button class="btn-primary" onclick="toggleFavorite(${movie.id})">
                ${isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </aside>
    `;
}

function applyTheme() {
    const theme = localStorage.getItem('moviehub_theme') || 'dark';
    const icon = $('#theme-toggle i');

    document.documentElement.setAttribute('data-theme', theme);

    if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('moviehub_theme', newTheme);
    applyTheme();
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('moviehub_session') || 'null');
}

function getUsers() {
    return JSON.parse(localStorage.getItem('moviehub_users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('moviehub_users', JSON.stringify(users));
}


function ensureAuthModal() {
    if ($('#auth-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'auth-modal';
    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-head">
                <h2>MovieHub Account</h2>
                <button class="icon-btn" id="auth-close" type="button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="tabs">
                <button class="tab-btn active" id="tab-in" type="button">Sign In</button>
                <button class="tab-btn" id="tab-up" type="button">Sign Up</button>
            </div>

            <form id="signin-form" novalidate>
                <div class="field">
                    <label>Email</label>
                    <input id="signin-email" type="text">
                    <div class="error" id="signin-email-error"></div>
                </div>

                <div class="field">
                    <label>Password</label>
                    <input id="signin-pass" type="password">
                    <div class="error" id="signin-pass-error"></div>
                </div>

                <div class="error" id="signin-error"></div>
                <button class="btn-primary full-btn" type="submit">Login</button>
            </form>

            <form class="hide" id="signup-form" novalidate>
                <div class="field">
                    <label>Name</label>
                    <input id="signup-name" type="text">
                    <div class="error" id="signup-name-error"></div>
                </div>

                <div class="field">
                    <label>Email</label>
                    <input id="signup-email" type="text">
                    <div class="error" id="signup-email-error"></div>
                </div>

                <div class="field">
                    <label>Password</label>
                    <input id="signup-pass" type="password">
                    <div class="error" id="signup-pass-error"></div>
                </div>

                <button class="btn-primary full-btn" type="submit">Create Account</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
}

function bindAuthEvents() {
    $('#auth-close')?.addEventListener('click', closeAuthModal);
    $('#tab-in')?.addEventListener('click', () => showAuthTab('in'));
    $('#tab-up')?.addEventListener('click', () => showAuthTab('up'));
    $('#signup-form')?.addEventListener('submit', signup);
    $('#signin-form')?.addEventListener('submit', signin);
}

function updateAuthUI() {
    const currentUser = getCurrentUser();

    $$('.login-btn').forEach((button) => {
        button.type = 'button';
        button.textContent = currentUser ? `Logout (${currentUser.name})` : 'Sign In';
        button.onclick = (event) => {
            event.preventDefault();

            if (getCurrentUser()) {
                logout();
            } else {
                openAuthModal();
            }
        };
    });
}

function openAuthModal() {
    const modal = $('#auth-modal');

    if (modal) {
        modal.classList.add('show');
    }
}

function closeAuthModal() {
    const modal = $('#auth-modal');

    if (modal) {
        modal.classList.remove('show');
    }
}

function logout() {
    sessionStorage.removeItem('moviehub_session');
    closeAuthModal();
    updateAuthUI();
    alert('Logged out successfully');
}

function showAuthTab(tabName) {
    $('#signin-form').classList.toggle('hide', tabName !== 'in');
    $('#signup-form').classList.toggle('hide', tabName !== 'up');

    $$('.tab-btn').forEach((button) => button.classList.remove('active'));
    $(`#tab-${tabName}`).classList.add('active');
}

function setError(selector, message) {
    const errorBox = $(selector);

    if (errorBox) {
        errorBox.textContent = message || '';
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function signup(event) {
    event.preventDefault();

    const name = $('#signup-name').value.trim();
    const email = $('#signup-email').value.trim().toLowerCase();
    const password = $('#signup-pass').value;
    let isValid = true;

    setError('#signup-name-error', '');
    setError('#signup-email-error', '');
    setError('#signup-pass-error', '');

    if (name.length < 3) {
        setError('#signup-name-error', 'Name must be at least 3 characters.');
        isValid = false;
    }

    if (!isValidEmail(email)) {
        setError('#signup-email-error', 'Enter a valid email.');
        isValid = false;
    }

    if (password.length < 6 || !/[0-9]/.test(password)) {
        setError('#signup-pass-error', 'Password must be 6+ characters and include a number.');
        isValid = false;
    }

    if (getUsers().some((user) => user.email === email)) {
        setError('#signup-email-error', 'This email is already registered.');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const users = getUsers();
    users.push({ name, email, password });

    saveUsers(users);
    sessionStorage.setItem('moviehub_session', JSON.stringify({ name, email }));

    closeAuthModal();
    updateAuthUI();
    alert('Account created successfully');
}

function signin(event) {
    event.preventDefault();

    const email = $('#signin-email').value.trim().toLowerCase();
    const password = $('#signin-pass').value;
    const foundUser = getUsers().find((user) => user.email === email && user.password === password);

    setError('#signin-error', '');

    if (!foundUser) {
        setError('#signin-error', 'Wrong email or password.');
        return;
    }

    sessionStorage.setItem('moviehub_session', JSON.stringify({
        name: foundUser.name,
        email: foundUser.email
    }));

    closeAuthModal();
    updateAuthUI();
    alert('Welcome back, ' + foundUser.name);
}

function contactSubmit(event) {
    event.preventDefault();

    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    let isValid = true;

    setError('#name-error', '');
    setError('#email-error', '');
    setError('#message-error', '');

    if (name.length < 3) {
        setError('#name-error', 'Please enter at least 3 characters.');
        isValid = false;
    }

    if (!isValidEmail(email)) {
        setError('#email-error', 'Email format is not valid.');
        isValid = false;
    }

    if (message.length < 15) {
        setError('#message-error', 'Message must be at least 15 characters.');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const messages = JSON.parse(localStorage.getItem('moviehub_messages') || '[]');

    messages.push({
        name,
        email,
        message,
        date: new Date().toLocaleString()
    });

    localStorage.setItem('moviehub_messages', JSON.stringify(messages));

    alert('Message saved successfully');
    event.target.reset();
}

function searchMovies(query) {
    const cleanQuery = query.toLowerCase().trim();

    const filteredMovies = movies.filter((movie) => {
        const searchText = `${movie.title} ${movie.category} ${movie.year}`.toLowerCase();
        return searchText.includes(cleanQuery);
    });

    renderGrid('#all-movies-grid', filteredMovies);
    renderGrid('#watch-grid', filteredMovies);
    renderGrid('#trending-grid', filteredMovies.slice(0, 6));
}

document.addEventListener('DOMContentLoaded', () => {
    ensureAuthModal();
    applyTheme();
    renderAllSections();
    updateAuthUI();

    $('#theme-toggle')?.addEventListener('click', toggleTheme);

    $('#menu-toggle')?.addEventListener('click', () => {
        $('#nav-menu').classList.toggle('open');
    });

    bindAuthEvents();
    $('#contact-form')?.addEventListener('submit', contactSubmit);

    $$('#search-input').forEach((input) => {
        input.addEventListener('input', (event) => searchMovies(event.target.value));
    });
});
