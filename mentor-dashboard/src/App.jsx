import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  HardHat,
  AlertTriangle,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Wind,
  Mountain,
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  Send,
  RefreshCw,
  QrCode,
  Download,
  Printer,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Bell,
  Sliders,
  ExternalLink,
  X,
  AlertCircle,
  FileCheck,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const STORAGE_KEYS = {
  WORKERS: 'suraksha_workers',
  MODULES: 'suraksha_modules',
  ASSIGNMENTS: 'suraksha_assignments',
  TRAINING_RESULTS: 'suraksha_training_results',
  FEEDBACK: 'suraksha_feedback',
  CERTIFICATES: 'suraksha_certificates',
  NOTIFICATIONS: 'suraksha_notifications',
  ACTIVITIES: 'suraksha_activities'
};

const INITIAL_MODULES = [
  {
    id: 'MOD-ROCK-01',
    name: 'Falling Rock Hazard',
    shortName: 'Falling Rock',
    icon: 'Mountain',
    color: '#f97316',
    objective: 'Identify unstable rock and roof conditions, inspect rock bolts, and execute immediate safe withdrawal protocol within 30 seconds.',
    difficulty: 'Moderate',
    targetResponseTime: '30s',
    dangerLevel: 'High Risk'
  },
  {
    id: 'MOD-FIRE-02',
    name: 'Fire Hazard & Evacuation',
    shortName: 'Fire Hazard',
    icon: 'Flame',
    color: '#ef4444',
    objective: 'Detect early conveyor fire indicators, trigger toxic smoke suppression, select self-rescuer unit, and navigate intake airway evacuation routes.',
    difficulty: 'High',
    targetResponseTime: '20s',
    dangerLevel: 'Critical'
  },
  {
    id: 'MOD-GAS-03',
    name: 'Methane Gas Leak & Ventilation',
    shortName: 'Methane Gas',
    icon: 'Wind',
    color: '#eab308',
    objective: 'Recognize multi-gas monitor methane alarms (>1.25% CH4), avoid spark generation, immediately cut electrical feeds, and retreat upwind.',
    difficulty: 'Very High',
    targetResponseTime: '15s',
    dangerLevel: 'Explosion Risk'
  }
];

const INITIAL_WORKERS = [
  { workerId: 'SS-W-0101', name: 'Rajesh Kumar', department: 'Underground Extraction', experience: '4 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0102', name: 'Anita Devi', department: 'Ventilation & Gas Monitoring', experience: '2 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0103', name: 'Vikram Soren', department: 'Heavy Machinery & Haulage', experience: '7 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0104', name: 'Sunil Mahato', department: 'Underground Extraction', experience: '1 Year', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0105', name: 'Pooja Marandi', department: 'Mine Safety & Rescue', experience: '3 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0106', name: 'Deepak Besra', department: 'Ventilation & Gas Monitoring', experience: '5 Months', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0107', name: 'Manoj Tirkey', department: 'Heavy Machinery & Haulage', experience: '5 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0108', name: 'Suman Roy', department: 'Underground Extraction', experience: '3 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0109', name: 'Arjun Hembram', department: 'Mine Safety & Rescue', experience: '6 Years', mentorId: 'MENTOR-DHANBAD-01' },
  { workerId: 'SS-W-0110', name: 'Geeta Murmu', department: 'Ventilation & Gas Monitoring', experience: '1.5 Years', mentorId: 'MENTOR-DHANBAD-01' }
];

const INITIAL_TRAINING_RESULTS = [
  // Rajesh Kumar: High competence, all 3 completed
  { workerId: 'SS-W-0101', moduleId: 'MOD-ROCK-01', score: 92, attempt: 1, responseTime: 22, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-21 10:15' },
  { workerId: 'SS-W-0101', moduleId: 'MOD-FIRE-02', score: 88, attempt: 1, responseTime: 18, mistakes: ['Delayed SCSR donning by 3s'], correctDecision: true, completed: true, completedAt: '2026-09-22 14:30' },
  { workerId: 'SS-W-0101', moduleId: 'MOD-GAS-03', score: 90, attempt: 1, responseTime: 14, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-25 11:20' },

  // Anita Devi: Struggled with Fire Hazard first, retrained and passed
  { workerId: 'SS-W-0102', moduleId: 'MOD-ROCK-01', score: 85, attempt: 1, responseTime: 28, mistakes: ['Did not tap sound test bar'], correctDecision: true, completed: true, completedAt: '2026-09-20 09:00' },
  { workerId: 'SS-W-0102', moduleId: 'MOD-FIRE-02', score: 62, attempt: 1, responseTime: 38, mistakes: ['Delayed emergency response', 'Incorrect evacuation decision'], correctDecision: false, completed: true, completedAt: '2026-09-22 11:00' },
  { workerId: 'SS-W-0102', moduleId: 'MOD-FIRE-02', score: 91, attempt: 2, responseTime: 19, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-26 15:45' },
  { workerId: 'SS-W-0102', moduleId: 'MOD-GAS-03', score: 86, attempt: 1, responseTime: 16, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-27 16:30' },

  // Vikram Soren: Completed Rock & Fire, Methane missing
  { workerId: 'SS-W-0103', moduleId: 'MOD-ROCK-01', score: 94, attempt: 1, responseTime: 20, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-18 10:00' },
  { workerId: 'SS-W-0103', moduleId: 'MOD-FIRE-02', score: 82, attempt: 1, responseTime: 25, mistakes: ['Approached conveyor before de-energizing'], correctDecision: true, completed: true, completedAt: '2026-09-23 12:15' },

  // Sunil Mahato: Low score on Rock, needs retraining
  { workerId: 'SS-W-0104', moduleId: 'MOD-ROCK-01', score: 58, attempt: 1, responseTime: 42, mistakes: ['Failed to report unstable area', 'Approached hazard during first attempt'], correctDecision: false, completed: true, completedAt: '2026-09-24 16:10' },

  // Pooja Marandi: High performer, fully certified
  { workerId: 'SS-W-0105', moduleId: 'MOD-ROCK-01', score: 96, attempt: 1, responseTime: 18, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-15 08:30' },
  { workerId: 'SS-W-0105', moduleId: 'MOD-FIRE-02', score: 94, attempt: 1, responseTime: 15, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-17 11:20' },
  { workerId: 'SS-W-0105', moduleId: 'MOD-GAS-03', score: 95, attempt: 1, responseTime: 12, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-19 14:00' },

  // Deepak Besra: Struggled with Methane
  { workerId: 'SS-W-0106', moduleId: 'MOD-GAS-03', score: 60, attempt: 1, responseTime: 36, mistakes: ['Failed to recognize gas warning indicator', 'Operated radio switch in high-methane pocket'], correctDecision: false, completed: true, completedAt: '2026-09-26 13:45' },

  // Manoj Tirkey: Moderate on Rock & Fire
  { workerId: 'SS-W-0107', moduleId: 'MOD-ROCK-01', score: 78, attempt: 1, responseTime: 31, mistakes: ['Slow identification of spalling rib'], correctDecision: true, completed: true, completedAt: '2026-09-22 10:10' },
  { workerId: 'SS-W-0107', moduleId: 'MOD-FIRE-02', score: 76, attempt: 1, responseTime: 29, mistakes: ['Hesitated on main intake valve'], correctDecision: true, completed: true, completedAt: '2026-09-25 15:00' },

  // Suman Roy: Completed Rock only
  { workerId: 'SS-W-0108', moduleId: 'MOD-ROCK-01', score: 88, attempt: 1, responseTime: 24, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-23 09:40' },

  // Arjun Hembram: Certified senior rescue
  { workerId: 'SS-W-0109', moduleId: 'MOD-ROCK-01', score: 98, attempt: 1, responseTime: 16, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-12 10:00' },
  { workerId: 'SS-W-0109', moduleId: 'MOD-FIRE-02', score: 92, attempt: 1, responseTime: 17, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-14 14:15' },
  { workerId: 'SS-W-0109', moduleId: 'MOD-GAS-03', score: 96, attempt: 1, responseTime: 13, mistakes: [], correctDecision: true, completed: true, completedAt: '2026-09-16 11:30' },

  // Geeta Murmu: Methane needs attention
  { workerId: 'SS-W-0110', moduleId: 'MOD-GAS-03', score: 68, attempt: 1, responseTime: 32, mistakes: ['Failed to recognize gas warning indicator'], correctDecision: false, completed: true, completedAt: '2026-09-27 10:20' }
];

const INITIAL_ASSIGNMENTS = [
  {
    assignmentId: 'ASN-2026-101',
    workerId: 'SS-W-0104',
    moduleId: 'MOD-ROCK-01',
    assignedBy: 'Safety Mentor - Mining Training Dept',
    priority: 'High',
    dueDate: '2026-09-30',
    instruction: 'Complete roof sounding practice and inspect simulated bolt torque in AR before reassessment.',
    status: 'Pending'
  },
  {
    assignmentId: 'ASN-2026-102',
    workerId: 'SS-W-0106',
    moduleId: 'MOD-GAS-03',
    assignedBy: 'Safety Mentor - Mining Training Dept',
    priority: 'Critical',
    dueDate: '2026-09-29',
    instruction: 'Review explosive CH4 range indicators and zero-spark protocols in AR simulation.',
    status: 'Pending'
  }
];

const INITIAL_FEEDBACK = [
  {
    feedbackId: 'FB-01',
    workerId: 'SS-W-0102',
    moduleId: 'MOD-FIRE-02',
    mentorId: 'Safety Mentor - Mining Training Dept',
    message: 'Good hazard recognition on Attempt 2. Continue practicing rapid emergency evacuation pathways before your next underground shift.',
    createdAt: '2026-09-26 16:30'
  },
  {
    feedbackId: 'FB-02',
    workerId: 'SS-W-0104',
    moduleId: 'MOD-ROCK-01',
    mentorId: 'Safety Mentor - Mining Training Dept',
    message: 'Mandatory retraining initiated. Never enter unbolted roof zone regardless of visual appearances.',
    createdAt: '2026-09-24 17:00'
  }
];

const INITIAL_CERTIFICATES = [
  {
    certificateId: 'SSA-2026-0041',
    workerId: 'SS-W-0105',
    workerName: 'Pooja Marandi',
    modules: ['Falling Rock Hazard', 'Fire Hazard & Evacuation', 'Methane Gas Leak & Ventilation'],
    overallScore: 95,
    issuedBy: 'Safety Mentor - Mining Training Dept',
    issueDate: '2026-09-20',
    status: 'Active'
  },
  {
    certificateId: 'SSA-2026-0042',
    workerId: 'SS-W-0109',
    workerName: 'Arjun Hembram',
    modules: ['Falling Rock Hazard', 'Fire Hazard & Evacuation', 'Methane Gas Leak & Ventilation'],
    overallScore: 95,
    issuedBy: 'Safety Mentor - Mining Training Dept',
    issueDate: '2026-09-18',
    status: 'Active'
  }
];

const INITIAL_ACTIVITIES = [
  { id: 'ACT-01', text: 'Rajesh Kumar completed Methane Gas Leak assessment with 90% score.', timestamp: '10 mins ago', type: 'completion' },
  { id: 'ACT-02', text: 'Geeta Murmu scored 68% on Methane Gas Leak. Retraining flagged.', timestamp: '45 mins ago', type: 'warning' },
  { id: 'ACT-03', text: 'Anita Devi successfully completed Fire Hazard reassessment (Score improved to 91%).', timestamp: '2 hours ago', type: 'improvement' },
  { id: 'ACT-04', text: 'Certificate SSA-2026-0042 was issued to Arjun Hembram by Safety Mentor.', timestamp: '1 day ago', type: 'certificate' }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data State managed via LocalStorage
  const [workers, setWorkers] = useState([]);
  const [modules, setModules] = useState([]);
  const [trainingResults, setTrainingResults] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activities, setActivities] = useState([]);

  // UI Interactive States
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [activeWorkerModal, setActiveWorkerModal] = useState(null);
  const [assignModalTarget, setAssignModalTarget] = useState(null);
  const [feedbackModalTarget, setFeedbackModalTarget] = useState(null);
  const [certificatePreviewData, setCertificatePreviewData] = useState(null);
  const [verificationModalCertId, setVerificationModalCertId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);
  const [showSimulatedBanner, setShowSimulatedBanner] = useState(true);

  // Initialize and load LocalStorage
  useEffect(() => {
    const loadData = () => {
      const storedWorkers = localStorage.getItem(STORAGE_KEYS.WORKERS);
      const storedModules = localStorage.getItem(STORAGE_KEYS.MODULES);
      const storedResults = localStorage.getItem(STORAGE_KEYS.TRAINING_RESULTS);
      const storedAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      const storedFeedback = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      const storedCertificates = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      const storedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);

      if (!storedWorkers) localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(INITIAL_WORKERS));
      if (!storedModules) localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(INITIAL_MODULES));
      if (!storedResults) localStorage.setItem(STORAGE_KEYS.TRAINING_RESULTS, JSON.stringify(INITIAL_TRAINING_RESULTS));
      if (!storedAssignments) localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
      if (!storedFeedback) localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
      if (!storedCertificates) localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
      if (!storedActivities) localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));

      setWorkers(JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKERS) || JSON.stringify(INITIAL_WORKERS)));
      setModules(JSON.parse(localStorage.getItem(STORAGE_KEYS.MODULES) || JSON.stringify(INITIAL_MODULES)));
      setTrainingResults(JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAINING_RESULTS) || JSON.stringify(INITIAL_TRAINING_RESULTS)));
      setAssignments(JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS) || JSON.stringify(INITIAL_ASSIGNMENTS)));
      setFeedback(JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || JSON.stringify(INITIAL_FEEDBACK)));
      setCertificates(JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || JSON.stringify(INITIAL_CERTIFICATES)));
      setActivities(JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || JSON.stringify(INITIAL_ACTIVITIES)));
    };

    loadData();
  }, []);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Process latest attempt per worker per module
  const computedWorkerData = useMemo(() => {
    return workers.map((worker) => {
      const workerResults = trainingResults.filter((r) => r.workerId === worker.workerId);

      // Latest result per module
      const moduleMap = {};
      workerResults.forEach((res) => {
        if (!moduleMap[res.moduleId] || res.attempt > moduleMap[res.moduleId].attempt) {
          moduleMap[res.moduleId] = res;
        }
      });

      const uniqueModulesTaken = Object.keys(moduleMap);
      const completedCount = uniqueModulesTaken.length;

      const scores = Object.values(moduleMap).map((m) => m.score);
      const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      
      const avgResponseTime = workerResults.length > 0
        ? Math.round(workerResults.reduce((a, b) => a + b.responseTime, 0) / workerResults.length)
        : 0;

      // Has any module scored below 70 in latest attempt?
      const hasFailingModule = Object.values(moduleMap).some((m) => m.score < 70);
      const hasCertificate = certificates.some((c) => c.workerId === worker.workerId && c.status === 'Active');

      let trainingStatus = 'Training In Progress';
      if (hasFailingModule) {
        trainingStatus = 'Needs Retraining';
      } else if (completedCount === 3 && avgScore >= 85) {
        trainingStatus = hasCertificate ? 'Competent' : 'Certificate Eligible';
      } else if (completedCount === 3 && avgScore >= 70) {
        trainingStatus = 'Refresher Recommended';
      } else if (completedCount === 0) {
        trainingStatus = 'Not Started';
      }

      // Collect concrete mistakes
      const mistakesList = workerResults.flatMap((r) => r.mistakes || []);

      const lastDate = workerResults.reduce((latest, curr) => {
        return curr.completedAt > latest ? curr.completedAt : latest;
      }, 'No Recent Activity');

      return {
        ...worker,
        completedCount,
        avgScore,
        avgResponseTime,
        trainingStatus,
        hasCertificate,
        mistakesList,
        lastActivity: lastDate,
        moduleResults: moduleMap,
        rawResults: workerResults
      };
    });
  }, [workers, trainingResults, certificates]);

  // Overall Dashboard KPIs
  const kpis = useMemo(() => {
    const totalWorkers = computedWorkerData.length;
    const activeWorkers = computedWorkerData.filter((w) => w.completedCount > 0).length;
    const modulesCompleted = trainingResults.filter((r) => r.completed).length;
    const validScores = trainingResults.map((r) => r.score);
    const avgSafetyScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
    const workersNeedingRetraining = computedWorkerData.filter((w) => w.trainingStatus === 'Needs Retraining').length;
    const eligibleCertificates = computedWorkerData.filter((w) => w.trainingStatus === 'Certificate Eligible').length;
    const certificatesIssuedCount = certificates.length;

    return {
      totalWorkers,
      activeWorkers,
      modulesCompleted,
      avgSafetyScore,
      workersNeedingRetraining,
      eligibleCertificates,
      certificatesIssuedCount
    };
  }, [computedWorkerData, trainingResults, certificates]);

  const moduleAnalytics = useMemo(() => {
    return modules.map((mod) => {
      const resultsForMod = trainingResults.filter((r) => r.moduleId === mod.id);
      const latestScores = [];
      let totalRespTime = 0;
      const mistakesFreq = {};

      resultsForMod.forEach((r) => {
        latestScores.push(r.score);
        totalRespTime += r.responseTime;
        if (r.mistakes) {
          r.mistakes.forEach((m) => {
            mistakesFreq[m] = (mistakesFreq[m] || 0) + 1;
          });
        }
      });

      const avgScore = latestScores.length > 0 ? Math.round(latestScores.reduce((a, b) => a + b, 0) / latestScores.length) : 0;
      const avgRespTime = resultsForMod.length > 0 ? (totalRespTime / resultsForMod.length).toFixed(1) : '0';
      const failingCount = resultsForMod.filter((r) => r.score < 70).length;
      const completionRate = workers.length > 0 ? Math.round((resultsForMod.length / workers.length) * 100) : 0;

      // Find top mistake
      let commonMistake = 'None recorded';
      let maxMCount = 0;
      Object.entries(mistakesFreq).forEach(([mistake, count]) => {
        if (count > maxMCount) {
          maxMCount = count;
          commonMistake = mistake;
        }
      });

      return {
        ...mod,
        totalAttempts: resultsForMod.length,
        avgScore,
        avgRespTime,
        completionRate,
        failingCount,
        commonMistake,
        mistakesFreq
      };
    });
  }, [modules, trainingResults, workers]);

  // AI Deterministic Calculation
  const aiInsights = useMemo(() => {
    if (moduleAnalytics.length === 0) return null;

    // Find module with lowest avg score
    const mostDifficult = [...moduleAnalytics].sort((a, b) => a.avgScore - b.avgScore)[0];
    
    // Aggregate global mistakes
    const allMistakesFreq = {};
    trainingResults.forEach((r) => {
      (r.mistakes || []).forEach((m) => {
        allMistakesFreq[m] = (allMistakesFreq[m] || 0) + 1;
      });
    });
    
    const sortedMistakes = Object.entries(allMistakesFreq).sort((a, b) => b[1] - a[1]);
    const topMistake = sortedMistakes.length > 0 ? sortedMistakes[0][0] : 'Delayed hazard reporting';

    return {
      mostDifficultModule: mostDifficult ? mostDifficult.name : 'Fire Hazard',
      lowestScore: mostDifficult ? mostDifficult.avgScore : 72,
      topMistake,
      retrainingCount: kpis.workersNeedingRetraining,
      recommendation1: `${mostDifficult ? mostDifficult.name : 'Fire Hazard'} poses the steepest learning curve. Recommend mandatory pre-shift AR simulation drills.`,
      recommendation2: `Gas warning recognition error observed in new ventilation recruits; schedule audio-visual indicator reinforcement.`,
      recommendation3: `Workers demonstrating >30s response latency should undergo muscle-memory reaction modules.`
    };
  }, [moduleAnalytics, kpis.workersNeedingRetraining, trainingResults]);

  const simulateWorkerARCompletion = () => {
    // Pick worker needing retraining: Sunil Mahato (SS-W-0104) or Deepak Besra (SS-W-0106)
    const candidates = ['SS-W-0104', 'SS-W-0106', 'SS-W-0102'];
    const chosenWorkerId = candidates[Math.floor(Math.random() * candidates.length)];
    const chosenWorker = workers.find((w) => w.workerId === chosenWorkerId);
    
    const newAttempt = {
      workerId: chosenWorkerId,
      moduleId: chosenWorkerId === 'SS-W-0104' ? 'MOD-ROCK-01' : 'MOD-GAS-03',
      score: 93,
      attempt: 2,
      responseTime: 17,
      mistakes: [],
      correctDecision: true,
      completed: true,
      completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedResults = [...trainingResults, newAttempt];
    setTrainingResults(updatedResults);
    localStorage.setItem(STORAGE_KEYS.TRAINING_RESULTS, JSON.stringify(updatedResults));

    const newActivity = {
      id: `ACT-${Date.now()}`,
      text: `${chosenWorker ? chosenWorker.name : 'Worker'} submitted AR Retraining attempt: Scored 93% (Passed with high competency).`,
      timestamp: 'Just now',
      type: 'improvement'
    };
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updatedActivities));

    showToast(`Live AR Event Synced: ${chosenWorker ? chosenWorker.name : 'Worker'} completed retraining with 93%!`);
  };

  const handleAssignTrainingSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const workerId = form.worker.value;
    const moduleId = form.module.value;
    const priority = form.priority.value;
    const dueDate = form.dueDate.value;
    const instruction = form.instruction.value;

    const newAssignment = {
      assignmentId: `ASN-2026-${Math.floor(100 + Math.random() * 900)}`,
      workerId,
      moduleId,
      assignedBy: 'Safety Mentor - Mining Training Dept',
      priority,
      dueDate,
      instruction,
      status: 'Pending'
    };

    const updated = [newAssignment, ...assignments];
    setAssignments(updated);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(updated));

    const workerObj = workers.find((w) => w.workerId === workerId);
    const modObj = modules.find((m) => m.id === moduleId);
    const newAct = {
      id: `ACT-${Date.now()}`,
      text: `Assigned ${modObj?.shortName || 'Module'} to ${workerObj?.name || workerId} (Priority: ${priority}).`,
      timestamp: 'Just now',
      type: 'warning'
    };
    setActivities([newAct, ...activities]);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([newAct, ...activities]));

    setAssignModalTarget(null);
    showToast(`Training assignment successfully dispatched to worker AR headset!`);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const workerId = form.worker.value;
    const moduleId = form.module.value;
    const message = form.message.value;

    const newFb = {
      feedbackId: `FB-${Date.now()}`,
      workerId,
      moduleId,
      mentorId: 'Safety Mentor - Mining Training Dept',
      message,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updated = [newFb, ...feedback];
    setFeedback(updated);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(updated));

    setFeedbackModalTarget(null);
    showToast(`Mentor feedback logged and pushed to worker mobile application.`);
  };

  const handleIssueCertificate = (worker) => {
    const newCert = {
      certificateId: `SSA-2026-00${Math.floor(50 + Math.random() * 49)}`,
      workerId: worker.workerId,
      workerName: worker.name,
      modules: ['Falling Rock Hazard', 'Fire Hazard & Evacuation', 'Methane Gas Leak & Ventilation'],
      overallScore: worker.avgScore,
      issuedBy: 'Safety Mentor - Mining Training Dept',
      issueDate: new Date().toISOString().substring(0, 10),
      status: 'Active'
    };

    const updated = [newCert, ...certificates];
    setCertificates(updated);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(updated));

    const act = {
      id: `ACT-${Date.now()}`,
      text: `Safety Mentor issued Competency Certificate ${newCert.certificateId} to ${worker.name}.`,
      timestamp: 'Just now',
      type: 'certificate'
    };
    setActivities([act, ...activities]);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([act, ...activities]));

    showToast(`Certificate ${newCert.certificateId} approved & issued!`);
    setCertificatePreviewData(newCert);
  };

  const handleResetData = () => {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(INITIAL_WORKERS));
    localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(INITIAL_MODULES));
    localStorage.setItem(STORAGE_KEYS.TRAINING_RESULTS, JSON.stringify(INITIAL_TRAINING_RESULTS));
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));

    setWorkers(INITIAL_WORKERS);
    setModules(INITIAL_MODULES);
    setTrainingResults(INITIAL_TRAINING_RESULTS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setFeedback(INITIAL_FEEDBACK);
    setCertificates(INITIAL_CERTIFICATES);
    setActivities(INITIAL_ACTIVITIES);
    showToast('Mock database reset to factory state.');
  };

  const filteredWorkers = useMemo(() => {
    return computedWorkerData.filter((w) => {
      const matchSearch =
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchDept = selectedDeptFilter === 'ALL' || w.department === selectedDeptFilter;
      const matchStatus = selectedStatusFilter === 'ALL' || w.trainingStatus === selectedStatusFilter;

      return matchSearch && matchDept && matchStatus;
    });
  }, [computedWorkerData, searchQuery, selectedDeptFilter, selectedStatusFilter]);

  return (
    <div className="flex h-screen w-full bg-[#0b1329] text-slate-100 font-sans antialiased overflow-hidden select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-orange-400/40 animate-bounce text-sm font-semibold tracking-wide">
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Industrial Left Sidebar */}
      <aside className="w-72 bg-[#090e1f] border-r border-slate-800 flex flex-col justify-between shrink-0 shadow-2xl">
        <div>
          {/* Logo & Brand Header */}
          <div className="p-5 border-b border-slate-800/80 bg-gradient-to-b from-[#131d3d] to-[#090e1f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-orange-400">
                <HardHat className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="text-lg font-black tracking-wider text-white flex items-center gap-1.5">
                  SURAKSHA<span className="text-orange-500">SETU</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono font-bold border border-orange-500/30">
                    AR
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium tracking-tight">
                  Experience Safety. Build Competency.
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-amber-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Mentor Authority
              </span>
              <span className="font-mono text-slate-400">Mine Div #04</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Shield },
              { id: 'workers', label: 'Workers', icon: Users, badge: workers.length },
              { id: 'modules', label: 'Training Modules', icon: BookOpen },
              { id: 'assignments', label: 'Assignments', icon: Send, badge: assignments.filter(a => a.status === 'Pending').length },
              { id: 'analytics', label: 'Performance Analytics', icon: TrendingUp },
              { id: 'history', label: 'Training History', icon: Clock },
              { id: 'retraining', label: 'Retraining Hub', icon: RefreshCw, alert: kpis.workersNeedingRetraining },
              { id: 'feedback', label: 'Mentor Feedback', icon: FileText },
              { id: 'certificates', label: 'Certificates', icon: Award, badge: kpis.certificatesIssuedCount },
              { id: 'reports', label: 'Reports & Export', icon: Download },
              { id: 'settings', label: 'Settings & Sync', icon: Sliders }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-slate-950 text-orange-400'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.alert > 0 && !isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.alert} Req
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Mentor Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-[#070b18]">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-orange-500/60 flex items-center justify-center text-orange-400 font-bold text-xs">
                SM
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-100">Safety Mentor</div>
                <div className="text-[10px] text-slate-400">Mining Training Dept</div>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('settings')}
              title="Mentor settings" 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0b1329] overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800 bg-[#0c142c]/90 backdrop-blur px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search miners by Name, ID, or Department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Quick Dual-App Simulation Bar & Notifications */}
          <div className="flex items-center gap-3">
            <button
              onClick={simulateWorkerARCompletion}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600/90 to-amber-600/90 hover:from-orange-500 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-orange-600/20 border border-orange-400 transition"
              title="Simulates an AR scenario submission from a worker's mobile device"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Worker AR Sync</span>
            </button>

            <button
              onClick={() => setActiveTab('retraining')}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600"
              title="View Alerts"
            >
              <Bell className="w-4 h-4 text-slate-400" />
              {kpis.workersNeedingRetraining > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center text-white border-2 border-[#0c142c]">
                  {kpis.workersNeedingRetraining}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-slate-800"></div>

            <div className="text-right">
              <div className="text-xs font-semibold text-slate-200">Dhanbad Central Colliery</div>
              <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                AR Backend Live
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Simulation Reminder Banner */}
        {showSimulatedBanner && (
          <div className="bg-gradient-to-r from-[#172347] via-[#1b2b57] to-[#172347] border-b border-orange-500/30 px-6 py-2 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold text-[10px] uppercase tracking-wider border border-orange-500/40">
                Mentor Supervisory Portal
              </span>
              <span>
                Workers complete physical scenarios in the <strong className="text-white">SurakshaSetu AR</strong> mobile headset application. Assessments and mistakes reflect here automatically.
              </span>
            </div>
            <button
              onClick={() => setShowSimulatedBanner(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Tab Content View */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#0b1329]">
          {activeTab === 'dashboard' && (
            <DashboardView
              kpis={kpis}
              activities={activities}
              moduleAnalytics={moduleAnalytics}
              aiInsights={aiInsights}
              setActiveTab={setActiveTab}
              onSelectWorker={(wId) => {
                setActiveWorkerModal(wId);
              }}
            />
          )}

          {activeTab === 'workers' && (
            <WorkersView
              workers={filteredWorkers}
              allWorkers={computedWorkerData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              deptFilter={selectedDeptFilter}
              setDeptFilter={setSelectedDeptFilter}
              statusFilter={selectedStatusFilter}
              setStatusFilter={setSelectedStatusFilter}
              onOpenWorkerProfile={(wId) => setActiveWorkerModal(wId)}
              onQuickAssign={(w) => setAssignModalTarget(w)}
              onQuickFeedback={(w) => setFeedbackModalTarget(w)}
            />
          )}

          {activeTab === 'modules' && (
            <ModulesView
              modules={moduleAnalytics}
              onAssignModule={(mod) => {
                setAssignModalTarget({ preselectedModule: mod.id });
              }}
            />
          )}

          {activeTab === 'assignments' && (
            <AssignmentsView
              assignments={assignments}
              workers={workers}
              modules={modules}
              onNewAssign={() => setAssignModalTarget({})}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              moduleAnalytics={moduleAnalytics}
              computedWorkers={computedWorkerData}
              results={trainingResults}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              trainingResults={trainingResults}
              workers={workers}
              modules={modules}
            />
          )}

          {activeTab === 'retraining' && (
            <RetrainingView
              workers={computedWorkerData}
              onTriggerRetraining={(w, modId) => {
                setAssignModalTarget({ workerId: w.workerId, preselectedModule: modId, priority: 'Critical' });
              }}
            />
          )}

          {activeTab === 'feedback' && (
            <FeedbackView
              feedback={feedback}
              workers={workers}
              modules={modules}
              onNewFeedback={() => setFeedbackModalTarget({})}
            />
          )}

          {activeTab === 'certificates' && (
            <CertificatesView
              certificates={certificates}
              workers={computedWorkerData}
              onIssueCertificate={handleIssueCertificate}
              onPreviewCertificate={(cert) => setCertificatePreviewData(cert)}
              onVerifyCertificate={(certId) => setVerificationModalCertId(certId)}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              workers={computedWorkerData}
              moduleAnalytics={moduleAnalytics}
              certificates={certificates}
              assignments={assignments}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              onResetData={handleResetData}
              onSimulateSync={simulateWorkerARCompletion}
              workersCount={workers.length}
              resultsCount={trainingResults.length}
            />
          )}
        </main>
      </div>

      {/* MODALS */}

      {/* 1. Worker Profile Modal */}
      {activeWorkerModal && (
        <WorkerProfileModal
          workerId={activeWorkerModal}
          workers={computedWorkerData}
          modules={modules}
          onClose={() => setActiveWorkerModal(null)}
          onAssignRetraining={(w, modId) => {
            setActiveWorkerModal(null);
            setAssignModalTarget({ workerId: w.workerId, preselectedModule: modId, priority: 'High' });
          }}
          onGiveFeedback={(w) => {
            setActiveWorkerModal(null);
            setFeedbackModalTarget({ workerId: w.workerId });
          }}
          onIssueCertificate={(w) => {
            setActiveWorkerModal(null);
            handleIssueCertificate(w);
          }}
        />
      )}

      {/* 2. Assign Training Modal */}
      {assignModalTarget && (
        <AssignTrainingModal
          target={assignModalTarget}
          workers={workers}
          modules={modules}
          onClose={() => setAssignModalTarget(null)}
          onSubmit={handleAssignTrainingSubmit}
        />
      )}

      {/* 3. Feedback Modal */}
      {feedbackModalTarget && (
        <MentorFeedbackModal
          target={feedbackModalTarget}
          workers={workers}
          modules={modules}
          onClose={() => setFeedbackModalTarget(null)}
          onSubmit={handleFeedbackSubmit}
        />
      )}

      {/* 4. Certificate Preview Modal */}
      {certificatePreviewData && (
        <CertificateModal
          cert={certificatePreviewData}
          onClose={() => setCertificatePreviewData(null)}
          onVerify={(id) => {
            setCertificatePreviewData(null);
            setVerificationModalCertId(id);
          }}
        />
      )}

      {/* 5. Certificate Public Verification Simulator Modal */}
      {verificationModalCertId && (
        <VerificationModal
          certId={verificationModalCertId}
          certificates={certificates}
          workers={workers}
          onClose={() => setVerificationModalCertId(null)}
        />
      )}
    </div>
  );
}

function DashboardView({ kpis, activities, moduleAnalytics, aiInsights, setActiveTab, onSelectWorker }) {
  return (
    <div className="space-y-6">
      {/* Top Banner Alert Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {kpis.workersNeedingRetraining > 0 && (
          <div
            onClick={() => setActiveTab('retraining')}
            className="cursor-pointer p-3 rounded-xl bg-red-950/40 border border-red-800/80 hover:border-red-600 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-900/60 text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-red-200">
                  {kpis.workersNeedingRetraining} Workers Need Retraining
                </div>
                <div className="text-[11px] text-red-400">Scores below 70% threshold in recent AR runs</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </div>
        )}

        {kpis.eligibleCertificates > 0 && (
          <div
            onClick={() => setActiveTab('certificates')}
            className="cursor-pointer p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/80 hover:border-emerald-600 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-900/60 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-200">
                  {kpis.eligibleCertificates} Certificate Eligible
                </div>
                <div className="text-[11px] text-emerald-400">Demonstrated competency (&gt;85% avg)</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </div>
        )}

        <div
          onClick={() => setActiveTab('modules')}
          className="cursor-pointer p-3 rounded-xl bg-amber-950/40 border border-amber-800/80 hover:border-amber-600 transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-900/60 text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200">Fire Hazard Highest Error Rate</div>
              <div className="text-[11px] text-amber-400">Delayed intake airway evacuation choice</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Workers', value: kpis.totalWorkers, icon: Users, color: 'text-blue-400', sub: 'Mining Workforce' },
          { label: 'Active in AR', value: kpis.activeWorkers, icon: HardHat, color: 'text-orange-400', sub: 'Completed ≥1 scenario' },
          { label: 'Modules Passed', value: kpis.modulesCompleted, icon: CheckCircle2, color: 'text-emerald-400', sub: 'Simulated assessments' },
          { label: 'Avg Safety Score', value: `${kpis.avgSafetyScore}%`, icon: Shield, color: 'text-amber-400', sub: 'Target: >80%' },
          { label: 'Needs Retraining', value: kpis.workersNeedingRetraining, icon: RefreshCw, color: 'text-rose-400', sub: 'Immediate action' },
          { label: 'Certificates Issued', value: kpis.certificatesIssuedCount, icon: Award, color: 'text-teal-400', sub: 'Competency verified' }
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#121c38] border border-slate-800/90 rounded-xl p-4 shadow-lg hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="text-2xl font-black text-white font-mono">{card.value}</div>
              <div className="text-[10px] text-slate-400 mt-1">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Module Performance Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-400" />
            Core Training Module Performance
          </h2>
          <button
            onClick={() => setActiveTab('modules')}
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
          >
            <span>View All Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moduleAnalytics.map((mod) => (
            <div
              key={mod.id}
              className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      {mod.id.includes('ROCK') && <Mountain className="w-5 h-5 text-orange-400" />}
                      {mod.id.includes('FIRE') && <Flame className="w-5 h-5 text-red-500" />}
                      {mod.id.includes('GAS') && <Wind className="w-5 h-5 text-amber-400" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-100">{mod.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400">{mod.id}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    {mod.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Avg Score</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5">{mod.avgScore}%</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Response</div>
                    <div className="text-base font-bold text-amber-400 font-mono mt-0.5">{mod.avgRespTime}s</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Completion</div>
                    <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{mod.completionRate}%</div>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Most Common Mistake:</div>
                  <div className="text-xs text-rose-300 font-medium mt-0.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{mod.commonMistake}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  <strong className="text-white font-mono">{mod.failingCount}</strong> workers need retraining
                </span>
                <button
                  onClick={() => setActiveTab('retraining')}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  Review &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Training Insights Section */}
      <div className="bg-gradient-to-br from-[#121c38] to-[#0c142c] border-2 border-orange-500/40 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-inner">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-wide text-white uppercase">
                  AI Training Insights
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500 text-slate-950 uppercase font-mono">
                  Supervisory Assist
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Deterministic algorithmic analysis of AR telemetry, mistake frequencies, and decision response latencies.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
            Mentor Final Authority Required
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          {/* AI Observation Highlights */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Critical Findings
            </div>
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-amber-300 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Primary Risk Area: {aiInsights?.mostDifficultModule}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {aiInsights?.recommendation1}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-orange-300 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Recurring Worker Difficulty</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "{aiInsights?.topMistake}" is the leading failure trigger. Trainees hesitate during the first 10 seconds of scenario exposure.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-blue-300 font-semibold flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Supervisory Recommendation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {aiInsights?.recommendation2}
              </p>
            </div>
          </div>

          {/* AI Difficulty Comparison Chart */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold uppercase text-slate-300">
                Where Workers Face the Most Difficulty (Avg Score vs Latency)
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Live Aggregated</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="shortName" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="avgScore" name="Avg Safety Score (%)" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgRespTime" name="Avg Response Time (sec)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
              <div>Roof Stability: <strong className="text-emerald-400">82% High</strong></div>
              <div>Smoke Decision: <strong className="text-red-400">77% Low</strong></div>
              <div>CH4 Recognition: <strong className="text-amber-400">80% Moderate</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Recent Activity Stream */}
      <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            Live Training & Competency Activity
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">Simulated Dual-App Stream</span>
        </div>

        <div className="space-y-2">
          {activities.slice(0, 5).map((act) => (
            <div
              key={act.id}
              className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="text-slate-200 font-medium">{act.text}</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-4">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkersView({
  workers,
  allWorkers,
  searchQuery,
  setSearchQuery,
  deptFilter,
  setDeptFilter,
  statusFilter,
  setStatusFilter,
  onOpenWorkerProfile,
  onQuickAssign,
  onQuickFeedback
}) {
  const departments = ['ALL', 'Underground Extraction', 'Ventilation & Gas Monitoring', 'Heavy Machinery & Haulage', 'Mine Safety & Rescue'];
  const statuses = ['ALL', 'Competent', 'Certificate Eligible', 'Training In Progress', 'Needs Retraining', 'Refresher Recommended'];

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#121c38] p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or worker ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'ALL' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All Competency Statuses' : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <strong className="text-orange-400">{workers.length}</strong> of {allWorkers.length} Miners
        </div>
      </div>

      {/* Workers Data Table */}
      <div className="bg-[#121c38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="p-3.5 pl-4">Worker ID</th>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5 text-center">Modules Completed</th>
                <th className="p-3.5 text-center">Avg Score</th>
                <th className="p-3.5">Training Status</th>
                <th className="p-3.5">Last Activity</th>
                <th className="p-3.5 text-center">Certificate</th>
                <th className="p-3.5 pr-4 text-right">Mentor Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {workers.length === 0 ? (
                <tr>
                  <td colSpan="10" className="p-8 text-center text-slate-400">
                    No workers matched the current search and filter criteria.
                  </td>
                </tr>
              ) : (
                workers.map((worker) => {
                  let statusBadgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';
                  if (worker.trainingStatus === 'Competent') {
                    statusBadgeStyle = 'bg-emerald-950/80 text-emerald-300 border-emerald-700';
                  } else if (worker.trainingStatus === 'Certificate Eligible') {
                    statusBadgeStyle = 'bg-amber-950/80 text-amber-300 border-amber-600 animate-pulse';
                  } else if (worker.trainingStatus === 'Needs Retraining') {
                    statusBadgeStyle = 'bg-rose-950/80 text-rose-300 border-rose-700';
                  } else if (worker.trainingStatus === 'Refresher Recommended') {
                    statusBadgeStyle = 'bg-blue-950/80 text-blue-300 border-blue-700';
                  }

                  return (
                    <tr
                      key={worker.workerId}
                      className="hover:bg-slate-800/40 transition group cursor-pointer"
                      onClick={() => onOpenWorkerProfile(worker.workerId)}
                    >
                      <td className="p-3.5 pl-4 font-mono font-bold text-orange-400">
                        {worker.workerId}
                      </td>
                      <td className="p-3.5 font-bold text-slate-100 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                          {worker.name.charAt(0)}
                        </div>
                        <span>{worker.name}</span>
                      </td>
                      <td className="p-3.5 text-slate-300">{worker.department}</td>
                      <td className="p-3.5 text-slate-400 font-mono">{worker.experience}</td>
                      <td className="p-3.5 text-center font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">
                          {worker.completedCount} / 3
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold">
                        <span
                          className={`${
                            worker.avgScore >= 85
                              ? 'text-emerald-400'
                              : worker.avgScore >= 70
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {worker.avgScore}%
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadgeStyle}`}
                        >
                          {worker.trainingStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {worker.lastActivity}
                      </td>
                      <td className="p-3.5 text-center">
                        {worker.hasCertificate ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-300 bg-teal-950/60 border border-teal-800 px-2 py-0.5 rounded-full">
                            <Award className="w-3 h-3 text-teal-400" />
                            Issued
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Not Issued</span>
                        )}
                      </td>
                      <td
                        className="p-3.5 pr-4 text-right space-x-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => onQuickAssign(worker)}
                          title="Assign Training"
                          className="p-1.5 bg-slate-800 hover:bg-orange-500 hover:text-slate-950 text-slate-300 rounded transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onQuickFeedback(worker)}
                          title="Provide Feedback"
                          className="p-1.5 bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-300 rounded transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenWorkerProfile(worker.workerId)}
                          title="View Profile"
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ModulesView({ modules, onAssignModule }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
            AR Mining Training Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Interactive 3D AR scenarios calibrated for hazard recognition and reaction time validation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-[#121c38] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                  {mod.id.includes('ROCK') && <Mountain className="w-7 h-7 text-orange-400" />}
                  {mod.id.includes('FIRE') && <Flame className="w-7 h-7 text-red-500" />}
                  {mod.id.includes('GAS') && <Wind className="w-7 h-7 text-amber-400" />}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                    {mod.dangerLevel}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">Target: {mod.targetResponseTime}</div>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{mod.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[48px]">{mod.objective}</p>

              <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Difficulty Grade:</span>
                  <span className="font-bold text-slate-200">{mod.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Average Safety Score:</span>
                  <span className="font-mono font-bold text-orange-400">{mod.avgScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completion Rate:</span>
                  <span className="font-mono font-bold text-emerald-400">{mod.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Reaction Latency:</span>
                  <span className="font-mono font-bold text-amber-400">{mod.avgRespTime}s</span>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-rose-950/30 border border-rose-900/50">
                <div className="text-[10px] font-bold uppercase text-rose-400">Leading Assessment Mistake:</div>
                <div className="text-xs text-slate-200 font-medium mt-1">{mod.commonMistake}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => onAssignModule(mod)}
                className="flex-1 py-2 px-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs rounded-lg transition text-center shadow-md shadow-orange-500/20"
              >
                Assign Training
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignmentsView({ assignments, workers, modules, onNewAssign }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#121c38] p-4 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Worker AR Training Assignments
          </h2>
          <p className="text-xs text-slate-400">
            Pending directives dispatched directly to worker AR head-mounted displays and mobile apps.
          </p>
        </div>
        <button
          onClick={onNewAssign}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs rounded-lg transition shadow-md shadow-orange-500/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>New Training Assignment</span>
        </button>
      </div>

      <div className="bg-[#121c38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="p-3.5 pl-4">Assignment ID</th>
              <th className="p-3.5">Assigned Worker</th>
              <th className="p-3.5">Module</th>
              <th className="p-3.5">Priority</th>
              <th className="p-3.5">Due Date</th>
              <th className="p-3.5">Mentor Instruction</th>
              <th className="p-3.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400">
                  No active assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((asn) => {
                const worker = workers.find((w) => w.workerId === asn.workerId);
                const module = modules.find((m) => m.id === asn.moduleId);

                return (
                  <tr key={asn.assignmentId} className="hover:bg-slate-800/40">
                    <td className="p-3.5 pl-4 font-mono font-bold text-orange-400">
                      {asn.assignmentId}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-100">{worker ? worker.name : asn.workerId}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{asn.workerId}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-200">
                      {module ? module.name : asn.moduleId}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          asn.priority === 'Critical'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : asn.priority === 'High'
                            ? 'bg-orange-950 text-orange-300 border border-orange-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {asn.priority}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{asn.dueDate}</td>
                    <td className="p-3.5 text-slate-300 max-w-xs truncate" title={asn.instruction}>
                      "{asn.instruction}"
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                        {asn.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsView({ moduleAnalytics, computedWorkers, results }) {
  // Before vs After Retraining Data Simulation
  const retrainingImprovementData = [
    { module: 'Falling Rock', before: 58, after: 88 },
    { module: 'Fire Hazard', before: 62, after: 91 },
    { module: 'Methane Gas', before: 60, after: 93 }
  ];

  const commonMistakesData = [
    { mistake: 'Delayed evacuation decision', occurrences: 6 },
    { mistake: 'Failed to recognize gas indicator', occurrences: 5 },
    { mistake: 'Approached unstable roof zone', occurrences: 4 },
    { mistake: 'Delayed SCSR donning', occurrences: 3 },
    { mistake: 'Tapped bar without acoustic check', occurrences: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#121c38] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Industrial Workforce Competency Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Telemetry metrics comparing initial trainee runs against post-mentor retraining evaluations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Before vs After Retraining Improvement */}
        <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase text-slate-200">
              Performance Before vs After Targeted Retraining
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              +31% Avg Competency Gain
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retrainingImprovementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="module" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="before" name="Initial Failed Attempt (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="Post-Mentor Retraining (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Demonstrates competency evolution: Initial failure (62%) transforms to validated mastery (91%).
          </p>
        </div>

        {/* Chart 2: Common Training Mistakes Frequency */}
        <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase text-slate-200">
              Concrete Mistakes Logged in AR Telemetry
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Total Recorded: 20</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={commonMistakesData}
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis type="category" dataKey="mistake" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="occurrences" name="Occurrences" fill="#f97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Critical bottleneck: "Delayed evacuation decision" represents 30% of critical fails.
          </p>
        </div>

        {/* Chart 3: Average Score & Completion by Module */}
        <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase text-slate-200 mb-4">
            Training Difficulty Across Workforce
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="shortName" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="avgScore" name="Avg Score (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completionRate" name="Completion Rate (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Average Response Latency in Critical Hazards */}
        <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase text-slate-200 mb-4">
            Average Response Time vs Hazard Criticality
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="shortName" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="s" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="avgRespTime" name="Worker Latency (seconds)" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ trainingResults, workers, modules }) {
  const sorted = [...trainingResults].sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1));

  return (
    <div className="space-y-6">
      <div className="bg-[#121c38] p-4 rounded-xl border border-slate-800">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          End-to-End Competency Development Timeline
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Demonstrating: LEARN &rarr; EXPERIENCE &rarr; ACT &rarr; ASSESS &rarr; MISTAKE &rarr; FEEDBACK &rarr; RETRAINING &rarr; REASSESSMENT &rarr; CERTIFY
        </p>
      </div>

      <div className="relative pl-6 border-l-2 border-orange-500/50 space-y-6 ml-4">
        {sorted.map((res, idx) => {
          const worker = workers.find((w) => w.workerId === res.workerId);
          const mod = modules.find((m) => m.id === res.moduleId);

          return (
            <div key={idx} className="relative group">
              <span
                className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0b1329] ${
                  res.score >= 85
                    ? 'bg-emerald-500'
                    : res.score >= 70
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              ></span>

              <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {worker ? worker.name : res.workerId}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">({res.workerId})</span>
                    <span className="text-slate-400 text-xs">&bull;</span>
                    <span className="text-xs text-orange-400 font-semibold">
                      {mod ? mod.name : res.moduleId}
                    </span>
                  </div>
                  <div className="text-slate-400 font-mono text-xs flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{res.completedAt}</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Attempt</div>
                    <div className="font-mono font-bold text-white mt-0.5">#{res.attempt}</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Recorded Score</div>
                    <div
                      className={`font-mono font-bold mt-0.5 ${
                        res.score >= 85
                          ? 'text-emerald-400'
                          : res.score >= 70
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {res.score}%
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Response Latency</div>
                    <div className="font-mono font-bold text-amber-400 mt-0.5">{res.responseTime}s</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Outcome</div>
                    <div
                      className={`font-bold mt-0.5 ${
                        res.correctDecision ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {res.correctDecision ? 'Correct Protocol' : 'Action Hazard'}
                    </div>
                  </div>
                </div>

                {res.mistakes && res.mistakes.length > 0 && (
                  <div className="mt-3 p-2.5 rounded bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300">
                    <span className="font-bold text-rose-400 uppercase text-[10px] mr-2">Mistakes Identified:</span>
                    {res.mistakes.join('; ')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RetrainingView({ workers, onTriggerRetraining }) {
  const needingAttention = workers.filter((w) => w.avgScore < 85 || w.trainingStatus === 'Needs Retraining');

  return (
    <div className="space-y-6">
      <div className="bg-[#121c38] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-orange-400" />
            Workers Requiring Immediate Attention
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Deterministic Rule Engine: Below 70% = Mandatory Retraining; 70–84% = Refresher Recommended; 85%+ = Competency Demonstrated.
          </p>
        </div>
      </div>

      <div className="bg-[#121c38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="p-3.5 pl-4">Worker</th>
              <th className="p-3.5">Department</th>
              <th className="p-3.5 text-center">Score</th>
              <th className="p-3.5">Identified Safety Issue</th>
              <th className="p-3.5">Recommended Module</th>
              <th className="p-3.5">Rule Reason</th>
              <th className="p-3.5 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {needingAttention.map((worker) => {
              // Find the failing module
              let weakMod = 'MOD-ROCK-01';
              let weakIssue = 'Inadequate score';
              if (worker.moduleResults['MOD-FIRE-02'] && worker.moduleResults['MOD-FIRE-02'].score < 70) {
                weakMod = 'MOD-FIRE-02';
                weakIssue = 'Delayed evacuation response';
              } else if (worker.moduleResults['MOD-GAS-03'] && worker.moduleResults['MOD-GAS-03'].score < 70) {
                weakMod = 'MOD-GAS-03';
                weakIssue = 'Gas warning alarm unrecognized';
              } else if (worker.moduleResults['MOD-ROCK-01'] && worker.moduleResults['MOD-ROCK-01'].score < 70) {
                weakMod = 'MOD-ROCK-01';
                weakIssue = 'Unstable roof bolt unverified';
              }

              return (
                <tr key={worker.workerId} className="hover:bg-slate-800/40">
                  <td className="p-3.5 pl-4">
                    <div className="font-bold text-white">{worker.name}</div>
                    <div className="text-[10px] text-orange-400 font-mono">{worker.workerId}</div>
                  </td>
                  <td className="p-3.5 text-slate-300">{worker.department}</td>
                  <td className="p-3.5 text-center font-mono font-bold">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        worker.avgScore < 70
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {worker.avgScore}%
                    </span>
                  </td>
                  <td className="p-3.5 text-rose-300 font-semibold">{weakIssue}</td>
                  <td className="p-3.5 text-slate-200">
                    {weakMod === 'MOD-ROCK-01' ? 'Falling Rock Hazard' : weakMod === 'MOD-FIRE-02' ? 'Fire Hazard' : 'Methane Gas Leak'}
                  </td>
                  <td className="p-3.5 text-slate-400 text-[11px]">
                    {worker.avgScore < 70 ? 'Rule: Score < 70 (Mandatory)' : 'Rule: 70–84 (Refresher)'}
                  </td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => onTriggerRetraining(worker, weakMod)}
                      className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs rounded transition shadow-md shadow-orange-500/20"
                    >
                      Assign Retraining
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeedbackView({ feedback, workers, modules, onNewFeedback }) {
  return (
    <div className="space-y-4">
      <div className="bg-[#121c38] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Mentor Guidance & Feedback Logs
          </h2>
          <p className="text-xs text-slate-400">
            Formative supervisory notes pushed to the worker's mobile application to improve physical technique.
          </p>
        </div>
        <button
          onClick={onNewFeedback}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs rounded-lg transition shadow-md shadow-orange-500/20"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>New Feedback Entry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedback.map((item) => {
          const worker = workers.find((w) => w.workerId === item.workerId);
          const mod = modules.find((m) => m.id === item.moduleId);

          return (
            <div
              key={item.feedbackId}
              className="bg-[#121c38] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-orange-500/40 flex items-center justify-center text-xs font-bold text-orange-400">
                      {worker ? worker.name.charAt(0) : 'W'}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{worker ? worker.name : item.workerId}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.workerId}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.createdAt}</span>
                </div>

                <div className="text-[11px] font-semibold text-orange-400 mb-2">
                  Module: {mod ? mod.name : item.moduleId}
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 italic leading-relaxed">
                  "{item.message}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>By: {item.mentorId}</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Pushed to Worker App
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CertificatesView({
  certificates,
  workers,
  onIssueCertificate,
  onPreviewCertificate,
  onVerifyCertificate
}) {
  const eligibleWorkers = workers.filter((w) => w.trainingStatus === 'Certificate Eligible');

  return (
    <div className="space-y-6">
      {/* Eligible Approval Section */}
      {eligibleWorkers.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/80 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm text-emerald-200 uppercase tracking-wide">
                Workers Eligible for Competency Certification
              </h3>
              <p className="text-xs text-emerald-400/80">
                Completed all 3 modules with &gt;85% safety score. Requires human mentor verification before issuance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {eligibleWorkers.map((w) => (
              <div
                key={w.workerId}
                className="bg-slate-900/90 border border-slate-700/80 rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white text-xs">{w.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Score: <strong className="text-emerald-400">{w.avgScore}%</strong> &bull; {w.department}
                  </div>
                </div>
                <button
                  onClick={() => onIssueCertificate(w)}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition shadow-md"
                >
                  Approve & Issue
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Issued Certificates Table */}
      <div className="bg-[#121c38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Issued Training Competency Certificates
            </h3>
            <p className="text-xs text-slate-400">
              Active verification records with cryptographic QR reference tokens.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Total Issued: <strong className="text-orange-400">{certificates.length}</strong>
          </span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="p-3.5 pl-4">Certificate ID</th>
              <th className="p-3.5">Worker Name</th>
              <th className="p-3.5 text-center">Score</th>
              <th className="p-3.5">Modules Completed</th>
              <th className="p-3.5">Issue Date</th>
              <th className="p-3.5">Issuing Mentor</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {certificates.map((cert) => (
              <tr key={cert.certificateId} className="hover:bg-slate-800/40">
                <td className="p-3.5 pl-4 font-mono font-bold text-orange-400">
                  {cert.certificateId}
                </td>
                <td className="p-3.5 font-bold text-white">{cert.workerName}</td>
                <td className="p-3.5 text-center font-mono font-bold text-emerald-400">
                  {cert.overallScore}%
                </td>
                <td className="p-3.5 text-slate-300">
                  3 of 3 (Rock, Fire, Methane)
                </td>
                <td className="p-3.5 text-slate-400 font-mono text-[11px]">{cert.issueDate}</td>
                <td className="p-3.5 text-slate-300">{cert.issuedBy}</td>
                <td className="p-3.5 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                    {cert.status}
                  </span>
                </td>
                <td className="p-3.5 pr-4 text-right space-x-2">
                  <button
                    onClick={() => onPreviewCertificate(cert)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onVerifyCertificate(cert.certificateId)}
                    className="px-2.5 py-1 bg-orange-500/20 hover:bg-orange-500 hover:text-slate-950 text-orange-300 text-xs rounded border border-orange-500/40 transition font-semibold"
                  >
                    Verify QR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsView({ workers, moduleAnalytics, certificates, assignments }) {
  const exportCSV = () => {
    const headers = ['Worker ID', 'Name', 'Department', 'Experience', 'Modules Completed', 'Avg Score', 'Status'];
    const rows = workers.map((w) => [
      w.workerId,
      `"${w.name}"`,
      `"${w.department}"`,
      `"${w.experience}"`,
      w.completedCount,
      `${w.avgScore}%`,
      `"${w.trainingStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SURAKSHASETU_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121c38] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Industrial Compliance & Audit Reports
          </h2>
          <p className="text-xs text-slate-400">
            Export official safety competency datasets for internal mine audits and DGMS compliance reviews.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={triggerPrint}
            className="flex items-center gap-2 px-3.5 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold rounded-lg transition shadow-md shadow-orange-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Audit Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#121c38] border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Miners Audited</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">{workers.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">100% telemetry synced</div>
        </div>
        <div className="bg-[#121c38] border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Certified Competent</div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{certificates.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Full 3-module pass</div>
        </div>
        <div className="bg-[#121c38] border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Active Deficiencies</div>
          <div className="text-2xl font-mono font-bold text-rose-400 mt-1">
            {workers.filter((w) => w.trainingStatus === 'Needs Retraining').length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Mandatory retraining active</div>
        </div>
        <div className="bg-[#121c38] border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Open Directives</div>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
            {assignments.filter((a) => a.status === 'Pending').length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">In worker queues</div>
        </div>
      </div>

      <div className="bg-[#121c38] border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-bold uppercase text-slate-300 mb-3">Audit Summary Preview</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          All practical exercises were conducted inside SurakshaSetu AR simulated underground colliery models. Sensor data reflects head orientation, acoustic sound testing frequency, and emergency response decision times measured against DGMS guidelines.
        </p>

        <div className="text-[11px] text-slate-400 font-mono border-t border-slate-800 pt-3 flex justify-between">
          <span>Reporting Mentor: Safety Mentor - Mining Training Dept</span>
          <span>Classification: INTERNAL SAFETY AUDIT - COLLIERY SEC-4</span>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ onResetData, onSimulateSync, workersCount, resultsCount }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-[#121c38] p-5 rounded-xl border border-slate-800">
        <h2 className="text-base font-bold text-white uppercase tracking-wider mb-1">
          Dual-Application Architecture & Telemetry Sync
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          SurakshaSetu AR operates as a bifurcated ecosystem: Workers interact through the AR headset application, while mentors evaluate and certify through this supervisory control dashboard.
        </p>
      </div>

      <div className="bg-[#121c38] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase text-slate-200">Simulate Real-Time AR Telemetry Sync</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Clicking the trigger below simulates a worker putting on the AR headset in the training gallery, completing an emergency scenario reassessment, and broadcasting their score back to this dashboard's state.
        </p>
        <button
          onClick={onSimulateSync}
          className="px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-orange-500/20 border border-orange-400 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Fire Simulated Worker AR Completion Event</span>
        </button>
      </div>

      <div className="bg-[#121c38] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase text-slate-200">LocalStorage Database Diagnostics</h3>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-400">Total Worker Records:</span> <strong className="text-white">{workersCount}</strong>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-400">Training Telemetry Logs:</span> <strong className="text-white">{resultsCount}</strong>
          </div>
        </div>
        <div className="pt-2">
          <button
            onClick={onResetData}
            className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-200 text-xs font-bold rounded-lg border border-red-800 transition"
          >
            Reset Mock Data to Initial Colliery State
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkerProfileModal({
  workerId,
  workers,
  modules,
  onClose,
  onAssignRetraining,
  onGiveFeedback,
  onIssueCertificate
}) {
  const worker = workers.find((w) => w.workerId === workerId);
  if (!worker) return null;

  // Radar chart data for competencies
  const radarData = [
    { subject: 'Falling Rock', A: worker.moduleResults['MOD-ROCK-01'] ? worker.moduleResults['MOD-ROCK-01'].score : 20, fullMark: 100 },
    { subject: 'Fire Evacuation', A: worker.moduleResults['MOD-FIRE-02'] ? worker.moduleResults['MOD-FIRE-02'].score : 20, fullMark: 100 },
    { subject: 'Methane Gas', A: worker.moduleResults['MOD-GAS-03'] ? worker.moduleResults['MOD-GAS-03'].score : 20, fullMark: 100 },
    { subject: 'Response Time', A: Math.max(20, 100 - (worker.avgResponseTime || 25) * 2), fullMark: 100 },
    { subject: 'Decision Accuracy', A: worker.mistakesList.length === 0 ? 95 : 60, fullMark: 100 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-[#172347] to-[#0f172a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center font-bold text-orange-400 text-lg">
              {worker.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{worker.name}</h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-orange-400 border border-slate-700 font-bold">
                  {worker.workerId}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-800 border border-slate-700 text-slate-200">
                  {worker.trainingStatus}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Dept: <strong className="text-slate-200">{worker.department}</strong></span>
                <span>&bull;</span>
                <span>Experience: <strong className="text-slate-200">{worker.experience}</strong></span>
                <span>&bull;</span>
                <span>Supervisor: <strong className="text-slate-200">Safety Mentor</strong></span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-[#121c38] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Overall Score</span>
              <div className="text-xl font-bold font-mono text-white mt-1">{worker.avgScore}%</div>
            </div>
            <div className="bg-[#121c38] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Modules Completed</span>
              <div className="text-xl font-bold font-mono text-orange-400 mt-1">{worker.completedCount} / 3</div>
            </div>
            <div className="bg-[#121c38] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Avg Reaction Latency</span>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">{worker.avgResponseTime}s</div>
            </div>
            <div className="bg-[#121c38] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Certification Status</span>
              <div className="text-xs font-bold text-teal-300 mt-2">
                {worker.hasCertificate ? 'Certified' : 'Pending Review'}
              </div>
            </div>
          </div>

          {/* Module Breakdown & Radar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module Results List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AR Hazard Module Assessments
              </h3>
              {modules.map((mod) => {
                const res = worker.moduleResults[mod.id];
                return (
                  <div
                    key={mod.id}
                    className="p-3.5 rounded-xl bg-[#121c38] border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{mod.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {res ? `Attempt #${res.attempt} &bull; Latency: ${res.responseTime}s &bull; ${res.completedAt}` : 'Scenario not yet attempted'}
                      </div>
                    </div>
                    <div>
                      {res ? (
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                            res.score >= 85
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : res.score >= 70
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {res.score}%
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Pending</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Competency Radar */}
            <div className="bg-[#121c38] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Competency Profile Radar
              </h3>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                    <Radar name={worker.name} dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Concrete Mistakes Log */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Concrete Telemetry Mistake Log
            </h3>
            {worker.mistakesList.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Flawless execution. No critical safety violations recorded across attempts.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {worker.mistakesList.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 flex items-center gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0c142c] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Mentor Authority Actions for <strong>{worker.name}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onGiveFeedback(worker)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition"
            >
              Mentor Feedback
            </button>
            <button
              onClick={() => onAssignRetraining(worker, 'MOD-ROCK-01')}
              className="px-3.5 py-2 bg-orange-500/20 hover:bg-orange-500 hover:text-slate-950 text-orange-400 text-xs font-bold rounded-lg border border-orange-500/40 transition"
            >
              Assign Retraining
            </button>
            {worker.completedCount === 3 && worker.avgScore >= 85 && !worker.hasCertificate && (
              <button
                onClick={() => onIssueCertificate(worker)}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition shadow-md shadow-emerald-500/20"
              >
                Issue Certificate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssignTrainingModal({ target, workers, modules, onClose, onSubmit }) {
  const defaultWorkerId = target.workerId || (workers[0] ? workers[0].workerId : '');
  const defaultModuleId = target.preselectedModule || (modules[0] ? modules[0].id : '');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-[#172347] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Assign AR Training Directive
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Worker</label>
            <select
              name="worker"
              defaultValue={defaultWorkerId}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
            >
              {workers.map((w) => (
                <option key={w.workerId} value={w.workerId}>
                  {w.name} ({w.workerId} - {w.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">AR Hazard Module</label>
            <select
              name="module"
              defaultValue={defaultModuleId}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.difficulty})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority Level</label>
              <select
                name="priority"
                defaultValue={target.priority || 'High'}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Standard">Standard</option>
                <option value="High">High</option>
                <option value="Critical">Critical (Mandatory Retraining)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                defaultValue="2026-09-30"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Mentor Training Instructions</label>
            <textarea
              name="instruction"
              rows="3"
              defaultValue="Complete acoustic sound testing and review immediate withdrawal protocols prior to reassessment."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold rounded-lg shadow-md shadow-orange-500/20"
            >
              Dispatch Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MentorFeedbackModal({ target, workers, modules, onClose, onSubmit }) {
  const defaultWorkerId = target.workerId || (workers[0] ? workers[0].workerId : '');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-[#172347] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Issue Mentor Feedback & Action Plan
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Worker</label>
            <select
              name="worker"
              defaultValue={defaultWorkerId}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
            >
              {workers.map((w) => (
                <option key={w.workerId} value={w.workerId}>
                  {w.name} ({w.workerId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Module Observed</label>
            <select
              name="module"
              defaultValue="MOD-FIRE-02"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Mentor Coaching Notes</label>
            <textarea
              name="message"
              rows="4"
              defaultValue="Good initial hazard recognition. Remember to immediately inspect the air intake velocity before choosing the retreat route in simulated smoke."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold rounded-lg shadow-md shadow-orange-500/20"
            >
              Push to Worker App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CertificateModal({ cert, onClose, onVerify }) {
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1329] border border-amber-500/60 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Certificate Preview Top Controls */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Official Certificate Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVerify(cert.certificateId)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-semibold text-xs flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" /> Test QR
            </button>
            <button
              onClick={triggerPrint}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formal Industrial Certificate Canvas */}
        <div className="p-8 bg-gradient-to-b from-slate-950 via-[#0a1024] to-slate-950 text-center relative border-8 border-double border-amber-500/40 m-4 rounded-xl">
          {/* Watermark / Background Crest */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <HardHat className="w-72 h-72 text-amber-500" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold tracking-widest uppercase">
              SURAKSHASETU AR &bull; INDUSTRIAL SAFETY STANDARDS
            </div>

            <h1 className="text-2xl font-black text-white tracking-wider uppercase font-serif">
              TRAINING COMPETENCY CERTIFICATE
            </h1>
            <p className="text-xs text-slate-400 italic">
              "Experience Safety. Build Competency."
            </p>

            <div className="pt-2 text-xs text-slate-300">
              This is to formally certify that
            </div>

            <div className="text-2xl font-extrabold text-amber-300 tracking-wide font-sans underline decoration-amber-500/50 underline-offset-8">
              {cert.workerName}
            </div>

            <div className="text-xs text-slate-400 max-w-md mx-auto pt-2 leading-relaxed">
              has satisfactorily completed practical immersive hazard simulations, demonstrated standard emergency response reflexes, and validated frontline industrial competency across:
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {cert.modules.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-semibold text-slate-200"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-3 text-left bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Overall Training Score</span>
                <div className="text-lg font-mono font-bold text-emerald-400">{cert.overallScore}%</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Issue Date</span>
                <div className="text-xs font-mono font-bold text-slate-200 mt-1">{cert.issueDate}</div>
              </div>
            </div>

            {/* Signature & QR Section */}
            <div className="pt-6 flex items-center justify-between border-t border-slate-800/80 px-4">
              <div className="text-left">
                <div className="font-serif italic text-amber-400 font-bold text-sm">
                  {cert.issuedBy}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Authorizing Safety Mentor</div>
                <div className="text-[10px] text-slate-400 font-mono">Dhanbad Colliery Training Division</div>
              </div>

              {/* Simulated QR Code Box */}
              <div
                onClick={() => onVerify(cert.certificateId)}
                className="cursor-pointer flex flex-col items-center p-2 rounded-lg bg-white text-slate-950 shadow-lg hover:scale-105 transition"
                title="Click to simulate QR scan verification"
              >
                {/* SVG QR Code Illustration */}
                <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#0b1329" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#0b1329" />
                  <rect x="65" y="10" width="25" height="25" fill="#0b1329" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#0b1329" />
                  <rect x="10" y="65" width="25" height="25" fill="#0b1329" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#0b1329" />
                  <rect x="45" y="15" width="10" height="10" fill="#0b1329" />
                  <rect x="45" y="45" width="10" height="10" fill="#0b1329" />
                  <rect x="65" y="45" width="15" height="10" fill="#0b1329" />
                  <rect x="45" y="65" width="10" height="25" fill="#0b1329" />
                  <rect x="65" y="65" width="25" height="10" fill="#0b1329" />
                  <rect x="75" y="80" width="15" height="10" fill="#0b1329" />
                </svg>
                <span className="text-[8px] font-mono font-black mt-1 text-slate-900 tracking-tighter">
                  {cert.certificateId}
                </span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 font-mono pt-2">
              Verification URI: /verify/{cert.certificateId} &bull; Prototype industrial training certification
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerificationModal({ certId, certificates, workers, onClose }) {
  const cert = certificates.find((c) => c.certificateId === certId);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-[#172347] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">
              SurakshaSetu AR Verification Check
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          {cert ? (
            <>
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-bold text-xs border border-emerald-800 tracking-wider">
                  CERTIFICATE VALID
                </span>
                <div className="text-lg font-bold text-white mt-2">{cert.workerName}</div>
                <div className="text-xs text-slate-400 font-mono">{cert.certificateId}</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Worker ID:</span>
                  <span className="font-mono font-bold text-white">{cert.workerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Overall Score:</span>
                  <span className="font-mono font-bold text-emerald-400">{cert.overallScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="font-mono text-slate-200">{cert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issuing Mentor:</span>
                  <span className="text-slate-200 font-medium">{cert.issuedBy}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Prototype verification database record. Calibrated for mining workforce competency review.
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-white">Certificate Not Found</div>
              <div className="text-xs text-slate-400 font-mono">ID: {certId}</div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}