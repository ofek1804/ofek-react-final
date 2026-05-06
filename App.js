import React, { useState, useEffect } from 'react';
import { Layout, Trophy, Target, BarChart3, CheckCircle2, Flame, Circle, User, Settings, LogOut } from 'lucide-react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userName, setUserName] = useState('אופק');
  const [streak, setStreak] = useState(3);
  const [completedTasks, setCompletedTasks] = useState(2);
  const [totalTasks, setTotalTasks] = useState(5);
  const [totalProgress, setTotalProgress] = useState(47); // אחוז התקדמות כללי
  const [level, setLevel] = useState(3);
  const [points, setPoints] = useState(2450);

  // משימות יומיות
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'ליצור קשר עין בשיחה',
      description: 'תרגיל בסיסי לשיפור הביטחון הבינאישי.',
      difficulty: 'קל',
      completed: false,
      points: 50,
      category: 'חברתי'
    },
    {
      id: 2,
      title: 'להציע רעיון בישיבה/כיתה',
      description: 'מתאים במיוחד לשיפור ביטחון בסביבה פורמלית.',
      difficulty: 'בינוני',
      completed: true,
      points: 100,
      category: 'קריירה'
    },
    {
      id: 3,
      title: 'לדבר על עצמי בפני קבוצה',
      description: 'חזקו את הביטחון שלכם בדיבור ציבורי.',
      difficulty: 'קשה',
      completed: false,
      points: 150,
      category: 'ציבורי'
    },
    {
      id: 4,
      title: 'להשלים אתגר של יום קודם',
      description: 'בנו על ההצלחות שלכם.',
      difficulty: 'בינוני',
      completed: true,
      points: 75,
      category: 'כללי'
    },
    {
      id: 5,
      title: 'לשתול משוב חיובי לחברים',
      description: 'למדו להעריך את מסביבכם.',
      difficulty: 'קל',
      completed: false,
      points: 80,
      category: 'חברתי'
    }
  ]);

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'אתגר השבוע: דברו בשיחה לפחות פעמיים',
      description: 'השתתפו בשיחות יומיות ותרגלו דיבור.',
      difficulty: 'בינוני',
      daysLeft: 5,
      reward: 500,
      completed: false
    },
    {
      id: 2,
      title: 'מאתגר האישי: עשו משהו שמעודד אתכם',
      description: 'בחרו משימה שמרגישה בלתי אפשרית וזעזעו אותה.',
      difficulty: 'קשה',
      daysLeft: 2,
      reward: 1000,
      completed: false
    },
    {
      id: 3,
      title: 'רצף של 7 ימים',
      description: 'השלימו לפחות משימה אחת כל יום למשך שבוע.',
      difficulty: 'קל',
      daysLeft: 7,
      reward: 300,
      completed: false
    }
  ]);

  const [progressData, setProgressData] = useState([
    { day: 'ראשון', completed: 4, total: 5 },
    { day: 'שני', completed: 5, total: 5 },
    { day: 'שלישי', completed: 3, total: 5 },
    { day: 'רביעי', completed: 2, total: 5 },
    { day: 'חמישי', completed: 5, total: 5 },
    { day: 'שישי', completed: 4, total: 5 },
    { day: 'שבת', completed: 2, total: 5 }
  ]);

  // טוגל משימה
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (!task.completed) {
      setCompletedTasks(prev => Math.min(prev + 1, totalTasks));
      setPoints(prev => prev + task.points);
    } else {
      setCompletedTasks(prev => Math.max(prev - 1, 0));
      setPoints(prev => Math.max(prev - task.points, 0));
    }
  };

  // טוגל אתגר
  const toggleChallenge = (id) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id 
        ? { ...challenge, completed: !challenge.completed }
        : challenge
    ));
  };

  return (
    <div className="app-container" style={{ direction: 'rtl' }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <h2>BoostMe</h2>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <Layout size={20} />
            <span>דאשבורד</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'challenges' ? 'active' : ''}`}
            onClick={() => setCurrentPage('challenges')}
          >
            <Target size={20} />
            <span>אתגרים</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'progress' ? 'active' : ''}`}
            onClick={() => setCurrentPage('progress')}
          >
            <BarChart3 size={20} />
            <span>התקדמות</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            <User size={20} />
            <span>פרופיל</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>הגדרות</span>
          </button>
          <button className="nav-item logout">
            <LogOut size={20} />
            <span>התנתקות</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* DASHBOARD PAGE */}
        {currentPage === 'dashboard' && (
          <>
            <header className="page-header">
              <h1>היי {userName}, מוכן לבוסט של היום? 🚀</h1>
              <div className="streak-badge">
                <Flame size={24} fill="#ff5722" color="#ff5722" />
                <span>רצף של {streak} ימים!</span>
              </div>
            </header>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon level">LV</div>
                <div className="stat-content">
                  <h3>רמה</h3>
                  <p className="stat-value">{level}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon points">⭐</div>
                <div className="stat-content">
                  <h3>נקודות</h3>
                  <p className="stat-value">{points}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon trophy">🏆</div>
                <div className="stat-content">
                  <h3>הישגים</h3>
                  <p className="stat-value">12</p>
                </div>
              </div>
            </div>

            {/* Daily Progress */}
            <section className="progress-section">
              <h2>ההתקדמות היומית שלך</h2>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  />
                </div>
                <p className="progress-text">{completedTasks} מתוך {totalTasks} משימות הושלמו</p>
              </div>
            </section>

            {/* Daily Tasks */}
            <section className="tasks-section">
              <h2>משימות היום</h2>
              <div className="tasks-list">
                {tasks.map(task => (
                  <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <span className={`difficulty-badge ${task.difficulty.toLowerCase()}`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className="task-description">{task.description}</p>
                    <div className="task-footer">
                      <span className="task-category">{task.category}</span>
                      <div className="task-actions">
                        <span className="points">+{task.points} נק'</span>
                        <button 
                          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                          onClick={() => toggleTask(task.id)}
                        >
                          <CheckCircle2 size={28} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* CHALLENGES PAGE */}
        {currentPage === 'challenges' && (
          <>
            <header className="page-header">
              <h1>אתגרים מיוחדים 🎯</h1>
            </header>

            <section className="challenges-section">
              <div className="challenges-list">
                {challenges.map(challenge => (
                  <div key={challenge.id} className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
                    <div className="challenge-header">
                      <h3>{challenge.title}</h3>
                      <div className="challenge-reward">
                        <Trophy size={20} />
                        <span>+{challenge.reward}</span>
                      </div>
                    </div>
                    <p className="challenge-description">{challenge.description}</p>
                    <div className="challenge-footer">
                      <div className="challenge-meta">
                        <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="days-left">🕐 {challenge.daysLeft} ימים נותרו</span>
                      </div>
                      <button 
                        className={`challenge-button ${challenge.completed ? 'completed' : ''}`}
                        onClick={() => toggleChallenge(challenge.id)}
                      >
                        {challenge.completed ? '✓ בוצע' : 'קבלת האתגר'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* PROGRESS PAGE */}
        {currentPage === 'progress' && (
          <>
            <header className="page-header">
              <h1>התקדמות שלך 📊</h1>
            </header>

            <section className="progress-overview">
              <div className="overview-card">
                <h2>התקדמות כללית</h2>
                <div className="big-progress-bar">
                  <div className="big-progress-fill" style={{ width: `${totalProgress}%` }}></div>
                </div>
                <p>{totalProgress}% השלמה</p>
              </div>
            </section>

            <section className="weekly-stats">
              <h2>סטטיסטיקות שבועיות</h2>
              <div className="weekly-chart">
                {progressData.map((day, index) => (
                  <div key={index} className="day-column">
                    <div className="day-bar">
                      <div 
                        className="day-fill"
                        style={{ height: `${(day.completed / day.total) * 100}%` }}
                      ></div>
                    </div>
                    <label>{day.day}</label>
                    <span className="day-count">{day.completed}/{day.total}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="achievements">
              <h2>הישגים 🏆</h2>
              <div className="achievements-grid">
                <div className="achievement-badge unlocked">
                  <span className="achievement-icon">🔥</span>
                  <span className="achievement-name">מתחיל</span>
                </div>
                <div className="achievement-badge unlocked">
                  <span className="achievement-icon">⭐</span>
                  <span className="achievement-name">נקודה ראשונה</span>
                </div>
                <div className="achievement-badge unlocked">
                  <span className="achievement-icon">🎯</span>
                  <span className="achievement-name">דקוק</span>
                </div>
                <div className="achievement-badge locked">
                  <span className="achievement-icon">👑</span>
                  <span className="achievement-name">מלך</span>
                </div>
              </div>
            </section>
          </>
        )}

        {/* PROFILE PAGE */}
        {currentPage === 'profile' && (
          <>
            <header className="page-header">
              <h1>הפרופיל שלך 👤</h1>
            </header>

            <section className="profile-content">
              <div className="profile-card">
                <div className="profile-avatar">
                  <div className="avatar-placeholder">אופק</div>
                </div>
                <h2>{userName}</h2>
                <p className="member-since">חברה מאז: יוני 2024</p>
              </div>

              <div className="profile-stats">
                <div className="stat-item">
                  <label>משימות שהושלמו</label>
                  <span className="stat-number">47</span>
                </div>
                <div className="stat-item">
                  <label>ימי רצף</label>
                  <span className="stat-number">{streak}</span>
                </div>
                <div className="stat-item">
                  <label>נקודות כוללות</label>
                  <span className="stat-number">{points}</span>
                </div>
                <div className="stat-item">
                  <label>אתגרים שהושלמו</label>
                  <span className="stat-number">8</span>
                </div>
              </div>

              <div className="profile-section">
                <h3>על הפרופיל שלך</h3>
                <div className="profile-info">
                  <p><strong>שם:</strong> {userName}</p>
                  <p><strong>סוג משתמש:</strong> מתחיל</p>
                  <p><strong>עמידה בתרגילים:</strong> יומית</p>
                  <p><strong>ממוקד:</strong> חברתי ו עבודה</p>
                </div>
              </div>

              <div className="profile-section preferences">
                <h3>העדפות</h3>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>קבל תזכורות יומיות</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>הראה הודעות הצלחה</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" />
                  <span>שתף התקדמות ברשתות חברתיות</span>
                </label>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
