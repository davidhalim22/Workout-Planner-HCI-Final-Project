// Get the reference to the calendar element and the month-year display
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');

// Initialize the current date
let currentDate = new Date();

// Function to render the calendar for the given month
function renderCalendar(date) {
    calendar.innerHTML = '';
    
    // Array of days of the week to display at the top
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Loop through the days of the week to display them as headers
    daysOfWeek.forEach(day => {
        const dayName = document.createElement('div');
        dayName.textContent = day; // Set the day name
        dayName.className = 'day-name';
        calendar.appendChild(dayName);
    });

    // Get the first day of the month and the total number of days in the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Add empty cells to align the first day of the month with its correct weekday
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }

    // Loop through and add the actual days of the month
    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = i; // Set the day number
        calendar.appendChild(dayCell);
    }

    // Set the displayed month and year in the format "Month Year"
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Function to navigate to the previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate); // Re-render the calendar with the updated month
}

// Function to navigate to the next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate); // Re-render the calendar with the updated month
}

// Initialize the calendar with the current date
renderCalendar(currentDate);
