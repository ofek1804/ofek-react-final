import React, { useState, useEffect } from 'react';
import {
  Layout,
  Trophy,
  Target,
  BarChart3,
  CheckCircle2,
  Flame,
  Settings,
  LogOut,
  Plus,
  Calendar,
  Award,
  TrendingUp,
  Star,
  Clock,
  Users,
  MessageSquare,
  X,
  Play,
  Pause,
  RotateCcw,
  User
} from 'lucide-react';

function App() {
  const [persona, setPersona] = useState(null); // 'student' or 'professional'
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userName] = useState('אופק');
  const [streak, setStreak] = useState(3);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [level, setLevel] = useState(5);
  const [points, setPoints] = useState(247);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('קל');

  // מאגר משימות לפי פרסונה
  const [tasks, setTasks] = useState({
    student: [
      { id: 1, title: "להצביע בשיעור", desc: "להשתתף באופן פעיל בכיתה.", difficulty: 'קל', completed: false, points: 10, category: 'למידה' },
      { id: 2, title: "לשבת בשורה הראשונה", desc: "להראות נוכחות וביטחון.", difficulty: 'קל', completed: true, points: 15, category: 'ביטחון' },
      { id: 3, title: "לדבר עם חבר בכיתה", desc: "להתחיל שיחה עם מישהו שלא מכיר טוב.", difficulty: 'בינוני', completed: false, points: 20, category: 'חברתי' },
      { id: 4, title: "להעלות שאלה בדיון", desc: "להשתתף באופן אקטיבי בשיעור.", difficulty: 'בינוני', completed: true, points: 25, category: 'למידה' },
      { id: 5, title: "להציג פרויקט בכיתה", desc: "להציג את העבודה שלך מול הכיתה.", difficulty: 'קשה', completed: false, points: 35, category: 'ביטחון' }
    ],
    professional: [
      { id: 6, title: "להוביל נושא בישיבה", desc: "להפגין סמכותיות מקצועית.", difficulty: 'בינוני', completed: false, points: 25, category: 'מנהיגות' },
      { id: 7, title: "לתת פידבק לעמית", desc: "תקשורת בינאישית בונה.", difficulty: 'קל', completed: true, points: 15, category: 'חברתי' },
      { id: 8, title: "להציג רעיון חדש", desc: "לשתף רעיון בצוות ללא פחד.", difficulty: 'קשה', completed: false, points: 30, category: 'יצירתיות' },
      { id: 9, title: "לנהל ישיבה", desc: "להוביל ישיבה בצורה מקצועית.", difficulty: 'קשה', completed: true, points: 40, category: 'מנהיגות' },
      { id: 10, title: "לפנות למנהל", desc: "ליזום שיחה עם ההנהלה.", difficulty: 'בינוני', completed: false, points: 28, category: 'ביטחון' }
    ]
  });

  // אתגרים
  const [challenges] = useState([
    { id: 1, title: "שבוע ללא פחד", desc: "השלם 7 משימות ברציפות", difficulty: 'בינוני', completed: false, reward: 50, daysLeft: 3 },
    { id: 2, title: "מומחה חברתי", desc: "התחל 10 שיחות עם אנשים חדשים", difficulty: 'קשה', completed: true, reward: 75, daysLeft: 0 },
    { id: 3, title: "מנהיג הכיתה", desc: "הובל לפחות 3 דיונים בכיתה", difficulty: 'קשה', completed: false, reward: 100, daysLeft: 7 },
    { id: 4, title: "מאסטר הצגות", desc: "הצג 5 פרויקטים מול קהל", difficulty: 'קשה', completed: false, reward: 120, daysLeft: 14 }
  ]);

  // נתוני התקדמות שבועית
  const [progressData] = useState([
    { day: 'א', completed: 3, total: 4 },
    { day: 'ב', completed: 4, total: 4 },
    { day: 'ג', completed: 2, total: 4 },
    { day: 'ד', completed: 4, total: 4 },
    { day: 'ה', completed: 3, total: 4 },
    { day: 'ו', completed: 1, total: 4 },
    { day: 'ש', completed: 2, total: 4 }
  ]);

  // הישגים
  const [achievements] = useState([
    { id: 1, name: 'מתחיל', icon: '🔥', unlocked: true, desc: 'השלמת המשימה הראשונה' },
    { id: 2, name: 'נקודה ראשונה', icon: '⭐', unlocked: true, desc: 'צברת 10 נקודות' },
    { id: 3, name: 'דקוק', icon: '🎯', unlocked: true, desc: 'השלמת 10 משימות' },
    { id: 4, name: 'רצף ראשון', icon: '🔥', unlocked: true, desc: '3 ימי רצף' },
    { id: 5, name: 'מומחה', icon: '👑', unlocked: false, desc: 'השלמת 50 משימות' },
    { id: 6, name: 'אגדה', icon: '🌟', unlocked: false, desc: 'השלמת 100 משימות' }
  ]);

  // מסך בחירה אם לא נבחרה פרסונה
  if (!persona) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '20px',
        backgroundColor: 'var(--bg-color)',
        fontFamily: 'Segoe UI, sans-serif',
        direction: 'rtl'
      }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '32px', marginBottom: '10px' }}>BoostMe</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '30px' }}>
          אפליקציית ביטחון עצמי
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>היכנס לאפליקציה</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setPersona('student')}
            className="persona-btn"
            style={{
              padding: '15px 40px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            }}
          >
            היכנס
          </button>
        </div>
      </div>
    );
  }

  // פונקציות עזר
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      const personaTasks = newTasks[persona];
      const taskIndex = personaTasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        const task = personaTasks[taskIndex];
        const wasCompleted = task.completed;
        task.completed = !task.completed;

        // עדכון נקודות ורמה
        if (!wasCompleted && task.completed) {
          setPoints(prev => prev + task.points);
          setCompletedTasks(prev => prev + 1);
          // רמה עולה כל 50 נקודות
          if ((points + task.points) % 50 === 0) {
            setLevel(prev => prev + 1);
          }
        } else if (wasCompleted && !task.completed) {
          setPoints(prev => prev - task.points);
          setCompletedTasks(prev => prev - 1);
        }
      }

      return newTasks;
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      newTasks[persona] = newTasks[persona].filter(task => task.id !== taskId);
      return newTasks;
    });
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      desc: newTaskDesc,
      difficulty: newTaskDifficulty,
      completed: false,
      points: newTaskDifficulty === 'קל' ? 10 : newTaskDifficulty === 'בינוני' ? 20 : 30,
      category: 'אישי'
    };

    setTasks(prevTasks => ({
      ...prevTasks,
      [persona]: [...prevTasks[persona], newTask]
    }));

    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDifficulty('קל');
    setShowAddTaskModal(false);
  };

  const toggleChallenge = (challengeId) => {
    // Implementation for challenge completion
    console.log('Toggle challenge:', challengeId);
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'קל': return '#4CAF50';
      case 'בינוני': return '#FF9800';
      case 'קשה': return '#F44336';
      default: return '#666';
    }
  };

  // רינדור התוכן הראשי
  const renderDashboard = () => {
    const personaTasks = tasks[persona] || [];
    const totalTasks = personaTasks.length;
    const completedCount = personaTasks.filter(task => task.completed).length;

    return (
      <>
        <header className="page-header">
          <h1>היי {userName}, מוכן לבוסט של היום? 🚀</h1>
          <div className="streak-badge">
            <Flame size={24} fill="#ff5722" color="#ff5722" />
            <span>רצף של {streak} ימים!</span>
          </div>
        </header>

        {/* התקדמות יומית */}
        <div className="progress-section">
          <h2>ההתקדמות היומית שלך</h2>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              />
            </div>
            <p className="progress-text">{completedCount} מתוך {totalTasks} משימות הושלמו</p>
          </div>
        </div>

        {/* משימות */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">המשימות שלך להיום</h2>
          </div>
          <div className="task-grid">
            {personaTasks.map(task => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
                onClick={() => openTaskModal(task)}
              >
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                  <span
                    className="task-difficulty"
                    style={{
                      backgroundColor: getDifficultyColor(task.difficulty) + '20',
                      color: getDifficultyColor(task.difficulty)
                    }}
                  >
                    {task.difficulty}
                  </span>
                </div>
                <p className="task-description">{task.desc}</p>
                <div className="task-meta">
                  <span><Star size={14} /> {task.points} נקודות</span>
                </div>
                <div className="task-actions">
                  <button
                    className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'} btn-sm`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTaskCompletion(task.id);
                    }}
                  >
                    <CheckCircle2 size={14} />
                    {task.completed ? 'בטל' : 'השלם'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderChallenges = () => (
    <div className="card">
      <h2 className="card-title">אתגרי {persona === 'student' ? 'תלמידים' : 'מקצועיים'}</h2>
      <p>אתגרים מתקדמים לבניית ביטחון עצמי</p>
    </div>
  );

  const renderProgress = () => (
    <div className="card">
      <h2 className="card-title">ההתקדמות שלך</h2>
      <p>עקוב אחר ההישגים והשיפור שלך לאורך זמן</p>
    </div>
  );

  const renderTaskModal = () => {
    if (!showTaskModal || !selectedTask) return null;

    return (
      <div className="modal-overlay" onClick={closeTaskModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{selectedTask.title}</h2>
            <button className="modal-close" onClick={closeTaskModal}>
              <X size={24} />
            </button>
          </div>

          <div className="form-group">
            <p className="task-description" style={{ fontSize: '16px', marginBottom: '20px' }}>
              {selectedTask.desc}
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div>
                <strong>רמת קושי:</strong>
                <span style={{
                  color: getDifficultyColor(selectedTask.difficulty),
                  marginRight: '8px'
                }}>
                  {selectedTask.difficulty}
                </span>
              </div>
              <div>
                <strong>נקודות:</strong> {selectedTask.points}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={closeTaskModal}>
              סגור
            </button>
            <button
              className={`btn ${selectedTask.completed ? 'btn-secondary' : 'btn-success'}`}
              onClick={() => {
                toggleTaskCompletion(selectedTask.id);
                closeTaskModal();
              }}
            >
              <CheckCircle2 size={16} />
              {selectedTask.completed ? 'בטל השלמה' : 'סמן כהושלם'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>BoostMe</h1>
          <p>אפליקציית ביטחון עצמי</p>
        </div>

        <nav className="nav">
          <div
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <Layout size={20} />
            <span>דאשבורד</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'challenges' ? 'active' : ''}`}
            onClick={() => setCurrentPage('challenges')}
          >
            <Target size={20} />
            <span>אתגרים</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'progress' ? 'active' : ''}`}
            onClick={() => setCurrentPage('progress')}
          >
            <BarChart3 size={20} />
            <span>התקדמות</span>
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item" onClick={() => setPersona(null)}>
            <Settings size={20} />
            <span>החלף פרסונה</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'challenges' && renderChallenges()}
        {currentPage === 'progress' && renderProgress()}
      </main>

      {/* Task Modal */}
      {renderTaskModal()}
    </div>
  );
}

export default App;
