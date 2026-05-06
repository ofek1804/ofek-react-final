import React, { useState } from 'react';
import { Layout, Trophy, Target, BarChart3, CheckCircle2, Flame } from 'lucide-react';

function App() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const totalTasks = 5; // יעד יומי

  return (
    <div style={{ display: 'flex', minHeight: '100vh', direction: 'rtl', fontFamily: 'Arial' }}>
      {/* Sidebar - ניווט */}
      <aside style={{ width: '240px', backgroundColor: 'white', padding: '20px', borderLeft: '1px solid #ddd' }}>
        <h2 style={{ color: 'var(--primary)', fontWeight: 'bold', textAlign: 'center' }}>BoostMe</h2>
        <nav style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="nav-item active"><Layout size={20} /> דאשבורד</div>
          <div className="nav-item"><Target size={20} /> אתגרים</div>
          <div className="nav-item"><BarChart3 size={20} /> התקדמות</div>
        </nav>
      </aside>

      {/* Main Content[cite: 2] */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>היי אופק, מוכן לבוסט של היום?</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff5722' }}>
            <Flame fill="#ff5722" />
            <span style={{ fontWeight: 'bold' }}>רצף של 3 ימים!</span> 
          </div>
        </header>

        {/* Progress Tracker - גרף התקדמות[cite: 2] */}
        <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--radius)', marginBottom: '30px', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ marginTop: 0 }}>ההתקדמות היומית שלך[cite: 3]</h3>
          <div style={{ width: '100%', height: '12px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', margin: '15px 0' }}>
            <div style={{ 
              width: `${(completedTasks / totalTasks) * 100}%`, 
              height: '100%', 
              backgroundColor: 'var(--primary)', 
              transition: 'width 0.5s ease-in-out' 
            }} />
          </div>
          <p>{completedTasks} מתוך {totalTasks} משימות הושלמו</p>
        </section>

        {/* Task List - רשימת אתגרים[cite: 3] */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <div className="task-card">
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>ליצור קשר עין בשיחה</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>תרגיל בסיסי לשיפור הביטחון הבינאישי.</p>
            </div>
            <button 
              onClick={() => setCompletedTasks(prev => Math.min(prev + 1, totalTasks))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
            >
              <CheckCircle2 size={32} />
            </button>
          </div>

          <div className="task-card">
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>להציע רעיון בישיבה/כיתה</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>מתאים במיוחד לפרסונות כמו נועה ומיכל[cite: 3].</p>
            </div>
            <button 
              onClick={() => setCompletedTasks(prev => Math.min(prev + 1, totalTasks))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
            >
              <CheckCircle2 size={32} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
