# RCCG Victory House - Countdown Timer

A simple web countdown timer built for the **RCCG Victory House Festac Media Team** to manage time during church services and events.

## ⚡ Features

* **Countdown & Overtime:** Counts down your set time and shows negative numbers if a program runs over.
* **Program Manager:** Add, edit, or delete program names. Changes save automatically in your browser.
* **Search / Auto-complete:** Quickly search for service items when starting a timer.
* **Time's Up Alert:** The screen flashes between distinct, solid red shades when time runs out.
* **Credit Check:** The timer will not start if its RCCG Victory House developer credit has been changed or removed.
* **Easy Controls:** Buttons to pause, resume, and reset. Click the running program name or countdown to rename the program or add/remove minutes without restarting the timer.

## 🔄 What Was Improved

Compared to the old single-file version (`rccgvictoryhousetimer.html`), the app was upgraded in three main ways:

1. **Clean Code Structure:** Split the old single file into 3 organized files (`timer.html`, `style.css`, and `main.js`) so it's easier to update and fix.
2. **Better UI & Display:**
   * Modern dark design with better lighting and fonts.
   * Scalable text (`clamp()`) so the numbers look sharp on big screens, TVs, or laptops.
   * A clear, solid-red warning when time runs out.
3. **Improved Popups:** Added dark background overlays so popups are easier to focus on and use during live services.

## 📁 File Structure

├── timer.html      # Main page
├── style.css       # Styles and colors
├── main.js         # Timer logic and storage
└── README.md       # Documentation

## 🚀 How to Use

1. Open `timer.html` in any web browser.
2. Click **Open Timer**, type or pick a program, set the minutes, and click **Start Timer**.
3. While a timer is running, click its program name or countdown. Enter a positive number to add minutes or a negative number to reduce them, then apply the change.
4. Use **Manage Programs** to add or remove default program names.

The credit check is a basic check in the browser code, not secure copy protection. Anyone who edits the cloned source code can also remove the check.

## 👥 Support

Built by **RCCG Victory House Festac Media Team**
