# Training Modules

Each module follows:

```text
Scenario → Hazard → Worker Decision → Action → Assessment → Result
```

## Module 1 — Falling Rock Hazard

### Scenario
A simulated mining environment contains a falling-rock / ground-related hazard.

### Worker Task
1. Observe the surroundings
2. Identify the hazard
3. Choose the appropriate response
4. Follow the required procedure

### Assessment
- Hazard identification
- Decision correctness
- Safety-question response
- Action completion
- Response time

### Result
The worker receives correct decisions, incorrect decisions, missed hazards, and areas requiring improvement.

---

## Module 2 — Fire Hazard

### Scenario
A simulated fire-related emergency requires the worker to respond appropriately.

### Worker Task
1. Recognize the emergency
2. Identify the appropriate response
3. Follow the required procedure
4. Reach the designated safe area where applicable

### Assessment
- Emergency recognition
- Decision-making
- Procedure adherence
- Response time
- Task completion

### Result
The system generates a performance result and identifies areas that may require retraining.

---

## Module 3 — Methane Gas Leak

### Scenario
A simulated methane-related hazard is introduced.

### Worker Task
1. Identify warning signs
2. Recognize the hazard
3. Make the appropriate safety decision
4. Follow the required response procedure

### Assessment
- Hazard recognition
- Decision correctness
- Evacuation/action sequence
- Response time
- Completion status

### Result
The worker receives a performance summary that can be reviewed by the mentor.

## Module Structure

```text
Module
 ├── Learning Content
 ├── Scenario
 ├── Hazard
 ├── Worker Actions
 ├── Assessment Rules
 ├── Performance Result
 └── Retraining Recommendation
```
