import React, { useState } from 'react';
// ... שאר ה-imports

function App() {}
  const [persona, setPersona] = useState(null); // 'student' או 'professional'
  const [completedTasks, setCompletedTasks] = useState(0);

  // מאגר משימות לפי פרסונה[cite: 3]
  const tasks = {
    student: [
      { id: 1, title: "להצביע בשיעור", desc: "להשתתף באופן פעיל בכיתה." },
      { id: 2, title: "לשבת בשורה הראשונה", desc: "להראות נוכחות וביטחון." }
    ],
    professional: [
      { id: 3, title: "להוביל נושא בישיבה", desc: "להפגין סמכותיות מקצועית." },
      { id: 4, title: "לתת פידבק לעמית", desc: "תקשורת בינאישית בונה." }
    ]
  };

  // מסך בחירה אם לא נבחרה פרסונה[cite: 3]
  if (!persona) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px', backgroundColor: 'var(--bg-color)' }}>
        <h1>מי אתה היום?</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => setPersona('student')} className="persona-btn">אני תלמיד/ה (נועה)</button>
          <button onClick={() => setPersona('professional')} className="persona-btn">אני מנהל/ת (מיכל)</button>
        </div>
      </div>
    );
  }
