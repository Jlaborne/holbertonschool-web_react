import { Teacher } from "./Teacher";

export class Subject {
  teacher: Teacher | undefined;

  setTeacher(teacher: Teacher): void {
    this.teacher = teacher;
  }
}
