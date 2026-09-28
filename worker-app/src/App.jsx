import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Shield,
  ShieldAlert,
  Flame,
  Wind,
  Mountain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  User,
  Home,
  BookOpen,
  BarChart3,
  Bell,
  ChevronRight,
  ExternalLink,
  QrCode,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Crosshair,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Eye,
  CheckCheck,
  FileBadge2,
  Info,
  Layers,
  HelpCircle,
  LogOut,
  RefreshCw,
  HardHat,
  Compass,
  Activity,
  Calendar,
  Share2,
  Check
} from 'lucide-react';

const STORAGE_KEY = 'surakshasetu_ar_data_v1';

const INITIAL_DATA = {
  workers: [
    {
      workerId: 'SS-W-001',
      name: 'Rajesh Kumar',
      role: 'Lead Underground Miner',
      department: 'Extraction Operations (Shaft 4B)',
      shift: 'Shift A (06:00 - 14:00)',
      experience: '6 Years',
      mentorId: 'MEN-092',
      mentorName: 'Vikram Singh (Sr. Safety Inspector)',
      bloodGroup: 'O+ Positive',
      emergencyContact: '+91 98765 43210',
      safetyComplianceScore: 94,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
    }
  ],
  modules: [
    {
      moduleId: 'MOD-01',
      name: 'Falling Rock Hazard',
      category: 'Roof & Strata Control',
      icon: 'Mountain',
      description: 'Identify unstable strata roof fractures and loose rock spalling before drilling operations.',
      learningObjective: 'Identify unstable roof conditions and select the correct immediate safety action.',
      status: 'Completed',
      score: 92,
      attempts: 3,
      estimatedTime: '4 mins',
      priority: 'Medium',
      lastCompleted: '2026-09-24T10:15:00.000Z',
      difficulty: 'Intermediate',
      arScene: {
        title: 'Strata Roof Scan - Drift 4 East',
        depth: '-280m Depth Level',
        hudMetrics: { o2: '20.9%', ch4: '0.1%', lux: 28 },
        hazardName: 'Unstable Hanging Wall Fracture',
        hazardDescription: 'Severe tension crack visible between roof bolt rows with rock fragments spalling.',
        correctDecision: 'B',
        options: [
          { key: 'A', text: 'Continue drilling with high-speed water jet under the crack.' },
          { key: 'B', text: 'Evacuate immediate 10m zone, bar off the area, and notify Strata Control team.' },
          { key: 'C', text: 'Attempt to manually pry down the hanging rock wedge with a scaling bar.' }
        ],
        explanation: 'According to DGMS (Directorate General of Mines Safety) guidelines, tension cracks spanning support bolts require immediate barricading and notification of certified strata supervisors.'
      }
    },
    {
      moduleId: 'MOD-02',
      name: 'Underground Conveyor Fire Hazard',
      category: 'Mine Fire Prevention',
      icon: 'Flame',
      description: 'Detect friction smoke on heavy belt idlers and implement emergency mine fire response protocol.',
      learningObjective: 'Identify fire hazards and select the appropriate emergency response.',
      status: 'Completed',
      score: 84,
      attempts: 2,
      estimatedTime: '6 mins',
      priority: 'High',
      lastCompleted: '2026-09-27T14:40:00.000Z',
      difficulty: 'Advanced',
      arScene: {
        title: 'Belt Drive Station 3B',
        depth: '-310m Main Haulage',
        hudMetrics: { o2: '20.4%', ch4: '0.3%', co: '18 ppm', lux: 42 },
        hazardName: 'Overheated Belt Idler Friction Fire',
        hazardDescription: 'Smoldering coal fines accumulation with white smoke emanating from frozen roller bearing.',
        correctDecision: 'B',
        options: [
          { key: 'A', text: 'Pour mineral water from drinking supply onto the bearing to cool it.' },
          { key: 'B', text: 'Activate emergency pull-wire stop, sound evacuation alarm, and deploy ABC dry powder extinguisher.' },
          { key: 'C', text: 'Increase belt conveyor speed to shed flammable coal dust from the roller.' }
        ],
        explanation: 'Friction belt fires create lethal carbon monoxide within minutes underground. Immediate line shutdown via pull-wire stop and specialized dry chemical containment is required before ventilation carries smoke downcast.'
      }
    },
    {
      moduleId: 'MOD-03',
      name: 'Methane Gas Leak & Accumulation',
      category: 'Mine Gas & Ventilation',
      icon: 'Wind',
      description: 'Recognize explosive firedamp (CH4) buildup on multi-gas detector HUD and execute spark-free evacuation.',
      learningObjective: 'Recognize methane/gas warning indicators and select the correct safe response.',
      status: 'Assigned',
      score: 0,
      attempts: 0,
      estimatedTime: '5 mins',
      priority: 'Critical High',
      lastCompleted: null,
      difficulty: 'Critical',
      arScene: {
        title: 'Dead-End Heading - Gallery 7',
        depth: '-340m Development Face',
        hudMetrics: { o2: '19.4%', ch4: '1.85% [ALARM]', co: '2 ppm', lux: 15 },
        hazardName: 'Methane Ingress at Roof Cavity',
        hazardDescription: 'Explosive methane concentration exceeding 1.25% permissible threshold detected near roof pocket with auxiliary fan power trip.',
        correctDecision: 'B',
        options: [
          { key: 'A', text: 'Attempt to restart the electric auxiliary ventilation fan switch directly at the face.' },
          { key: 'B', text: 'Do not touch any electrical switches; retreat immediately to intake airway and alert ventilation supervisor.' },
          { key: 'C', text: 'Wave safety helmet to disperse the gas cloud deeper into the return airway.' }
        ],
        explanation: 'Methane is explosive between 5% and 15%. Arcing switches or friction during fan restart can trigger catastrophic coal dust explosion. DGMS Standard: Evacuate immediately without operating switches if CH4 > 1.25%.'
      }
    }
  ],
  assignments: [
    {
      assignmentId: 'ASN-2026-042',
      workerId: 'SS-W-001',
      moduleId: 'MOD-03',
      moduleName: 'Methane Gas Leak & Accumulation',
      assignedBy: 'Vikram Singh (Safety Mentor)',
      priority: 'High',
      dueDate: '30 September 2026',
      instruction: 'Complete the methane recognition refresher before entering Shaft 4B high-pressure seam on next shift.',
      status: 'Pending'
    },
    {
      assignmentId: 'ASN-2026-038',
      workerId: 'SS-W-001',
      moduleId: 'MOD-02',
      moduleName: 'Underground Conveyor Fire Hazard',
      assignedBy: 'Vikram Singh (Safety Mentor)',
      priority: 'Medium',
      dueDate: '28 September 2026',
      instruction: 'Review idler inspection protocol after your first assessment.',
      status: 'Completed'
    }
  ],
  trainingResults: [
    {
      resultId: 'TR-101',
      workerId: 'SS-W-001',
      moduleId: 'MOD-01',
      moduleName: 'Falling Rock Hazard',
      score: 92,
      attempt: 3,
      responseTime: 11.4,
      mistakes: ['Initial hesitation during roof strata crack triangulation'],
      correctDecision: true,
      completed: true,
      completedAt: '2026-09-24T10:15:00.000Z'
    },
    {
      resultId: 'TR-102',
      workerId: 'SS-W-001',
      moduleId: 'MOD-02',
      moduleName: 'Underground Conveyor Fire Hazard',
      score: 84,
      attempt: 2,
      responseTime: 14.2,
      mistakes: ['Delayed emergency pull-cord activation by 4 seconds'],
      correctDecision: true,
      completed: true,
      completedAt: '2026-09-27T14:40:00.000Z'
    }
  ],
  mentorFeedback: [
    {
      feedbackId: 'FB-901',
      workerId: 'SS-W-001',
      moduleId: 'MOD-02',
      moduleName: 'Underground Conveyor Fire Hazard',
      mentorId: 'MEN-092',
      mentorName: 'Vikram Singh (Safety Mentor)',
      message: 'Good hazard recognition on the belt roller. Make sure to complete the fire emergency response protocol swiftly before your next physical shaft inspection.',
      createdAt: '2026-09-27T16:00:00.000Z',
      isRead: false
    },
    {
      feedbackId: 'FB-889',
      workerId: 'SS-W-001',
      moduleId: 'MOD-01',
      moduleName: 'Falling Rock Hazard',
      mentorId: 'MEN-092',
      mentorName: 'Vikram Singh (Safety Mentor)',
      message: 'Excellent strata visual scanning. Your response time improved from 18s to 11.4s on the third attempt.',
      createdAt: '2026-09-24T11:30:00.000Z',
      isRead: true
    }
  ],
  certificates: [
    {
      certificateId: 'SSA-2026-0001',
      workerId: 'SS-W-001',
      workerName: 'Rajesh Kumar',
      modules: ['Falling Rock Hazard', 'Underground Conveyor Fire Hazard', 'Methane Gas Leak & Accumulation'],
      overallScore: 89,
      issuedBy: 'Vikram Singh (Chief Safety Officer & DGMS Nominee)',
      company: 'Central Mining & Mineral Safety Directorate',
      issueDate: '30/09/2026',
      expiryDate: '30/09/2027',
      status: 'Qualified (Pending Final Methane Check)',
      verificationCode: 'SSA-2026-0001'
    }
  ],
  notifications: [
    {
      id: 'NOTIF-01',
      title: 'New Methane Training Assigned',
      message: 'Safety Mentor assigned Methane Gas Leak module. Due Sept 30.',
      time: '2 hours ago',
      read: false,
      type: 'assignment'
    },
    {
      id: 'NOTIF-02',
      title: 'Mentor Feedback Received',
      message: 'Vikram Singh reviewed your Conveyor Fire Hazard simulation score (84%).',
      time: 'Yesterday',
      read: false,
      type: 'feedback'
    },
    {
      id: 'NOTIF-03',
      title: 'Roof Strata Module Completed',
      message: 'Falling Rock Hazard module passed with 92% accuracy.',
      time: '4 days ago',
      read: true,
      type: 'success'
    }
  ]
};

const loadStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading localStorage, using initial mock data:', err);
    return INITIAL_DATA;
  }
};

const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed saving to localStorage:', err);
  }
};

export default function App() {
  const [data, setData] = useState(loadStoredData);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'training' | 'progress' | 'certificates' | 'profile'
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeARModule, setActiveARModule] = useState(null); // active module object during AR
  const [viewingCertificate, setViewingCertificate] = useState(null);
  const [showQRModal, setShowQRModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Sync state to localStorage whenever modified
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  // Quick reset for judge demonstration
  const handleResetDatabase = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(INITIAL_DATA);
    showToast('Platform reset to initial demo state!');
  };

  const currentWorker = data.workers[0];
  const completedCount = data.modules.filter((m) => m.status === 'Completed').length;
  const totalModules = data.modules.length;
  const completedScores = data.modules.filter((m) => m.status === 'Completed').map((m) => m.score);
  const overallScoreAvg =
    completedScores.length > 0
      ? Math.round(completedScores.reduce((a, b) => a + b, 0) / completedScores.length)
      : 0;

  const unreadNotifCount = data.notifications.filter((n) => !n.read).length;

  // Mark all notifications read
  const markNotificationsRead = () => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true }))
    }));
  };

  // Callback when AR module completes
  const handleCompleteAR = (resultData) => {
    const { moduleId, score, mistakes, responseTime, correctDecision } = resultData;

    setData((prev) => {
      // Update module
      const updatedModules = prev.modules.map((m) => {
        if (m.moduleId === moduleId) {
          return {
            ...m,
            status: 'Completed',
            score: Math.max(m.score, score),
            attempts: m.attempts + 1,
            lastCompleted: new Date().toISOString()
          };
        }
        return m;
      });

      // Update assignments if any
      const updatedAssignments = prev.assignments.map((a) => {
        if (a.moduleId === moduleId) {
          return { ...a, status: 'Completed' };
        }
        return a;
      });

      // Insert new training result
      const newResult = {
        resultId: `TR-${Date.now().toString().slice(-4)}`,
        workerId: currentWorker.workerId,
        moduleId,
        moduleName: prev.modules.find((m) => m.moduleId === moduleId)?.name || 'Safety Module',
        score,
        attempt: (prev.modules.find((m) => m.moduleId === moduleId)?.attempts || 0) + 1,
        responseTime,
        mistakes,
        correctDecision,
        completed: true,
        completedAt: new Date().toISOString()
      };

      // Add Notification
      const newNotif = {
        id: `NOTIF-${Date.now().toString().slice(-4)}`,
        title: `Module Completed: ${newResult.moduleName}`,
        message: `Scored ${score}% in ${responseTime}s. Performance transmitted to Mentor Vikram Singh.`,
        time: 'Just now',
        read: false,
        type: 'success'
      };

      // Check if all 3 are completed, unlock certificate
      const allDone = updatedModules.every((m) => m.status === 'Completed');
      let updatedCerts = [...prev.certificates];
      if (allDone && updatedCerts.length > 0) {
        updatedCerts = updatedCerts.map((c) => ({
          ...c,
          status: 'Full Competency Certified',
          overallScore: Math.round(
            updatedModules.reduce((acc, curr) => acc + curr.score, 0) / updatedModules.length
          )
        }));
      }

      return {
        ...prev,
        modules: updatedModules,
        assignments: updatedAssignments,
        trainingResults: [newResult, ...prev.trainingResults],
        notifications: [newNotif, ...prev.notifications],
        certificates: updatedCerts
      };
    });

    showToast(`Simulation complete! Logged score: ${score}% to Shared Safety Records.`);
    setActiveARModule(null);
    setActiveTab('progress');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Presentation Mode Controller Banner */}
      <header className="bg-[#0b1220] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-slate-300 font-semibold tracking-wider">
            SURAKSHASETU AR
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-orange-950/80 text-orange-400 border border-orange-800/60 font-mono text-[10px]">
            WORKER RUNTIME v2.4 (DGMS-SPEC)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile frame toggle for desktop presentation */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Toggle presentation device simulator"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden md:inline">Expand Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden md:inline">Mobile Frame Preview</span>
              </>
            )}
          </button>

          {/* Quick reset database button for demonstration */}
          <button
            onClick={handleResetDatabase}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 transition"
            title="Re-seed initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Mock Data</span>
          </button>
        </div>
      </header>

      {/* Main View Wrapper with Mobile Frame Support */}
      <main className="flex-1 flex justify-center items-stretch p-0 sm:p-4 overflow-y-auto">
        <div
          className={`w-full transition-all duration-300 flex flex-col bg-[#0d1527] relative ${
            isMobileFrame
              ? 'max-w-md my-0 sm:my-2 rounded-none sm:rounded-3xl border-0 sm:border-8 border-slate-800 shadow-2xl min-h-[780px] max-h-[880px] overflow-hidden'
              : 'max-w-3xl rounded-none sm:rounded-xl border-x-0 sm:border border-slate-800/80 shadow-xl'
          }`}
        >
          {/* In-App Industrial Header */}
          <div className="bg-[#0b1324] border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-orange-400/40">
                  <HardHat className="w-6 h-6 text-slate-950 font-black" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0b1324]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                    SURAKSHASETU AR
                  </h1>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
                    MINE-TECH
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="text-slate-200 font-medium">{currentWorker.name}</span>
                  <span className="text-slate-600">•</span>
                  <span className="font-mono text-[11px] text-orange-400/90">{currentWorker.workerId}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications && unreadNotifCount > 0) {
                      markNotificationsRead();
                    }
                  }}
                  className="w-9 h-9 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 flex items-center justify-center text-slate-200 transition relative"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-white font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#0b1324] animate-pulse">
                      {unreadNotifCount}
                    </span>
                  )}
                </button>

                {/* Notifications Drawer Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#0f1a30] border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-orange-400" /> Notifications
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {data.notifications.length} alerts
                      </span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {data.notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/60 hover:border-slate-600 transition"
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200 mb-0.5">
                            <span className="text-orange-400">{notif.title}</span>
                            <span className="text-[9px] text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active View Container */}
          <div className="flex-1 overflow-y-auto pb-24 p-4 space-y-4">
            {activeTab === 'home' && (
              <HomeView
                data={data}
                worker={currentWorker}
                completedCount={completedCount}
                totalModules={totalModules}
                overallScoreAvg={overallScoreAvg}
                onStartTraining={(moduleId) => {
                  const m = data.modules.find((x) => x.moduleId === moduleId);
                  if (m) setActiveARModule(m);
                }}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'training' && (
              <TrainingModulesView
                modules={data.modules}
                onSelectModule={(mod) => setActiveARModule(mod)}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressView
                data={data}
                worker={currentWorker}
                overallScoreAvg={overallScoreAvg}
                completedCount={completedCount}
                totalModules={totalModules}
                onRetrain={(moduleId) => {
                  const m = data.modules.find((x) => x.moduleId === moduleId);
                  if (m) setActiveARModule(m);
                }}
              />
            )}

            {activeTab === 'certificates' && (
              <CertificatesView
                certificates={data.certificates}
                worker={currentWorker}
                completedCount={completedCount}
                totalModules={totalModules}
                overallScoreAvg={overallScoreAvg}
                onViewCert={(cert) => setViewingCertificate(cert)}
                onShowQR={(cert) => setShowQRModal(cert)}
                onGoTraining={() => setActiveTab('training')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                worker={currentWorker}
                modules={data.modules}
                results={data.trainingResults}
                selectedLanguage={selectedLanguage}
                onChangeLanguage={setSelectedLanguage}
                onResetData={handleResetDatabase}
                showToast={showToast}
              />
            )}
          </div>

          {/* Bottom Industrial Navigation */}
          <nav className="absolute bottom-0 left-0 right-0 bg-[#09101d] border-t border-slate-800 px-2 py-1.5 flex items-center justify-around z-40 backdrop-blur-md">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'training', label: 'Training', icon: BookOpen, badge: data.modules.filter(m => m.status === 'Assigned').length },
              { id: 'progress', label: 'Progress', icon: BarChart3 },
              { id: 'certificates', label: 'Certificates', icon: Award },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition relative ${
                    isActive
                      ? 'text-orange-400 bg-orange-950/40 border border-orange-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                    {tab.badge && tab.badge > 0 ? (
                      <span className="absolute -top-1 -right-2 bg-orange-600 text-white font-mono text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                        {tab.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[10px] mt-1 font-medium tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </main>

      {/* AR Simulation Fullscreen Viewport Modal */}
      {activeARModule && (
        <ARViewportExperience
          module={activeARModule}
          worker={currentWorker}
          onClose={() => setActiveARModule(null)}
          onFinish={handleCompleteAR}
        />
      )}

      {/* Certificate Detailed Modal */}
      {viewingCertificate && (
        <CertificateFullModal
          cert={viewingCertificate}
          worker={currentWorker}
          onClose={() => setViewingCertificate(null)}
        />
      )}

      {/* Certificate QR Modal */}
      {showQRModal && (
        <CertificateQRModal
          cert={showQRModal}
          onClose={() => setShowQRModal(null)}
        />
      )}

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-orange-500/80 text-orange-200 px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs backdrop-blur font-medium max-w-sm animate-in fade-in slide-in-from-bottom-4">
          <Activity className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

function HomeView({ data, worker, completedCount, totalModules, overallScoreAvg, onStartTraining, onNavigateTab }) {
  // Find next recommended or pending assignment training
  const pendingAssignment = data.assignments.find((a) => a.status === 'Pending');
  const nextTrainingModule =
    data.modules.find((m) => m.status === 'Assigned') ||
    data.modules.find((m) => m.status === 'Needs Retraining') ||
    data.modules[2];

  const percentComplete = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="space-y-4">
      {/* Industrial Welcome Hero Header */}
      <div className="bg-gradient-to-r from-[#132238] via-[#0f1b2d] to-[#122238] border border-slate-700/80 rounded-2xl p-4 shadow-lg relative overflow-hidden">
        {/* Subtle Hazard Pattern in background */}
        <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none text-slate-100">
          <ShieldAlert className="w-48 h-48" />
        </div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-orange-950/80 text-orange-400 border border-orange-700/50 text-[10px] font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>UNDERGROUND SHAFT 4B • SHIFT ACTIVE</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Welcome back, {worker.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience Safety. Build Competency.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">DGMS COMPLIANCE</span>
            <span className="text-base font-black text-emerald-400 font-mono">
              {worker.safetyComplianceScore}%
            </span>
          </div>
        </div>

        {/* Overall Progress Widget */}
        <div className="mt-4 pt-3 border-t border-slate-700/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-200">Overall Training Progress</span>
            <span className="text-orange-400 font-mono font-bold">{percentComplete}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center text-[11px] font-mono">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[9px]">MODULES</span>
              <span className="font-bold text-white text-xs">
                {completedCount} / {totalModules}
              </span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[9px]">OVERALL SCORE</span>
              <span className="font-bold text-amber-400 text-xs">{overallScoreAvg}%</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[9px]">STATUS</span>
              <span className="font-bold text-emerald-400 text-xs">
                {percentComplete === 100 ? 'Certified' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent NEXT TRAINING Card */}
      {nextTrainingModule && (
        <div className="bg-gradient-to-br from-[#1a140b] via-[#161f2e] to-[#0f1725] border-2 border-orange-500/70 rounded-2xl p-4 shadow-xl shadow-orange-950/30 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded bg-orange-600 text-white font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 uppercase">
              <AlertTriangle className="w-3 h-3" /> NEXT TRAINING
            </span>
            <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5" /> Est. {nextTrainingModule.estimatedTime}
            </span>
          </div>

          <div className="flex items-start gap-3 my-2">
            <div className="p-3 bg-orange-500/20 border border-orange-500/40 rounded-xl text-orange-400">
              <Wind className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white">{nextTrainingModule.name}</h3>
              <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 leading-relaxed">
                {nextTrainingModule.learningObjective}
              </p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-mono">
                <span className="text-orange-400 font-semibold">Priority: {nextTrainingModule.priority}</span>
                <span>•</span>
                <span>Status: {nextTrainingModule.status}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onStartTraining(nextTrainingModule.moduleId)}
            className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 hover:from-orange-600 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition transform active:scale-[0.98]"
          >
            <Crosshair className="w-4 h-4 stroke-[2.5]" />
            <span>START AR TRAINING SIMULATION</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {/* Active Mentor Assignments Alert */}
      {pendingAssignment && (
        <div className="bg-[#121c2e] border border-amber-500/40 rounded-xl p-3.5 flex items-start space-x-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg flex-shrink-0 mt-0.5 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">
                Active Mentor Assignment
              </span>
              <span className="text-slate-400 text-[10px] font-mono">Due: {pendingAssignment.dueDate}</span>
            </div>
            <p className="text-slate-200 font-medium text-xs mt-0.5">{pendingAssignment.moduleName}</p>
            <p className="text-slate-400 text-[11px] mt-1 italic">
              "{pendingAssignment.instruction}"
            </p>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Assigned by: {pendingAssignment.assignedBy}</span>
              <button
                onClick={() => onStartTraining(pendingAssignment.moduleId)}
                className="text-orange-400 hover:text-orange-300 font-bold underline"
              >
                Launch Simulation &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => onNavigateTab('training')}
          className="p-3 bg-[#111c30] hover:bg-[#16243d] border border-slate-700/80 rounded-xl text-left transition group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-orange-400 mb-1.5">
            <BookOpen className="w-5 h-5" />
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">All Modules</div>
          <div className="text-[10px] text-slate-400 mt-0.5">3 AR Scenarios available</div>
        </button>

        <button
          onClick={() => onNavigateTab('progress')}
          className="p-3 bg-[#111c30] hover:bg-[#16243d] border border-slate-700/80 rounded-xl text-left transition group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-orange-400 mb-1.5">
            <BarChart3 className="w-5 h-5" />
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">Safety Analytics</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Response times & AI telemetry</div>
        </button>
      </div>

      {/* Recent Training Result Snippet */}
      {data.trainingResults.length > 0 && (
        <div className="bg-[#0e1726] border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-orange-400" /> Recent Assessment
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {new Date(data.trainingResults[0].completedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-white">{data.trainingResults[0].moduleName}</div>
              <div className="text-[10px] text-slate-400">
                Response Time: <span className="text-slate-200">{data.trainingResults[0].responseTime}s</span> • Attempt #{data.trainingResults[0].attempt}
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-amber-400 font-mono">
                {data.trainingResults[0].score}%
              </span>
              <span className="block text-[9px] text-emerald-400 font-bold uppercase">Passed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TrainingModulesView({ modules, onSelectModule }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Mountain':
        return <Mountain className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            ✓ Completed
          </span>
        );
      case 'Assigned':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-800 animate-pulse">
            • Assigned
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/80 text-blue-400 border border-blue-800">
            In Progress
          </span>
        );
      case 'Needs Retraining':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/80 text-red-400 border border-red-800">
            Retraining
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">AR Safety Training Modules</h2>
          <p className="text-xs text-slate-400">DGMS Standard Underground Mine Curriculum</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
          3 Scenarios
        </span>
      </div>

      <div className="space-y-3">
        {modules.map((mod) => (
          <div
            key={mod.moduleId}
            className="bg-[#101b2d] border border-slate-700/80 hover:border-orange-500/60 rounded-xl p-4 transition shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-800/90 text-orange-400 border border-slate-700">
                  {getIcon(mod.icon)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {mod.category}
                  </span>
                  <h3 className="text-sm font-bold text-white">{mod.name}</h3>
                </div>
              </div>
              <div>{getStatusBadge(mod.status)}</div>
            </div>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{mod.description}</p>

            <div className="mt-3 py-2 px-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] block">BEST SCORE</span>
                <span className={`font-bold ${mod.score > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {mod.score > 0 ? `${mod.score}%` : 'Unrated'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">ATTEMPTS</span>
                <span className="text-slate-200 font-bold">{mod.attempts}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DIFFICULTY</span>
                <span className="text-orange-400 font-semibold">{mod.difficulty}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectModule(mod)}
              className={`w-full mt-3 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition ${
                mod.status === 'Completed'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  : 'bg-orange-500 hover:bg-orange-600 text-slate-950 shadow-md shadow-orange-500/20'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{mod.status === 'Completed' ? 'Review / Retrain AR' : 'Start AR Training'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ARViewportExperience({ module, worker, onClose, onFinish }) {
  // Step progression: 1: Scanning -> 2: Hazard Identified -> 3: Decision Prompt -> 4: Debrief Result
  const [step, setStep] = useState('scan'); // 'scan' | 'inspect' | 'decision' | 'feedback'
  const [scanProgress, setScanProgress] = useState(15);
  const [hazardDetected, setHazardDetected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Timer effect for response time tracking
  useEffect(() => {
    let interval = null;
    if (step === 'decision') {
      const start = Date.now();
      interval = setInterval(() => {
        setElapsedSeconds(((Date.now() - start) / 1000).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Simulated reticle scanning animation
  useEffect(() => {
    if (step === 'scan') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('inspect');
            return 100;
          }
          return prev + 12;
        });
      }, 240);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleHazardClick = () => {
    setHazardDetected(true);
    setTimeout(() => {
      setStep('decision');
      setStartTime(Date.now());
    }, 700);
  };

  const handleSelectAnswer = (optionKey) => {
    setSelectedAnswer(optionKey);
    const finalSeconds = parseFloat(elapsedSeconds) || 8.4;
    const isCorrect = optionKey === module.arScene.correctDecision;
    const calculatedScore = isCorrect
      ? Math.max(75, Math.round(100 - (finalSeconds > 15 ? 12 : finalSeconds * 0.8)))
      : 40;

    // Move to feedback
    setStep('feedback');
  };

  const isCorrect = selectedAnswer === module.arScene.correctDecision;
  const finalScore = isCorrect
    ? Math.max(75, Math.round(100 - (parseFloat(elapsedSeconds) > 15 ? 12 : parseFloat(elapsedSeconds) * 0.8)))
    : 45;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between font-mono select-none overflow-hidden animate-in fade-in">
      {/* Top AR Telemetry Bar */}
      <div className="bg-slate-950/80 backdrop-blur border-b border-orange-500/40 p-3 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <span className="font-bold text-white tracking-widest text-[11px]">
            AR LIVE VIEWPORT • {module.arScene.depth}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[10px]">
          <span className="text-emerald-400 font-bold">O2: {module.arScene.hudMetrics.o2}</span>
          <span className="text-amber-400 font-bold">CH4: {module.arScene.hudMetrics.ch4}</span>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-1 text-slate-400 hover:text-white"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            Exit AR
          </button>
        </div>
      </div>

      {/* Main Simulated AR Camera Viewport Canvas */}
      <div className="relative flex-1 bg-gradient-to-b from-[#0b101d] via-[#101826] to-[#080d18] flex items-center justify-center overflow-hidden">
        {/* Underlay: Realistic Industrial Mining Tunnel Texture / Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 65%), repeating-linear-gradient(0deg, #1e293b 0px, #1e293b 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 1px, transparent 1px, transparent 32px)`
          }}
        />

        {/* Dynamic AR Crosshairs and Compass Indicators */}
        <div className="absolute top-4 left-4 text-[10px] text-orange-400/80 space-y-0.5">
          <div>LOC: DRIFT_4B_EAST_FACE</div>
          <div>BEARING: 042° NE | PITCH: -12°</div>
          <div>OPTIC SENSOR: CALIBRATED (30 FPS)</div>
        </div>

        {/* STEP 1: SCANNING STATE */}
        {step === 'scan' && (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-sm">
            <div className="relative w-36 h-36 border border-orange-500/40 rounded-full flex items-center justify-center animate-pulse">
              <Crosshair className="w-16 h-16 text-orange-500 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-2 border-2 border-dashed border-amber-400/50 rounded-full" />
            </div>
            <div>
              <h3 className="text-white text-base font-bold uppercase tracking-wider">
                Scanning Training Area...
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Point mobile camera at mine walls, roof bolts, and equipment.
              </p>
              <div className="w-48 bg-slate-800 rounded-full h-2 mx-auto mt-3 border border-slate-700 overflow-hidden">
                <div
                  className="bg-orange-500 h-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: HAZARD DETECTED INTERACTION (TAP TO INSPECT) */}
        {step === 'inspect' && (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Interactive Target with bounding box overlay */}
            <div
              onClick={handleHazardClick}
              className={`cursor-pointer transition transform hover:scale-105 p-6 rounded-2xl border-2 border-dashed ${
                hazardDetected
                  ? 'border-red-500 bg-red-950/60 shadow-2xl shadow-red-600/50'
                  : 'border-amber-400 bg-amber-950/40 animate-pulse'
              } flex flex-col items-center max-w-xs text-center`}
            >
              <div className="relative mb-3">
                <AlertTriangle className={`w-14 h-14 ${hazardDetected ? 'text-red-500' : 'text-amber-400'}`} />
                <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold animate-bounce">
                  CRITICAL
                </div>
              </div>

              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {hazardDetected ? '⚠️ HAZARD CONFIRMED' : 'Target Identified'}
              </div>
              <p className="text-[11px] text-slate-300 mt-1 font-sans">
                {module.arScene.hazardName}
              </p>
              <div className="mt-3 px-3 py-1 rounded bg-orange-600 text-slate-950 font-bold text-[10px] uppercase">
                Tap to Inspect Hazard
              </div>
            </div>

            {/* Floating AR Instruction */}
            <div className="absolute bottom-6 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 text-xs font-sans text-center">
              ⚠️ Visual trigger observed. Tap bounding box to assess response.
            </div>
          </div>
        )}

        {/* STEP 3: DECISION PROMPT (WHAT SHOULD YOU DO?) */}
        {step === 'decision' && (
          <div className="w-full max-w-lg p-4 space-y-3 animate-in zoom-in-95">
            <div className="bg-[#101b2e] border-2 border-red-500/80 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-red-400 text-xs font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> HAZARD DETECTED
                </span>
                <span className="text-amber-400 font-mono text-xs flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5" /> {elapsedSeconds}s
                </span>
              </div>

              <h4 className="text-white font-bold text-sm mb-1">{module.arScene.hazardName}</h4>
              <p className="text-xs text-slate-300 mb-4 font-sans leading-relaxed">
                {module.arScene.hazardDescription}
              </p>

              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 font-mono">
                What should you do?
              </div>

              <div className="space-y-2">
                {module.arScene.options.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectAnswer(opt.key)}
                    className="w-full text-left p-3 rounded-xl bg-slate-900/90 hover:bg-orange-950/40 border border-slate-700 hover:border-orange-500 text-xs text-slate-200 flex items-start space-x-3 transition group"
                  >
                    <span className="w-6 h-6 rounded-md bg-slate-800 group-hover:bg-orange-500 group-hover:text-slate-950 text-orange-400 font-bold flex items-center justify-center flex-shrink-0 text-xs font-mono">
                      {opt.key}
                    </span>
                    <span className="flex-1 font-sans text-xs pt-0.5 leading-snug">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ASSESSMENT & IMMEDIATE DEBRIEF */}
        {step === 'feedback' && (
          <div className="w-full max-w-md p-4 space-y-3 animate-in fade-in zoom-in-95">
            <div
              className={`rounded-2xl p-4 border-2 shadow-2xl ${
                isCorrect
                  ? 'bg-[#0e2118] border-emerald-500/80 shadow-emerald-950/40'
                  : 'bg-[#241114] border-red-500/80 shadow-red-950/40'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider">
                    {isCorrect ? 'Correct Decision' : 'Hazard Assessment Failed'}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans">
                    {isCorrect
                      ? 'You identified the hazard and selected the appropriate safety response.'
                      : 'Unsafe procedure selected under mining safety standards.'}
                  </p>
                </div>
              </div>

              {/* Assessment Telemetry Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 my-3 p-2 bg-slate-950/60 rounded-xl border border-slate-800 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">SCORE</span>
                  <span className={`text-base font-black ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {finalScore}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">RESPONSE</span>
                  <span className="text-base font-bold text-amber-400">{elapsedSeconds}s</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">COMPLIANCE</span>
                  <span className="text-base font-bold text-slate-200">
                    {isCorrect ? 'PASS' : 'RETEST'}
                  </span>
                </div>
              </div>

              {/* DGMS Standards Debrief Text */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
                <span className="font-bold text-orange-400 font-mono block text-[10px] uppercase mb-1">
                  Safety Protocol Justification:
                </span>
                {module.arScene.explanation}
              </div>

              {/* Continue button to record result */}
              <button
                onClick={() =>
                  onFinish({
                    moduleId: module.moduleId,
                    score: finalScore,
                    responseTime: parseFloat(elapsedSeconds) || 9.2,
                    mistakes: isCorrect ? [] : ['Selected non-compliant response under hazard pressure'],
                    correctDecision: isCorrect
                  })
                }
                className="w-full mt-4 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-lg shadow-orange-500/20"
              >
                <span>RECORD PERFORMANCE & CONTINUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom AR Controls HUD */}
      <div className="bg-slate-950/90 border-t border-slate-800 p-2.5 px-4 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-orange-500" />
          <span>SCENE: {module.arScene.title}</span>
        </div>
        <div className="font-mono text-slate-500">
          OPERATOR: {worker.workerId}
        </div>
      </div>
    </div>
  );
}

function ProgressView({ data, worker, overallScoreAvg, completedCount, totalModules, onRetrain }) {
  // Aggregate stats
  const totalAttempts = data.trainingResults.reduce((acc, curr) => acc + curr.attempt, 0);
  const correctCount = data.trainingResults.filter((r) => r.correctDecision).length;
  const incorrectCount = data.trainingResults.length - correctCount;
  const avgResponseTime = (
    data.trainingResults.reduce((acc, curr) => acc + curr.responseTime, 0) /
    (data.trainingResults.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Worker Competency Analytics</h2>
          <p className="text-xs text-slate-400">Individual Mining Safety Index</p>
        </div>
        <span className="px-2.5 py-1 rounded bg-orange-950/80 text-orange-400 border border-orange-800/80 text-[10px] font-mono font-bold">
          COMPETENCY: LEVEL 2
        </span>
      </div>

      {/* Key Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-[#101b2d] p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-mono">AVG RESPONSE</span>
          <span className="text-lg font-bold text-amber-400 font-mono mt-0.5 block">
            {avgResponseTime}s
          </span>
          <span className="text-[9px] text-emerald-400 font-mono">Benchmark: &lt; 15s</span>
        </div>

        <div className="bg-[#101b2d] p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-mono">ACCURACY RATE</span>
          <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
            {Math.round((correctCount / (data.trainingResults.length || 1)) * 100)}%
          </span>
          <span className="text-[9px] text-slate-500 font-mono">{correctCount} of {data.trainingResults.length} correct</span>
        </div>

        <div className="bg-[#101b2d] p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-mono">MODULES PASSED</span>
          <span className="text-lg font-bold text-white font-mono mt-0.5 block">
            {completedCount}/{totalModules}
          </span>
          <span className="text-[9px] text-orange-400 font-mono">{Math.round((completedCount/totalModules)*100)}% Completed</span>
        </div>

        <div className="bg-[#101b2d] p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-mono">SIMULATION RUNS</span>
          <span className="text-lg font-bold text-slate-200 font-mono mt-0.5 block">
            {totalAttempts}
          </span>
          <span className="text-[9px] text-slate-500 font-mono">Total Recorded Attempts</span>
        </div>
      </div>

      {/* Visual Chart: Module Performance Comparison */}
      <div className="bg-[#101b2d] border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-orange-400" /> Score Breakdown by Module
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Threshold: 80%</span>
        </div>

        <div className="space-y-3">
          {data.modules.map((m) => (
            <div key={m.moduleId} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{m.name}</span>
                <span className="font-mono font-bold text-amber-400">
                  {m.score > 0 ? `${m.score}%` : 'Not Attempted'}
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    m.score >= 85
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : m.score >= 70
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-slate-700'
                  }`}
                  style={{ width: `${m.score || 5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Areas to Improve Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Strengths */}
        <div className="bg-[#0e1d2c] border border-emerald-900/60 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Your Strengths</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Rapid roof strata tension crack identification</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Safe-area evacuation decision-making</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Immediate hazard barricading and reporting</span>
            </li>
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="bg-[#1f1618] border border-red-900/60 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Areas to Improve</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Emergency conveyor pull-wire response time</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Multi-gas CH4 threshold recognition (1.25%)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Avoid electrical arcing during ventilation trips</span>
            </li>
          </ul>
        </div>
      </div>

      {/* AI Training Insights Section (Prototype Clearly Labeled) */}
      <div className="bg-gradient-to-br from-[#121c2e] to-[#0c1524] border border-cyan-800/50 rounded-xl p-4 shadow-md relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              AI Training Insights
            </h3>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            PROTOTYPE LOGIC
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          "Based on your 5 telemetry trials across Shaft 4B scenarios: You consistently identify visible roof hazards within 11.4 seconds. However, your decision latency spikes by 24% under smoke and low-lux conditions. Additional practice on the conveyor fire module is recommended before re-assessment."
        </p>

        <div className="mt-2 text-[10px] text-slate-400 italic">
          * Note: Generated via rule-based analytical engine simulating AI telemetry.
        </div>
      </div>

      {/* Mentor Feedback Feed */}
      <div className="bg-[#101b2d] border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <User className="w-4 h-4 text-orange-400" /> Mentor Feedback
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            {data.mentorFeedback.length} entries
          </span>
        </div>

        <div className="space-y-2.5">
          {data.mentorFeedback.map((fb) => (
            <div
              key={fb.feedbackId}
              className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-orange-400">{fb.mentorName}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-300 text-xs italic leading-relaxed">
                "{fb.message}"
              </p>
              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                <span>Module: {fb.moduleName}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" /> Reviewed by Mentor
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificatesView({ certificates, worker, completedCount, totalModules, overallScoreAvg, onViewCert, onShowQR, onGoTraining }) {
  const isFullyCertified = completedCount >= totalModules;
  const cert = certificates[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Competency Certificates</h2>
          <p className="text-xs text-slate-400">DGMS Mining Industry Training Records</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
          ID: {cert.certificateId}
        </span>
      </div>

      {/* Main Certificate Preview Card */}
      <div className="bg-gradient-to-b from-[#132034] via-[#0f1b2d] to-[#0a1220] border-2 border-amber-500/50 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        {/* Watermark seal */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Award className="w-56 h-56 text-amber-400" />
        </div>

        <div className="border border-amber-500/30 p-4 rounded-xl bg-slate-950/40 relative z-10 space-y-3">
          <div className="text-center pb-2 border-b border-slate-800">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block font-bold">
              SURAKSHASETU AR
            </span>
            <h3 className="text-sm font-extrabold text-white tracking-wider uppercase mt-0.5">
              Training Competency Certificate
            </h3>
            <p className="text-[10px] text-slate-400">Industrial & Mining Workplace Safety</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-1">
            <div>
              <span className="text-[9px] text-slate-400 block font-mono">WORKER NAME</span>
              <span className="font-bold text-white text-xs">{worker.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 block font-mono">WORKER ID</span>
              <span className="font-mono text-orange-400 text-xs font-bold">{worker.workerId}</span>
            </div>
          </div>

          {/* Module Verification Checklist */}
          <div className="space-y-1.5 py-1">
            <span className="text-[9px] font-mono text-slate-400 block uppercase">
              Completed Modules:
            </span>
            {cert.modules.map((mName, i) => (
              <div key={i} className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {mName}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">VERIFIED</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[9px] text-slate-400 block font-mono">OVERALL SCORE</span>
              <span className="font-mono text-base font-black text-amber-400">
                {cert.overallScore}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 block font-mono">ISSUED BY</span>
              <span className="text-[11px] text-slate-300 font-medium">{cert.issuedBy}</span>
            </div>
          </div>
        </div>

        {/* Certificate Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
          <button
            onClick={() => onViewCert(cert)}
            className="py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md shadow-orange-500/20"
          >
            <Eye className="w-4 h-4" />
            <span>VIEW CERTIFICATE</span>
          </button>

          <button
            onClick={() => onShowQR(cert)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5"
          >
            <QrCode className="w-4 h-4 text-orange-400" />
            <span>SHOW QR</span>
          </button>
        </div>
      </div>

      {/* Verification Notice */}
      <div className="p-3 bg-[#101b2d] border border-slate-800 rounded-xl text-xs flex items-start space-x-3">
        <Info className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="text-slate-400 text-[11px] leading-relaxed">
          <span className="font-bold text-slate-200 block mb-0.5">DGMS Regulatory Compliance</span>
          This Training Competency Certificate validates experiential hazard identification in simulated underground conditions. Mentors can verify authentic SHA-256 signatures via the Mentor Dashboard.
        </div>
      </div>
    </div>
  );
}

function CertificateFullModal({ cert, worker, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0b1220] border-2 border-amber-500 max-w-lg w-full rounded-2xl p-6 text-slate-200 shadow-2xl relative overflow-hidden">
        {/* Guilloche Border Effect Frame */}
        <div className="border-4 border-double border-amber-500/60 p-4 rounded-xl relative">
          <div className="text-center space-y-1 pb-3 border-b border-slate-700">
            <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase font-black">
              SURAKSHASETU AR INDUSTRIAL SAFETY FOUNDATION
            </span>
            <h2 className="text-lg font-black text-amber-400 uppercase tracking-wider">
              Training Competency Certificate
            </h2>
            <p className="text-[10px] text-slate-400">
              Conferred pursuant to DGMS Mining Competency Directive
            </p>
          </div>

          <div className="my-4 text-center space-y-1">
            <p className="text-xs text-slate-400">This certifies that</p>
            <h3 className="text-xl font-bold text-white tracking-wide">{worker.name}</h3>
            <p className="text-xs font-mono text-orange-400 font-semibold">
              Worker ID: {worker.workerId} • {worker.department}
            </p>
            <p className="text-xs text-slate-300 pt-2 px-4 leading-relaxed font-sans">
              Has successfully fulfilled all experiential safety simulations, demonstrating hazard identification, strata control reaction, and emergency decision protocol with an aggregate score of:
            </p>
            <div className="text-2xl font-black text-amber-400 font-mono pt-1">
              {cert.overallScore}% ACCREDITED
            </div>
          </div>

          <div className="py-2 border-t border-b border-slate-800 text-[11px] space-y-1">
            <span className="font-mono text-slate-400 block text-[9px] uppercase">
              Evaluated Modules:
            </span>
            {cert.modules.map((m, idx) => (
              <div key={idx} className="flex justify-between text-slate-300">
                <span>✓ {m}</span>
                <span className="font-mono text-emerald-400">Certified</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs font-mono">
            <div>
              <span className="text-[9px] text-slate-400 block">ISSUE DATE</span>
              <span className="text-slate-200 font-bold">{cert.issueDate}</span>
            </div>
            <div className="text-center">
              <span className="text-[9px] text-slate-400 block">CERTIFICATE ID</span>
              <span className="text-orange-400 font-bold">{cert.certificateId}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 block">VERIFIED BY</span>
              <span className="text-slate-200 font-bold">Vikram Singh (Mentor)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 mt-4">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
          >
            Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 text-xs font-bold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CertificateQRModal({ cert, onClose }) {
  const verifyUrl = `/verify/${cert.certificateId}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0f1b2d] border border-amber-500/80 max-w-xs w-full rounded-2xl p-5 text-center shadow-2xl space-y-4">
        <div>
          <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider font-bold">
            SURAKSHASETU AR VERIFICATION
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">Competency QR Scanner</h3>
        </div>

        {/* Clean SVG Scannable QR Graphic */}
        <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
            {/* Corner Markers */}
            <rect x="10" y="10" width="22" height="22" rx="3" />
            <rect x="15" y="15" width="12" height="12" fill="white" />
            <rect x="18" y="18" width="6" height="6" />

            <rect x="68" y="10" width="22" height="22" rx="3" />
            <rect x="73" y="15" width="12" height="12" fill="white" />
            <rect x="76" y="18" width="6" height="6" />

            <rect x="10" y="68" width="22" height="22" rx="3" />
            <rect x="15" y="73" width="12" height="12" fill="white" />
            <rect x="18" y="78" width="6" height="6" />

            {/* Pattern Matrix */}
            <rect x="36" y="14" width="6" height="6" />
            <rect x="46" y="14" width="6" height="6" />
            <rect x="56" y="14" width="6" height="6" />

            <rect x="36" y="24" width="6" height="6" />
            <rect x="46" y="34" width="6" height="6" />
            <rect x="24" y="44" width="6" height="6" />
            <rect x="34" y="44" width="6" height="6" />
            <rect x="54" y="44" width="6" height="6" />
            <rect x="64" y="44" width="6" height="6" />
            <rect x="74" y="44" width="6" height="6" />

            <rect x="44" y="54" width="6" height="6" />
            <rect x="64" y="54" width="6" height="6" />
            <rect x="36" y="64" width="6" height="6" />
            <rect x="46" y="64" width="6" height="6" />
            <rect x="56" y="74" width="6" height="6" />
            <rect x="66" y="74" width="6" height="6" />
            <rect x="76" y="64" width="6" height="6" />
            <rect x="76" y="84" width="6" height="6" />
          </svg>
        </div>

        <div className="space-y-1">
          <div className="font-mono text-xs font-bold text-amber-400">{cert.certificateId}</div>
          <div className="text-[11px] text-slate-300">
            Route: <span className="font-mono text-slate-400">{verifyUrl}</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Scan using mentor terminal to validate cryptographic competency hash.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs uppercase tracking-wider"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ProfileView({ worker, modules, results, selectedLanguage, onChangeLanguage, onResetData, showToast }) {
  return (
    <div className="space-y-4">
      {/* Industrial Profile Card */}
      <div className="bg-[#101b2d] border border-slate-700/80 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-[#0b1322] rounded-[14px] flex items-center justify-center overflow-hidden">
              <User className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{worker.name}</h2>
            <p className="text-xs text-orange-400 font-mono font-semibold">{worker.workerId}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{worker.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block font-mono">DEPARTMENT</span>
            <span className="text-slate-200 font-medium text-[11px]">{worker.department}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-mono">MINING EXPERIENCE</span>
            <span className="text-slate-200 font-medium text-[11px]">{worker.experience}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-mono">ASSIGNED MENTOR</span>
            <span className="text-slate-200 font-medium text-[11px]">{worker.mentorName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-mono">CURRENT SHIFT</span>
            <span className="text-slate-200 font-medium text-[11px]">{worker.shift}</span>
          </div>
        </div>
      </div>

      {/* Operational Safety Records */}
      <div className="bg-[#0f1727] border border-slate-800 rounded-xl p-4 space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-400" /> Operational Safety Records
        </h3>
        <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[9px] text-slate-400 block">LOST TIME ACCIDENTS</span>
            <span className="font-bold text-emerald-400 text-sm">0 (Zero)</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[9px] text-slate-400 block">SIM TRAINING</span>
            <span className="font-bold text-amber-400 text-sm">48 Hrs</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[9px] text-slate-400 block">PPE AUDIT</span>
            <span className="font-bold text-emerald-400 text-sm">100%</span>
          </div>
        </div>
      </div>

      {/* App & Regional Settings */}
      <div className="bg-[#101b2d] border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
        <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform Settings</h3>

        <div className="flex items-center justify-between py-1 border-b border-slate-800">
          <div>
            <span className="font-medium text-slate-200 block">Training Language</span>
            <span className="text-[10px] text-slate-400">Available regional mining dialects</span>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              onChangeLanguage(e.target.value);
              showToast('Language preference updated');
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 font-mono text-xs focus:outline-none focus:border-orange-500"
          >
            <option value="en">English (Official)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="od">ଓଡ଼ିଆ (Odia)</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-800">
          <div>
            <span className="font-medium text-slate-200 block">Audio Sensor Warnings</span>
            <span className="text-[10px] text-slate-400">Auditory siren cues during hazard trigger</span>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <span className="font-medium text-slate-200 block">Shared Mentor Sync</span>
            <span className="text-[10px] text-slate-400">Simulate background data bus over localStorage</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">CONNECTED</span>
        </div>
      </div>

      {/* Reset & Emergency Simulator Actions */}
      <div className="pt-2">
        <button
          onClick={onResetData}
          className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Training Environment</span>
        </button>
      </div>
    </div>
  );
}