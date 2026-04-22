__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Patryk Stafecki 4c"

from models import Student
from models import Subject

class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.grades: list[int] = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int) -> None:
        if not 1 <= grade <= 6:
            raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)

    def get_grades(self) -> List[int]:
        return self.grades

    def get_average(self) -> float:
        return round(sum(self.grades) / len(self.grades), 2)