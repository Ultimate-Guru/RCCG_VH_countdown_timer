let timerDisplay = document.getElementById('timer');
let programDisplay = document.getElementById('programDisplay');
let openInputBtn = document.getElementById('openInputBtn');
let programSelect = document.getElementById('programSelect');
let interval, isPaused = true, totalTime, programName;
let timeLeft, elapsed = false;

// --- DYNAMIC PROGRAM LIST LOGIC ---
// Default list just in case it's a brand new user
const defaultPrograms = [
    "PRAISE & WORSHIP", "OPEN HEAVENS", "OFFERING & ANNOUCEMENT",
    "OPENING PRAYER", "TESTIMONIES", "HYMN", "CHOIR MINISTRATION",
    "WORSHIP", "SUNDAY SCHOOL", "GENERAL THANKSGIVING",
    "SPECIAL THANKSGIVING", "WORD MINISTRATION", "TITHE & OFFERING",
    "ANNOUCEMENT / FIRST TIMERS", "PICR CHARGE", "CHARGE, FRESH FIRE SERVICE, BIBLE STUDY"
];

// Load saved programs from LocalStorage, or use default if none exist
let savedPrograms = JSON.parse(localStorage.getItem('rccgPrograms')) || defaultPrograms;

// Function to build the dropdown list AND the manager list
function renderPrograms() {
    // 1. Build the dropdown options
    programSelect.innerHTML = '';
    savedPrograms.forEach(prog => {
        let opt = document.createElement('option');
        opt.value = prog;
        opt.innerText = prog;
        programSelect.appendChild(opt);
    });

    // 2. Build the Manager List
    const listContainer = document.getElementById('programListContainer');
    listContainer.innerHTML = '';
    savedPrograms.forEach((prog, index) => {
        listContainer.innerHTML += `
            <div class="program-item">
                <span>${prog}</span>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editProgram(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteProgram(${index})">Delete</button>
                </div>
            </div>
        `;
    });
}

// Add a new program to the array and save
function addNewProgram() {
    const inputField = document.getElementById('newProgramInput');
    const newName = inputField.value.trim().toUpperCase();

    if (newName && !savedPrograms.includes(newName)) {
        savedPrograms.push(newName);
        saveAndRefresh();
        inputField.value = ""; // clear input
    } else if (savedPrograms.includes(newName)) {
        alert("This program already exists!");
    }
}

// Edit an existing program
function editProgram(index) {
    const currentName = savedPrograms[index];
    const newName = prompt("Edit program name:", currentName);

    if (newName !== null && newName.trim() !== "") {
        savedPrograms[index] = newName.trim().toUpperCase();
        saveAndRefresh();
    }
}

// Delete an existing program
function deleteProgram(index) {
    if (confirm(`Are you sure you want to delete "${savedPrograms[index]}"?`)) {
        savedPrograms.splice(index, 1);
        saveAndRefresh();
    }
}

// Helper to save to browser storage and re-render
function saveAndRefresh() {
    localStorage.setItem('rccgPrograms', JSON.stringify(savedPrograms));
    renderPrograms();
}

// Toggle the Manager Modal
function toggleManager() {
    const managerModal = document.getElementById('managerModal');
    const modalBg = document.getElementById('modalBg');
    const inputFields = document.getElementById('inputFields');

    if (managerModal.style.display === "none" || managerModal.style.display === "") {
        inputFields.style.display = "none"; // Hide main inputs if open
        managerModal.style.display = "flex";
        modalBg.style.display = "block";
        openInputBtn.innerText = "Open Timer";
    } else {
        managerModal.style.display = "none";
        modalBg.style.display = "none";
    }
}

// Run this once when the page loads to populate the lists
renderPrograms();
// ----------------------------------------


// Enter Key Listeners
document.getElementById('programName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); startTimer(); }
});
document.getElementById('minutesInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); startTimer(); }
});
document.getElementById('newProgramInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); addNewProgram(); }
});

// Toggle Input Fields visibility
function toggleInput() {
    const inputFields = document.getElementById('inputFields');
    const managerModal = document.getElementById('managerModal');
    const modalBg = document.getElementById('modalBg');

    if (inputFields.style.display === "none" || inputFields.style.display === "") {
        managerModal.style.display = "none"; // Hide manager if open
        inputFields.style.display = "flex";
        modalBg.style.display = "block";
        openInputBtn.innerText = "Close Timer";
    } else {
        inputFields.style.display = "none";
        modalBg.style.display = "none";
        openInputBtn.innerText = "Open Timer";
    }
}

// Set program name from dropdown or input field
function setProgramName() {
    programName = programSelect.value.toUpperCase();
    document.getElementById('programName').value = programName;
    programDisplay.innerText = programName;
    programSelect.style.display = "none";
}

// Filter options based on input
function filterOptions() {
    const input = document.getElementById('programName').value.toLowerCase();
    programSelect.style.display = "block";
    const options = programSelect.options;
    let hasMatch = false;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value.toLowerCase().startsWith(input)) {
            options[i].style.display = "block";
            hasMatch = true;
        } else {
            options[i].style.display = "none";
        }
    }
    if (!hasMatch) {
        programSelect.style.display = "none";
    }
}

// Start the timer
function startTimer() {
    const footerName = document.getElementById('copy').innerText;
    const requiredName = "Developed by Rccg Victory House Festac Media Team";

    if (footerName !== requiredName) {
        alert("Application cannot proceed. Contact Emmanuel 08022792012 or Segun 08035750946");
        return;
    }

    let minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    programName = (document.getElementById('programName').value || "Program").toUpperCase();

    if (minutes < 1) {
        alert('Please enter valid minutes.');
        return;
    }

    document.body.classList.remove('time-up');

    document.getElementById('inputFields').style.display = "none";
    document.getElementById('modalBg').style.display = "none";
    openInputBtn.innerText = "Open Timer";

    totalTime = minutes * 60;
    timeLeft = totalTime;
    elapsed = false;
    programDisplay.innerText = programName;

    updateDisplay();
    isPaused = false;

    document.getElementById('pauseResumeBtn').style.display = "inline-flex";
    document.getElementById('resetBtn').style.display = "inline-flex";

    if (interval) clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
}

// Pause or Resume the timer
function pauseResume() {
    isPaused = !isPaused;
    document.getElementById('pauseResumeBtn').innerText = isPaused ? "Resume" : "Pause";
    if (isPaused) {
        clearInterval(interval);
    } else {
        interval = setInterval(updateTimer, 1000);
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(interval);
    timeLeft = 0;

    timerDisplay.innerText = "00:00";
    programDisplay.innerText = programName || "";

    isPaused = true;
    document.getElementById('pauseResumeBtn').style.display = "none";
    document.getElementById('resetBtn').style.display = "none";
    document.body.classList.remove('time-up');
}

// Update the timer display
function updateTimer() {
    if (!isPaused) {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            document.body.classList.add('time-up');
            elapsed = true;
        }
    }
}

// Update the timer display format
function updateDisplay() {
    const minutes = Math.floor(Math.abs(timeLeft) / 60);
    const seconds = Math.abs(timeLeft % 60);
    const prefix = timeLeft < 0 ? '-' : '';

    timerDisplay.innerText = `${prefix}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 0) {
        programDisplay.innerHTML = `<span class="time-up-text">TIME IS UP</span>`;
    } else {
        programDisplay.innerText = programName;
    }
}