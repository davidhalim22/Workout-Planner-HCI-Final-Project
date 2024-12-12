// Get the reference to the calendar element and the month-year display
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');

// Initialize storage for exercises with sample data for testing
const exerciseData = {
};

// Initialize the current date
let currentDate = new Date();

// Function to store exercise in the data structure
function addExerciseToData(month, year, day, exercise) {
    const key = `${year}-${month + 1}`; // Adjust month to be 1-indexed
    if (!exerciseData[key]) {
        exerciseData[key] = {};
    }
    if (!exerciseData[key][day]) {
        exerciseData[key][day] = [];
    }
    exerciseData[key][day].push(exercise);
}

// Function to get exercises for a specific day
function getExercisesForDay(month, year, day) {
    const key = `${year}-${month + 1}`; // Adjust month to be 1-indexed
    return exerciseData[key] && exerciseData[key][day] ? exerciseData[key][day] : [];
}

// Function to render the calendar for the given month
function renderCalendar(date) {
    calendar.innerHTML = '';

    // Array of days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Display days of the week as headers
    daysOfWeek.forEach(day => {
        const dayName = document.createElement('div');
        dayName.textContent = day;
        dayName.className = 'day-name';
        calendar.appendChild(dayName);
    });

    // Get the first day of the month adjusted for localization
    const firstDay = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Add empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }

    // Loop through the days of the month
    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = i;

        // Add exercises for this day
        const exercises = getExercisesForDay(date.getMonth(), date.getFullYear(), i);
        exercises.forEach(exercise => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.textContent = exercise;
            exerciseDiv.className = 'exercise-entry';
            dayCell.appendChild(exerciseDiv);
        });

        calendar.appendChild(dayCell);
    }

    // Set the displayed month and year
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

// Predefined list of exercises
const exercises = ["Push-ups", "Sit-ups", "Squats", "Lunges", "Plank", "Burpees"];

// Get modal elements
const modal = document.getElementById('exercise-modal');
const closeModal = document.querySelector('.modal .close');
const exerciseList = document.getElementById('exercise-list');
const exerciseDay = document.getElementById('exercise-day');
const addSelectedExercise = document.getElementById('add-selected-exercise');

// Track the selected exercise
let selectedExercise = null;

// Populate the modal with exercises
function populateExercises() {
    exerciseList.innerHTML = ''; // Clear any previous entries
    exercises.forEach(exercise => {
        const li = document.createElement('li');
        li.textContent = exercise;
        li.addEventListener('click', () => {
            // Highlight the selected exercise
            document.querySelectorAll('#exercise-list li').forEach(item => item.style.backgroundColor = '');
            li.style.backgroundColor = '#d9f7be';
            selectedExercise = exercise;
        });
        exerciseList.appendChild(li);
    });
}

// Populate the modal with days of the current month
function populateDays() {
    exerciseDay.innerHTML = ''; // Clear previous options
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Day ${i}`;
        exerciseDay.appendChild(option);
    }
}

// Open the modal when clicking "Add Exercise"
document.getElementById('add-exercise').addEventListener('click', () => {
    try {
        if (!modal || !exerciseDay || !exerciseList) {
            throw new Error("Modal elements are not properly initialized.");
        }

        populateExercises();
        populateDays();
        modal.style.display = 'block';
    } catch (error) {
        console.error("Error opening the modal:", error);
        alert("An error occurred while opening the modal. Please try again.");
    }
});

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    selectedExercise = null;
});

// Add the selected exercise to the calendar
addSelectedExercise.addEventListener('click', () => {
    const selectedDay = exerciseDay.value;
    if (!selectedDay || isNaN(selectedDay) || selectedDay < 1) {
        alert("Please select a valid day.");
        return;
    }

    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();

    if (!selectedExercise) {
        alert("Please select an exercise.");
        return;
    }

    // Store the exercise
    addExerciseToData(selectedMonth, selectedYear, selectedDay, selectedExercise);

    // Re-render the calendar to reflect the changes
    renderCalendar(currentDate);

    // Close the modal and reset
    modal.style.display = 'none';
    selectedExercise = null;
});
