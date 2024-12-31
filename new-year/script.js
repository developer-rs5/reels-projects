const nextYear = new Date(new Date().getFullYear() + 1, 0, 1);
const weatherDiv = document.getElementById('weather');
const quoteDiv = document.getElementById('quote');
const qrCodeDiv = document.getElementById('qrCode');
let music;

// Festivals data
const festivals = [
    { name: "Makar Sankranti", date: new Date(new Date().getFullYear(), 0, 14) },
    { name: "Republic Day", date: new Date(new Date().getFullYear(), 0, 26) },
    { name: "Holi", date: new Date(new Date().getFullYear(), 2, 8) },
    { name: "Raksha Bandhan", date: new Date(new Date().getFullYear(), 7, 19) },
    { name: "Independence Day", date: new Date(new Date().getFullYear(), 7, 15) },
    { name: "Diwali", date: new Date(new Date().getFullYear(), 10, 12) },
    { name: "Christmas", date: new Date(new Date().getFullYear(), 11, 25) },
];

// Utility function to fetch data
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

// Get the next festival
function getNextFestival() {
    const now = new Date();
    let nextFestival = festivals.find(festival => festival.date > now);

    // If no upcoming festival this year, pick the first one for the next year
    if (!nextFestival) {
        const nextYear = new Date().getFullYear() + 1;
        nextFestival = { ...festivals[0] };
        nextFestival.date = new Date(nextYear, nextFestival.date.getMonth(), nextFestival.date.getDate());
    }

    return nextFestival;
}

// Update the festival countdown
function updateFestivalCountdown() {
    const now = new Date();
    const nextFestival = getNextFestival();
    const diff = nextFestival.date - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000)) / 1000);

    document.getElementById("festival-name").textContent = `Next Festival: ${nextFestival.name}`;
    document.getElementById("festival-timer").textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update the current time and year countdown
function updateTime() {
    const now = new Date();
    const diff = nextYear - now;

    document.getElementById("date").textContent = now.toDateString();
    document.getElementById("time").textContent = now.toLocaleTimeString();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000)) / 1000);

    document.getElementById("days").textContent = `Days: ${days}`;
    document.getElementById("hours").textContent = `Hours: ${hours}`;
    document.getElementById("minutes").textContent = `Minutes: ${minutes}`;
    document.getElementById("seconds").textContent = `Seconds: ${seconds}`;

    const yearProgress = ((now - new Date(now.getFullYear(), 0, 1)) /
        (nextYear - new Date(now.getFullYear(), 0, 1))) * 100;
    document.getElementById("progress").textContent = `Year Progress: ${yearProgress.toFixed(2)}%`;
}

// Fetch a random quote
async function updateQuote() {
    const data = await fetchData("https://api.quotable.io/random");
    quoteDiv.textContent = `"${data.content}" - ${data.author}`;
}

// Fetch weather data
async function updateWeather() {
    const data = await fetchData(
        "https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=auto:ip"
    );
    weatherDiv.textContent = `Current Weather: ${data.current.temp_c}°C, ${data.current.condition.text}`;
}

// Generate QR code
function generateQRCode() {
    const url = `https://chart.googleapis.com/chart?cht=qr&chl=${window.location.href}&chs=200x200`;
    qrCodeDiv.innerHTML = `<img src="${url}" alt="QR Code">`;
}

// Play and stop music
document.getElementById("playMusic").addEventListener("click", () => {
    music = new Audio("https://example.com/path-to-music.mp3");
    music.loop = true;
    music.play();
});

document.getElementById("stopMusic").addEventListener("click", () => {
    if (music) {
        music.pause();
    }
});

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.body.style.setProperty("--bg-color", isDark ? "#111" : "#3498db");
    document.body.style.setProperty("--text-color", isDark ? "#eee" : "#fff");
});

// Start the interval-based updates
setInterval(updateTime, 1000);
setInterval(updateFestivalCountdown, 1000);
