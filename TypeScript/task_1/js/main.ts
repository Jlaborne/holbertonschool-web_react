interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [attribute: string]: any;
}

interface Directors extends Teacher {
  numberOfReports: number;
}

function printTeacher(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}. ${lastName}`;
}

interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}

// Interface for the class instance
interface StudentClassInterface {
  workOnHomework(): string;
  displayName(): string;
}

// Interface for the constructor
interface StudentConstructor {
  new (firstName: string, lastName: string): StudentClassInterface;
}

// Class implementation
class StudentClass implements StudentClassInterface {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  workOnHomework(): string {
    return "Currently working";
  }

  displayName(): string {
    return this.firstName;
  }
}

//Test part:
const teacher3: Teacher = {
  firstName: "John",
  fullTimeEmployee: false,
  lastName: "Doe",
  location: "London",
  contract: false,
};

console.log(teacher3);

const director1: Directors = {
  firstName: "John",
  lastName: "Doe",
  location: "London",
  fullTimeEmployee: true,
  numberOfReports: 17,
};
console.log(director1);

console.log(printTeacher("John", "Doe"));

const output = document.createElement("pre");
output.textContent =
  JSON.stringify(teacher3, null, 2) +
  "\n\n" +
  JSON.stringify(director1, null, 2) +
  "\n\n" +
  printTeacher("John", "Doe");

document.body.appendChild(output);

const student: StudentClassInterface = new StudentClass("Alice", "Smith");
console.log(student.displayName()); // Alice
console.log(student.workOnHomework()); // Currently working
