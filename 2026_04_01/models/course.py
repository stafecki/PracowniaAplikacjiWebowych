class Course:
    def __init__(self, studentId: int, courseName: str) -> None:
        self.studentId = studentId
        self.courseName = courseName

    def __str__(self) -> str:
        return self.courseName