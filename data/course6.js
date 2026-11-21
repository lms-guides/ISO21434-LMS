/* ISO/SAE 21434 study guide — modules 11-12 */
window.MODULES = window.MODULES || [];

window.MODULES.push({
  id: "m11",
  num: "11",
  title: "CAL & the annexes",
  blurb: "Scaling rigour with Cyber Security Assurance Levels, and squeezing value out of Annexes A-H.",
  lessons: [
    {
      id: "m11l1",
      title: "Cyber Security Assurance Levels in practice",
      minutes: 12,
      body: `
<p class="lead">CAL is the most over-claimed and under-understood idea in the standard. It is a rigour dial, not a grade.</p>

<h2>What Annex E actually says</h2>
<p>Annex E is <strong>informative</strong>. It introduces four levels &mdash; CAL 1 to CAL 4 &mdash; as a means to scale the rigour of cybersecurity activities for an item or component, derived from concept-stage information such as impact and attack vector. It does not prescribe how to assign a CAL, nor exactly what each level requires. ISO/SAE 8475 (CAL and Targeted Attack Feasibility) was developed because that gap made CAL hard to use consistently.</p>

<h2>What a CAL is for</h2>
<ul>
<li><strong>Effort allocation</strong> &mdash; how much analysis, review independence, test depth and documentation an element deserves.</li>
<li><strong>Consistency</strong> &mdash; two engineers rating similar risks reach similar rigour.</li>
<li><strong>Negotiation</strong> &mdash; a shared vocabulary with customers and suppliers about expected evidence depth.</li>
</ul>

<h2>What a CAL is not</h2>
<div class="callout bad"><div class="ci">✕</div><div class="cb"><div class="ct">Four claims that will lose you credibility</div>
<p>&ldquo;This ECU is CAL 3 certified.&rdquo; (Certification is not part of the scheme.) &ldquo;CAL is the security ASIL.&rdquo; (Different derivation and status.) &ldquo;R155 requires CAL 3.&rdquo; (It does not reference CAL.) &ldquo;Higher CAL means more secure.&rdquo; (It means more rigour in how you assure it.)</p></div></div>

<h2>A workable scheme</h2>
<p>If your organisation adopts CAL, define all four of these &mdash; otherwise it is decoration:</p>
<ol class="steps">
<li><strong>Assignment rule.</strong> e.g. derived from impact and attack feasibility: severe impact plus high feasibility &rarr; CAL 4; severe plus low &rarr; CAL 3; major plus medium &rarr; CAL 2; negligible &rarr; CAL 1. Publish the table.</li>
<li><strong>Activity matrix.</strong> For each CAL, state the required depth of TARA review, independence of review, verification methods, penetration-test depth and documentation.</li>
<li><strong>Tailoring rules.</strong> What may be reduced at CAL 1&ndash;2, and what may never be reduced at CAL 3&ndash;4 (e.g. independent review, attack-path testing).</li>
<li><strong>Evidence rule.</strong> How the assigned CAL is recorded and traced to the activities actually performed.</li>
</ol>

<div class="table-wrap"><table class="compact">
<thead><tr><th>Activity</th><th>CAL 1</th><th>CAL 2</th><th>CAL 3</th><th>CAL 4</th></tr></thead>
<tbody>
<tr><td>TARA review</td><td>Peer</td><td>Peer + lead</td><td>Independent reviewer</td><td>Independent + external</td></tr>
<tr><td>Requirement verification</td><td>Test</td><td>Test + analysis</td><td>+ negative/fault injection</td><td>+ independent penetration test</td></tr>
<tr><td>Attack path validation</td><td>Sampled</td><td>All high-feasibility paths</td><td>All paths above threshold</td><td>Full red-team exercise</td></tr>
<tr><td>Documentation</td><td>Core work products</td><td>Core + rationale</td><td>Full traceability</td><td>Full + independent assessment</td></tr>
</tbody></table></div>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The CAL 4 everything problem</div>
<p>If every element is CAL 4, you have not prioritised &mdash; you have created an unachievable plan that will be quietly ignored. Conversely, assigning CAL 1 to a safety-relevant, remotely reachable function to save review effort is exactly the decision an assessor will challenge.</p></div></div>

<h2>Interview answer</h2>
<p>&ldquo;CAL is informative guidance for scaling rigour, derived from impact and attack vector. I would use it to decide review independence and test depth, document the assignment rule, and keep the risk argument in the TARA. If a customer requires CAL, I would align on their definition &mdash; and if they need a standardised scheme, ISO/SAE 8475 is the reference.&rdquo;</p>
`
    },
    {
      id: "m11l2",
      title: "Getting value from Annexes A–H",
      minutes: 11,
      body: `
<p class="lead">The annexes are where the standard hands you templates. Most teams ignore them and then rebuild worse versions.</p>

<h2>Annex by annex</h2>
<div class="table-wrap"><table>
<thead><tr><th>Annex</th><th>Title</th><th>How to use it tomorrow</th></tr></thead>
<tbody>
<tr><td><strong>A</strong></td><td>Summary of cybersecurity activities and work products</td><td>Build your project plan and assessment checklist directly from this table. If an activity is not in your plan, it is not happening.</td></tr>
<tr><td><strong>B</strong></td><td>Examples of cybersecurity culture</td><td>Use the weak/strong table in maturity reviews and audit interviews; it converts a vague requirement into observable behaviour.</td></tr>
<tr><td><strong>C</strong></td><td>Example cybersecurity interface agreement template</td><td>Starting point for supplier agreements; adapt, do not copy, but do not start from a blank page.</td></tr>
<tr><td><strong>D</strong></td><td>Cybersecurity relevance &mdash; methods and criteria</td><td>Justify &ldquo;not relevant&rdquo; decisions with criteria rather than opinion. Saves effort where it is genuinely not needed.</td></tr>
<tr><td><strong>E</strong></td><td>Cybersecurity assurance levels</td><td>Rigour scaling; see the previous lesson.</td></tr>
<tr><td><strong>F</strong></td><td>Guidelines for impact rating</td><td>Anchor your safety/financial/operational/privacy scales in the annex guidance, then adapt thresholds to your business.</td></tr>
<tr><td><strong>G</strong></td><td>Guidelines for attack feasibility rating</td><td>Pick attack-potential, CVSS or attack-vector approach and lift the tables into your method document.</td></tr>
<tr><td><strong>H</strong></td><td>Worked TARA example &mdash; headlamp system</td><td>The best free training material in the standard. Walk it end to end before running your first real TARA.</td></tr>
</tbody></table></div>

<h2>The headlamp example, in summary</h2>
<p>Annex H takes a seemingly simple item &mdash; the headlamp system &mdash; through item definition and TARA. It is instructive precisely because the item is mundane: even a lamp has assets (beam-mode commands, configuration), damage scenarios (headlamp off at night, glare to oncoming traffic), threat scenarios (spoofing, tampering, denial of service) and attack paths with different feasibility ratings. It also demonstrates that the order of TARA steps is flexible, applying one feasibility approach in one step and another in another.</p>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Exercise that makes it stick</div>
<p>Take the headlamp example and change one assumption &mdash; say the lamp now receives commands over an externally reachable bus. Re-rate the attack paths. Notice how a single item-definition change moves risk values and forces new goals. That exercise is exactly what you will be asked to reason about in an interview.</p></div></div>

<h2>Annex A as your assessment checklist</h2>
<p>Annex A maps activities to work products. Used well, it becomes:</p>
<ul>
<li>the skeleton of the cybersecurity plan (clause 6),</li>
<li>the checklist for the cybersecurity assessment,</li>
<li>the evidence index of the cybersecurity case,</li>
<li>the supplier work-product request list (clause 7).</li>
</ul>
<p>That single table aligning four artefacts is the cheapest structural win available to a new programme.</p>
`
    }
  ],
  quiz: [
    {
      q: "Which statement about CAL is correct?",
      options: [
        "CAL is normative and mandated by UN R155",
        "CAL is informative guidance for scaling the rigour of cybersecurity activities",
        "CAL replaces the impact rating in a TARA",
        "CAL 4 means the product cannot be attacked"
      ],
      answer: 1,
      explain: "Annex E is informative. CAL scales rigour; it is not a certification, not mandated by R155, and not a guarantee."
    },
    {
      q: "What does ISO/SAE 8475 address?",
      options: [
        "Software update engineering",
        "Cybersecurity Assurance Levels and Targeted Attack Feasibility",
        "Functional safety integrity levels",
        "Automotive Ethernet security"
      ],
      answer: 1,
      explain: "ISO/SAE 8475 is the PAS covering CAL and TAF, making the Annex E idea usable consistently."
    },
    {
      q: "Which annex contains a worked TARA example?",
      options: ["Annex A", "Annex E", "Annex G", "Annex H"],
      answer: 3,
      explain: "Annex H applies the TARA methods to a headlamp system."
    },
    {
      q: "How is Annex A best used?",
      options: [
        "As a legal contract template",
        "As the basis for the cybersecurity plan, assessment checklist, case evidence index and supplier requests",
        "As a substitute for the TARA",
        "As a list of approved technologies"
      ],
      answer: 1,
      explain: "It summarises activities and work products, aligning planning, assessment, case structure and supplier obligations."
    },
    {
      q: "Assigning every element CAL 4 is a problem because:",
      options: [
        "CAL 4 is reserved for OEMs",
        "It removes prioritisation and creates an unachievable plan that will be ignored",
        "It is illegal under R155",
        "It increases the attack surface"
      ],
      answer: 1,
      explain: "Rigour must be proportionate. Blanket top-level classification defeats the purpose and destroys credibility of the scheme."
    }
  ]
});

window.MODULES.push({
  id: "m12",
  num: "12",
  title: "Implementation playbook",
  blurb: "Roles, a 90-day rollout, the work-product map, tooling and the traps that sink programmes.",
  lessons: [
    {
      id: "m12l1",
      title: "Roles and a 90-day rollout",
      minutes: 13,
      body: `
<p class="lead">This module is the practical answer to &ldquo;you know the standard &mdash; how would you actually stand this up?&rdquo;</p>

<h2>Roles that must exist</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Role</th><th>Accountable for</th><th>Typical failure if missing</th></tr></thead>
<tbody>
<tr><td>Executive owner</td><td>Policy, resourcing, accepting residual risk</td><td>No authority to say no; risk silently accepted</td></tr>
<tr><td>Cybersecurity manager (org)</td><td>Process, competence, audit, tooling</td><td>Project-by-project improvisation</td></tr>
<tr><td>Project cybersecurity manager</td><td>Plan, tailoring, case, assessment, release</td><td>Work products exist but nobody owns the argument</td></tr>
<tr><td>TARA facilitator</td><td>Running the analysis, keeping rigour and consistency</td><td>Threat lists with no rationale</td></tr>
<tr><td>Cybersecurity engineers</td><td>Requirements, architecture, implementation</td><td>Goals that never reach code</td></tr>
<tr><td>Test/validation engineers</td><td>Verification, penetration testing</td><td>Claims without evidence</td></tr>
<tr><td>PSIRT / incident response</td><td>Clause 13, monitoring interface</td><td>Detection with no response capability</td></tr>
<tr><td>Supplier manager</td><td>Capability evaluation, CIA, flow-down</td><td>Assumptions never validated</td></tr>
</tbody></table></div>
<p>One person can hold several roles in a small company, but each must be explicitly assigned and competent. Independence requirements constrain who may assess and audit.</p>

<h2>The first 90 days</h2>
<ol class="steps">
<li><strong>Days 1&ndash;15 &mdash; baseline.</strong> Pick one live programme. Collect what exists: item definitions, any threat lists, requirements, test reports, supplier agreements. Identify the top three gaps. This baseline is your business case.</li>
<li><strong>Days 16&ndash;30 &mdash; governance.</strong> Publish the policy, appoint the manager and project lead, define decision rights, including who can accept residual risk.</li>
<li><strong>Days 31&ndash;45 &mdash; method.</strong> Write the TARA method: asset identification, threat catalogue usage, impact scale, feasibility approach, risk matrix, treatment rules, review gate. Keep it to 15 pages, not 150.</li>
<li><strong>Days 46&ndash;60 &mdash; templates and register.</strong> Build templates from Annex A and the work-product register. Set up version control for work products and a weakness/vulnerability register.</li>
<li><strong>Days 61&ndash;75 &mdash; pilot.</strong> Run a real TARA on the selected item with the architects and safety engineer in the room. Review it with an independent reviewer</li>
<li><strong>Days 76&ndash;90 &mdash; close and institutionalise.</strong> Turn pilot findings into goals and requirements, run the release-gate checklist, train the wider team, and schedule the first internal audit.</li>
</ol>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">The pilot is the deliverable</div>
<p>Do not start with a 60-page framework. Start with one item, one TARA, one set of goals and one verified requirement. A working example that engineers respect converts more people than any process document.</p></div></div>

<h2>RACI in one page</h2>
<p>For each clause 5&ndash;15 activity, record Responsible / Accountable / Consulted / Informed across: project cybersecurity manager, system architect, software lead, hardware lead, test lead, safety, quality, purchasing, PSIRT. Publish it. Most &ldquo;process failures&rdquo; are actually unassigned activities.</p>

<h2>What good looks like at 12 months</h2>
<ul>
<li>Every live programme has a plan, a TARA with rationale and a case skeleton.</li>
<li>Requirements trace from goals to tests automatically in the requirements tool.</li>
<li>Supplier agreements contain explicit cybersecurity allocations and notification windows.</li>
<li>SBOMs are produced per build and monitored.</li>
<li>At least one incident exercise has been run end to end.</li>
<li>An internal audit has produced findings, and they are closed with evidence.</li>
</ul>
`
    },
    {
      id: "m12l2",
      title: "The work-product map and traceability",
      minutes: 12,
      body: `
<p class="lead">Assessors follow chains. Build the chain once and every future assessment becomes a walk, not an archaeology project.</p>

<h2>The chain to make explicit</h2>
<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">One line, start to finish</div>
<p>Item definition &rarr; asset &rarr; damage scenario &rarr; threat scenario &rarr; attack path &rarr; impact + feasibility &rarr; risk value &rarr; treatment decision &rarr; cybersecurity goal / claim &rarr; requirement &rarr; architecture element &rarr; verification method &rarr; result &rarr; release &rarr; monitoring &rarr; incident/update.</p></div></div>
<p>Every arrow should be a field or a link in a tool, not a memory. If any arrow requires a meeting to reconstruct, the chain is not auditable.</p>

<h2>Work-product register</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Clause</th><th>Core work products</th><th>Owner</th></tr></thead>
<tbody>
<tr><td>5</td><td>Policy, rules and processes, competence records, awareness records, tool register, audit report</td><td>Cybersecurity manager</td></tr>
<tr><td>6</td><td>Cybersecurity plan, cybersecurity case, assessment report, release report</td><td>Project CS manager</td></tr>
<tr><td>7</td><td>Supplier capability evaluation, interface agreement</td><td>Supplier manager</td></tr>
<tr><td>8</td><td>Monitoring sources, event evaluations, vulnerability records</td><td>PSIRT / vulnerability manager</td></tr>
<tr><td>9</td><td>Item definition, TARA, goals and claims, cybersecurity concept</td><td>Project CS manager / TARA facilitator</td></tr>
<tr><td>10</td><td>Requirements specification, architecture, implementation evidence, integration and verification results, weakness records</td><td>Engineering leads</td></tr>
<tr><td>11</td><td>Validation plan, validation report, penetration test reports</td><td>Test lead</td></tr>
<tr><td>12</td><td>Production control plan, provisioning and end-of-line records</td><td>Manufacturing</td></tr>
<tr><td>13</td><td>Incident response plan and records, update records</td><td>PSIRT</td></tr>
<tr><td>14</td><td>End-of-support communication, decommissioning plan</td><td>Product lifecycle owner</td></tr>
<tr><td>15</td><td>TARA records: assets, damage scenarios, threat scenarios, paths, ratings, treatment decisions</td><td>TARA facilitator</td></tr>
</tbody></table></div>
<p>The identifiers in the standard (<code>WP-xx-yy</code>, <code>RQ-xx-yy</code>) are useful for mapping, but your own document IDs are what will be cited in assessments. Keep a cross-reference column.</p>

<h2>Traceability without a mega-tool</h2>
<p>Small organisations can do this credibly with disciplined spreadsheets:</p>
<ul>
<li>One sheet per register (assets, threats, risks, requirements, tests, weaknesses), each with a stable ID column.</li>
<li>A link column using those IDs, not free text.</li>
<li>Version and baseline columns; work products referenced by document ID and version in the case.</li>
<li>A single coverage pivot: goals without requirements, requirements without tests, tests without results.</li>
</ul>
<p>A real requirements tool is better once you have several programmes, but the discipline matters more than the licence.</p>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The five traceability breaks that cause major findings</div>
<p>1. Goal with no requirement. 2. Requirement with no verification result. 3. Threat scenario with no treatment decision. 4. Retained risk with no claim or approver. 5. TARA version not linked to the released software version.</p></div></div>

<h2>Interview framing</h2>
<p>&ldquo;I would run four traceability queries every month: uncovered goals, unverified requirements, untreated risks above threshold, and work products whose version does not match the release baseline. Fixing those four lists keeps an assessment from ever being a surprise.&rdquo;</p>
`
    },
    {
      id: "m12l3",
      title: "Tooling, pitfalls and assessment readiness",
      minutes: 12,
      body: `
<p class="lead">The last mile: what to buy, what goes wrong, and how to survive the assessment without a fire drill.</p>

<h2>Tooling landscape</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Need</th><th>Options</th><th>Advice</th></tr></thead>
<tbody>
<tr><td>TARA and risk registers</td><td>Dedicated automotive TARA tools; general threat-modelling tools; structured spreadsheets</td><td>Choose something that enforces the chain and exports an auditable report; avoid a tool only one person can drive</td></tr>
<tr><td>Requirements and traceability</td><td>DOORS, Polarion, Jama, codebeamer, ALM suites</td><td>Reuse what the safety team already uses &mdash; traceability across both disciplines is worth more than a security-specific tool</td></tr>
<tr><td>Threat intelligence</td><td>Auto-ISAC, CERT feeds, NVD, vendor advisories, SBOM scanners</td><td>Automate ingestion; manual checking does not survive a holiday period</td></tr>
<tr><td>SBOM and composition analysis</td><td>Build-integrated generators and scanners</td><td>Generate per build automatically; a quarterly SBOM is already stale</td></tr>
<tr><td>Static/dynamic analysis, fuzzing</td><td>Commercial and open-source analysers, bus fuzzers</td><td>Tune rules; a noisy scanner gets ignored within a month</td></tr>
<tr><td>Key management</td><td>HSM-backed provisioning, KMS, signing services</td><td>Design revocation and audit before production</td></tr>
<tr><td>Incident and vulnerability tracking</td><td>Issue trackers with security workflows, PSIRT platforms</td><td>The workflow and SLA matter more than the product</td></tr>
</tbody></table></div>

<h2>Pitfalls, ranked by how often they sink programmes</h2>
<ol class="steps">
<li><strong>Compliance theatre.</strong> Documents produced for the assessor, not used by engineers. Symptom: the TARA is finished after the design freeze.</li>
<li><strong>No item boundary discipline.</strong> Gaps and duplication between items; supplier and OEM each assuming the other analysed an interface.</li>
<li><strong>Unverifiable goals.</strong> Beautiful risk analysis, untestable requirements, no evidence at the end.</li>
<li><strong>Ignoring the back end and the app.</strong> Many of the highest real-world risks live outside the ECU.</li>
<li><strong>Treating reuse as safety.</strong> No delta analysis when context changes.</li>
<li><strong>Monitoring without response.</strong> Alerts, no owner, no SLA, no authority to act.</li>
<li><strong>Key management afterthought.</strong> Shared keys, no revocation, secrets in build systems.</li>
<li><strong>One-person dependency.</strong> The process lives in an expert&rsquo;s head; competence management is the fix.</li>
</ol>

<h2>Assessment readiness in one page</h2>
<div class="table-wrap"><table>
<thead><tr><th>Assessor asks</th><th>You produce, in minutes</th></tr></thead>
<tbody>
<tr><td>What is the item and its boundary?</td><td>Item definition with architecture, interfaces, assumptions, version</td></tr>
<tr><td>What are the top risks and why?</td><td>TARA summary, ranked, with rationale and attack paths</td></tr>
<tr><td>What did you decide to do?</td><td>Treatment decisions, goals, claims with approvers</td></tr>
<tr><td>How do you know it works?</td><td>Traceability from goals to tests, with results and validation report</td></tr>
<tr><td>What about your suppliers?</td><td>Capability evaluations, interface agreements, exchanged work products</td></tr>
<tr><td>What happens after release?</td><td>Monitoring plan, vulnerability records, incident response evidence, support period</td></tr>
<tr><td>How do you know the process is followed?</td><td>Internal audit report and closed findings</td></tr>
</tbody></table></div>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">The one-sentence philosophy</div>
<p>Every artefact should exist because an engineer needed it to make a decision, and should be findable because an assessor will need it to check that decision. If it exists only for one of those two audiences, it is either bureaucracy or a gap.</p></div></div>
`
    }
  ],
  quiz: [
    {
      q: "Which role should formally accept residual cybersecurity risk?",
      options: [
        "The tester who found the issue",
        "An authorised role with defined delegation of authority, with the rationale recorded",
        "The supplier",
        "Nobody; residual risk is never accepted"
      ],
      answer: 1,
      explain: "Acceptance needs authority and a record. Without a named approver, risk is accepted implicitly and untraceably."
    },
    {
      q: "What is the best first step when standing up a 21434 capability?",
      options: [
        "Buy a TARA tool",
        "Baseline one live programme, then run a real pilot TARA end to end",
        "Write a 150-page framework",
        "Commission an external certification"
      ],
      answer: 1,
      explain: "A working pilot on a real item creates credibility and reveals actual gaps faster than a document set."
    },
    {
      q: "Which traceability break is most likely to become a major assessment finding?",
      options: [
        "A goal with no derived requirement",
        "A work product stored in SharePoint",
        "A TARA performed in a workshop",
        "A supplier using a different template"
      ],
      answer: 0,
      explain: "An unaddressed goal means a risk treatment was decided but never implemented or verified."
    },
    {
      q: "Why generate SBOMs per build rather than periodically?",
      options: [
        "Because auditors prefer PDFs",
        "Because exposure determination requires knowing exactly which component versions are in which build and vehicle variant",
        "Because it reduces binary size",
        "Because ISO 26262 requires it"
      ],
      answer: 1,
      explain: "Stale SBOMs cannot answer &ldquo;are we affected?&rdquo; quickly, which is the first question in vulnerability triage."
    },
    {
      q: "What is the strongest sign of a healthy cybersecurity process?",
      options: [
        "A large document set",
        "Engineers can explain which threat a control addresses, and evidence is findable quickly",
        "Every element is CAL 4",
        "No findings in the last audit"
      ],
      answer: 1,
      explain: "Process health shows in engineers' understanding and in fast, traceable evidence &mdash; not in volume or a clean audit."
    }
  ]
});
