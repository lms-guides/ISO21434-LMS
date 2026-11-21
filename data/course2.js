/* ISO/SAE 21434 study guide — modules 03-05 */
window.MODULES = window.MODULES || [];

window.MODULES.push({
  id: "m3",
  num: "03",
  title: "Clause 6 — Project management",
  blurb: "Planning, tailoring, reuse, the cybersecurity case, the assessment and release for post-development.",
  lessons: [
    {
      id: "m3l1",
      title: "Responsibilities, plan, tailoring, reuse",
      minutes: 13,
      body: `
<p class="lead">Clause 6 turns organisational process into a project commitment. Every requirement in it is about one question: can you show that the cybersecurity work for this item was decided, planned, executed and evidenced?</p>

<h2>The sequence clause 6 prescribes</h2>
<ol class="steps">
<li><strong>Assign responsibilities.</strong> A named cybersecurity manager and defined roles for the item, with the authority to make and record decisions.</li>
<li><strong>Determine cybersecurity relevance.</strong> Is this item or component cybersecurity-relevant at all? Annex D gives example criteria: does it have external interfaces, store or process data, connect to other systems, perform safety-related functions, receive updates? Document the conclusion either way &mdash; &ldquo;not relevant&rdquo; is a decision that needs a rationale.</li>
<li><strong>Decide new development vs reuse.</strong> Reuse is encouraged but must be justified against the new context.</li>
<li><strong>Tailor</strong> the standard&rsquo;s activities to the item, with a documented rationale and an approval.</li>
<li><strong>Write the cybersecurity plan</strong> (<code>WP-06-01</code>): activities, owners, milestones, work products, dependencies, review and assessment points.</li>
<li><strong>Manage the work.</strong> Track plan vs actual; record deviations and why.</li>
</ol>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">What belongs in a cybersecurity plan</div>
<p>Scope and item boundary &middot; applicable clauses and tailoring decisions &middot; roles and responsibilities &middot; activity schedule aligned to the V-model &middot; work products and templates &middot; supplier interfaces &middot; tooling &middot; review, assessment and release milestones &middot; monitoring and incident-response handover &middot; risk register and escalation path.</p></div></div>

<h2>Tailoring: the part people abuse</h2>
<p>Tailoring means deciding that a particular activity or work product is not needed, or is satisfied differently, for this item. It is legitimate and expected &mdash; a seat-heater controller does not need the same rigour as an automated driving stack. It is not legitimate to tailor because the team ran out of time.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Acceptable tailoring</th><th>Not acceptable</th></tr></thead>
<tbody>
<tr><td>&ldquo;No external interfaces, so threat scenarios limited to physical access; documented in the item definition.&rdquo;</td><td>&ldquo;TARA skipped to protect the milestone.&rdquo;</td></tr>
<tr><td>&ldquo;Reused component with a parent TARA; delta analysis performed on changed interfaces.&rdquo;</td><td>&ldquo;Reused component, therefore no analysis.&rdquo;</td></tr>
<tr><td>&ldquo;CAL 2, so single independent review instead of two.&rdquo;</td><td>&ldquo;CAL 4, but no independent review because the reviewer was busy.&rdquo;</td></tr>
</tbody></table></div>
<p>Every tailoring entry needs three things: <strong>what</strong> was tailored, <strong>why</strong> (justification against risk and context), and <strong>who approved</strong> it.</p>

<h2>Reuse done properly</h2>
<p>Reuse is a risk transfer, not a risk elimination. When you reuse an item, component or TARA, you must establish:</p>
<ul>
<li><strong>Same context?</strong> Interfaces, network topology, data flows and operating environment unchanged?</li>
<li><strong>Same threat landscape?</strong> Has the threat catalogue or vulnerability record changed since the original analysis?</li>
<li><strong>Same requirements?</strong> Do the old goals cover the new item&rsquo;s goals?</li>
<li><strong>Same evidence?</strong> Are the verification results still valid for the reused binary and configuration?</li>
<li><strong>Delta documented?</strong> A delta TARA and delta requirements are the minimum artefact.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The reuse trap that fills recalls</div>
<p>A component certified as secure in a gateway role is moved to a role with a direct internet-facing modem. Nothing in the component changed; everything about its risk did. Clause 6 exists because &ldquo;it passed before&rdquo; is not an argument.</p></div></div>

<h2>Managing change</h2>
<p>Clause 6 requires that changes to the item, its context or the available vulnerability information trigger an impact analysis. In practice define triggers explicitly in the plan: interface change, new connectivity, new supplier, new software component, newly published vulnerability, change in production or service process. For each trigger, state which work products are revisited.</p>
`
    },
    {
      id: "m3l2",
      title: "Cybersecurity relevance, off-the-shelf and out-of-context components",
      minutes: 12,
      body: `
<p class="lead">Most real programmes are assemblies of bought parts. Clause 6 handles the awkward middle ground where you are accountable for something you did not develop.</p>

<h2>Off-the-shelf (OTS) components</h2>
<p>An OTS component is a product developed for a market, not for your item &mdash; a commercial AUTOSAR stack, an off-the-shelf telematics module, a third-party RTOS. You rarely have design visibility, and you cannot demand changes casually. What you can do:</p>
<ul>
<li><strong>Collect the supplier&rsquo;s cybersecurity evidence</strong> &mdash; their own 21434 work products, vulnerability history, patch policy, secure development attestations. Clause 7 is where this is contractually secured.</li>
<li><strong>Assess the component against your item&rsquo;s TARA</strong> &mdash; not in the abstract. Its risks matter only relative to the interfaces and data flows you expose.</li>
<li><strong>Compensate architecturally</strong> &mdash; segmentation, filtering, rate limiting, monitoring, least privilege, so that a component compromise does not become an item compromise.</li>
<li><strong>Define the support window</strong> &mdash; how long will the supplier ship security fixes? This becomes a clause 14 end-of-support input and a clause 8 monitoring dependency.</li>
<li><strong>Track the component as a monitored asset</strong> &mdash; CVEs in its open-source dependencies are your problem, not the supplier&rsquo;s marketing team&rsquo;s.</li>
</ul>

<h2>Out-of-context components</h2>
<p>An <em>out-of-context</em> component is developed without full knowledge of the item it will be used in &mdash; the classic tier-2 building block sold to several tier-1s. The supplier cannot complete a full item-level TARA because they do not know the vehicle context. The standard&rsquo;s answer: they do the part they can, and explicitly state the <strong>assumptions and constraints</strong> under which their analysis is valid.</p>
<div class="table-wrap"><table>
<thead><tr><th>Who</th><th>Doing what</th></tr></thead>
<tbody>
<tr><td>Out-of-context supplier</td><td>Component-level threat analysis against declared properties, known vulnerabilities, secure configuration guidance, assumptions (e.g. &ldquo;assumes network isolation via a gateway&rdquo;)</td></tr>
<tr><td>Integrating party</td><td>Validates that assumptions hold in the real item; performs the item-level TARA; allocates goals and requirements back to the component</td></tr>
<tr><td>Both</td><td>Interface agreement covering what happens if an assumption is violated, who patches, who is notified</td></tr>
</tbody></table></div>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">The interview-grade distinction</div>
<p><strong>Off-the-shelf</strong> = you did not develop it and cannot easily change it. <strong>Out-of-context</strong> = it was developed without knowledge of the final item. A component can be both. The handling differs: OTS needs evidence collection and compensation; out-of-context needs assumptions documented on both sides and validated by the integrator.</p></div></div>

<h2>Assumptions are the contract</h2>
<p>Write assumptions so they can be tested. &ldquo;The component is used in a secure environment&rdquo; is useless. &ldquo;The component is connected only to the private CAN segment, no frame from the infotainment domain is forwarded to it, and it receives no OTA payload except signed packages from the OEM update service&rdquo; is checkable in architecture review and in a penetration test. Every assumption should have an owner and a validation method.</p>

<h2>Cybersecurity relevance in practice</h2>
<p>For a component with no external interface, no stored data of value, no update path and no safety contribution, a documented &ldquo;not relevant&rdquo; conclusion with criteria from Annex D is defensible and saves enormous effort. The failure mode is declaring relevance irrelevant to avoid work on a component that <em>is</em> reachable &mdash; a sensor on a shared bus is reachable.</p>
`
    },
    {
      id: "m3l3",
      title: "Cybersecurity case, assessment and release",
      minutes: 12,
      body: `
<p class="lead">These three artefacts are what an assessor actually reads. Learn their purpose and contents cold.</p>

<h2>The cybersecurity case</h2>
<p>The <strong>cybersecurity case</strong> (<code>WP-06-02</code>) is a structured argument, supported by evidence, that the item meets its cybersecurity goals and that residual risk is understood and accepted. It is not a folder of documents; it is the reasoning that connects them.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Part of the case</th><th>Contents</th></tr></thead>
<tbody>
<tr><td>Scope and context</td><td>Item definition, boundary, assumptions, applicable tailoring</td></tr>
<tr><td>Risk argument</td><td>TARA summary, goals, claims, residual risk and the rationale for accepting it</td></tr>
<tr><td>Requirement argument</td><td>Traceability from goals to requirements to architecture to verification results</td></tr>
<tr><td>Evidence index</td><td>Work products, their versions, and where they live</td></tr>
<tr><td>Open items</td><td>Known weaknesses, planned mitigations, monitoring commitments</td></tr>
<tr><td>Conclusion</td><td>Statement of sufficiency with the approver and date</td></tr>
</tbody></table></div>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Say it like this</div>
<p>&ldquo;The cybersecurity case is an argument, not an archive. If I cannot walk an assessor from a threat scenario to a goal, to a requirement, to a test result in under five minutes, the case is not finished &mdash; regardless of how many documents exist.&rdquo;</p></div></div>

<h2>The cybersecurity assessment</h2>
<p>An assessment checks the <em>adequacy and completeness</em> of the cybersecurity work for the item. Independence matters: the assessor should not be the author. Typical assessment questions:</p>
<ul>
<li>Is the item definition complete and consistent with the architecture?</li>
<li>Does every identified asset have threat scenarios, and every high risk a treatment decision?</li>
<li>Are goals specific enough to be verifiable?</li>
<li>Does every goal trace to requirements and to passing verification results?</li>
<li>Are claims and retained risks justified rather than asserted?</li>
<li>Were tailoring and reuse decisions justified and approved?</li>
<li>Are weaknesses and open items tracked with owners?</li>
<li>Is the evidence under configuration control and current?</li>
</ul>
<p>Findings are usually graded (e.g. major / minor / observation). A major finding blocks release; a minor is tracked. Either way the output is a report with findings, evidence references and a recommendation.</p>

<h2>Release for post-development</h2>
<p>Release is the formal decision that the item may enter production and operation. It is a gate with defined entry criteria, for example:</p>
<ol class="steps">
<li>Cybersecurity case complete and assessed with no open major findings.</li>
<li>All cybersecurity requirements verified, deviations approved.</li>
<li>Validation performed at vehicle level (clause 11).</li>
<li>Production requirements defined, including key management and end-of-line configuration (clause 12).</li>
<li>Monitoring plan and incident-response interface established (clauses 8 and 13).</li>
<li>Residual risks and claims accepted by an authorised role.</li>
<li>Support period and end-of-support plan agreed (clause 14).</li>
</ol>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Release is not the end</div>
<p>Release transfers the item into post-development, where clause 8 monitoring and clause 13 incident response take over. A release decision that does not name who monitors the item and who responds to an incident is incomplete.</p></div></div>

<h2>Question you will be asked</h2>
<p><strong>&ldquo;Who signs off residual risk?&rdquo;</strong> Answer with a role, not a person: an accountable executive or delegated cybersecurity manager, under a defined delegation of authority, with the rationale recorded as a claim and the risk entered in the register for monitoring. If nobody in the organisation can accept risk formally, the process has no teeth.</p>
`
    }
  ],
  quiz: [
    {
      q: "What must every tailoring decision include?",
      options: [
        "A customer signature and a legal review",
        "What was tailored, the justification, and who approved it",
        "A replacement activity of equal cost",
        "Notification to the approval authority"
      ],
      answer: 1,
      explain: "Tailoring is legitimate when documented: what, why (risk-based justification), and approval. Cost or schedule pressure is not a justification."
    },
    {
      q: "What is an out-of-context component?",
      options: [
        "A component with no cybersecurity relevance",
        "A component developed without knowledge of the item in which it will be used",
        "A component purchased off the shelf with no supplier support",
        "A component excluded from the TARA by tailoring"
      ],
      answer: 1,
      explain: "Out-of-context means the developer lacks the final item context, so they document assumptions and constraints that the integrator must validate."
    },
    {
      q: "The cybersecurity case is best described as:",
      options: [
        "A folder containing all project documents",
        "A structured argument, with evidence references, that cybersecurity goals are met and residual risk is acceptable",
        "The TARA report",
        "The release note for production"
      ],
      answer: 1,
      explain: "It is an argument with an evidence index and a conclusion, not a document archive."
    },
    {
      q: "Which is a valid trigger to re-run or update the TARA?",
      options: [
        "A new interface or connectivity feature is added",
        "A newly published vulnerability affects a used component",
        "The item is reused in a different vehicle context",
        "All of the above"
      ],
      answer: 3,
      explain: "Changes in design, context, or vulnerability information all invalidate parts of the analysis and must trigger impact analysis."
    },
    {
      q: "What does release for post-development formally establish?",
      options: [
        "That the vehicle type is approved under UN R155",
        "That the item may enter production and operation, with assessment complete and post-development responsibilities assigned",
        "That no further cybersecurity work is required",
        "That the supplier has been certified"
      ],
      answer: 1,
      explain: "It is an internal gate transferring the item into production and operations, with monitoring, incident response and support period defined."
    }
  ]
});

window.MODULES.push({
  id: "m4",
  num: "04",
  title: "Clause 7 — Distributed activities",
  blurb: "Supplier capability, RFQ requirements and the Cybersecurity Interface Agreement.",
  lessons: [
    {
      id: "m4l1",
      title: "Supplier capability and the RFQ",
      minutes: 11,
      body: `
<p class="lead">Clause 7 applies whenever cybersecurity responsibilities are distributed &mdash; which, in a real vehicle, is always.</p>

<h2>The requirement in plain terms</h2>
<p>Before you rely on another organisation for a cybersecurity activity, you must establish that they are <strong>capable</strong> of performing it. That judgement is made at sourcing time and re-checked as the relationship continues. The standard frames it as a request for quotation that includes cybersecurity requirements, and an evaluation of the supplier&rsquo;s ability to meet them.</p>

<h2>What to put in the RFQ</h2>
<div class="table-wrap"><table>
<thead><tr><th>Category</th><th>Examples</th></tr></thead>
<tbody>
<tr><td>Applicable standard</td><td>ISO/SAE 21434, UN R155 expectations, customer-specific requirements, ASPICE process expectations</td></tr>
<tr><td>Work products required</td><td>Item/component definition, TARA, goals, requirements, verification results, vulnerability handling records</td></tr>
<tr><td>Process evidence</td><td>Cybersecurity policy, competence records, tool management, secure development practices, audit results</td></tr>
<tr><td>Interface points</td><td>Who performs the TARA, who approves goals, how changes are agreed, escalation contacts</td></tr>
<tr><td>Vulnerability handling</td><td>Notification timelines, disclosure coordination, patch obligations, support period</td></tr>
<tr><td>Production</td><td>Key injection, secure configuration, end-of-line test, protection of production data</td></tr>
<tr><td>Right to audit</td><td>Assessment access, evidence retention, subcontractor flow-down</td></tr>
</tbody></table></div>

<h2>Evaluating capability without theatre</h2>
<p>Questionnaires are cheap and weak. Better signals, in order of value:</p>
<ol class="steps">
<li><strong>Sample work products.</strong> Ask for a redacted TARA and case from a comparable product and read them. Quality is obvious in ten minutes.</li>
<li><strong>Talk to the engineers.</strong> Can the person doing the TARA explain a risk value and a treatment decision? Or do they recite a template?</li>
<li><strong>Vulnerability history.</strong> How fast did they fix published issues? Did they notify customers proactively?</li>
<li><strong>Process audit.</strong> Look for traceability and configuration control, not binders.</li>
<li><strong>Subcontractor transparency.</strong> Where does their software actually come from?</li>
</ol>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The commercial trap</div>
<p>A supplier that accepts every cybersecurity requirement in the RFQ and prices none of it has not understood the requirement. Capability evaluation protects you from buying a promise that will be discovered as a gap during your own assessment.</p></div></div>

<h2>Flow-down</h2>
<p>Your obligations to your customer must become your supplier&rsquo;s obligations. This is why clause 7 is recursive: an OEM&rsquo;s requirements reach tier-1, which must flow them to tier-2, and so on. Each layer needs the same three things &mdash; capability evidence, allocated responsibilities, and a mechanism for vulnerability information to travel both directions.</p>
`
    },
    {
      id: "m4l2",
      title: "The Cybersecurity Interface Agreement",
      minutes: 13,
      body: `
<p class="lead">The CIA (Cybersecurity Interface Agreement) is the document that makes distributed cybersecurity auditable. Annex C provides a template; your contract provides the teeth.</p>

<h2>What the CIA must settle</h2>
<ol class="steps">
<li><strong>Scope and parties.</strong> Which item or component, which organisations, which version of the interface.</li>
<li><strong>Responsibility allocation.</strong> For each activity and work product in the standard, who does it, who reviews it, who approves it. A RACI-style table works: the common failure is two parties each assuming the other did the item-level TARA.</li>
<li><strong>Work product exchange.</strong> Format, timing, versioning, confidentiality. Define what the customer must give the supplier (item context, interface definitions, assumptions) as precisely as what the supplier returns.</li>
<li><strong>Assumptions and constraints.</strong> The out-of-context assumptions, and what happens if they are invalidated.</li>
<li><strong>Change management.</strong> Notification duties, re-analysis triggers, who bears cost and schedule.</li>
<li><strong>Vulnerability and incident handling.</strong> Contact points, notification windows, coordinated disclosure, patch delivery timeline, who talks to regulators.</li>
<li><strong>Escalation and dispute resolution.</strong> Named roles, response times, technical escalation path.</li>
<li><strong>Support period and decommissioning.</strong> How long security support lasts, what happens at end of production, data and key destruction.</li>
<li><strong>Audit and evidence retention.</strong> Access rights, retention period, subcontractor flow-down.</li>
</ol>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">CIA vs contract vs DIA</div>
<p>The <strong>contract</strong> is commercial and legal. The <strong>CIA</strong> is the technical annex that says who does which cybersecurity work. A <strong>DIA</strong> (development interface agreement) is the ISO 26262 analogue for functional safety. In practice many programmes merge them into one interface document with a safety and a security section &mdash; acceptable, as long as both allocations are explicit.</p></div></div>

<h2>Worked allocation example</h2>
<p>OEM integrates a telematics unit from a tier-1 supplier into a vehicle with a central gateway.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Activity</th><th>OEM</th><th>Tier-1</th></tr></thead>
<tbody>
<tr><td>Item definition (vehicle-level)</td><td>Owns</td><td>Contributes interface data</td></tr>
<tr><td>Item TARA</td><td>Owns</td><td>Provides component analysis and assumptions</td></tr>
<tr><td>Component-level TARA</td><td>Reviews</td><td>Owns</td></tr>
<tr><td>Cybersecurity goals (vehicle level)</td><td>Owns and approves</td><td>Contributes</td></tr>
<tr><td>Component requirements and verification</td><td>Reviews evidence</td><td>Owns</td></tr>
<tr><td>Vehicle validation / penetration test</td><td>Owns</td><td>Supports with test interfaces</td></tr>
<tr><td>Vulnerability monitoring of component</td><td>Aggregates</td><td>Owns for its software, notifies within agreed window</td></tr>
<tr><td>Incident response (vehicle fleet)</td><td>Owns</td><td>Owns root-cause analysis in component</td></tr>
</tbody></table></div>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Question: how do you handle a supplier that refuses to share its TARA?</div>
<p>&ldquo;I would separate the artefact from the conclusion. I need enough to discharge my item-level duty: the threat scenarios relevant to the interfaces I expose, the properties assumed, the assumptions the analysis depends on, and the verification evidence &mdash; not necessarily their full internal methodology. That can be delivered as an extract under NDA, or summarised in a joint review with a signed record. If a supplier cannot provide any of it, that is a capability finding, and I would either compensate architecturally and record the residual risk, or not source the component.&rdquo;</p></div></div>

<h2>Implementation checklist</h2>
<ul>
<li>CIA template derived from Annex C, owned by a named role.</li>
<li>RACI table per clause 5&ndash;14 activity, agreed before design freeze.</li>
<li>Defined formats and due dates for exchanged work products.</li>
<li>Named security contacts on both sides, with escalation times.</li>
<li>Notification and patch timelines written as measurable obligations.</li>
<li>Support period and end-of-support obligations stated.</li>
<li>Subcontractor flow-down clause.</li>
</ul>
`
    }
  ],
  quiz: [
    {
      q: "When should supplier cybersecurity capability be evaluated?",
      options: [
        "Only at the end of the project, during assessment",
        "At sourcing and maintained through the relationship",
        "Only after a vulnerability is found",
        "Only for software suppliers, not hardware"
      ],
      answer: 1,
      explain: "Clause 7 places capability evaluation at sourcing (RFQ), with ongoing evidence obligations. Late discovery is expensive and often unfixable."
    },
    {
      q: "Which item does NOT belong in a cybersecurity interface agreement?",
      options: [
        "Allocation of cybersecurity activities and work products",
        "Vulnerability notification timelines",
        "The supplier's internal salary structure",
        "Support period and decommissioning obligations"
      ],
      answer: 2,
      explain: "The CIA covers technical and process responsibilities, exchange of work products, change handling, vulnerability/incident duties, support period and audit rights."
    },
    {
      q: "In ISO 21434, CIA stands for:",
      options: [
        "Confidentiality, Integrity, Availability",
        "Cybersecurity Interface Agreement",
        "Cybersecurity Impact Assessment",
        "Central Intelligence Archive"
      ],
      answer: 1,
      explain: "Cybersecurity Interface Agreement (clause 7). The confidentiality-integrity-availability triad is a different, unrelated use of the acronym."
    },
    {
      q: "Why does clause 7 matter to a tier-2 supplier?",
      options: [
        "It does not; only OEMs have obligations",
        "Requirements flow down recursively, so each tier must evaluate its own suppliers and agree interfaces",
        "It only applies to open-source components",
        "It applies only after type approval"
      ],
      answer: 1,
      explain: "Distributed activities are recursive. Each organisation that depends on another for a cybersecurity activity must evaluate capability and agree responsibilities."
    },
    {
      q: "What is the most reliable evidence of supplier capability?",
      options: [
        "A completed self-assessment questionnaire",
        "A certificate on the website",
        "Sampled work products and technical discussion with the engineers who produced them",
        "The lowest price in the quotation"
      ],
      answer: 2,
      explain: "Questionnaires and logos are weak signals. Actual TARA/case artefacts and the ability of engineers to defend them are strong."
    }
  ]
});

window.MODULES.push({
  id: "m5",
  num: "05",
  title: "Clause 8 — Continual activities",
  blurb: "Monitoring, event evaluation, vulnerability analysis and vulnerability management for the life of the item.",
  lessons: [
    {
      id: "m5l1",
      title: "Monitoring and event evaluation",
      minutes: 12,
      body: `
<p class="lead">Clause 8 is the standard admitting a truth every security engineer knows: the analysis you did at concept stage will be wrong about something.</p>

<h2>The four activities</h2>
<div class="cards">
<div class="card"><div class="k">8.3</div><h4>Monitoring</h4><p>Continuously collect cybersecurity information relevant to the item.</p></div>
<div class="card"><div class="k">8.4</div><h4>Event evaluation</h4><p>Decide whether an item of information is relevant to your product.</p></div>
<div class="card"><div class="k">8.5</div><h4>Vulnerability analysis</h4><p>Confirm the vulnerability exists in your configuration and assess the risk.</p></div>
<div class="card"><div class="k">8.6</div><h4>Vulnerability management</h4><p>Track, remediate, disclose and close.</p></div>
</div>
<p>These run in parallel with the lifecycle, not at the end of it. They feed clause 6 (change impact), clause 9 (TARA updates), clause 10 (requirements and fixes) and clause 13 (incident response).</p>

<h2>Sources of information</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Source type</th><th>Examples</th></tr></thead>
<tbody>
<tr><td>Public vulnerability databases</td><td>NVD/CVE, MITRE, vendor advisories, GitHub security advisories</td></tr>
<tr><td>Industry bodies</td><td>Auto-ISAC, national CERTs, sector working groups</td></tr>
<tr><td>Suppliers</td><td>Component advisories, patch notes, SBOM change notifications</td></tr>
<tr><td>Internal</td><td>Field incidents, warranty returns, penetration-test findings, fuzzing results, engineering change requests</td></tr>
<tr><td>External researchers</td><td>Coordinated disclosure, bug bounty programmes, conference publications</td></tr>
<tr><td>Customers and regulators</td><td>OEM notifications, authority requests, recall data</td></tr>
</tbody></table></div>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Monitoring without an SBOM is guesswork</div>
<p>You cannot evaluate whether a CVE affects you if you do not know which open-source versions ship in which software build, for which vehicle variants, over which production period. A software bill of materials with version and configuration mapping is the practical prerequisite for clause 8, and one of the first things a mature programme builds.</p></div></div>

<h2>Event evaluation: the triage question</h2>
<p>Every incoming item must get a recorded decision. The minimum useful triage chain:</p>
<ol class="steps">
<li><strong>Is the affected component in our product?</strong> Check SBOM and configuration. If no, record and close.</li>
<li><strong>Is the affected version in the field?</strong> Which build, which vehicle variants, which production window?</li>
<li><strong>Is the vulnerability reachable in our architecture?</strong> The vulnerable service may be compiled in but not exposed, or reachable only behind a gateway.</li>
<li><strong>Is it already mitigated?</strong> Compensating controls may reduce exploitability to negligible.</li>
<li><strong>What is the potential impact?</strong> Safety, financial, operational, privacy &mdash; use the clause 15 impact scale for consistency.</li>
<li><strong>How urgent?</strong> Assign a severity and a response deadline; escalate if safety-relevant.</li>
</ol>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Interview question: &ldquo;A CVE drops for a library you use. Walk me through the first hour.&rdquo;</div>
<p>&ldquo;First, confirm exposure: is the library in our SBOM for a shipping build, and is the vulnerable function reachable in our configuration? Second, classify: safety-relevant or not, remotely exploitable or not, already mitigated by an architectural control? Third, open a vulnerability record with an owner and a deadline, notify the incident/vulnerability board if safety could be affected, and check whether other products share the component. Fourth, decide the response: patch, mitigate, monitor, or accept with rationale &mdash; and tell affected customers within the contractual window.&rdquo;</p></div></div>

<h2>Records that survive an audit</h2>
<p>For each evaluated event, keep: the source and date, the affected component and versions, the exposure conclusion, who decided, when, the rationale, the resulting action, and the closure evidence. A monitoring tool that produces alerts but no decisions is not clause 8 compliance.</p>
`
    },
    {
      id: "m5l2",
      title: "Vulnerability analysis and vulnerability management",
      minutes: 12,
      body: `
<p class="lead">Triage tells you whether it matters; analysis tells you how much; management makes it go away and proves it.</p>

<h2>Vulnerability analysis</h2>
<p>Once an event is judged potentially relevant, the analysis must establish:</p>
<ul>
<li><strong>Validity</strong> &mdash; does the vulnerability actually exist in our configuration? Reproduce if feasible.</li>
<li><strong>Exploitability in context</strong> &mdash; what access does the attacker need? Is the interface exposed? Is there an existing mitigation?</li>
<li><strong>Impact</strong> &mdash; what damage scenario does it enable, rated consistently with the TARA (safety, financial, operational, privacy).</li>
<li><strong>Risk</strong> &mdash; combine impact with feasibility to produce a risk value comparable to the original analysis. Reusing the TARA scales is what keeps decisions coherent over years and across teams.</li>
<li><strong>Affected population</strong> &mdash; vehicle variants, model years, markets, production windows, and whether the issue is in the field or only in development.</li>
</ul>

<h2>Vulnerability management</h2>
<p>Management is the process discipline around the fix:</p>
<ol class="steps">
<li><strong>Record.</strong> Unique ID, description, affected items/components/versions, source, severity, owner, deadline.</li>
<li><strong>Decide the treatment.</strong> Remediate by update, mitigate by configuration or compensating control, or accept with documented rationale and monitoring. Retained risk should be reflected as a claim.</li>
<li><strong>Plan and schedule.</strong> Fix development, verification, integration, and release through the update process (clause 13.4 / ISO 24089).</li>
<li><strong>Coordinate disclosure.</strong> Agree timing with the reporter, suppliers and customers; respect coordinated-disclosure norms and regulatory reporting duties.</li>
<li><strong>Notify.</strong> Customers and authorities within contractual and legal windows. Include affected versions, risk, mitigation and fix availability.</li>
<li><strong>Close with evidence.</strong> Verification result, release record, field confirmation where possible, and a lessons-learned note that updates threat catalogues and the TARA.</li>
</ol>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Target timelines (illustrative, define your own)</div>
<p>Critical/safety-relevant: triage within 24&ndash;48 h, mitigation decision within days, customer notification immediately. High: triage within a week. Medium/low: batched into the next planned release. Whatever you choose, the standard&rsquo;s expectation is that the process is <em>defined, followed and evidenced</em> &mdash; not that a specific number appears in ISO 21434.</p></div></div>

<h2>Metrics that mean something</h2>
<ul>
<li><strong>Time to triage</strong> and <strong>time to mitigation</strong>, segmented by severity and by safety relevance.</li>
<li><strong>Coverage of monitored components</strong> &mdash; percentage of shipped software covered by SBOM and advisory feeds.</li>
<li><strong>Age of open vulnerabilities</strong> past their deadline, with escalation.</li>
<li><strong>Repeat findings</strong> &mdash; the same class of bug recurring signals a process problem, not a patch problem.</li>
<li><strong>Field exposure window</strong> &mdash; how long a vulnerable configuration was exploitable before mitigation reached vehicles.</li>
</ul>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Connect clause 8 back to clause 15</div>
<p>When a vulnerability is confirmed, the honest response is often to revisit the TARA: the attack feasibility you rated &ldquo;low&rdquo; may now be &ldquo;high&rdquo; because a working exploit exists. That re-rating can change the risk value, the treatment decision, and even the cybersecurity goals. Clause 8 is a feedback loop into risk assessment, not just a bug-fix queue.</p></div></div>

<h2>Common audit findings</h2>
<ul>
<li>Monitoring exists but no evidence any alert was evaluated.</li>
<li>Triage decisions recorded without rationale or owner.</li>
<li>No SBOM, so exposure cannot be determined.</li>
<li>Fixes shipped without updating the TARA or the requirements baseline.</li>
<li>Customer notification late or undocumented.</li>
<li>Open vulnerabilities with no deadline, owner or escalation.</li>
</ul>
`
    }
  ],
  quiz: [
    {
      q: "What are the four clause 8 activities in order?",
      options: [
        "Monitoring, event evaluation, vulnerability analysis, vulnerability management",
        "TARA, goals, requirements, verification",
        "Detection, response, recovery, lessons learned",
        "Scanning, patching, testing, release"
      ],
      answer: 0,
      explain: "Clause 8: continual monitoring, evaluation of events for relevance, analysis of confirmed vulnerabilities, and management through to closure."
    },
    {
      q: "Why is an SBOM a practical prerequisite for clause 8?",
      options: [
        "It is explicitly mandated by UN R155",
        "Without component and version mapping you cannot determine exposure to a published vulnerability",
        "It replaces the need for a TARA",
        "It proves the software is free of vulnerabilities"
      ],
      answer: 1,
      explain: "Exposure determination requires knowing which components and versions are in which build and vehicle variant. An SBOM makes that answerable."
    },
    {
      q: "A confirmed vulnerability is found in a component that is compiled in but unreachable in your architecture. What is the correct handling?",
      options: [
        "Ignore it, since it is not exploitable",
        "Record the evaluation, the reachability rationale and any compensating controls, then decide treatment and monitor",
        "Immediately recall all vehicles",
        "Delete the record to avoid audit findings"
      ],
      answer: 1,
      explain: "The evaluation and its rationale must be recorded. Not exploitable today is a decision to document and monitor, not a reason to leave no trace."
    },
    {
      q: "How should vulnerability risk be rated for consistency?",
      options: [
        "Using the CVSS base score alone",
        "Using the same impact and feasibility scales as the TARA, applied to the actual vehicle context",
        "By the severity the reporter suggests",
        "By the size of the affected component"
      ],
      answer: 1,
      explain: "Reusing the TARA scales keeps decisions comparable across years and teams. CVSS is an input, not the vehicle-context risk."
    },
    {
      q: "What closes a vulnerability record properly?",
      options: [
        "The patch is committed to the main branch",
        "Verification evidence, release record, notification record and a lessons-learned update to threat catalogues/TARA",
        "The ticket is marked resolved by the reporter",
        "The next audit passes"
      ],
      answer: 1,
      explain: "Closure needs evidence that the fix is verified and released, that obligations were met, and that learning feeds back into the analysis."
    }
  ]
});
