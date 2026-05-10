import React from 'react';
import { Layout, Trophy, Target, User, BarChart3 } from 'lucide-react';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar[cite: 2] */}
      <aside style={{ 
        width: '240px', 
        backgroundColor: 'white', 
        padding: '20px',
        borderRight: '1px solid #ddd' 
      }}>
        <h2 style={{ color: 'var(--primary)', fontWeight: 'bold' }}>BoostMe</h2>
        <nav style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <Layout size={20} /> Dashboard
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <Target size={20} /> Challenges
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <BarChart3 size={20} /> Progress
          </div>
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
