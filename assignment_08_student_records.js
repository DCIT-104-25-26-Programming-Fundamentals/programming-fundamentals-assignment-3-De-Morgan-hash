// ============================================================================= PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readline = require('readline-sync');

let Students = [];

function add_student() {
    let studentName = readline.question('Student name: ');
    let studentID = parseInt(readline.question('Student ID: '));

    if (isNaN(studentID)) {
        console.log('Error: Invalid student ID.');
        reutrn;
    }

    let score_size = parseInt(readline.question('How many scores? '));
    if (isNaN(score_size) || score_size < 0) {
        console.log('Error: Invalid number of scores.');
        return;
    }

    let Scores = [];
    for (let i = 1; i <= score_size; i++) {
        let current_score = parseFloat(readline.question(`Enter score ${i}: `));
        if (isNaN(current_score)) {
            console.log('Error: Invalid score entered.');
            i--;
            continue;
        }
        Scores.push(current_score);
    }

    let this_Student = {
        name: studentName,
        id: studentID,
        scores: Scores
    };

    Students.push(this_Student);
    console.log(`Student "${this_Student.name}" added successfully.`);
}


function printStudents() {
    if (Students.length === 0) {
        console.log('No student records found.');
        return;
    }

    for (let i = 0; i < Students.length; i++) {
        let S = Students[i];
        let Sum = 0;
        for (let j = 0; j < S.scores.length; j++) {
            Sum += S.scores[j];
        }
        let Avg = S.scores.length > 0 ? (Sum / S.scores.length).toFixed(2) : 'N/A';

        console.log(`Name: ${S.name} | ID: ${S.id} | Scores: ${S.scores.join(' ')} | Average: ${Avg}`);
    }
}


function calcAvg() {
    if (Students.length === 0) {
        console.log('No student records found.');
        return;
    }

    let targetID = parseInt(readline.question('Enter student ID: '));
    if (isNaN(targetID)) {
        console.log('Error: Invalid student ID.');
        return;
    }

    let found = null;
    for (let i = 0; i < Students.length; i++) {
        if (Students[i].id == targetID) {
            found = Students[i];
            break;
        }
    }

    if (!found) {
        console.log('Error: Student ID not found.');
        return;
    }

    if (found.scores.length === 0) {
        console.log(`${found.name} has no scores recorded.`);
        return;
    }

    let Sum = 0;
    for (let i = 0; i < found.scores.length; i++) {
        Sum += found.scores[i];
    }
    let Average = (Sum / found.scores.length).toFixed(2);

    console.log(`${found.name}'s average score: ${Average}`);
}


function RecordMenu() {
    let process = true;

    while (process) {
        console.log('1. Add student');
        console.log('2. Display all students');
        console.log('3. Calculate average score');
        console.log('4. Quit');

        let option = parseInt(readline.question('Enter your choice (1-4): '));

        switch (option) {
            case 1:
                add_student();
                break;
            case 2:
                printStudents();
                break;
            case 3:
                calcAvg();
                break;
            case 4:
                console.log('Goodbye!');
                process = false;
                return;
            default:
                console.log('Error: Invalid choice. Please enter a number between 1 and 4');
                break;
        }
    }
}



RecordMenu();
