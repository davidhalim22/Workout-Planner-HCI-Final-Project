// Get the reference to the calendar element and the month-year display
const calendar = document.getElementById('calendar'); // Calendar container
const monthYear = document.getElementById('month-year'); // Display for the current month and year

// Initialize storage for exercises with sample data for testing
const exerciseData = {}; // Object to store exercises by date

// Initialize the current date
let currentDate = new Date(); // Current date used for rendering the calendar

// Function to store exercise in the data structure
function addExerciseToData(month, year, day, exercise) {
    const key = `${year}-${month + 1}`; // Create a unique key for the year and month (1-indexed)
    if (!exerciseData[key]) {
        exerciseData[key] = {}; // Initialize the object for the month if not already present
    }
    if (!exerciseData[key][day]) {
        exerciseData[key][day] = []; // Initialize the array for the day if not already present
    }
    exerciseData[key][day].push(exercise); // Add the exercise to the specified day
}

// Function to get exercises for a specific day
function getExercisesForDay(month, year, day) {
    const key = `${year}-${month + 1}`; // Create a unique key for the year and month (1-indexed)
    return exerciseData[key] && exerciseData[key][day] ? exerciseData[key][day] : []; // Return exercises or an empty array
}

// Function to render the calendar for the given month
function renderCalendar(date) {
    calendar.innerHTML = ''; // Clear the calendar for re-rendering

    // Array of days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Display days of the week as headers
    daysOfWeek.forEach(day => {
        const dayName = document.createElement('div'); // Create a div for each day name
        dayName.textContent = day; // Set the text content to the day's name
        dayName.className = 'day-name'; // Add a CSS class for styling
        calendar.appendChild(dayName); // Append to the calendar
    });

    // Get the first day of the month adjusted for localization
    const firstDay = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7; // First day of the week (adjusted for Sunday start)
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Total days in the month

    // Add empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div'); // Create an empty div
        calendar.appendChild(emptyCell); // Append it to the calendar
    }

    // Loop through the days of the month
    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div'); // Create a div for each day
        dayCell.className = 'day'; // Add a CSS class for styling
        dayCell.textContent = i; // Set the text content to the day's number

        // Add exercises for this day
        const exercises = getExercisesForDay(date.getMonth(), date.getFullYear(), i); // Get exercises for the current day
        exercises.forEach(exercise => {
            const exerciseDiv = document.createElement('div'); // Create a div for each exercise
            exerciseDiv.textContent = exercise; // Set the text content to the exercise name
            exerciseDiv.className = 'exercise-entry'; // Add a CSS class for styling
            dayCell.appendChild(exerciseDiv); // Append to the day's cell
        });

        calendar.appendChild(dayCell); // Append the day's cell to the calendar
    }

    // Set the displayed month and year
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); // Update the display
}

// Function to navigate to the previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1); // Decrement the month
    renderCalendar(currentDate); // Re-render the calendar with the updated month
}

// Function to navigate to the next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1); // Increment the month
    renderCalendar(currentDate); // Re-render the calendar with the updated month
}

// Initialize the calendar with the current date
renderCalendar(currentDate); // Display the calendar for the current date

// Predefined list of exercises
const exercises = ["Push-ups", "Sit-ups", "Squats", "Lunges", "Plank", "Burpees"]; // Exercise options

// Get modal elements
const modal = document.getElementById('exercise-modal'); // Reference to the modal
const closeModal = document.querySelector('.modal .close'); // Close button for the modal
const exerciseList = document.getElementById('exercise-list'); // List container for exercises
const exerciseDay = document.getElementById('exercise-day'); // Dropdown for selecting a day
const addSelectedExercise = document.getElementById('add-selected-exercise'); // Button to add selected exercise

// Track the selected exercise
let selectedExercise = null; // Initialize selected exercise to null

// Populate the modal with exercises
function populateExercises() {
    exerciseList.innerHTML = ''; // Clear any previous entries
    exercises.forEach(exercise => {
        const li = document.createElement('li'); // Create a list item for each exercise
        li.textContent = exercise; // Set the text content to the exercise name
        li.addEventListener('click', () => {
            // Highlight the selected exercise
            document.querySelectorAll('#exercise-list li').forEach(item => item.style.backgroundColor = ''); // Clear highlights
            li.style.backgroundColor = '#d9f7be'; // Highlight the selected exercise
            selectedExercise = exercise; // Update the selected exercise
        });
        exerciseList.appendChild(li); // Append the exercise to the list
    });
}

// Populate the modal with days of the current month
function populateDays() {
    exerciseDay.innerHTML = ''; // Clear previous options
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Total days in the current month
    for (let i = 1; i <= totalDays; i++) {
        const option = document.createElement('option'); // Create an option for each day
        option.value = i; // Set the value to the day's number
        option.textContent = `Day ${i}`; // Set the text content to "Day X"
        exerciseDay.appendChild(option); // Append to the dropdown
    }
}

// Open the modal when clicking "Add Exercise"
document.getElementById('add-exercise').addEventListener('click', () => {
    try {
        if (!modal || !exerciseDay || !exerciseList) {
            throw new Error("Modal elements are not properly initialized."); // Error handling
        }

        populateExercises(); // Populate the exercises
        populateDays(); // Populate the days
        modal.style.display = 'block'; // Display the modal
    } catch (error) {
        console.error("Error opening the modal:", error); // Log the error
        alert("An error occurred while opening the modal. Please try again."); // Show an alert to the user
    }
});

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
    selectedExercise = null; // Reset the selected exercise
});

// Add the selected exercise to the calendar
addSelectedExercise.addEventListener('click', () => {
    const selectedDay = exerciseDay.value; // Get the selected day
    if (!selectedDay || isNaN(selectedDay) || selectedDay < 1) {
        alert("Please select a valid day."); // Alert if the day is invalid
        return;
    }

    const selectedMonth = currentDate.getMonth(); // Get the current month
    const selectedYear = currentDate.getFullYear(); // Get the current year

    if (!selectedExercise) {
        alert("Please select an exercise."); // Alert if no exercise is selected
        return;
    }

    // Store the exercise
    addExerciseToData(selectedMonth, selectedYear, selectedDay, selectedExercise); // Add the exercise to the data structure

    // Re-render the calendar to reflect the changes
    renderCalendar(currentDate); // Update the calendar

    // Close the modal and reset
    modal.style.display = 'none'; // Hide the modal
    selectedExercise = null; // Reset the selected exercise
});