# Ascend — Source of Truth Document
# Source: canonical/1. Final Ascend App Requirements (AC).docx
# This file captures the complete specification for the Ascend dashboard.

## APP OVERVIEW
- **App Name:** Ascend
- **Owner:** Dominion Wellness Solutions
- **Purpose:** Holistic Health & Performance (HPO/H2F) readiness platform for military operators/Airmen
- **Five Readiness Components:** Physical, Nutritional, Mental, Spiritual, Sleep

---

## 1. USER ROLES (Role-Based Access)

### 1a. User / Operator / Airman (End-User)
- First login triggers onboarding, then same-day daily check-in (before normal dashboard)
- View OPS and HPO/H2F readiness component status
- Log workouts, limitations, recovery status, nutrition inputs, sleep status, medical-history docs
- Request support via My Support Team; message authorized specialists
- View assigned actions and progress

### 1b. Strength & Conditioning Specialist (SCS) / Fitness Coach
- View assigned users and unit performance
- Monitor OPS, Physical Readiness, Sleep Readiness, workout adherence, OFT status, reconditioning, limitations, activity trends
- Assign/update training plans; flag PT/IM review
- Use authorized medical-history summaries for training/reconditioning/return-to-performance decisions
- Contribute workload, utilization, OFT, and reporting metrics

### 1c. PT / Injury Manager (PT/IM)
- View injury/recovery information where authorized
- See limitations, recovery trends, return-to-performance status, rehab strategy summaries
- Coordinate with SCS; support quarterly injury reporting and IDMT documentation handoff
- App is NOT an official medical record

### 1d. Nutritionist / Dietitian (Authorized Support Pathway)
- View nutrition trends only when enabled/authorized
- Review meal consistency, skipped meals, hydration, quick/processed meal patterns, energy/recovery summaries
- Assign simple nutrition habits; coordinate with SCS as needed

### 1e. Mental Health / Mental Performance Practitioner (Authorized Support Pathway)
- View Mental Readiness trends only when enabled/authorized
- Review stress, focus, emotional balance, mental exhaustion, coping patterns
- Assign reset/focus/stress-management actions
- Use minimum necessary medical-history context when authorized
- NO emergency/crisis care, diagnosis, treatment, therapy replacement, or clinical documentation

### 1f. Purpose Coach / Spiritual Readiness Coach (Authorized Support Pathway)
- View Spiritual Readiness trends only when enabled/authorized
- Review motivation, values, purpose, connection, morale, user preference signals
- Assign reflection, values, gratitude, service, connection, or meaning-based actions
- Must be opt-in, preference-based, non-coercive; not visible to leadership by default
- Spiritual readiness personnel cannot access medical records unless Government-approved

### 1g. Leadership / HPO Program Manager
- View aggregate engagement, utilization, OPS, readiness components, assessment, OFT, reconditioning, training, education, support trends
- View monthly/quarterly report outputs
- NO sensitive individual-level details unless specifically authorized

### 1h. IDMT or Approved Government Recipient
- Receive authorized documentation exports and handoff summaries only when approved
- Direct app access NOT enabled unless Government-authorized and configured

### 1i. DWS Admin / Contract Manager
- Manage accounts, roles, teams, specialists, permissions, support issues, reports, export logs, compliance trackers, documentation handoffs, access removal
- No developer intervention needed for routine changes

---

## 2. CORE APP MODULES

### 2a. Secure Login & Account Management
- Login, password reset, account activation/deactivation
- Role assignment; assignment to coach/specialist/team/unit/reporting group
- Login/activity tracking, access logs
- Target 125+ operator accounts + staff at launch, scalable beyond
- Account creation: admin/provisioning-led or minimal self-activation (NO separate account-creation-then-onboarding flow)

### 2b. Onboarding Assessment (First-Use Baseline)
- Baseline across 5 HPO/H2F readiness components
- 1-4 scoring rubric → component scores → baseline OPS
- Identify possible support pathways
- Keep non-clinical unless Government-approved workflow requires otherwise
- Required on first use before regular dashboard/recommendations/check-in cadence shown

### 2c. Daily Check-In
- Under 60 seconds
- Default flow: one scored question per readiness component + optional pain/injury/profile/limitation follow-up
- Updates OPS and readiness component status
- Triggers recommendation and optional support routing based on thresholds
- Each response maps to one HPO/H2F readiness driver → SCS recommendation, PT/IM review, modified training, reconditioning, or return-to-performance plan link
- Becomes first screen each day until completed

### 2d. Weekly Check-In
- 10 questions: 2 scored questions per readiness component
- Confirms whether daily readiness pattern is improving, stable, or declining
- Begins only after approved cadence (e.g., 7 days after onboarding)
- Same mapping to SCS/PT/IM actions as daily check-in

### 2e. Monthly Check-In
- 10 questions: 2 scored questions per readiness component
- Supports progress review, plan adjustment, reconditioning decisions, readiness reporting, quarterly program improvement
- Begins only after approved monthly cadence (e.g., 30 days after onboarding)

### 2f. My Support Team
- User-facing support pathway for Fitness/Performance, Injury/Recovery, Nutrition, Mental Performance, Purpose/Spiritual Readiness
- Short descriptions, request support button, messaging (if enabled), assigned actions, follow-up status, role-based privacy boundaries

### 2g. Medical Records Upload & Health History
- Secure upload, storage, review, controlled use of medical records/history
- Helps PT/IM, SCS, nutrition, mental performance make better recommendations
- Strict role-based access, encryption, malware scanning, audit logs, upload metadata, consent/authorization status, export controls, retention/disposition rules, OMPF/AMHRR-style records governance
- Ascend is NOT the official medical record / OMPF/iPERMS / MHS GENESIS / AHLTA unless expressly authorized
- Must separate raw medical documents from performance summaries
- Non-clinical users receive only PT/IM-approved, minimum-necessary guidance
- Masking/redaction before sharing with SCS, nutrition, mental performance, or non-clinical pathways
- All views, downloads, exports, access changes generate immutable audit events

---

## 3. FIRST-USE FLOW (Section 2A — Critical)

1. **Account Provisioning:** Admin/Government roster import or minimal self-activation
2. **First Login Gate:** Detect onboarding_status = incomplete → route to onboarding. Normal dashboard/weekly/monthly/recommendations locked.
3. **Baseline OPS:** Calculated on onboarding submit. NOT the same as current daily readiness.
4. **Same-Day Daily Check-In:** Launches immediately after onboarding. Establishes Day 0 readiness pulse.
5. **Current OPS Display:** Only after BOTH onboarding + same-day check-in complete. If check-in incomplete: show "Baseline OPS only - daily check-in needed" with OPS confidence = Low.
6. **Normal Cadence Begins:** Daily check-in = first screen each day until completed. Weekly/monthly appear only when due.
7. **Provider Visibility:** SCS/PT/IM see onboarding baseline + Day 0 check-in as initial user profile. Provider flags created on thresholds/pain/injury/medical-history indicators/high-priority trends.
8. **Abandonment:** If user stops during onboarding → onboarding_status = incomplete, reminder sent. No current OPS, recommendations, routing, or leadership metrics generated from incomplete data.

---

## 4. CHECK-IN-TO-DRIVER-TO-PLAN MAPPING (Section 2B)

### Daily Check-In Questions (5 + optional pain/injury)

| Question | Primary Driver | SCS Use | PT/IM Use | Required Output |
|----------|---------------|---------|-----------|-----------------|
| How physically ready do you feel today? | Physical Readiness | Adjust training load; assign light/moderate/full activity; update OFT/reconditioning readiness | Review if readiness decline linked to pain, injury, profile, limitation, or RTP concern | SCS recommendation or PT/IM review flag when threshold met |
| Which best describes your fueling today? | Nutritional Readiness | Adjust training intensity if fueling is poor; reinforce hydration/fueling action | Review if poor fueling affects recovery, injury healing, fatigue, rehab tolerance | Nutrition action; SCS fueling note; PT/IM consideration if recovery impact |
| How focused and steady do you feel right now? | Mental Readiness | Modify session complexity, coaching intensity, feedback approach if focus/readiness low | Review if mental readiness affects pain response, rehab adherence, recovery confidence, RTP behavior | Mental readiness recommendation; optional support routing; provider note if persistent |
| How connected do you feel to your purpose or motivation today? | Spiritual Readiness | Identify adherence risk, low motivation, disengagement, need for values-based goal reset | Review if low motivation affecting rehab adherence or recovery plan follow-through | Purpose-support prompt; SCS goal reset; PT/IM adherence note when relevant |
| How was your sleep last night? | Sleep Readiness | Adjust workload, recovery emphasis, workout intensity; connect sleep pattern to training tolerance | Review if poor sleep is pain-related, recovery-related, or affecting rehab progress | Sleep/recovery recommendation; modified training guidance; PT/IM review if injury/pain link |
| [Optional] Any pain, injury, profile, or limitation today? | Physical + Sleep | Modify workout immediately; pause high-risk movements | Primary review owner when pain, injury, profile, limitation, or RTP concern present | PT/IM review item; SCS modified plan; RTP status update |

### Weekly Check-In Questions (10 total, 2 per component)
1. Consistency of physical activity → Physical Readiness → Training plan update / adherence note / PT/IM review flag
2. Pain/injury/profile/limitation effect on training → Physical Readiness → Rehab strategy review, modified activity plan, RTP update
3. Meal consistency → Nutritional Readiness → Nutrition habit, fueling recommendation, training-load consideration
4. Hydration support for energy/recovery → Nutritional Readiness → Hydration reinforcement; SCS fueling note; PT/IM if recovery impact
5. Focus and concentration → Mental Readiness → Adjust coaching intensity; mental readiness recommendation; optional support routing
6. Mental exhaustion / emotional balance → Mental Readiness → Assess mental fatigue impact on training/sleep; provider note if persistent
7. Motivation and sense of purpose → Spiritual Readiness → Values-based goal reset; adherence risk flag; purpose-support prompt
8. Connection / support from others → Spiritual Readiness → Identify isolation risk; SCS coaching approach adjustment; support routing
9. Sleep quality and duration → Sleep Readiness → Adjust workload/recovery; sleep/recovery recommendation; PT/IM if injury/pain link
10. Restfulness / daytime energy → Sleep Readiness → Assess sleep pattern impact on training tolerance; PT/IM review if pain/recovery link

### Monthly Check-In Questions (10 total, 2 per component)
1. Physical activity frequency and intensity adherence → Physical Readiness → Plan adjustment or reconditioning decision
2. Injury/recovery status and rehab plan adherence → Physical Readiness → Rehab strategy update, RTP status, quarterly injury report input
3. Meal consistency and nutrition plan adherence → Nutritional Readiness → Nutrition plan adjustment, fueling habit update
4. Hydration consistency and energy impact → Nutritional Readiness → Reinforce hydration; SCS training-load consideration
5. Focus, stress management, emotional resilience → Mental Readiness → Assess mental readiness trajectory; adjust support routing
6. Mental exhaustion and coping effectiveness → Mental Readiness → Evaluate coping strategies; provider note if persistent
7. Motivation, purpose alignment, values living → Spiritual Readiness → Values/goal reset; adherence risk flag
8. Meaningful connections / support utilization → Spiritual Readiness → Identify social support gaps; adjust coaching/support
9. Sleep pattern improvements or declines → Sleep Readiness → Adjust recovery emphasis; PT/IM review if pain/recovery link
10. Overall readiness trend (improving/stable/declining) → All Components → Readiness reporting, plan adjustment, reconditioning decision

---

## 5. DATA DICTIONARY (Section 14 — Key Entities)

### User Profile
- Full name, date of birth, gender, unit/assignment, rank, service branch, contact info, profile completion status, profile last updated

### Readiness & OPS
- Current OPS (0-100), baseline OPS, component scores (Physical/Nutritional/Mental/Spiritual/Sleep readiness), OPS confidence level, score history, last updated

### Check-Ins
- Check-in date, type (daily/weekly/monthly), completion status, responses per question, readiness component scores, recommendations generated, routing status, last updated

### Recommendations & Actions
- Recommendation ID, source (check-in/onboarding/AI), type (SCS/PT/IM/Nutrition/Mental/Spiritual), status, assigned specialist, due date, user acceptance/completion status, last updated

### Support Requests & Messaging
- Request ID, support type, status, assigned specialist, conversation/thread, messages, follow-up status, privacy level, last updated

### Workout & Activity Logs
- Workout ID, date, type (OFT/reconditioning/other), components (strength/cardio/flexibility), duration, intensity, completed exercises, notes, adherence to assigned plan, OFT status (pass/fail/current/not current/exempt), last updated

### Injury & Recovery
- Injury/recovery ID, injury type, severity, onset date, limitation/profile status, rehab strategy, return-to-performance stage, follow-up schedule, PT/IM notes, last updated

### Assessments
- Assessment ID, type (initial/follow-on), date, results, follow-on due date, feedback session status, completion status (50%/6 months, 90%/12 months), last updated

### Utilization & Workload
- SCS hours (target 2,080/yr, 95% coverage), PT/IM hours (target 512/yr, 95% coverage), RSD weekend coverage, assessment completion rates, session counts, last updated

### OFT (Occupational Fitness Test)
- OFT ID, user, date, pass/fail, current/not current/exempt, score, reconditioning required, last updated

### IDMT Support
- Documentation export date, handoff log, authorized recipients, transfer status, last updated

### Fly Away Kits
- Checklist items, training plan, equipment list, export status, last updated

### Equipment/Supply Gaps
- Gap description, severity, request date, approval status, resolution status, last updated

### Training Compliance
- AT Level I (due_date, completion_date, certificate_uploaded, status)
- OPSEC (due_date, completion_date, certificate_uploaded, status)
- Annual Refresher (due_date, completion_date, certificate_uploaded, status)
- BLS/Professional Credentials (credential_type, expiration_date, renewal_status, document_uploaded)

### Medical Record Governance
- Document type, sensitivity level, consent status, access level, malware scan status, audit log status, retention status, disposition due date

### Check-In-to-Plan Mapping
- Mapped driver, SCS action, PT/IM action, output generated

### First-Use Workflow
- account_provisioned_status, onboarding_status, day0_daily_checkin_status, current_ops_status, ops_confidence_level, cadence_start_dates, abandonment_status

---

## 6. SECURITY, OPSEC & CUI CONTROLS (Section 15)

- Minimum necessary data; protect PII and sensitive readiness information
- Role-based access; restrict specialist visibility to role-relevant info
- Leadership visibility = aggregate/approved reporting only by default
- Audit logs for access, role changes, exports, report generation
- No unauthorized public release, social sharing, public links, photography, recording, or disclosure of Government ops
- No photo/video upload unless specifically enabled and approved
- Do NOT transmit unit movement details, operational schedules, tactics, equipment vulnerabilities, or other OPSEC/CUI info in ordinary workflows
- OPSEC/CUI warning language in admin, reporting, messaging, and export areas
- Export controls for sensitive reports; maintain report export logs
- Return/transfer/retain/destroy Government info only per contract, KO, COR, or Government procedures

**Security Design Standard:**
- App supports performance/readiness continuity, NOT surveillance
- User trust collapses if sensitive inputs auto-visible to leadership
- Medical-record uploads: encryption in transit and at rest, malware scanning, file-type restrictions, file-size limits, access logging, controlled export permissions
- Ascend separates raw medical documents from performance summaries
- Non-clinical users receive only PT/IM-approved, minimum-necessary guidance
- Uploaded medical records governed by consent/authorization, role-based access, sensitivity level, retention/disposition, approved recipient controls
- Masking/redaction before medical-history shared with SCS, nutrition, mental performance, or non-clinical pathways
- All medical-record views, downloads, exports, access changes generate immutable audit events

---

## 7. COMMERCIAL BOUNDARIES (Section 16)

- Ascend is a **pre-existing commercial capability** unless contract modification directs otherwise
- Configuration, role setup, reporting templates, contract-specific deliverables may be created for HPO effort
- NO new Government-specific source code unless authorized by contract modification or written direction
- Contract-specific reports, exports, deliverables per PWS and contract data-rights requirements
- DWS Ascend core platform, source code, algorithms, scoring logic, commercial IP remain protected unless contract expressly states otherwise
- At closeout: account deactivation, export of Government-directed reports, handle Government info as directed
- Ascend may store controlled copies of medical-history docs for HPO workflows but those copies are NOT authoritative medical/personnel records
- Ascend must NOT be described as OMPF/iPERMS, MHS GENESIS, AHLTA, or Government system of record unless expressly authorized

---

## 8. SPECIALIST NOTES & BOUNDARIES (Section 17)

- Keep simple and role-specific: date, specialist type, user concern, action assigned, follow-up needed, status
- App must NOT become medical record, behavioral health record, chaplain record, crisis response platform, or command surveillance tool
- Specialist notes support coaching continuity, NOT formal clinical or privileged documentation
- Spiritual readiness support must remain user-respecting, opt-in, preference-based
- Clinical/privileged communications require separate Government-approved handling
- When uploaded medical history used, specialist notes document only performance-relevant action, not unnecessary medical detail
- PT/IM-approved medical-history performance summaries may inform SCS programming, reconditioning, nutrition guidance, recovery planning, authorized specialist support

---

## 9. AI-ASSISTED INSIGHTS (Section 18)

- AI may identify patterns, summarize trends, flag possible readiness concerns, suggest coaching considerations, suggest support routing, organize quarterly reporting inputs, support recommendation matching
- AI must NOT: diagnose medical conditions, make clinical decisions, replace providers, send sensitive alerts to leadership without approved rules, act as emergency response, interpret spiritual identity
- AI-supported recommendations must be reviewable, explainable, and overrideable by authorized humans
- QCP/PRS Compliance Support:
  - Track SCS coverage hours and missed coverage flags against 2,080 annual hours and 95% coverage evidence
  - Track PT/IM coverage hours and missed coverage flags against 512 annual hours and 95% coverage evidence
  - Track RSD weekend support coverage separately from normal operating hours
  - Track assessment completion: 50% within six months, 90% within first year
  - Track follow-on assessment completion every 12 months
  - Generate PRS support report for quarterly review
  - Support corrective action notes when coverage, assessment, utilization, reporting, or security standards are missed
  - Track QCP issue categories, prevention actions, corrective actions, responsible party, due date, closure status
- AI must NOT independently interpret uploaded medical records, generate clinical conclusions, or route medical-history info to specialists unless DWS and Government separately approve
- If future AI summarization of medical-record uploads enabled: output must be clearly labeled as AI-assisted, reviewed by authorized human, approved before informing recommendations or specialist visibility

---

## 10. PWS TRACEABILITY MATRIX (Section 19)

| PWS Area | App Feature | Primary Role | Output |
|----------|------------|--------------|--------|
| 1.4.3 Quality Control | QCP issue tracker, corrective action log, PRS support report | DWS Admin/Contract Manager | QCP evidence, corrective action export |
| 1.4.5 Security/AT/OPSEC/PII | Compliance tracker, OPSEC/CUI warnings, export logs, role-based access, audit log, security controls | Admin, all roles as applicable | Certificate tracker, audit log, security controls |
| 1.4.7 PT/IM Qualifications | Credential tracker, BLS expiration support | Admin, PT/IM | Credential readiness dashboard |
| 1.4.7 SCS Qualifications | Credential tracker, certification status support | Admin, SCS | Credential readiness dashboard |
| 5.1 PT/IM Requirements | Injury/recovery module, rehab strategy, return-to-performance tracking, IDMT handoff | PT/IM, SCS, Admin | Quarterly injury report, handoff log |
| 5.2 SCS Requirements | Training plans, workout logs, OFT support, reconditioning, education utilization, performance trends | SCS | Workout reports, OFT metrics, utilization data |
| 5.3 Admin/Logistics | Software tracking system, operator files, IDMT documentation, Fly Away kit support | SCS, PT/IM, Admin | File/export log, kit plan export |
| 5.4 Coordination | Leadership dashboard, equipment/supply gap tracker, quarterly coordination inputs | SCS, PT/IM, Leadership | Gap list, recommendations, leadership report |
| 5.5 Operator-Focused | Assessment module, feedback session tracking, completion thresholds, individual/unit analysis | SCS, PT/IM, Leadership | Assessment completion report, PRS evidence |
| 5.6 Quarterly Reports | Report templates and export module | SCS, PT/IM, Admin, Leadership | Quarterly PDF/CSV/dashboard summary |
| 5.6.1 Utilization | Training/education/feedback utilization tracker | SCS, PT/IM, Admin | Utilization report |
| 5.6.2 Injury Report | Injury/recovery reporting module | PT/IM, SCS | Quarterly injury report export |
| 5.7 Remote Fitness Coaching | Login accountability, messaging, workout logging, SCS monitoring, real-time plan updates | User, SCS, PT/IM, Leadership | App engagement, readiness, injury/recovery, workout reports |
| Technical Exhibit 1 | PRS coverage hours, assessment completion, follow-on assessment tracking | Admin, SCS, PT/IM | PRS support report |
| Technical Exhibit 2 | Deliverables report due reminders, certificate trackers, export logs | Admin | Deliverables status dashboard |
| Medical History/Records | Secure upload, medical-history summary, role-based access, audit log, retention/disposition | User, PT/IM, SCS, authorized specialists, Admin | Performance-informed care, medical history summary, access audit, IDMT/Government handoff |

---

## 11. CONTRACT-READY ACCEPTANCE CHECKLIST (Section 20)

| Requirement | Must Be True Before HPO Launch |
|------------|-------------------------------|
| User Scale | App supports all authorized unit members, NOT hard-coded around 12 |
| OPS & Check-Ins | Daily check-in under 60 seconds; updates OPS/readiness components |
| First-Use Flow | Onboarding + same-day check-in required before current OPS displayed as active |
| Threshold Logic | Routing thresholds configurable; implemented as recommendation, coach flag, specialist route, or safety boundary |
| Data Dictionary | Required fields exist for: user profile, check-ins, OPS, recommendations, support requests, workout logs, assessments, OFT, injury, utilization, workload, IDMT, Fly Away kits, equipment gaps, certificates, exports |
| Permission Matrix | Role-based access implemented and verified for all sensitive data types |
| Assessment Tracking | Tracks initial assessments, 50%/6-month threshold, 90%/12-month threshold, annual follow-up, feedback sessions |
| OFT Support | Tracks OFT status, pass/fail, current/not current/exempt, reconditioning, monthly metrics |
| Injury Reporting | Supports injury/recovery status, rehab strategy summary, RTP status, quarterly injury report export |
| Utilization Reporting | Tracks training, education, feedback sessions, app use, specialist use, provider workload, support requests |
| IDMT Support | Supports authorized documentation exports and handoff logs |
| Fly Away Kits | Supports Fly Away kit checklist, training plan, equipment list, export |
| Equipment/Supply Gaps | Tracks shortfalls; included in leadership reporting |
| Training Compliance | Tracks AT Level I, OPSEC, refresher due dates, certificates, submission status |
| Security/OPSEC | Restricts sensitive data, controls exports, prevents unauthorized sharing, OPSEC/CUI warnings |
| Commercial App Boundary | DWS commercial platform and source code protections preserved unless contract direction says otherwise |
| QCP/PRS Evidence | Supports coverage tracking, assessment compliance, corrective actions, quarterly PRS support reporting |
| Reports | Monthly OFT, quarterly utilization, quarterly injury, assessment completion, PRS/QCP, leadership aggregate, IDMT handoff report templates implemented |
| Medical Records Upload | Secure upload, metadata capture, malware scanning, encryption, consent/authorization, role-based access, audit logs |
| Medical History Use | PT/IM, SCS, authorized specialists can use approved medical-history summaries for performance/recovery/readiness/RTP recommendations |
| OMPF/System-of-Record Boundary | Ascend NOT represented as OMPF/iPERMS, MHS GENESIS, AHLTA, or official Govt system of record unless Govt expressly authorizes |
| Scoring Rubric | 1-4 response scoring scale, 25/50/75/100 conversion, reverse scoring, flag-only logic, score-band labels implemented |
| OPS Formula | Uses approved HPO/H2F component weights and cadence weights; onboarding baseline reduced after 90 days or used as reference-only |
| OPS Confidence | Displays High/Medium/Low based on data completeness; does NOT silently over-interpret stale/sparse data |
| Provider Score Triggers | Component scores, trends, pain/injury flags, OFT failure, recovery decline create correct SCS recommendation, PT/IM review, reconditioning update, or RTP plan link |
| Scoring Configuration | Admin can update thresholds, component weights, cadence weights, readiness bands, provider routing rules without code changes |
| First-Use Flow | Account creation admin/provisioning-led or minimal self-activation; first login launches onboarding; same-day check-in begins immediately; current OPS displayed only after both complete; weekly/monthly appear only when due |
| Question Bank | Onboarding, daily, weekly, monthly check-ins include exact end-user answer choices, backend scoring values, readiness-component tags, scoring direction, flag-only exceptions |
| Question Integrity | Each question maps to one primary HPO/H2F readiness component; simple language; no unnecessary open text; protects sensitive spiritual/medical inputs; preserves OPS scoring validity |
| End-User Simplicity | Daily check-in = 5 scored + 1 optional pain/injury follow-up; weekly = 10 questions; monthly = 10 questions; onboarding = short first-use baseline |

---

# END OF ASCEND SPECIFICATION
# Last extracted from: canonical/1. Final Ascend App Requirements (AC).docx
