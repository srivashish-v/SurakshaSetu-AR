# Current Prototype

## Overview

The current SurakshaSetu prototype is a browser-based demonstration of the proposed AR safety-training workflow.

It validates the core user experience before a production Android AR implementation.

## What Works Right Now

### Browser-Based AR
The prototype runs in a web browser and demonstrates AR interaction without a dedicated VR headset.

### Marker / Image Tracking
The prototype uses marker/image-based tracking through:
- MindAR
- A-Frame
- WebAR

### Hazard Interaction

```text
Detect Hazard
     ↓
Interact
     ↓
Make Decision
     ↓
Continue Scenario
```

### Safety Questions
Safety questions are associated with training scenarios and produce results based on responses.

### Scoring
The prototype calculates training performance using its implemented assessment logic.

### Worker Application
The worker-facing interface supports:
- Module viewing
- Training start
- Scenario completion
- Questions
- Results

### Mentor Dashboard
The mentor-facing interface demonstrates how worker training information can be monitored.

### Local Data Sharing

```text
Worker App
    ↓
Assessment Result
    ↓
localStorage
    ↓
Mentor Dashboard
```

This is a prototype mechanism, not the final production backend.

## Current Prototype vs Production

| Feature | Current Prototype | Planned Production |
|---|---|---|
| AR | WebAR | Unity + ARCore |
| Platform | Browser | Android |
| Tracking | Marker/Image | ARCore |
| Data | localStorage | Cloud Database |
| Authentication | Prototype-level | Production Authentication |
| Assessment | Local prototype logic | Unity Assessment Engine |
| AI | Demonstration / planned | Dedicated AI Service |
| Mentor Dashboard | React prototype | Production React Portal |
| Offline | Browser/local prototype | Offline-first Android |
| Certification | Demonstration flow | QR-verifiable certificates |

## What the Prototype Proves

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
Worker Dashboard
     ↓
Mentor Dashboard
```

The prototype is a functional proof of concept, not the final production architecture.
