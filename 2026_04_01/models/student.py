from models.course import Course

class Student:
    def __init__(self, id: int, name: str, surname: str, age: int) -> None:
        self.id = id
        self.name = name
        self.surname = surname
        self.age = age
        self.courses: list[Course] = []

    def __str__(self) -> str:
        courses_str: str = ", ".join(str(c) for c in self.courses)
        return f"{self.name} {self.surname} ({self.age} lat): {courses_str}"

    def save_to_file(self) -> None:
        filename:str = f"result_files/{self.name.lower()}_{self.surname.lower()}.txt"
        with open(filename, "w") as file:
            file.write("Kursy:\n")
            for i in range(len(self.courses)):
                course = self.courses[i]
                comma = ","
                if i == len(self.courses) - 1:
                    comma = ""
                file.write(f"- {str(course)}{comma}\n")
