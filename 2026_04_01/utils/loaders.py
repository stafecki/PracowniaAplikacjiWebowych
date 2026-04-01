from models.student import Student
from models.course import Course

def load_students(filepath: str) -> dict[int, Student]:
    students: dict[int, Student] = {}
    with open(filepath, encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(",")
            student_id = int(parts[0])
            students[student_id] = Student(student_id, parts[1], parts[2], int(parts[3]))
    return students

def load_courses(filepath: str, students: dict[int, Student]) -> None:
    with open(filepath, encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(",")
            student_id = int(parts[0])
            course_name = parts[1]
            if student_id in students:
                students[student_id].courses.append(Course(student_id, course_name))