const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const gayLabel = document.getElementById("gay-label");
const submitButton = document.getElementById("submit-button");

let selected = false;

// Handle hover movement over progress bar
progressBar.addEventListener("mousemove", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;

    progress.style.width = `${percentage}%`;

    // Hide the "Gay" label once a selection is made
    if (!selected && percentage > 10 && percentage < 90) {
        gayLabel.style.display = "none";
        selected = true;
    }
});

// Reset the state if no interaction
progressBar.addEventListener("mouseleave", () => {
    if (!selected) {
        progress.style.width = "0%";
        gayLabel.style.display = "block"; // Show "Gay" label if not selected
    }
});

// Add hover shake effect to the submit button
submitButton.addEventListener("mouseenter", () => {
    if (!selected) {
        submitButton.classList.add("shaky");
    }
});

submitButton.addEventListener("mouseleave", () => {
    submitButton.classList.remove("shaky");
});
