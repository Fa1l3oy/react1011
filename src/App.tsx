import { useState } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [courses, setCourses] = useState([]);
  const [gpa, setGpa] = useState(null);

  const gradeToPoint = (g) => {
    switch (g) {
      case "A": return 4.0;
      case "B+": return 3.5;
      case "B": return 3.0;
      case "C+": return 2.5;
      case "C": return 2.0;
      case "D+": return 1.5;
      case "D": return 1.0;
      case "F": return 0.0;
      default: return null; // เช่น W (ถอน)
    }
  };

  const addCourse = () => {
    if (!subject || !grade) return;
    setCourses([...courses, { subject, grade }]);
    setSubject("");
    setGrade("");
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(c => gradeToPoint(c.grade) !== null);
    if (validCourses.length === 0) {
      setGpa(0);
      return;
    }
    const totalPoints = validCourses.reduce(
      (sum, c) => sum + gradeToPoint(c.grade),
      0
    );
    setGpa((totalPoints / validCourses.length).toFixed(2));
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>📘 GPA Calculator</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="ชื่อวิชา"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">เลือกเกรด</option>
            <option>A</option>
            <option>B+</option>
            <option>B</option>
            <option>C+</option>
            <option>C</option>
            <option>D+</option>
            <option>D</option>
            <option>F</option>
            <option>W</option>
          </select>
          <button onClick={addCourse}>เพิ่ม</button>
        </div>

        <ul>
          {courses.map((c, i) => (
            <li key={i} className="course-item">
              <span className={c.grade === "F" ? "fail" : ""}>
                {c.subject} ({c.grade})
              </span>
              <button onClick={() => removeCourse(i)}>ลบ</button>
            </li>
          ))}
        </ul>

        <button onClick={calculateGPA} className="gpa-btn">
          คำนวณ GPA
        </button>

        {gpa !== null && (
          <div className="gpa-result">🎓 GPA = {gpa}</div>
        )}
      </div>
    </div>
  );
}

export default App;
