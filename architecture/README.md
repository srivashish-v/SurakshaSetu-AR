# SurakshaSetu AR — System Architecture

## 1. System Overview

SurakshaSetu AR is an industrial safety competency-training platform built around the workflow:

LEARN → EXPERIENCE → ACT → ASSESS → FEEDBACK → IMPROVE → CERTIFY

The system consists of three major user-facing components:

1. Worker AR Training
2. Worker Application
3. Mentor Dashboard

---

## 2. High-Level Architecture

```text
                    SURAKSHASETU AR
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    AR TRAINING       WORKER APP      MENTOR DASHBOARD
          │                │                │
          │                │                │
          └────────────────┼────────────────┘
                           │
                    SHARED TRAINING DATA
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          Results      Assignments    Feedback
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                      RETRAINING
                           │
                           ▼
                     RE-ASSESSMENT
                           │
                           ▼
                      COMPETENCY
                           │
                           ▼
                      CERTIFICATE