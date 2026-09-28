# SurakshaSetu

## AR-Based Mining & Industrial Safety Training Platform

SurakshaSetu is a scenario-based AR safety training platform designed to bridge the gap between theoretical learning and practical competency.

> **Core idea:** Learn → Practice → Assess → Retrain → Demonstrate Competency

## Problem

Safety training can depend heavily on theory, classroom instruction, demonstrations, and limited practical exposure. This can create a gap between learning a procedure and applying it in a realistic situation.

Key challenges include:
- Limited repeated practical practice
- Difficulty safely recreating hazardous situations
- Dependence on physical training environments
- Manual performance evaluation
- Difficulty tracking individual weaknesses
- Language and accessibility barriers
- Difficulty standardizing scenarios across batches

## Solution

SurakshaSetu connects a worker-facing training application with a mentor-facing dashboard.

### Worker Application
- Assigned training modules
- AR scenarios
- Hazard identification
- Interactive actions
- Safety decisions
- Assessments
- Results and retraining

### Mentor Dashboard
- Worker progress
- Module completion
- Assessment results
- Weak-area identification
- Targeted retraining
- Competency validation

### Assessment Engine

The assessment engine records objective events such as decisions, actions, mistakes, response time, question responses, and task completion.

### AI-Assisted Analysis

The planned production system uses AI as a guidance and analysis layer for contextual training support, performance interpretation, weak-area identification, and retraining recommendations.

AI does not replace the objective assessment engine or human mentor validation.

## Training Workflow

```text
LEARN
  ↓
EXPERIENCE
  ↓
ACT
  ↓
ASSESS
  ↓
FEEDBACK
  ↓
IMPROVE
  ↓
CERTIFY
```

## Current Prototype

The current prototype is a browser-based proof of concept demonstrating:
- WebAR
- Marker/image tracking
- Hazard interaction
- Safety questions
- Scoring
- Worker application
- Mentor dashboard
- localStorage-based data sharing

It is a functional PoC, not the final production backend.

## Planned Production

- Unity + C#
- AR Foundation
- Google ARCore
- Android AR application
- React mentor portal
- Cloud backend and database
- Secure authentication
- Real-time telemetry
- AI-assisted insights
- Offline-first synchronization
- QR-verifiable certificates
- Enterprise deployment

## High-Level Architecture

```text
┌──────────────────────┐
│  Worker Android AR   │
│  Unity + ARCore      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Cloud Backend      │
│   + Database         │
└───────┬───────┬──────┘
        │       │
        ▼       ▼
┌────────────┐ ┌────────────────┐
│ AI Service │ │ Mentor Portal  │
└────────────┘ │ React          │
               └────────────────┘
```

## Training Modules

- **Falling Rock Hazard** — recognize a simulated ground/falling-rock hazard and select the appropriate response.
- **Fire Hazard** — respond to a simulated fire emergency and follow the required procedure.
- **Methane Gas Leak** — recognize a simulated methane-related hazard and follow the appropriate response.

## Technology

### Current Prototype
- React
- Vite
- Tailwind CSS
- Lucide React
- WebAR
- MindAR
- A-Frame
- browser `localStorage`

### Planned Production
- Unity
- C#
- AR Foundation
- Google ARCore
- React
- Cloud backend/database
- AI service
- Authentication
- Offline synchronization

## Documentation

- [Problem Statement](docs/problem-statement.md)
- [Solution](docs/solution.md)
- [Workflow](docs/workflow.md)
- [Training Modules](docs/modules.md)
- [Technology Stack](docs/technology-stack.md)
- [Current Prototype](docs/prototype.md)
- [Jury Demo Guide](docs/demo-guide.md)
- [Future Scope](docs/future-scope.md)

## Product Philosophy

1. **Practice, not just theory** — provide active scenario-based practice.
2. **Measure practical performance** — capture observable decisions and actions.
3. **Human-guided improvement** — use technology and AI to support mentors, while mentors validate competency.

## Current Status

**Stage: Proof of Concept / Prototype**

The current implementation validates:

```text
AR Scenario
    ↓
Hazard Interaction
    ↓
Safety Decision
    ↓
Assessment
    ↓
Result
    ↓
Mentor Review
```

The production architecture in this repository represents the planned next stage.

## Long-Term Vision

```text
Current WebAR Prototype
          ↓
Android AR Application
          ↓
Cloud Training Platform
          ↓
AI-Assisted Analytics
          ↓
Competency Tracking
          ↓
Digital Certification
          ↓
Multi-Industry Safety Training
```

**Repeatable • Observable • Measurable • Accessible • Scalable**
