__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Patryk Stafecki 4c"

import json
from models import Subject, Teacher, Grades, Student
from year_grade import year_grade
import datetime

def main():

    teachers: list[Teacher] = []
    subjects: list[Subject] = []
    students: list[Student] = []
    grades: list[Grades] = []

    with open("teachers.txt", "r") as teachers_file:
        for line in teachers_file:
            line = line.strip()
            if not line:
                continue
            parts = line.split(" ")
            if len(parts) == 3:
                teachers.append(Teacher(int(parts[0]), parts[1], parts[2]))

    with open("subjects.txt", "r") as subjects_file:
        for line in subjects_file:
            line = line.strip()
            if not line:
                continue
            parts = line.split(" ")
            if len(parts) == 3:
                teacher: Teacher = next((t for t in teachers if t._id == int(parts[2])), None)
                if teacher is None:
                    continue
                subjects.append(Subject(int(parts[0]), parts[1], teacher))

    with open("students.txt", "r") as students_file:
        for line in students_file:
            line = line.strip()
            if not line:
                continue
            parts = line.split(" ")
            if len(parts) == 4:
                birth_date = datetime.datetime.strptime(parts[3], '%Y-%m-%d').date()
                students.append(Student(int(parts[0]), parts[1], parts[2], birth_date))

    with open("grades.txt", "r") as grades_file:
        for line in grades_file:
            line = line.strip()
            if not line:
                continue
            parts = line.split(" ")
            if len(parts) == 3:
                student: Student = next((s for s in students if s._id == int(parts[0])), None)
                subject: Subject = next((s for s in subjects if s._id == int(parts[1])), None)
                if student is None or subject is None:
                    continue
                g = Grades(student, subject)
                for grade_val in parts[2].split(","):
                    g.add_grade(int(grade_val))
                grades.append(g)

    print("Oceny i średnie poszczególnych uczniów")

    students_json: list[dict] = []

    for student in students:
        print(f"{student}:")
        student_grades = [g for g in grades if g.student._id == student._id]
        student_dict: dict = {str(student): {}}

        for g in student_grades:
            subject_name = g.subject.name
            avg = round(g.get_average(), 2)
            final = year_grade(avg)
            grades_str = ", ".join(str(gr) for gr in g.get_grades())

            print(f"\t{subject_name}:")
            print(f"\t\tOceny: {grades_str}")
            print(f"\t\tŚrednia: {avg}")
            print(f"\t\tOcena końcowa: {final}")

            student_dict[str(student)][subject_name] = {
                "Oceny": grades_str,
                "Srednia": avg,
                "Ocena roczna": final
            }

        students_json.append(student_dict)
        print()

    with open("students.json", "w") as students_json_file:
        json.dump(students_json, students_json_file, indent=4, ensure_ascii=False)

    subjects_json: list[dict] = []

    print("=" * 50)
    print()

    for subject in subjects:
        subject_grades = [g for g in grades if g.subject._id == subject._id]
        all_grade_values: list[int] = []
        for g in subject_grades:
            all_grade_values.extend(g.get_grades())

        avg = round(sum(all_grade_values) / len(all_grade_values), 2) if all_grade_values else 0.0
        grades_str = ", ".join(str(g) for g in all_grade_values)

        print(f"{subject.name}:")
        print(f"\tNauczyciel: {subject.teacher}")
        print(f"\tOceny: {grades_str}")
        print(f"\tŚrednia: {avg}")
        print()

        subjects_json.append({
            subject.name: {
                "Nauczyciel": str(subject.teacher),
                "Oceny": all_grade_values,
                "Srednia": avg
            }
        })

    with open("subjects.json", "w") as subjects_json_file:
        json.dump(subjects_json, subjects_json_file, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    main()