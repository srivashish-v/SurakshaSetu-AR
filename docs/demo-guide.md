# Technology Stack

SurakshaSetu is documented in two stages:

1. Current Prototype
2. Planned Production Stack

## Current Prototype

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide React

### Browser AR
- WebAR
- MindAR
- A-Frame
- Image / marker tracking

### Data
- Browser `localStorage`

### Demonstrated
- Browser-based AR
- Marker/image tracking
- Hazard interaction
- Safety questions
- Scoring
- Worker application
- Mentor dashboard
- Local data sharing

## Planned Production Stack

### Worker AR
- Unity
- C#
- AR Foundation
- Google ARCore
- Android

### Mentor Portal
- React

### Backend
Planned services for:
- Authentication
- Worker profiles
- Training assignments
- Assessment data
- Progress tracking
- Mentor actions
- Certification records

### Database
Planned cloud storage for:
- Worker records
- Module completion
- Assessment results
- Performance history
- Mentor feedback
- Retraining assignments

### AI Service

#### AI Virtual Instructor
Contextual guidance and training explanations.

#### AI Performance Analyst
Interpretation of objective assessment data to identify weak areas, repeated mistakes, performance trends, and retraining areas.

AI supports the assessment system and mentor; it does not replace objective scoring or human validation.

## Architecture

```text
             WORKER
                │
                ▼
       ┌─────────────────┐
       │ Unity Android AR│
       │     App         │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Cloud Backend   │
       │ + Database      │
       └───────┬─────────┘
               │
       ┌───────┴─────────┐
       ▼                 ▼
┌──────────────┐  ┌────────────────┐
│ AI Service   │  │ Mentor Portal  │
└──────────────┘  │ React          │
                  └────────────────┘
```

## Data Flow

```text
AR Interaction
      ↓
Assessment Engine
      ↓
Performance Data
      ↓
Cloud Backend
      ↓
AI Analysis
      ↓
Performance Insights
      ↓
Mentor Dashboard
      ↓
Retraining Assignment
      ↓
Worker AR App
```

## Offline Support

Planned production flow:

```text
Training Data
     ↓
Local Cache
     ↓
Offline Training
     ↓
Connectivity Available
     ↓
Data Synchronization
     ↓
Cloud Backend
```

## Technology Philosophy

The prototype prioritizes rapid validation.

The production stack prioritizes:
- Scalability
- Reliability
- Offline capability
- Security
- Maintainability
- Analytics
- Enterprise deployment
