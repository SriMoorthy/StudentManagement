document.addEventListener("DOMContentLoaded", () => {
    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            displayStudents(data);
            window.studentData = data; // Store data globally for search and sort functionality
        });
});

function displayStudents(students) {
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    students.forEach(student => {
        let row = tableBody.insertRow();
        let idcell = row.insertCell(0);
        // let imgCell = row.insertCell(0);
        let nameCell = row.insertCell(1);
        let genderCell = row.insertCell(2);
        let classCell = row.insertCell(3);
        let marksCell = row.insertCell(4);
        let passingCell = row.insertCell(5);
        let emailCell = row.insertCell(6);
        // let marksCell = row.insertCell(4);
        // let classCell = row.insertCell(3);
        // let passingCell = row.insertCell(5);
        // let genderCell = row.insertCell(6);

        // imgCell.innerHTML = `<img src="${student.image}" alt="${student.first_name} ${student.last_name}">`;
        idcell.innerHTML = student.id;
        nameCell.innerHTML = `${student.first_name} ${student.last_name}`;
        genderCell.innerHTML = student.gender;
        classCell.innerHTML = student.class;
        marksCell.innerHTML = student.marks;
        passingCell.innerHTML = student.passing ? 'passing' : 'failed'; 
        emailCell.innerHTML = student.email;
        // marksCell.innerHTML = student.marks;
        // classCell.innerHTML = student.class;
        // passingCell.innerHTML = student.passing ? 'passing' : 'failed';
        // genderCell.innerHTML = student.gender;
    });
}


function search() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredStudents = window.studentData.filter(student => {
        return student.first_name.toLowerCase().includes(searchTerm) ||
               student.last_name.toLowerCase().includes(searchTerm) ||
               student.email.toLowerCase().includes(searchTerm);
    });
    displayStudents(filteredStudents);
}

document.getElementById('searchBar').addEventListener('input', search);


function sortByNameAsc() {
    const sortedStudents = [...window.studentData].sort((a, b) => 
        (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name)
    );
    displayStudents(sortedStudents);
}

function sortByNameDesc() {
    const sortedStudents = [...window.studentData].sort((a, b) => 
        (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name)
    );
    displayStudents(sortedStudents);
}

function sortByMarks() {
    const sortedStudents = [...window.studentData].sort((a, b) => a.marks - b.marks);
    displayStudents(sortedStudents);
}

function showPassing() {
    const passingStudents = window.studentData.filter(student => student.passing);
    displayStudents(passingStudents);
}

function sortByClass() {
    const sortedStudents = [...window.studentData].sort((a, b) => a.class - b.class);
    displayStudents(sortedStudents);
}

function sortByGender() {
    const maleStudents = window.studentData.filter(student => student.gender.toLowerCase() === 'male');
    const femaleStudents = window.studentData.filter(student => student.gender.toLowerCase() === 'female');
    
    // Clear the table before appending new rows
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the existing table rows
    
    // Add Male Students first
    let row = tableBody.insertRow();
    row.insertCell(0).innerHTML = '<b>Male Students</b>';
    row.insertCell(1); // Empty cells for alignment
    row.insertCell(2);
    row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);
    row.insertCell(6);
    
    displayStudents(maleStudents);

    // Add Female Students next
    row = tableBody.insertRow();
    row.insertCell(0).innerHTML = '<b>Female Students</b>';
    row.insertCell(1); // Empty cells for alignment
    row.insertCell(2);
    row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);
    row.insertCell(6);
    
    displayStudents(femaleStudents);
}

