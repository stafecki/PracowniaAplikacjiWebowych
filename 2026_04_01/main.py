from models.student import Student
from utils.loaders import load_students, load_courses

def main() -> None:
    students: dict[int, Student] = load_students("source_files/students_example.txt")
    load_courses("source_files/courses_example.txt", students)

    for student in students.values():
        print(student)
        student.save_to_file()

if __name__ == "__main__":
    main()