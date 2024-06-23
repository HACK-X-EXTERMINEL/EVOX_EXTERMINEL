/*=============== SEARCH BAR JS ===============*/
const toggleSearch = (search, button) => {
    const searchBar = document.getElementById(search),
        searchButton = document.getElementById(button);

    searchButton.addEventListener('click', () => {
        // We add the show-search class, so that the search bar expands
        searchBar.classList.toggle('show-search');
    });
};
toggleSearch('search-bar', 'search-button');

var games = [
    { name: "SHOP", imageUrl: "contact/img/shop.png", downloadLink: "https://evox-exterminel.mysellix.io/", description: "Buy whatever goods you want, Free Fire gems, PUBG, hacked applications VIP PREMIUM " },
    { name: "VIRTUAL", imageUrl: "img/virtual-android.jpg", downloadLink: "https://try2link.com/jNMhh", description: "This is a game copier and an Android emulator for Android devices" },
    // You can add more games here
];

var currentGame = null; // To keep track of the game with open description

// Load games when the page loads
window.onload = function () {
    displayGames(games);
};

// Display games on the page
function displayGames(games) {
    var gamesContainer = document.getElementById("games");
    gamesContainer.innerHTML = ""; // Clear previous content

    games.forEach(function (game) {
        var existingGame = document.getElementById(game.name.replace(/\s/g, ''));
        if (!existingGame) {
            var gameDiv = document.createElement("div");
            gameDiv.classList.add("game");
            gameDiv.id = game.name.replace(/\s/g, ''); // Remove spaces from game name to use as id

            var img = document.createElement("img");
            img.src = game.imageUrl;
            img.alt = "Game Image";
            img.onclick = function () {
                window.location.href = game.downloadLink;
            };

            var namePara = document.createElement("p");
            namePara.textContent = game.name;
            namePara.classList.add("name"); // Add the class "name"

            if (game.description) {
                var descriptionPara = document.createElement("p");
                descriptionPara.textContent = game.description;
                descriptionPara.classList.add("description");
                descriptionPara.style.display = "none";
            }

            var toggleButton = document.createElement("button");
            toggleButton.textContent = "details";
            toggleButton.onclick = function () {
                if (descriptionPara.style.display === "none") {
                    descriptionPara.style.display = "block";
                    currentGame = gameDiv.id;
                    toggleButton.textContent = "less";
                    toggleButton.classList.add("less-button"); // Add class for red shadow
                } else {
                    descriptionPara.style.display = "none";
                    toggleButton.textContent = "details";
                    toggleButton.classList.remove("less-button"); // Remove class for red shadow
                    currentGame = null;
                }
            };
            gameDiv.appendChild(img);
            gameDiv.appendChild(namePara);
            if (game.description) {
                gameDiv.appendChild(descriptionPara);
            }
            if (game.description) {
                gameDiv.appendChild(toggleButton);
            }

            gamesContainer.appendChild(gameDiv);
        }
    });
}

// Search and display suggestions
document.getElementById("searchInput").addEventListener("input", function () {
    search();
});

function search() {
    var input = document.getElementById("searchInput").value.toUpperCase();
    var games = document.querySelectorAll('.game');
    var noResults = document.getElementById("noResults");
    var found = false;

    games.forEach(function (game) {
        var gameName = game.querySelector('.name').textContent.toUpperCase(); // Use the class "name"
        if (gameName.includes(input) || input === "") {
            game.style.display = "block";
            found = true;
        } else {
            game.style.display = "none";
        }
    });

    if (!found) {
        showNotification("The term you entered is incorrect");
        playErrorSound();
    }
}

function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(function () {
        notification.style.display = "none";
    }, 5000);
}

function playErrorSound() {
    var errorSound = document.getElementById("errorSound");
    errorSound.play();
}