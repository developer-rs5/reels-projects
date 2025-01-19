const ageSpan = document.getElementById("age");
const monthsLeftEl = document.getElementById("months-left");
const daysLeftEl = document.getElementById("days-left");
const hoursLeftEl = document.getElementById("hours-left");
const minutesLeftEl = document.getElementById("minutes-left");
const secondsLeftEl = document.getElementById("seconds-left");
const progressBar = document.querySelector(".progress-bar");

const dob = new Date(2009, 11, 25); // 29 May 2007

function calculateAge() {
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    ageSpan.textContent = `${years} years, ${months} months, ${days} days`;
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextBirthday = new Date(currentYear, dob.getMonth(), dob.getDate());

    if (now > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const diff = nextBirthday - now;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    monthsLeftEl.textContent = months;
    daysLeftEl.textContent = days;
    hoursLeftEl.textContent = hours;
    minutesLeftEl.textContent = minutes;
    secondsLeftEl.textContent = seconds;

    // Progress Bar
    const yearStart = new Date(currentYear, dob.getMonth(), dob.getDate());
    const yearEnd = new Date(currentYear + 1, dob.getMonth(), dob.getDate());
    const totalYearTime = yearEnd - yearStart;
    const elapsedTime = now - yearStart;
    const progress = Math.min((elapsedTime / totalYearTime) * 100, 100);

    progressBar.style.width = `${progress}%`;
}

setInterval(() => {
    calculateAge();
    updateCountdown();
}, 1000);
