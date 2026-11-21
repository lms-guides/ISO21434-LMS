/* ISO/SAE 21434 study guide — interview bank, glossary, exam */
window.INTERVIEW = [
  { topic: "Fundamentals", q: "What is ISO/SAE 21434 in one sentence?", a: `
<p>It is the international engineering standard for cybersecurity in road vehicles: it defines the activities, responsibilities and work products needed to manage cybersecurity risk across the lifecycle of E/E systems, from concept through decommissioning, without prescribing specific technologies.</p>
<p><em>If pushed further:</em> published 2021, developed by ISO/TC 22/SC 32 with SAE, supersedes SAE J3061, voluntary standard, not a certification scheme.</p>` },
  { topic: "Fundamentals", q: "Why is it needed when ISO 26262 already exists?", a: `
<p>Because faults and attacks are different causes of the same harm. ISO 26262 analyses random and systematic failures through a HARA and assigns ASILs; it does not model an intelligent adversary, attack paths or feasibility. A vehicle can be functionally safe and remotely controllable.</p>
<p>The two disciplines share the item definition and cross-check each other: hazardous events from the HARA are candidate damage scenarios in the TARA, and attack paths that could violate a safety goal go back to the safety team.</p>` },
  { topic: "Fundamentals", q: "Walk me through the clause structure.", a: `
<p>Clauses 1&ndash;4 are scope, references, terms and general considerations. Clauses 5&ndash;8 are the management and context layer: organisational management, project-dependent management, distributed activities and continual activities. Clauses 9&ndash;14 follow the lifecycle: concept, product development, validation, production, operations and maintenance, end of support. Clause 15 is the TARA method library used throughout, and Annexes A&ndash;H are informative guidance including the work-product summary (A) and CAL (E).</p>` },
  { topic: "Fundamentals", q: "What are work products and why do they matter?", a: `
<p>Work products are the tangible outputs of cybersecurity activities &mdash; the item definition, TARA, cybersecurity plan, case, requirements specification, verification results, incident response records. The standard identifies them as WP-xx-yy.</p>
<p>They matter because the standard is evidenced, not declared. An assessor asks for artefacts and traces them. A project with excellent intentions and no versioned work products fails; a modest project with complete, consistent, traceable artefacts passes.</p>` },
  { topic: "Fundamentals", q: "Is ISO 21434 mandatory, and can you be certified?", a: `
<p>The standard itself is voluntary. It becomes binding through contracts and through regulation indirectly: UN R155 requires a certified Cybersecurity Management System for type approval, and manufacturers commonly use 21434 work products as the evidence, then flow the requirement to suppliers.</p>
<p>There is no ISO-operated certification scheme comparable to ISO/IEC 27001. Certification bodies run their own assessment programmes and issue attestations; those are not type approvals. The correct phrase is &ldquo;assessed against&rdquo; or &ldquo;compliant with&rdquo;, not &ldquo;certified to&rdquo;.</p>` },
  { topic: "TARA", q: "Explain TARA to a non-specialist.", a: `
<p>TARA answers four questions: what could an attacker damage, what would that cost us, how hard would it be for them, and what are we going to do about it?</p>
<p>We list the valuable assets, describe the harm if their security properties are broken, work out the routes an attacker could take, rate how feasible each route is and how severe the harm is, combine the two into a risk value, and then decide to avoid, reduce, share or retain that risk. The decisions become security goals and requirements.</p>` },
  { topic: "TARA", q: "What is the difference between a damage scenario and a threat scenario?", a: `
<p>A damage scenario is the adverse consequence for a road user or stakeholder &mdash; &ldquo;unintended braking at speed causes loss of control&rdquo;. A threat scenario is the attacker action that causes it, defined as the targeted asset plus the compromised cybersecurity property plus the cause &mdash; for example spoofing of a brake command on the bus by a node with physical access.</p>
<p>Threat scenarios cause damage scenarios. Impact is rated on the damage; feasibility is rated on the attack paths that realise the threat.</p>` },
  { topic: "TARA", q: "How do you rate impact?", a: `
<p>In four categories &mdash; safety, financial, operational and privacy &mdash; each on a severity scale, typically negligible, moderate, major, severe, with Annex F as guidance. The overall rating is normally the maximum across categories, but I keep the breakdown because the treatment differs: a privacy-severe scenario needs data minimisation and retention controls, a safety-severe one needs a hard control.</p>
<p>For safety I reuse the safety team's hazard severity judgements so the two analyses are consistent. Every rating gets a written rationale.</p>` },
  { topic: "TARA", q: "How do you rate attack feasibility?", a: `
<p>Per attack path, using one of three approaches. Attack-potential is the workhorse: score elapsed time, expertise, knowledge of the item, window of opportunity and equipment, sum them, and map to high/medium/low/very low. Attack-vector is coarse and fast &mdash; remote, adjacent, local, physical. CVSS-based works well for discovered vulnerabilities.</p>
<p>Whichever approach we choose, we apply it consistently and document the mapping. Crucially, feasibility is rated per path, and the threat scenario inherits the maximum across its paths, because the attacker takes the easiest route.</p>` },
  { topic: "TARA", q: "How do you get from risk value to engineering?", a: `
<p>Each threat scenario above the acceptance threshold gets a treatment decision. &ldquo;Reduce&rdquo; produces cybersecurity goals; &ldquo;share&rdquo; or &ldquo;retain&rdquo; produces claims with rationale and an approver; &ldquo;avoid&rdquo; changes scope by removing the function or connection.</p>
<p>Goals are refined into verifiable requirements, allocated to architecture elements, verified by test or analysis, validated at vehicle level, and the whole chain is recorded in the cybersecurity case. Retained risks stay in the register and under monitoring.</p>` },
  { topic: "TARA", q: "How long does a TARA take, and who is in the room?", a: `
<p>For a well-defined item, roughly two days of workshops to get assets, damage and threat scenarios, then about a week of engineering effort to build attack paths, ratings and treatment decisions, plus a review. The room needs the system architect, a software lead, the safety engineer, a test engineer and a facilitator who owns method consistency.</p>
<p>It must finish before the architecture freezes, otherwise its only output is documentation.</p>` },
  { topic: "TARA", q: "What makes a TARA bad?", a: `
<p>No attack paths, no rationale, no rejected scenarios, every risk the same value, and no design decision changed. Also: rating threats rather than damage, ignoring back-end and app paths, copying a catalogue without instantiating it for the item, and finishing after design freeze.</p>
<p>The practical test: can the team name the top three risks and the control that addresses each? If not, the analysis is decoration.</p>` },
  { topic: "Engineering", q: "What is the difference between verification and validation?", a: `
<p>Verification asks whether we built the requirement correctly &mdash; does the control behave as specified? Validation asks whether we built the right thing &mdash; in the real vehicle, with real interfaces and an independent attacker, can the cybersecurity goals still be violated?</p>
<p>A requirement can pass verification and fail validation, which is why clause 11 exists as a separate activity with penetration testing and attack-path replay on production-representative vehicles.</p>` },
  { topic: "Engineering", q: "How would you secure a connected telematics unit?", a: `
<p>Start from the item definition: interfaces are cellular, GNSS, Wi-Fi/Bluetooth, CAN to the gateway, OBD and the app/back end. Then layer the controls: mutual authentication and pinned trust for the back end, per-vehicle credentials in an HSM, signed and anti-rollback-protected updates, secure boot, disabled debug and unused services, gateway filtering so the unit cannot send arbitrary frames to safety domains, rate limiting and anomaly detection on the back end, and least privilege in the app.</p>
<p>Then validate: replay old unlock commands, attempt downgrade, try to reach the chassis domain through the unit, and test the app's account takeover path.</p>` },
  { topic: "Engineering", q: "Where does security architecture actually pay off?", a: `
<p>In structural decisions made early: domain separation and zoning, a filtering gateway with allow-lists, HSMs on safety-relevant ECUs, centralised per-vehicle key provisioning and revocation, and removing unnecessary connectivity and debug access. These are cheap at concept and extremely expensive to retrofit.</p>
<p>The review question I use is: assume the most exposed component is fully compromised &mdash; what can the attacker reach next, and which control stops them?</p>` },
  { topic: "Engineering", q: "What is defence in depth in a vehicle?", a: `
<p>It is an argument, not a control count: if prevention fails, detection and containment must still prevent the damage scenario. In practice, layers from the outside in &mdash; interface authentication and rate limiting, gateway filtering and domain separation, ECU secure boot and HSM, application least privilege, back-end identity and monitoring, and process controls such as key management and secure development.</p>
<p>Each layer should name the damage scenario it protects and the assumption it relies on.</p>` },
  { topic: "Engineering", q: "How do you handle a security requirement you cannot verify by test?", a: `
<p>Use analysis, inspection or demonstration, and say so explicitly in the verification plan with a rationale. For example, key storage in an HSM is verified by design inspection plus a penetration attempt at extraction, not by a functional test.</p>
<p>What I would not do is leave the requirement with no method. Requirements verified only by argument should be visible to the assessor and reconsidered at validation.</p>` },
  { topic: "Process", q: "What is the cybersecurity case and who writes it?", a: `
<p>It is the structured argument, with evidence, that the item satisfies its cybersecurity goals and that residual risk is understood and accepted. It contains scope and assumptions, the risk argument, the traceability from goals to requirements to verification, an evidence index with versions, open items, and a conclusion with an approver.</p>
<p>The project cybersecurity manager owns it, but it is assembled from engineering evidence &mdash; it is not a separate document written at the end.</p>` },
  { topic: "Process", q: "What is tailoring and when is it acceptable?", a: `
<p>Tailoring is deciding that an activity or work product is not needed, or is satisfied differently, for a specific item &mdash; for example a component with no external interfaces needing a reduced threat analysis. It is expected and sensible.</p>
<p>It is acceptable when it records what was tailored, the risk-based justification, and who approved it. It is not acceptable when the reason is schedule pressure. Assessors look for exactly that distinction.</p>` },
  { topic: "Process", q: "How do you scale rigour across a vehicle programme?", a: `
<p>With CAL as guidance: assign a level from impact and attack feasibility, then define what each level means for review independence, verification depth, attack-path testing and documentation. Document the assignment rule and apply it consistently.</p>
<p>I would never blanket-assign the top level &mdash; that destroys prioritisation &mdash; and I would not let CAL replace the TARA. CAL scales the assurance effort; the risk argument stays in the analysis.</p>` },
  { topic: "Process", q: "What is in a cybersecurity plan?", a: `
<p>Scope and item boundary, applicable clauses and tailoring decisions, roles and responsibilities, the activity schedule aligned to the V-model, work products and templates, supplier interfaces, tooling, review and assessment milestones, release criteria, monitoring and incident-response handover, and risk escalation.</p>
<p>Its purpose is to make the work auditable in advance: if an activity is not in the plan, it will not happen.</p>` },
  { topic: "Supply chain", q: "How do you manage cybersecurity with suppliers?", a: `
<p>Three mechanisms. First, capability evaluation at sourcing &mdash; sampled work products and technical discussion, not questionnaires. Second, explicit allocation in a Cybersecurity Interface Agreement: who does the item TARA, who owns component analysis, who validates, who monitors, notification timelines, support period, audit rights, subcontractor flow-down. Third, ongoing evidence: requirements traceability, verification results, SBOMs and vulnerability notifications.</p>
<p>The most valuable single activity is walking one attack path across the organisational boundary at design freeze to confirm who authenticates what.</p>` },
  { topic: "Supply chain", q: "A supplier refuses to share their TARA. What do you do?", a: `
<p>Separate the artefact from the conclusion. I need enough to discharge my item-level duty: the threat scenarios relevant to interfaces I expose, the properties and assumptions their analysis relies on, and the verification evidence. That can be an extract under NDA or a recorded joint review.</p>
<p>If nothing is available, that is a capability finding. I would either compensate architecturally and record the residual risk with an approver, or not source the component.</p>` },
  { topic: "Supply chain", q: "What is the difference between off-the-shelf and out-of-context?", a: `
<p>Off-the-shelf means you did not develop it and cannot easily change it &mdash; handling is evidence collection, hardening guidance, architectural compensation and a support-period commitment. Out-of-context means it was developed without knowledge of the final item, so the supplier documents assumptions and constraints that the integrator must validate.</p>
<p>A component can be both. The distinction matters because the obligations differ.</p>` },
  { topic: "Supply chain", q: "How do you prevent an unvalidated assumption across the supply chain?", a: `
<p>Make assumptions testable and owned. &ldquo;Behind a filtering gateway&rdquo; becomes an interface requirement on the gateway, a verification case, and an entry in the assumption register with an owner. At design freeze and again at validation, each assumption is checked against the actual architecture.</p>
<p>An assumption without an owner and a validation method is a vulnerability with a delay.</p>` },
  { topic: "Operations", q: "Walk me through handling a newly published CVE in a component you use.", a: `
<p>First, exposure: is the component in the SBOM for a shipping build, in the affected version, and is the vulnerable function reachable in our configuration? Second, classification: safety-relevant or not, remote or local, already mitigated by an architectural control? Third, open a vulnerability record with severity, owner and deadline, and notify the vulnerability board if safety could be affected. Fourth, decide the treatment &mdash; patch, mitigate, monitor or accept with rationale &mdash; and check whether other products share the component. Fifth, notify customers within the contractual window and coordinate disclosure. Finally, verify the fix, release it, and update the TARA and threat catalogue.</p>` },
  { topic: "Operations", q: "Why is an SBOM essential?", a: `
<p>Because vulnerability triage starts with &ldquo;are we affected?&rdquo;, and that question needs component versions per build and per vehicle variant. Without an SBOM you can only guess, and guessing is either slow or wrong.</p>
<p>I would generate it automatically per build and keep it linked to the release baseline.</p>` },
  { topic: "Operations", q: "What does a good incident response look like?", a: `
<p>Preparation with defined roles and contacts; detection from telemetry, back-end monitoring, dealers and external reports; triage into scope, severity and safety relevance; containment with short-term actions such as revoking credentials or disabling a service; root cause analysis including whether the TARA was wrong; remediation through the update process; recovery and confirmation; and lessons learned that update the TARA, requirements, tests and monitoring rules.</p>
<p>Each incident gets its own plan with a lead, actions, times and closure criteria &mdash; not just a generic procedure.</p>` },
  { topic: "Operations", q: "What makes over-the-air updates secure?", a: `
<p>Authenticity with a per-vehicle or per-model trust anchor; integrity protection; authorisation so the vehicle verifies it is entitled to the update; anti-rollback so an old vulnerable version cannot be reinstalled; atomicity so a power loss does not brick the vehicle; a defined failure and recovery state; logging and reporting of update results; and protection of the signing keys in an HSM-backed service.</p>
<p>Then the organisational side: ISO 24089/UN R156 processes for campaigns, regression testing and regulatory notification.</p>` },
  { topic: "Operations", q: "What happens at end of cybersecurity support?", a: `
<p>It is a deliberate, communicated decision: define the support period at release, announce its end in advance, revoke credentials and certificates for the retired population, invalidate back-end access, erase personal data, archive the evidence for the required retention period, and record residual risk for the vehicles still in service.</p>
<p>Clause 14 exists because abandoned endpoints and still-valid certificates are unmonitored attack surface.</p>` },
  { topic: "Regulation", q: "How do ISO 21434 and UN R155 relate?", a: `
<p>R155 is a type-approval regulation requiring a certified Cybersecurity Management System and a per-vehicle-type assessment against its threat list; 21434 is the engineering standard that tells you how to do the work and what evidence to produce. R155 does not mandate the standard, but the standard is the common way to generate the evidence.</p>
<p>Practically: 21434 clause 5 forms the CSMS backbone, clauses 6&ndash;14 produce the project evidence, and clause 8/13 feed the surveillance obligations.</p>` },
  { topic: "Regulation", q: "What is CAL and how does it differ from ASIL?", a: `
<p>CAL is an informative scheme in Annex E with four levels that scale the rigour of cybersecurity assurance, derived from impact and attack vector. ASIL is a normative ISO 26262 classification derived from severity, exposure and controllability of a hazard.</p>
<p>So: CAL guides effort; ASIL classifies safety risk. Neither replaces the other, and calling CAL &ldquo;the security ASIL&rdquo; is a category error. ISO/SAE 8475 exists to make CAL and targeted attack feasibility usable consistently.</p>` },
  { topic: "Regulation", q: "Which standard covers software updates, and why does it matter?", a: `
<p>UN R156 requires a Software Update Management System for type approval, and ISO 24089 covers software update engineering. It matters because update capability determines how fast a security fix reaches the fleet, which is the exposure window during an incident.</p>
<p>If a fix needs a workshop visit, containment and notification strategy must assume months.</p>` },
  { topic: "Scenario", q: "You have one week and a new ECU programme. What do you do first?", a: `
<p>I would define the item boundary and interfaces, and check cybersecurity relevance. In parallel I would pull the existing architecture, requirements and supplier data, and identify the five highest-consequence functions and their reachable interfaces.</p>
<p>Then a focused TARA workshop with the architect and safety engineer, producing a ranked risk list and goals &mdash; enough to influence the architecture before it freezes. Tailoring and documentation come with it, but the priority is that the design decisions get made with risk information, not that the paperwork is complete first.</p>` },
  { topic: "Scenario", q: "Your project is late and the TARA is not finished. What do you do?", a: `
<p>I would not skip the analysis, because that is how a safety-relevant risk reaches production. I would shrink it to the decisions that still matter: the item boundary, the top risks by plausible impact, and the attack paths that change architecture. Record the tailoring, the residual uncertainty and a plan to complete the rest, and get it approved.</p>
<p>If the remaining risk is not understood, I would escalate the release decision rather than absorb it silently. That is what the escalation path is for.</p>` },
  { topic: "Scenario", q: "How would you explain to management why this investment matters?", a: `
<p>In their language: regulatory necessity for type approval, contractual necessity for winning programmes, and cost avoidance &mdash; a fleet-wide recall or remediation dwarfs the cost of designing controls in. I would bring a concrete example from our own product: one reachable interface, one credible attack path, one estimate of remediation cost versus design cost.</p>
<p>Then propose a measurable first step: one pilot item, a TARA, and a release gate, with a 90-day timeline.</p>` },
  { topic: "Scenario", q: "How do you keep the process alive after the first audit?", a: `
<p>Make it part of normal engineering: gates in the existing development process, traceability in the existing requirements tool, security review in the existing design review, and metrics the teams already report. Then keep it honest with internal audit findings that are actually closed.</p>
<p>If the process only exists in a separate folder for the assessor, it dies the moment attention moves.</p>` }
];

window.GLOSSARY = [
  { term: "Attack feasibility", abbr: "", def: "Rating of how easy it is to carry out an attack path, typically high, medium, low or very low. Rated per attack path, not per threat scenario." },
  { term: "Attack path", def: "A sequence of steps that realises a threat scenario. Often represented as an attack tree with AND/OR gates." },
  { term: "Attack potential", def: "Feasibility approach scoring elapsed time, expertise, knowledge of the item, window of opportunity and equipment; summed and mapped to a feasibility level." },
  { term: "Asset", def: "An object that has cybersecurity properties and whose compromise can lead to a damage scenario." },
  { term: "ASIL", def: "Automotive Safety Integrity Level, A to D, from ISO 26262. Derived from severity, exposure and controllability of a hazard. Not the same as CAL." },
  { term: "CAL", def: "Cybersecurity Assurance Level, CAL 1 to 4. Informative scheme (Annex E) for scaling the rigour of cybersecurity activities." },
  { term: "CIA (interface)", def: "Cybersecurity Interface Agreement: the clause 7 document allocating cybersecurity responsibilities and work products between customer and supplier. Not confidentiality-integrity-availability." },
  { term: "Claim", def: "A cybersecurity claim records a risk judgement - retained, shared or out of scope - with rationale and evidence, and the conditions under which it is invalid." },
  { term: "CSMS", def: "Cybersecurity Management System: the organisational system that UN R155 requires an approval authority to certificate." },
  { term: "CVSS", def: "Common Vulnerability Scoring System. Can be used as an attack feasibility input, especially for discovered vulnerabilities, but is not a vehicle-context risk rating on its own." },
  { term: "Cyber security case", def: "Structured argument, with evidence, that the item satisfies its cybersecurity goals and that residual risk is acceptable." },
  { term: "Cybersecurity concept", def: "Clause 9 output describing how the architecture and processes will satisfy the goals, including control strategy and defence in depth." },
  { term: "Cybersecurity goal", def: "High-level, technology-independent objective derived from a risk treatment decision, stating the asset, property and required outcome." },
  { term: "Cybersecurity relevance", def: "Determination of whether an item or component needs cybersecurity activities. Annex D provides example criteria and methods." },
  { term: "Cybersecurity requirement", def: "A verifiable, allocated, traceable specification that implements a goal or claim, including defined failure behaviour." },
  { term: "Damage scenario", def: "Adverse consequence for a road user or stakeholder caused by compromise of an asset's cybersecurity property." },
  { term: "Defence in depth", def: "A layered argument that if one control fails, another still prevents, detects or contains the damage scenario." },
  { term: "Distributed cybersecurity activities", def: "Cybersecurity work split between organisations, governed by clause 7 and a cybersecurity interface agreement." },
  { term: "End of cybersecurity support", def: "The point at which an organisation stops monitoring and patching an item; must be defined, communicated and accompanied by credential revocation and data handling (clause 14)." },
  { term: "Event evaluation", def: "Clause 8 activity deciding whether a piece of cybersecurity information is relevant to the item." },
  { term: "HSM", def: "Hardware Security Module: hardware that stores keys and performs cryptographic operations in isolation from the main processor." },
  { term: "Impact rating", def: "Severity of a damage scenario, rated in safety, financial, operational and privacy categories." },
  { term: "Incident response plan", def: "Per-incident plan covering scope, lead, containment, communication, remediation and closure, under clause 13." },
  { term: "Item", def: "The system or function under cybersecurity analysis, with a defined boundary and interfaces." },
  { term: "Item definition", def: "Clause 9 work product describing function, boundary, components, interfaces, data flows, operating environment and assumptions." },
  { term: "Off-the-shelf component", def: "A component developed for a general market rather than for the specific item; handled through evidence collection, hardening and architectural compensation." },
  { term: "Out-of-context component", def: "A component developed without knowledge of the final item, supplied with assumptions and constraints the integrator must validate." },
  { term: "PSIRT", def: "Product Security Incident Response Team: operational owner of incident handling and vulnerability response." },
  { term: "Release for post-development", def: "The clause 6 gate authorising production and operation, with assessment complete and post-development responsibilities assigned." },
  { term: "Residual risk", def: "Risk remaining after treatment; must be recorded, approved and monitored." },
  { term: "Risk treatment decision", def: "Decision to avoid, reduce, share or retain a risk for each threat scenario, with rationale (clause 15.9)." },
  { term: "Risk value", def: "Combination of impact and attack feasibility, typically 1 to 5, used to prioritise treatment." },
  { term: "SBOM", def: "Software Bill of Materials: inventory of components and versions in a build; prerequisite for efficient vulnerability exposure analysis." },
  { term: "Secure boot", def: "Boot chain in which each stage verifies the authenticity and integrity of the next, anchored in immutable hardware." },
  { term: "STRIDE", def: "Threat enumeration framework: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege." },
  { term: "SUMS", def: "Software Update Management System required by UN R156 for type approval." },
  { term: "Tailoring", def: "Documented decision that an activity or work product is not needed, or is satisfied differently, with justification and approval." },
  { term: "TARA", def: "Threat Analysis and Risk Assessment: the clause 15 method linking assets, damage and threat scenarios, attack paths, feasibility, impact, risk value and treatment." },
  { term: "Threat scenario", def: "Targeted asset plus compromised cybersecurity property plus the cause of the compromise." },
  { term: "TISAX", def: "Trusted Information Security Assessment Exchange: VDA scheme assessing organisational information security in the automotive supply chain." },
  { term: "UN R155", def: "UN regulation requiring an approved Cybersecurity Management System and vehicle type cybersecurity assessment." },
  { term: "UN R156", def: "UN regulation requiring a Software Update Management System." },
  { term: "Validation", def: "Clause 11 activity demonstrating that cybersecurity goals are achieved in the vehicle context, including penetration testing." },
  { term: "Verification", def: "Clause 10 activity demonstrating that an implementation conforms to its cybersecurity requirements." },
  { term: "Vulnerability", def: "A weakness that can be exploited to compromise a cybersecurity property." },
  { term: "Vulnerability management", def: "Clause 8 process of tracking, treating, disclosing and closing vulnerabilities, with evidence." },
  { term: "Work product", def: "Tangible output of a cybersecurity activity (WP-xx-yy), used as evidence in assessment." },
  { term: "Zero-day", def: "A vulnerability exploited before a fix or public disclosure exists; handling relies on detection, containment and rapid response." }
];

window.EXAM = [
  {
    q: "ISO/SAE 21434 applies to which scope?",
    options: [
      "Enterprise IT systems of automotive manufacturers",
      "E/E systems of series-production road vehicles, their components and interfaces, over the lifecycle",
      "Only autonomous driving functions",
      "Only software updates"
    ],
    answer: 1,
    explain: "Scope is series-production road vehicle E/E systems, components and interfaces, from concept to decommissioning."
  },
  {
    q: "Which clause contains the TARA methods?",
    options: ["Clause 6", "Clause 9", "Clause 15", "Annex H"],
    answer: 2,
    explain: "Clause 15 defines the TARA methods. Clause 9 applies them in the concept phase; Annex H is an example."
  },
  {
    q: "Which is a work product rather than a requirement?",
    options: ["RQ-06-02", "WP-06-01 cybersecurity plan", "RC-15-12", "Clause 9.4"],
    answer: 1,
    explain: "WP- identifiers denote work products. RQ- denotes requirements, RC- recommendations."
  },
  {
    q: "The cybersecurity plan differs from the cybersecurity policy in that it is:",
    options: [
      "Approved by the supplier",
      "Project-specific, with activities, owners, milestones and work products",
      "Only required for autonomous vehicles",
      "A legal document"
    ],
    answer: 1,
    explain: "Policy and rules are organisational (clause 5). The plan is per item/component (clause 6)."
  },
  {
    q: "Which activity belongs to clause 8?",
    options: [
      "Assigning CAL levels",
      "Evaluating whether a published vulnerability affects the item",
      "Performing the HARA",
      "Releasing for post-development"
    ],
    answer: 1,
    explain: "Clause 8 covers monitoring, event evaluation, vulnerability analysis and management."
  },
  {
    q: "What is the correct order of the risk chain?",
    options: [
      "Goal, threat scenario, asset, requirement",
      "Item definition, asset, threat scenario, attack path, risk value, treatment, goal, requirement",
      "Requirement, TARA, goal, validation",
      "Asset, requirement, goal, TARA"
    ],
    answer: 1,
    explain: "Risk analysis precedes goals, which precede requirements. Item definition fixes the context."
  },
  {
    q: "Impact is rated in which categories?",
    options: [
      "Safety, financial, operational, privacy",
      "Confidentiality, integrity, availability",
      "Severity, exposure, controllability",
      "High, medium, low"
    ],
    answer: 0,
    explain: "Clause 15 impact categories: safety, financial, operational and privacy. Annex F gives guidance."
  },
  {
    q: "An attack path is best described as:",
    options: [
      "A list of vulnerabilities in a component",
      "A sequence of steps that realises a threat scenario",
      "A damage scenario with an impact rating",
      "A network topology diagram"
    ],
    answer: 1,
    explain: "The path describes how the scenario is realised; feasibility is rated on the path."
  },
  {
    q: "Which is NOT a valid risk treatment option in clause 15.9?",
    options: ["Avoid", "Reduce", "Share", "Ignore"],
    answer: 3,
    explain: "Avoid, reduce, share or retain. Retaining requires rationale and a claim; 'ignore' is not a decision."
  },
  {
    q: "A cybersecurity claim is used to:",
    options: [
      "Replace a missing requirement",
      "Record the rationale for a retained, shared or out-of-scope risk",
      "Certify the product",
      "Justify skipping validation"
    ],
    answer: 1,
    explain: "Claims document judgement calls with rationale and evidence, and are monitored."
  },
  {
    q: "Which statement about CAL is accurate?",
    options: [
      "CAL 4 is mandatory for safety-critical ECUs",
      "CAL is informative and scales assurance rigour from impact and attack vector",
      "CAL is calculated from severity, exposure and controllability",
      "CAL is issued by the approval authority"
    ],
    answer: 1,
    explain: "Annex E, informative. Severity/exposure/controllability yields ASIL, not CAL."
  },
  {
    q: "UN R155 requires:",
    options: [
      "ISO 21434 certification for each ECU",
      "An approved CSMS and per-vehicle-type cybersecurity assessment",
      "CAL 3 for all connected components",
      "Annual red-team exercises"
    ],
    answer: 1,
    explain: "R155 is type-approval regulation; the CSMS certificate is valid up to three years."
  },
  {
    q: "Which document allocates cybersecurity responsibilities between OEM and supplier?",
    options: [
      "Cybersecurity plan",
      "Cybersecurity interface agreement",
      "Cybersecurity case",
      "Production control plan"
    ],
    answer: 1,
    explain: "Clause 7 and Annex C: the CIA allocates activities and work products."
  },
  {
    q: "An out-of-context component must be supplied with:",
    options: [
      "A full vehicle TARA",
      "Assumptions and constraints under which its analysis is valid",
      "A CAL 4 certificate",
      "The OEM's production control plan"
    ],
    answer: 1,
    explain: "The integrator validates those assumptions in the real item context."
  },
  {
    q: "Validation under clause 11 primarily demonstrates:",
    options: [
      "Conformance to requirements",
      "That cybersecurity goals hold in the vehicle context, including against attack paths",
      "That the code compiles without warnings",
      "That suppliers were evaluated"
    ],
    answer: 1,
    explain: "Validation is goal-level and vehicle-level, typically including penetration testing."
  },
  {
    q: "What must a production control plan cover?",
    options: [
      "Only the bill of materials",
      "Application and evidence of security-relevant steps: provisioning, configuration, end-of-line checks, tool and data protection",
      "Only supplier payment terms",
      "The marketing launch schedule"
    ],
    answer: 1,
    explain: "Clause 12 requires the plan and its implementation, with records tied to the vehicle."
  },
  {
    q: "Why do per-vehicle keys matter?",
    options: [
      "They reduce flash usage",
      "A compromise of one vehicle does not compromise the fleet, and revocation is possible",
      "They are required by ISO 26262",
      "They make OTA updates faster"
    ],
    answer: 1,
    explain: "Fleet-wide shared keys turn a single extraction into a fleet compromise with no revocation path."
  },
  {
    q: "Which is a symptom of a weak cybersecurity culture according to Annex B?",
    options: [
      "Cybersecurity decisions are traceable",
      "Accountability for cybersecurity decisions is untraceable",
      "Incidents are reported openly",
      "Engineers understand which threat a control addresses"
    ],
    answer: 1,
    explain: "Annex B contrasts traceable accountability with untraceable decisions, among other indicators."
  },
  {
    q: "A retained risk must be:",
    options: [
      "Deleted from the register once the release ships",
      "Recorded with rationale and approver, and monitored under clause 8",
      "Converted into a requirement automatically",
      "Approved by the supplier only"
    ],
    answer: 1,
    explain: "Retained and shared risks remain visible, approved and monitored."
  },
  {
    q: "Which factor is NOT part of attack-potential scoring?",
    options: ["Elapsed time", "Expertise", "Knowledge of the item", "Supplier maturity"],
    answer: 3,
    explain: "Attack potential: elapsed time, expertise, knowledge of item, window of opportunity, equipment."
  },
  {
    q: "What should happen when a validated penetration test succeeds against a TARA attack path?",
    options: [
      "The finding is filed without changing anything",
      "The risk treatment is reconsidered: fix, mitigate or record accepted risk, then re-test and update the TARA",
      "The attack feasibility rating is lowered",
      "The path is removed from scope"
    ],
    answer: 1,
    explain: "A successful attack is evidence the treatment failed. The TARA must reflect the new information."
  },
  {
    q: "Which best describes the cybersecurity case?",
    options: [
      "A collection of all project documents",
      "A structured argument with evidence that goals are met and residual risk is acceptable",
      "The TARA spreadsheet",
      "The supplier contract annex"
    ],
    answer: 1,
    explain: "It is an argument with traceability and an evidence index, not an archive."
  },
  {
    q: "Which is the correct pairing?",
    options: [
      "ISO 24089 - software update engineering",
      "ISO 26262 - cybersecurity engineering",
      "ISO/SAE 8475 - functional safety",
      "TISAX - vehicle type approval"
    ],
    answer: 0,
    explain: "24089 covers software updates. 26262 is safety, 8475 covers CAL/TAF, TISAX is organisational information security assessment."
  },
  {
    q: "Why is the item definition so important?",
    options: [
      "It lists all suppliers",
      "It fixes the boundary, interfaces, data flows and assumptions that make risk ratings meaningful",
      "It is required by UN R156",
      "It replaces the TARA"
    ],
    answer: 1,
    explain: "Risk is contextual; without a defined boundary and assumptions, ratings cannot be reviewed or defended."
  },
  {
    q: "What is the strongest evidence that a supplier is capable?",
    options: [
      "A completed questionnaire",
      "Sampled work products and a technical discussion with the engineers who produced them",
      "A low price",
      "A marketing certification logo"
    ],
    answer: 1,
    explain: "Capability is demonstrated by artefacts and the reasoning behind them, not by self-assessment."
  }
];
