// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readline = require('readline-sync');

function read_matrix() {
    let rows = parseInt(readline.question('Enter number of rows: '));
    let cols = parseInt(readline.question('Enter number of columns: '));

    let matrix = [];  

    for (let i = 0; i < rows; i++) {
        let row_values = readline.question(`Enter row ${i}: `);
        let row = row_values.split(' ').map(Number);
        matrix.push(row);
    }

    return matrix;
}

function print_matrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

function transpose_matrix(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let transposed = [];

    for (let c = 0; c < cols; c++) {
        let new_row = [];
        for (let r = 0; r < rows; r++) {
            new_row.push(matrix[r][c]);
        }
        transposed.push(new_row);
    }

    return transposed;
}

function add_matrix(matA, matB) {
    let rowA = matA.length;
    let colA = matA[0].length;
    let rowB = matB.length;
    let colB = matB[0].length;

    if (rowA !== rowB || colA !== colB) {
        console.log('Error: matrices provided do not have the same dimensions!');
        return null;
    }

    let sum = [];

    for (let i = 0; i < rowA; i++) {
        let new_sum_row = [];
        for (let j = 0; j < colA; j++) {
            new_sum_row.push(matA[i][j] + matB[i][j]);
        }
        sum.push(new_sum_row);
    }

    return sum;
}


function mult_matrix(matA, matB) {
    let rowA = matA.length;
    let colA = matA[0].length;
    let rowB = matB.length;
    let colB = matB[0].length;

    if (colA !== rowB) {
        console.log('Error: column and rows of the respective matrices are not compatible!');
        return null;
    }

    let product = [];

    for (let i = 0; i < rowA; i++) {
        let new_product_row = [];
        for (let j = 0; j < colB; j++) {
            let mid_sum = 0;
            for (let k = 0; k < colA; k++) {
                mid_sum += matA[i][k] * matB[k][j];
            }
            new_product_row.push(mid_sum);
        }
        product.push(new_product_row);
    }

    return product;
}

let this_matrix = read_matrix();
let this_trn_matrix = transpose_matrix(this_matrix);

print_matrix(this_trn_matrix);

console.log('Enter matrix A: ');
let thisMatrixA = read_matrix();

console.log('Enter matrix B: ');
let thisMatrixB = read_matrix();

let sumMatrix = add_matrix(thisMatrixA, thisMatrixB);

console.log('Sum: ');
print_matrix(sumMatrix);

console.log('Enter matrix C: ');
let thisMatrixC = read_matrix();

console.log('Enter matrix D: ');
let thisMatrixD = read_matrix();

let productMatrix = mult_matrix(thisMatrixC, thisMatrixD);

console.log('Product: ');
print_matrix(productMatrix);

