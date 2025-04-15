interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "Joshua",
  lastName: "Laborne",
  age: 29,
  location: "Laval",
};

const student2: Student = {
  firstName: "Joshua2",
  lastName: "Laborne2",
  age: 29,
  location: "Rennes",
};

const studentsList: Student[] = [student1, student2];

const table = document.createElement("table");
const tableBody = document.createElement("tbody");

studentsList.forEach((student) => {
  // Create a table row
  const row = document.createElement("tr");

  // Create a cell for first name
  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = student.firstName;

  // Create a cell for location
  const locationCell = document.createElement("td");
  locationCell.textContent = student.location;

  // Add the two cells to the row
  row.appendChild(firstNameCell);
  row.appendChild(locationCell);

  // Add the row to the table body
  tableBody.appendChild(row);
});

table.appendChild(tableBody);
document.body.appendChild(table);
