let fname = document.getElementsByClassName("first_name")[0];
let lname = document.getElementsByClassName("last_name")[0];
let country = document.getElementsByClassName("country")[0];
let playerScore = document.getElementsByClassName("player_score")[0];
let addbtn = document.getElementsByClassName("add_button")[0];
let msg = document.getElementsByClassName('warning_msg')[0];
let scoreboard = document.getElementsByClassName('score_board')[0];

let players = [
    { firstName: "John", lastName: "Doe", country: "USA", score: 85, date: 'JAN 2023: 09:24:44' },
    { firstName: "Jane", lastName: "Smith", country: "Canada", score: 95, date: 'JAN 2023: 09:24:44' },
    { firstName: "Sara", lastName: "Connor", country: "UK", score: 90, date: 'JAN 2023: 09:24:44' },
    { firstName: "Mike", lastName: "Tyson", country: "Australia", score: 80, date: 'JAN 2023: 09:24:44' }
];

addbtn.addEventListener("click", () => {
    if (fname.value == '' || lname.value == '' || country.value == '' || playerScore.value == '') {
        msg.innerText = "All fields are required";
        msg.style.color = "red";
        return;
    }

    let dt = new Date();
    let formattedDate = formatDate(dt);

    let playerData = {
        firstName: fname.value,
        lastName: lname.value,
        country: country.value,
        score: parseInt(playerScore.value),
        date: formattedDate
    };
    players.push(playerData);
    show_score_board(players);
});

function show_score_board(players) {
    scoreboard.innerHTML = '';

    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        let playerDiv = document.createElement("div");
        playerDiv.className = "player";
        playerDiv.innerHTML = `
            <span>${player.firstName}<br><p class="create_his">${player.date}</p></span>
            <span>${player.lastName}</span>
            <span>(${player.country})</span>
            <button class="delete_player"><abbr title="Delete">🗑</abbr></button>
            <button class="increase">+5</button>
            <button class="decrease">-5</button>
            <span>${player.score}</span>`;
        scoreboard.appendChild(playerDiv);
    });

    activateButtons();
}

function activateButtons() {
    let playerElements = document.querySelectorAll('.player');

    playerElements.forEach((playerElement, index) => {
        let deleteButton = playerElement.querySelector('.delete_player');
        let increaseButton = playerElement.querySelector('.increase');
        let decreaseButton = playerElement.querySelector('.decrease');

        deleteButton.addEventListener('click', () => deletePlayer(index));
        increaseButton.addEventListener('click', () => increaseScore(index));
        decreaseButton.addEventListener('click', () => decreaseScore(index));
    });
}

function deletePlayer(index) {
    players.splice(index, 1);
    show_score_board(players);
}

function increaseScore(index) {
    players[index].score += 5;
    show_score_board(players);
}

function decreaseScore(index) {
    players[index].score -= 5;
    show_score_board(players);
}

function formatDate(date) {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0];
    return `${month} ${year}: ${time}`;
}

show_score_board(players);
