/* ISO/SAE 21434 study guide — modules 00-02 */
window.MODULES = window.MODULES || [];

window.MODULES.push({
  id: "m0",
  num: "00",
  title: "Orientation",
  blurb: "What the standard is, how the document is built, and the vocabulary interviews test.",
  lessons: [
    {
      id: "m0l1",
      title: "What ISO/SAE 21434 actually is",
      minutes: 11,
      body: `
<p class="lead">ISO/SAE 21434:2021, <em>Road vehicles &mdash; Cybersecurity engineering</em>, is the international process standard for managing cybersecurity risk across the lifecycle of electrical/electronic (E/E) systems in road vehicles.</p>

<h2>The one-paragraph definition</h2>
<p>It defines <strong>what</strong> a organisation must do, and <strong>what evidence</strong> it must produce, to engineer cybersecurity into vehicle E/E systems &mdash; from concept, through development and production, into operation, maintenance and decommissioning. It deliberately does not prescribe technologies, products or specific controls: it prescribes activities, responsibilities, methods and work products.</p>

<h2>Provenance you should be able to state</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Fact</th><th>Detail</th></tr></thead>
<tbody>
<tr><td>Full title</td><td>ISO/SAE 21434:2021 &mdash; Road vehicles &mdash; Cybersecurity engineering</td></tr>
<tr><td>Published</td><td>August 2021, first edition</td></tr>
<tr><td>Developed by</td><td>ISO/TC 22/SC 32 (Electrical and electronic components and general system aspects) jointly with SAE International</td></tr>
<tr><td>Supersedes</td><td>SAE J3061:2016, the first automotive cybersecurity process guideline</td></tr>
<tr><td>Nature</td><td>Voluntary engineering standard, not a regulation and not a certification scheme</td></tr>
<tr><td>Scope</td><td>Series-production road vehicle E/E systems, their components and interfaces, over the whole lifecycle</td></tr>
</tbody></table></div>

<h2>What it is not</h2>
<ul>
<li><strong>Not a test specification.</strong> It will not tell you which penetration tests to run; it tells you that validation must be planned, performed and evidenced.</li>
<li><strong>Not a control catalogue.</strong> Secure boot, HSM, MACsec, firewalls, IDS are implementation choices. The standard cares that your chosen controls are justified by a risk analysis and verified.</li>
<li><strong>Not a certificate.</strong> There is no ISO-operated certification scheme comparable to ISO/IEC 27001. Certification bodies offer their own attestations against it, and UN R155 type approval is a separate regulatory act.</li>
<li><strong>Not retroactive law.</strong> It applies to development or modification of E/E systems; contracts and regulation are what make it binding in practice.</li>
</ul>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Interview framing</div>
<p>&ldquo;ISO 21434 is a risk-driven process standard. It makes cybersecurity traceable: every requirement traces to a threat scenario and a cybersecurity goal, every goal traces to a risk treatment decision from a TARA, and every claim is backed by a work product an assessor can read.&rdquo;</p></div></div>

<h2>The core idea: risk, not checklist</h2>
<p>Everything in the standard hangs off one engine: <strong>threat analysis and risk assessment (TARA)</strong>. TARA identifies what can go wrong, how likely it is, how bad it would be, and what you decide to do about it. Those decisions become <strong>cybersecurity goals</strong>, which become <strong>requirements</strong>, which become <strong>architecture</strong>, <strong>tests</strong> and <strong>evidence</strong>. Clause 15 supplies the method; clauses 5&ndash;14 supply the management and lifecycle context in which the method is applied.</p>

<h2>Why the industry converged on it</h2>
<p>Vehicles became connected computers with safety-critical actuators. A remote attacker reaching a CAN bus can steer, brake or unlock. Regulators responded with UN R155 (cybersecurity management system approval) and UN R156 (software updates); OEMs responded by flowing contractual cybersecurity requirements to every tier of the supply chain. ISO 21434 became the common language for those requirements because it defines the same work products for everyone: item definition, TARA, goals, requirements, verification evidence, incident response.</p>
`
    },
    {
      id: "m0l2",
      title: "How the document is built",
      minutes: 12,
      body: `
<p class="lead">You do not need to memorise the standard, but you must know its skeleton well enough to navigate a question in real time.</p>

<h2>Clause map</h2>
<div class="table-wrap"><table>
<thead><tr><th>Clause</th><th>Title</th><th>What it gives you</th></tr></thead>
<tbody>
<tr><td>1&ndash;4</td><td>Scope, references, terms, general considerations</td><td>Vocabulary, risk-based thinking, relationship to safety, V-model framing</td></tr>
<tr><td>5</td><td>Organisational cybersecurity management</td><td>Policy, rules, processes, culture, competence, tools, organisational audit</td></tr>
<tr><td>6</td><td>Project-dependent cybersecurity management</td><td>Plan, tailoring, reuse, cybersecurity case, assessment, release</td></tr>
<tr><td>7</td><td>Distributed cybersecurity activities</td><td>Supplier capability, RFQ, interface agreement (who does what)</td></tr>
<tr><td>8</td><td>Continual cybersecurity activities</td><td>Monitoring, event evaluation, vulnerability analysis and management</td></tr>
<tr><td>9</td><td>Concept</td><td>Item definition, TARA, cybersecurity goals and claims, concept</td></tr>
<tr><td>10</td><td>Product development</td><td>Requirements, architecture, implementation, integration, verification, weaknesses</td></tr>
<tr><td>11</td><td>Cybersecurity validation</td><td>Vehicle-level confirmation that goals are met</td></tr>
<tr><td>12</td><td>Production</td><td>Production control plan, keys, configuration, end-of-line</td></tr>
<tr><td>13</td><td>Operations and maintenance</td><td>Incident response, updates</td></tr>
<tr><td>14</td><td>End of cybersecurity support and decommissioning</td><td>End-of-support communication, safe retirement</td></tr>
<tr><td>15</td><td>TARA methods</td><td>The method library every risk activity calls on</td></tr>
</tbody></table></div>

<h2>How requirements are written</h2>
<p>Inside clauses 5&ndash;15 you will see three kinds of provision:</p>
<ul>
<li><code>shall</code> &mdash; a requirement, identified as <code>[RQ-xx-yy]</code>. Auditable, mandatory.</li>
<li><code>should</code> &mdash; a recommendation, <code>[RC-xx-yy]</code>. Expected unless you justify otherwise.</li>
<li><code>may</code> &mdash; a permission. You choose whether to use it.</li>
</ul>
<p>Each clause has <strong>objectives</strong>, <strong>inputs</strong> (prerequisites &mdash; work products from earlier phases), <strong>requirements and recommendations</strong>, and <strong>work products</strong> (<code>WP-xx-yy</code>). Example: the cybersecurity plan is <code>WP-06-01</code>, the cybersecurity case is <code>WP-06-02</code>, the item definition is <code>WP-09-01</code>, the TARA is <code>WP-09-02</code>.</p>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Why work products matter more than clause numbers</div>
<p>An assessor does not ask &ldquo;did you satisfy RQ-10-04?&rdquo;. They ask for the artefact: show me the requirement, its rationale, its parent goal, its verification result, and the change history. The clause is the grammar; the work product is the sentence.</p></div></div>

<h2>Informative annexes A&ndash;H</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Annex</th><th>Content</th><th>Use it for</th></tr></thead>
<tbody>
<tr><td>A</td><td>Summary of cybersecurity activities and work products</td><td>Your project plan skeleton and assessment checklist</td></tr>
<tr><td>B</td><td>Examples of cybersecurity culture (weak vs strong)</td><td>Maturity conversations, audit findings</td></tr>
<tr><td>C</td><td>Example cybersecurity interface agreement template</td><td>Supplier negotiations</td></tr>
<tr><td>D</td><td>Cybersecurity relevance &mdash; example methods and criteria</td><td>Deciding whether a component needs the full treatment</td></tr>
<tr><td>E</td><td>Cybersecurity assurance levels (CAL)</td><td>Scaling rigour</td></tr>
<tr><td>F</td><td>Guidelines for impact rating</td><td>Rating safety, financial, operational, privacy impact</td></tr>
<tr><td>G</td><td>Guidelines for attack feasibility rating</td><td>Attack potential, CVSS, attack-vector approaches</td></tr>
<tr><td>H</td><td>Worked TARA example &mdash; headlamp system</td><td>Learning the method end to end</td></tr>
</tbody></table></div>

<h2>The two-axis mental model</h2>
<p>Read the standard on two axes at once:</p>
<ol class="steps">
<li><strong>Vertical (management).</strong> Clause 5 (organisation) &rarr; clause 6 (project) &rarr; clause 7 (supply chain). This is who is accountable, with what process, under what agreement.</li>
<li><strong>Horizontal (lifecycle).</strong> Clause 9 (concept) &rarr; 10 (development) &rarr; 11 (validation) &rarr; 12 (production) &rarr; 13 (operations) &rarr; 14 (decommissioning). Clause 8 runs underneath all of it, forever.</li>
</ol>
<p>Clause 15 is the shared method used by clause 9 at concept stage and by clauses 8, 10 and 13 whenever new information arrives.</p>
`
    },
    {
      id: "m0l3",
      title: "Vocabulary that separates candidates",
      minutes: 13,
      body: `
<p class="lead">Most weak interviews fail on precision, not knowledge. These terms are the ones that get confused under pressure.</p>

<h2>Item vs component</h2>
<p>An <strong>item</strong> is the thing being analysed: a system or function with a defined boundary, e.g. &ldquo;adaptive cruise control&rdquo; or &ldquo;the telematics unit and its back-end&rdquo;. A <strong>component</strong> is a part that implements part of the item. TARA is performed on the item; requirements are then allocated to components.</p>

<h2>The TARA chain, in order</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Term</th><th>Meaning</th><th>Example (headlamp-style)</th></tr></thead>
<tbody>
<tr><td>Asset</td><td>Object with cybersecurity properties whose compromise causes harm</td><td>Headlamp control software, the CAN signal for beam mode</td></tr>
<tr><td>Damage scenario</td><td>Adverse consequence for a road user or stakeholder</td><td>Headlamp switched off at night, causing a crash</td></tr>
<tr><td>Threat scenario</td><td>Potential cause: asset + compromised property + cause</td><td>Spoofing of the beam-mode signal on the bus</td></tr>
<tr><td>Attack path</td><td>Sequence of steps that realises the threat scenario</td><td>Physical access to OBD port &rarr; inject frames</td></tr>
<tr><td>Attack feasibility</td><td>How easy the path is: high / medium / low / very low</td><td>Low (needs specialist tooling and vehicle access)</td></tr>
<tr><td>Impact</td><td>Severity of the damage: severe / major / moderate / negligible</td><td>Severe (safety)</td></tr>
<tr><td>Risk value</td><td>Combination of impact and feasibility, typically 1&ndash;5</td><td>4</td></tr>
</tbody></table></div>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The classic slip</div>
<p>A <strong>damage scenario</strong> is what goes wrong for the road user. A <strong>threat scenario</strong> is the attacker action that causes it. Interviewees routinely call both &ldquo;the threat&rdquo;. Keep the causal direction clean: threat scenario &rarr; causes &rarr; damage scenario.</p></div></div>

<h2>Goals vs claims vs requirements</h2>
<ul>
<li><strong>Cybersecurity goal</strong> &mdash; a high-level, technology-independent objective derived from a risk treatment decision. Example: &ldquo;The headlamp shall not be switched off by unauthorised messages on the vehicle network.&rdquo;</li>
<li><strong>Cybersecurity claim</strong> &mdash; a statement about why a risk was accepted, shared or judged out of scope, with rationale. It is the audit trail for a decision <em>not</em> to add a control.</li>
<li><strong>Cybersecurity requirement</strong> &mdash; a verifiable, allocated, traceable specification that implements a goal or claim. Example: &ldquo;The body controller shall accept beam commands only from authenticated sources and shall reject frames failing MAC validation.&rdquo;</li>
</ul>

<h2>Cybersecurity properties</h2>
<p>The standard treats an asset as having properties; a threat scenario names which property is compromised. Be ready to list them: <strong>confidentiality, integrity, availability, authenticity, authorisation, non-repudiation, freshness</strong>. The last two are vehicle-specific favourites: replay of a valid unlock command is a freshness failure; denying that a diagnostic command was sent is a non-repudiation problem.</p>

<h2>Acronyms that clash</h2>
<div class="callout bad"><div class="ci">✕</div><div class="cb"><div class="ct">&ldquo;CIA&rdquo; is overloaded</div>
<p>In ISO 21434, <strong>CIA</strong> almost always means <strong>Cybersecurity Interface Agreement</strong> (clause 7), not confidentiality-integrity-availability. Say the full words at least once in an interview or you will look careless.</p></div></div>

<h2>Others worth owning</h2>
<ul>
<li><strong>CSMS</strong> &mdash; Cybersecurity Management System, the organisational system UN R155 requires an approval authority to certificate.</li>
<li><strong>SUMS</strong> &mdash; Software Update Management System, the UN R156 equivalent.</li>
<li><strong>PSIRT</strong> &mdash; Product Security Incident Response Team; the operational owner of clause 13 incident response.</li>
<li><strong>TARA</strong> &mdash; Threat Analysis and Risk Assessment (clause 15).</li>
<li><strong>CAL</strong> &mdash; Cybersecurity Assurance Level, CAL 1&ndash;4, an informative (Annex E) way to scale rigour.</li>
<li><strong>OTS / out-of-context</strong> &mdash; off-the-shelf component, and a component developed without knowledge of the final item context.</li>
<li><strong>Cybersecurity case</strong> &mdash; the structured argument, with evidence, that cybersecurity goals are satisfied.</li>
</ul>
`
    }
  ],
  quiz: [
    {
      q: "Which statement best describes the nature of ISO/SAE 21434?",
      options: [
        "A certification scheme that awards a cybersecurity mark to compliant ECUs",
        "A process standard defining cybersecurity engineering activities and work products over the vehicle lifecycle",
        "A catalogue of mandatory technical controls such as secure boot and HSMs",
        "A UN regulation mandating type approval of vehicle cybersecurity"
      ],
      answer: 1,
      explain: "It is a voluntary engineering process standard. Controls are implementation choices; certification and type approval are separate schemes and regulations."
    },
    {
      q: "A threat scenario consists of which three elements?",
      options: [
        "Asset, attack path, risk value",
        "Damage scenario, impact, attack feasibility",
        "Targeted asset, compromised cybersecurity property, cause of the compromise",
        "Attacker profile, vulnerability, exploit"
      ],
      answer: 2,
      explain: "Clause 15 defines a threat scenario as the targeted asset plus the cybersecurity property compromised plus the cause. The attack path is how it is realised; the damage scenario is the consequence."
    },
    {
      q: "What is the primary difference between a damage scenario and a threat scenario?",
      options: [
        "Damage scenarios apply only to safety; threat scenarios apply to privacy",
        "A damage scenario is the adverse consequence; a threat scenario is the attacker action that causes it",
        "A damage scenario is rated 1-5; a threat scenario is rated high/medium/low",
        "They are synonyms in ISO 21434"
      ],
      answer: 1,
      explain: "Damage = consequence to the road user/stakeholder. Threat = asset + property + cause. Threat scenarios cause damage scenarios."
    },
    {
      q: "Where are Cybersecurity Assurance Levels (CAL) defined?",
      options: [
        "Normative clause 10, as a mandatory classification",
        "Informative Annex E, as guidance on scaling rigour",
        "UN Regulation No. 155, Annex 5",
        "Informative Annex H, in the headlamp example"
      ],
      answer: 1,
      explain: "Annex E is informative. CAL 1-4 scale assurance rigour; they are not a pass/fail grade and R155 requires no particular CAL."
    },
    {
      q: "In clause 7, what does a CIA establish?",
      options: [
        "Confidentiality, integrity and availability ratings for each asset",
        "Which cybersecurity activities and work products each party in the supply chain is responsible for",
        "The certification authority that audits the supplier",
        "The attack surface inventory shared with the OEM"
      ],
      answer: 1,
      explain: "The Cybersecurity Interface Agreement allocates responsibilities between customer and supplier, including work products exchanged, escalation and change handling."
    }
  ]
});

window.MODULES.push({
  id: "m1",
  num: "01",
  title: "Landscape & regulation",
  blurb: "Why the discipline exists, and how 21434 relates to R155, 26262 and the rest of the map.",
  lessons: [
    {
      id: "m1l1",
      title: "Why automotive cybersecurity is a discipline",
      minutes: 10,
      body: `
<p class="lead">A modern car is a distributed computing platform with physical actuators. That combination is what makes cybersecurity a safety problem rather than an IT problem.</p>

<h2>The attack surface</h2>
<div class="cards">
<div class="card"><div class="k">Remote</div><h4>Telematics &amp; cloud</h4><p>TCU, OEM apps, back-end APIs, OTA update channels.</p></div>
<div class="card"><div class="k">Short range</div><h4>Radio</h4><p>Bluetooth, Wi-Fi, keyless entry (UWB/RF), TPMS, tolling.</p></div>
<div class="card"><div class="k">Physical</div><h4>Interfaces</h4><p>OBD-II, USB, diagnostics, debug ports, service tooling.</p></div>
<div class="card"><div class="k">In-vehicle</div><h4>Buses</h4><p>CAN/CAN-FD, LIN, FlexRay, automotive Ethernet, SOME/IP.</p></div>
<div class="card"><div class="k">Supply chain</div><h4>Components</h4><p>Third-party stacks, open-source libraries, contracted software.</p></div>
<div class="card"><div class="k">Sensors</div><h4>Perception</h4><p>Camera, radar, lidar, GNSS spoofing/jamming, ultrasound.</p></div>
</div>

<h2>The cases everyone cites</h2>
<ul>
<li><strong>2010</strong> &mdash; academic work showed a car&rsquo;s ECUs could be controlled over the internal network, launching the modern research field.</li>
<li><strong>2015 &mdash; the Jeep Cherokee</strong> &mdash; Miller and Valasek reached the CAN bus through the infotainment head unit over a cellular connection and demonstrated control of steering, braking and transmission. Around 1.4 million vehicles were recalled and patched. This is the canonical lesson: <em>a convenience feature became a safety-critical attack path</em>.</li>
<li><strong>Keyless relay attacks</strong> &mdash; amplifying a key fob signal to unlock and start vehicles, a recurring production problem that forced UWB ranging and motion-sensing keys.</li>
<li><strong>Supply-chain and back-end incidents</strong> &mdash; exposed APIs, leaked credentials and third-party breaches that affect vehicles at fleet scale.</li>
</ul>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">The argument interviewers want</div>
<p>&ldquo;The Jeep case shows the property that makes vehicle security hard: you cannot secure a component in isolation. The head unit was not safety-critical, but it was on a network path to components that were. That is why 21434 puts item definition, interface analysis and distributed activities at the centre, and why architecture-level segmentation is a first-class control.&rdquo;</p></div></div>

<h2>What changes the economics</h2>
<p>Three forces make this non-optional:</p>
<ol>
<li><strong>Regulation.</strong> UN R155 requires a certified Cybersecurity Management System for vehicle type approval in the EU and many other markets; UN R156 does the same for software updates.</li>
<li><strong>Contract.</strong> OEMs flow ISO 21434 work products down the supply chain. A tier-1 or tier-2 without a credible process cannot win the programme.</li>
<li><strong>Liability and cost.</strong> Recalls, fleet-wide remediation, downtime and regulatory penalties dwarf the cost of designing it in. Security debt in a vehicle lasts 15+ years.</li>
</ol>

<h2>Why it is genuinely different from IT security</h2>
<ul>
<li><strong>Safety coupling.</strong> A confidentiality breach is bad; a braking failure is fatal. Impact must be rated in safety terms.</li>
<li><strong>Long life, no patch guarantee.</strong> Fifteen-year fleets, asynchronous updates, owners who never service the car.</li>
<li><strong>Hard real-time and resource limits.</strong> You cannot always add TLS, a full IDS or frequent key rotation to a 10-year-old microcontroller.</li>
<li><strong>Physical adversary access.</strong> The attacker can buy the ECU, put it on a bench and probe it.</li>
<li><strong>Deep, opaque supply chain.</strong> You rarely own all the code on the bus.</li>
</ul>
`
    },
    {
      id: "m1l2",
      title: "The standards and regulation map",
      minutes: 12,
      body: `
<p class="lead">Interviewers frequently test whether you can place 21434 among its neighbours without conflating them.</p>

<div class="table-wrap"><table>
<thead><tr><th>Document</th><th>Type</th><th>Scope</th><th>Relationship to 21434</th></tr></thead>
<tbody>
<tr><td><strong>ISO/SAE 21434:2021</strong></td><td>Engineering standard (voluntary)</td><td>Cybersecurity engineering of road-vehicle E/E systems over the lifecycle</td><td>Defines the how and the evidence</td></tr>
<tr><td><strong>UN R155</strong></td><td>Regulation (type approval)</td><td>CSMS approval for manufacturers + vehicle type cybersecurity assessment</td><td>Requires the management system; 21434 work products are the usual evidence</td></tr>
<tr><td><strong>UN R156</strong></td><td>Regulation (type approval)</td><td>Software update management system (SUMS)</td><td>Updates are clause 13.4 of 21434; engineering detail sits in ISO 24089</td></tr>
<tr><td><strong>ISO 24089</strong></td><td>Engineering standard</td><td>Software update engineering for road vehicles</td><td>Companion to 21434 for OTA and workshop updates</td></tr>
<tr><td><strong>ISO 26262</strong></td><td>Engineering standard</td><td>Functional safety (E/E), ASIL A&ndash;D</td><td>Parallel analysis of the same item; hazards vs threats</td></tr>
<tr><td><strong>ISO/PAS 21448 (SOTIF)</strong></td><td>Engineering standard</td><td>Safety of the intended functionality, performance limitations</td><td>Third lens: non-malicious causes of malfunction</td></tr>
<tr><td><strong>ISO/IEC 27001</strong></td><td>Management system standard</td><td>Enterprise information security</td><td>Organisational context only; not vehicle engineering</td></tr>
<tr><td><strong>TISAX</strong></td><td>Assessment exchange scheme (VDA)</td><td>Information security in the automotive supply chain</td><td>Assesses organisational information security, not product cybersecurity</td></tr>
<tr><td><strong>ISO/SAE 8475</strong></td><td>Publicly available specification</td><td>CAL and Targeted Attack Feasibility (TAF)</td><td>Makes the CAL idea usable beyond informative Annex E</td></tr>
</tbody></table></div>

<h2>UN R155 in more detail</h2>
<p>R155 has two parts that are often confused:</p>
<ul>
<li><strong>The CSMS certificate</strong> &mdash; the manufacturer demonstrates it has a management system covering risk assessment, testing, monitoring, incident response and supplier management. Issued by an approval authority, valid up to three years, and renewable.</li>
<li><strong>The vehicle type approval</strong> &mdash; each vehicle type is assessed against the Annex 5 threat list and must show that risks were identified and treated.</li>
</ul>
<p>R155 does not name ISO 21434 as a mandated method; ISO 21434 appears only in a footnote as an example of relevant knowledge. In practice the standard is how manufacturers generate the evidence. Application dates: new vehicle types from July 2022, all new registrations from July 2024 in the EU.</p>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Do not say &ldquo;ISO 21434 certified&rdquo;</div>
<p>The standard has no ISO-run certification scheme. You can be <em>assessed against</em> it by a certification body under their own programme, or audited to ENX VCS, but neither is a type approval. Say &ldquo;assessed against&rdquo; or &ldquo;compliant with&rdquo;, not &ldquo;certified to&rdquo;.</p></div></div>

<h2>How they interlock in a programme</h2>
<ol class="steps">
<li><strong>Organisation</strong> builds a CSMS to R155 expectations, using 21434 clause 5 as the process backbone.</li>
<li><strong>Project</strong> plans activities per clause 6, tailors, and builds a cybersecurity case.</li>
<li><strong>Supply chain</strong> flows requirements via clause 7 and the interface agreement.</li>
<li><strong>Engineering</strong> runs the TARA (clauses 9 + 15), derives goals and requirements, designs, verifies, validates.</li>
<li><strong>Operations</strong> monitors (clause 8), responds to incidents and ships updates (clause 13), evidenced for the CSMS surveillance audit.</li>
</ol>
`
    },
    {
      id: "m1l3",
      title: "21434 vs R155 vs ISO 26262 (and CAL vs ASIL)",
      minutes: 13,
      body: `
<p class="lead">The CAL/ASIL question is the single most common trap in automotive cybersecurity interviews. Get this crisp and you immediately sound senior.</p>

<h2>Three-column comparison</h2>
<div class="table-wrap"><table>
<thead><tr><th></th><th>ISO/SAE 21434</th><th>UN R155</th><th>ISO 26262</th></tr></thead>
<tbody>
<tr><td>Nature</td><td>Voluntary standard</td><td>Binding regulation</td><td>Voluntary standard</td></tr>
<tr><td>Concern</td><td>Cybersecurity risk</td><td>Management system + vehicle type</td><td>Functional safety risk</td></tr>
<tr><td>Unit of analysis</td><td>Item, component, asset</td><td>Manufacturer, vehicle type</td><td>Item, component, function</td></tr>
<tr><td>Core method</td><td>TARA (threats)</td><td>Annex 5 threat list + risk assessment</td><td>HARA (hazards)</td></tr>
<tr><td>Grading scheme</td><td>CAL 1&ndash;4 (informative)</td><td>None</td><td>ASIL A&ndash;D (normative)</td></tr>
<tr><td>Assessment</td><td>Cybersecurity assessment / audit</td><td>Approval authority certificate</td><td>Functional safety assessment</td></tr>
<tr><td>Output</td><td>Work products, cybersecurity case</td><td>Certificate of compliance, approvals</td><td>Safety case, safety goals</td></tr>
</tbody></table></div>

<h2>CAL in one minute</h2>
<p>A <strong>Cybersecurity Assurance Level</strong> expresses how much rigour an activity around an item or asset deserves. Annex E is informative and defines four levels, derived from concept-stage information such as impact and attack vector. Higher CAL means deeper analysis, more independent review, stronger verification &mdash; not a different product.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Level</th><th>Indicative posture</th></tr></thead>
<tbody>
<tr><td>CAL 1</td><td>Baseline engineering rigour; low impact and/or hard to attack</td></tr>
<tr><td>CAL 2</td><td>Moderate rigour; standard review and verification</td></tr>
<tr><td>CAL 3</td><td>High rigour; independent review, deeper analysis, targeted testing</td></tr>
<tr><td>CAL 4</td><td>Highest rigour; extensive independent assessment and penetration testing, strongest evidence</td></tr>
</tbody></table></div>

<h2>Why CAL is not ASIL</h2>
<div class="callout bad"><div class="ci">✕</div><div class="cb"><div class="ct">The sentence to avoid</div>
<p>&ldquo;CAL is the cybersecurity ASIL.&rdquo; It borrows the idea of scaling rigour, but an ASIL is a <em>normative</em> risk classification computed from severity, exposure and controllability of a hazard. A CAL is <em>informative</em> guidance; it measures no risk by itself and fixes no methods unless your organisation or customer defines them. ISO/SAE 8475 exists precisely because Annex E left the scheme underspecified.</p></div></div>

<h2>Where safety and security genuinely meet</h2>
<p>They meet at the impact rating. A TARA rates safety impact by asking what harm an attack could cause; a HARA rates hazard severity from malfunction. The same failure mode can arrive two ways:</p>
<ul>
<li><strong>Fault path</strong> &mdash; a random hardware failure or systematic bug turns the steering assist wrongly &rarr; HARA, ASIL.</li>
<li><strong>Attack path</strong> &mdash; a spoofed message turns the steering assist wrongly &rarr; TARA, CAL, cybersecurity goal.</li>
</ul>
<p>Good practice is to share analyses both ways: use the HARA&rsquo;s hazardous events as candidate damage scenarios in the TARA, and feed TARA-identified attack paths back to the safety team so they can check whether a security control failure violates a safety goal. ISO 26262 part 2 also requires communication channels with cybersecurity as a related discipline.</p>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Model answer</div>
<p>&ldquo;Both scale rigour to risk, but ASIL is a normative safety classification from severity, exposure and controllability, while CAL is informative guidance in Annex E derived from impact and attack vector. In practice I would use CAL to decide review depth and test intensity, and keep the safety argument in the HARA. The two analyses share the item definition and cross-check each other.&rdquo;</p></div></div>
`
    }
  ],
  quiz: [
    {
      q: "UN R155 requires which of the following?",
      options: [
        "Certification of each ECU against ISO 21434",
        "An approved Cybersecurity Management System and vehicle type cybersecurity assessment",
        "A CAL 3 rating for every safety-critical component",
        "Annual penetration testing by an accredited third party"
      ],
      answer: 1,
      explain: "R155 is a type-approval regulation: CSMS certificate plus per-vehicle-type assessment against its threat list. It does not mandate ISO 21434, CAL levels or a specific test cadence."
    },
    {
      q: "Which pair is correctly matched?",
      options: [
        "ASIL — informative, derived from impact and attack vector",
        "CAL — normative, derived from severity, exposure and controllability",
        "CAL — informative guidance for scaling rigour, derived from impact and attack vector",
        "ASIL — voluntary, applies only to infotainment"
      ],
      answer: 2,
      explain: "CAL (Annex E, informative) scales rigour from impact and attack vector. ASIL (ISO 26262, normative) comes from severity, exposure and controllability."
    },
    {
      q: "Which standard covers software update engineering for road vehicles?",
      options: ["ISO 24089", "ISO/PAS 21448", "ISO/IEC 27001", "ISO/SAE 8475"],
      answer: 0,
      explain: "ISO 24089 covers software update engineering. 21448 is SOTIF, 27001 is enterprise information security, 8475 covers CAL and targeted attack feasibility."
    },
    {
      q: "What does TISAX assess?",
      options: [
        "Vehicle-level penetration test results",
        "Information security in the automotive supply chain, at organisation level",
        "Compliance with UN R155 Annex 5",
        "The cybersecurity of individual CAN frames"
      ],
      answer: 1,
      explain: "TISAX is a VDA assessment-exchange scheme for organisational information security. It is not product cybersecurity engineering."
    },
    {
      q: "In the 2015 Jeep Cherokee research, what was the key architectural lesson?",
      options: [
        "CAN bus is inherently encrypted",
        "A non-safety-critical component on a network path to safety-critical ECUs creates a safety-relevant attack path",
        "Cellular connectivity is unnecessary in vehicles",
        "Only physical attacks matter"
      ],
      answer: 1,
      explain: "The head unit was not safety-critical, but it provided a path to the CAN bus. That is why item boundaries, interfaces and segmentation are central to the TARA."
    }
  ]
});

window.MODULES.push({
  id: "m2",
  num: "02",
  title: "Clause 5 — Organisational management",
  blurb: "The governance layer: policy, rules, processes, culture, competence, tools and the organisational audit.",
  lessons: [
    {
      id: "m2l1",
      title: "Governance: policy, rules and processes",
      minutes: 12,
      body: `
<p class="lead">Clause 5 is the part of the standard most often skipped in interviews and most often failed in audits. It answers: who owns cybersecurity, under what rules, with what evidence of independence?</p>

<h2>What clause 5 must produce</h2>
<ol class="steps">
<li><strong>Cybersecurity policy.</strong> A top-level commitment from management: objectives, scope, accountability, the principle that cybersecurity is part of the product lifecycle, and the requirement to comply with the rules and processes below.</li>
<li><strong>Rules and processes.</strong> The operational detail: how a TARA is run, which method, who approves goals, how vulnerabilities are handled, how suppliers are qualified, how incidents escalate. These are the documents a new engineer is trained on.</li>
<li><strong>Roles and responsibilities.</strong> Named accountability, not a committee. Typical split: executive owner, cybersecurity manager (process and compliance), project cybersecurity manager (per item), engineers (TARA, requirements, test), PSIRT (operations).</li>
<li><strong>Escalation and decision rights.</strong> Who may accept residual risk, who may block a release, who declares an incident.</li>
</ol>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Policy vs process vs plan</div>
<p><strong>Policy</strong> = why and who (organisation, durable). <strong>Process/rules</strong> = how, in general (organisation, durable). <strong>Plan</strong> = what, for this project, with dates and owners (clause 6, project-specific). Interviewees mix these three constantly.</p></div></div>

<h2>What good looks like</h2>
<div class="table-wrap"><table>
<thead><tr><th>Element</th><th>Weak</th><th>Strong</th></tr></thead>
<tbody>
<tr><td>Policy</td><td>One paragraph on the intranet, unsigned</td><td>Management-approved, reviewed annually, referenced by contracts</td></tr>
<tr><td>Processes</td><td>Generic security policy copied from IT</td><td>Vehicle-specific TARA method, templates, tooling, review gates</td></tr>
<tr><td>Accountability</td><td>&ldquo;The security team&rdquo;</td><td>Named role per item with defined decision rights</td></tr>
<tr><td>Tailoring</td><td>Ad hoc, undocumented</td><td>Documented rules with rationale and approval</td></tr>
<tr><td>Evidence</td><td>Slide decks</td><td>Versioned work products under configuration control</td></tr>
</tbody></table></div>

<h2>Interaction with the rest of the management system</h2>
<p>Clause 5 requires that cybersecurity does not live in a parallel universe. It names the interfaces to the quality management system, the configuration and change management system, and requirements management. Practically:</p>
<ul>
<li><strong>Configuration management</strong> ensures you know which TARA and which requirement version applies to which software release.</li>
<li><strong>Requirements management</strong> is what makes traceability from goal to test possible and auditable.</li>
<li><strong>Change management</strong> is the trigger to re-run impact analysis and, when needed, the TARA.</li>
<li><strong>Information security management</strong> (ISO/IEC 27001 style) protects the development environment itself &mdash; source code, signing keys, build servers.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Audit trap</div>
<p>An assessor who finds a beautifully written policy and no evidence it is followed will mark you down harder than an organisation with a modest policy and consistent records. Clause 5 is a <em>practice</em> requirement, evidenced through project samples.</p></div></div>

<h2>How to implement it in 30 days</h2>
<ol class="steps">
<li>Draft the policy (2 pages), get management signature, publish it.</li>
<li>Write or adapt the TARA method: inputs, steps, rating tables, tool, review roles.</li>
<li>Define the work-product register from Annex A and map each to a template and an owner.</li>
<li>Define the release gate: which work products must exist before a release for post-development is granted.</li>
<li>Set the audit calendar and record the first internal audit findings.</li>
</ol>
`
    },
    {
      id: "m2l2",
      title: "Culture, competence, awareness, information sharing",
      minutes: 11,
      body: `
<p class="lead">These are the &ldquo;soft&rdquo; requirements that decide whether the process survives contact with a deadline.</p>

<h2>Cybersecurity culture</h2>
<p>Clause 5 requires a culture in which cybersecurity is treated as everyone&rsquo;s responsibility and decisions are traceable. Annex B contrasts weak and strong cultures &mdash; use that table directly in maturity conversations.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Weak culture</th><th>Strong culture</th></tr></thead>
<tbody>
<tr><td>Accountability for cybersecurity decisions is untraceable</td><td>Every decision has a named owner and a recorded rationale</td></tr>
<tr><td>Security is a gate at the end, run by one team</td><td>Security activities are planned into the engineering workflow</td></tr>
<tr><td>Bad news travels slowly, incidents are hidden</td><td>Incidents and near-misses are reported without blame</td></tr>
<tr><td>Requirements are copied without understanding</td><td>Engineers can explain which threat a control addresses</td></tr>
<tr><td>Reuse is assumed safe</td><td>Reuse is assessed for changed context</td></tr>
</tbody></table></div>

<h2>Competence management</h2>
<p>The requirement is not &ldquo;send everyone on a course&rdquo;. It is that the organisation determines the competences each cybersecurity role needs, assesses them, and closes gaps. A workable scheme:</p>
<ul>
<li><strong>Role profiles</strong> &mdash; e.g. TARA facilitator, cybersecurity engineer, tester, incident handler, assessor.</li>
<li><strong>Competence matrix</strong> &mdash; required vs actual per person, per topic (risk methods, crypto, bus protocols, tooling, standards).</li>
<li><strong>Evidence</strong> &mdash; training records, certifications, mentored work, review sign-offs.</li>
<li><strong>Plan</strong> &mdash; gap closure with dates; supplier competence handled in clause 7.</li>
</ul>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Strong interview answer</div>
<p>&ldquo;Competence management is how you avoid a process that only one person can execute. I would define role-based competence profiles, keep a matrix with evidence, and make the TARA review a mentored activity so new engineers build judgement, not just template-filling.&rdquo;</p></div></div>

<h2>Awareness</h2>
<p>Awareness differs from competence: competence is for the people doing the work, awareness for everyone whose decisions affect cybersecurity &mdash; programme managers, purchasers, test drivers, workshop staff. Content that actually lands:</p>
<ul>
<li>What an incident looks like in your product and exactly whom to tell, within what time.</li>
<li>Why a debug port left enabled or a key committed to a repository matters.</li>
<li>How procurement decisions create security debt.</li>
<li>Short, recurring, role-relevant &mdash; not one annual slide deck.</li>
</ul>

<h2>Information sharing</h2>
<p>The organisation must define how cybersecurity information flows in and out: with suppliers, customers, industry bodies (Auto-ISAC and national CERTs), researchers, and internally between projects. This is the input pipe for clause 8 monitoring. Specify channels, confidentiality handling (NDAs, TLP-style marking), and who may disclose what.</p>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The quiet failure mode</div>
<p>A team learns of a vulnerability in a reused library, fixes it in the current project, and tells nobody. Clause 5 information sharing plus clause 8 vulnerability management exist to make that information travel to every affected product.</p></div></div>
`
    },
    {
      id: "m2l3",
      title: "Supporting systems, tools and the organisational audit",
      minutes: 11,
      body: `
<p class="lead">Clause 5 closes with the infrastructure that makes the process real: management systems, tool management, and independent audit.</p>

<h2>Supporting management systems</h2>
<p>Cybersecurity activities must be embedded in systems that already exist in a competent engineering organisation:</p>
<ul>
<li><strong>Quality management</strong> &mdash; documented process, corrective actions, management review.</li>
<li><strong>Configuration management</strong> &mdash; baselines, version control, traceability of work products to releases.</li>
<li><strong>Requirements management</strong> &mdash; bidirectional traceability, change impact analysis.</li>
<li><strong>Change management</strong> &mdash; what triggers re-analysis, re-verification and re-assessment.</li>
<li><strong>Information security management</strong> &mdash; protection of development assets and secrets.</li>
</ul>
<p>An assessor samples a project and expects these systems to hold: if the TARA in the repository is version 3 and the release notes reference version 2, the process has failed regardless of how good the analysis was.</p>

<h2>Tool management</h2>
<p>Every tool that creates, modifies, verifies or protects a work product is in scope: TARA tools, threat catalogues, static analysers, fuzzers, build systems, flashing and key-injection tools, test benches.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Tool concern</th><th>What to evidence</th></tr></thead>
<tbody>
<tr><td>Correctness</td><td>Tool qualification or validation appropriate to its use; known limitations</td></tr>
<tr><td>Integrity</td><td>Version control, controlled installation, checksums, no unmanaged plugins</td></tr>
<tr><td>Access</td><td>Role-based access, especially to signing and key-injection tools</td></tr>
<tr><td>Data protection</td><td>Confidentiality of threat analyses, keys and vulnerability data</td></tr>
<tr><td>Traceability</td><td>Which tool version produced which result, and when</td></tr>
</tbody></table></div>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Why tool management is a real requirement</div>
<p>A static analyser with a stale rule set silently misses the vulnerability your customer later finds. A flashing tool with shared credentials is the fastest route to a fleet-wide compromise. The standard treats tools as part of the security argument, not as IT plumbing.</p></div></div>

<h2>Organisational cybersecurity audit</h2>
<p>Clause 5 requires an audit of the organisation&rsquo;s cybersecurity management at planned intervals, performed with <strong>independence</strong> from the audited activity. Key characteristics:</p>
<ul>
<li><strong>Scope</strong> &mdash; the management system and its implementation, sampled across projects, not just document review.</li>
<li><strong>Independence</strong> &mdash; the auditor does not audit their own work; internal audit function or external body.</li>
<li><strong>Output</strong> &mdash; findings with severity, root cause, corrective actions, owners, due dates, and verification of closure.</li>
<li><strong>Feed-forward</strong> &mdash; findings update the policy, processes and training, and are visible to management review.</li>
</ul>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Distinguish the three assurance activities</div>
<p><strong>Organisational audit</strong> (clause 5): is the management system adequate and followed? <strong>Cybersecurity assessment</strong> (clause 6): is this project&rsquo;s cybersecurity case defensible &mdash; are the work products complete and consistent? <strong>Validation</strong> (clause 11): does the vehicle actually meet the goals? Different questions, different evidence, often different people.</p></div></div>

<h2>Implementation checklist for clause 5</h2>
<ul>
<li>Signed policy, reviewed annually, with defined roles and decision rights.</li>
<li>Documented rules for TARA, requirements, verification, incident handling, supplier qualification.</li>
<li>Competence matrix with evidence and a gap-closure plan.</li>
<li>Awareness programme with records, tailored by role.</li>
<li>Information-sharing channels and confidentiality rules, including CERT/ISAC membership.</li>
<li>Tool register with owners, versions, access control and validation status.</li>
<li>Audit plan, at least one completed audit cycle, findings tracked to closure.</li>
</ul>
`
    }
  ],
  quiz: [
    {
      q: "Which best distinguishes a cybersecurity policy from a cybersecurity plan?",
      options: [
        "The policy is project-specific; the plan is organisation-wide",
        "The policy states why and who at organisation level; the plan states what this project will do, with owners and dates",
        "The policy is written by the supplier; the plan by the OEM",
        "They are the same document at different review stages"
      ],
      answer: 1,
      explain: "Policy and rules are organisational and durable (clause 5). The plan is per item/component and time-bound (clause 6)."
    },
    {
      q: "What does clause 5 require regarding tools?",
      options: [
        "Only penetration-testing tools must be managed",
        "Tools that affect cybersecurity work products must be managed for suitability, integrity, access and traceability",
        "Tools must be certified to ISO 21434",
        "Tool management is out of scope; it belongs to IT"
      ],
      answer: 1,
      explain: "TARA tools, analysers, build and key-injection tools are all in scope: suitability for use, controlled versions and access, and traceability of results."
    },
    {
      q: "Who should perform the organisational cybersecurity audit?",
      options: [
        "The project cybersecurity manager for the audited project",
        "Someone independent of the audited activity",
        "The supplier being audited",
        "The approval authority only"
      ],
      answer: 1,
      explain: "Independence is the point. The project manager auditing their own project defeats the purpose."
    },
    {
      q: "What is the difference between competence and awareness?",
      options: [
        "Competence is for engineers; awareness is for managers only",
        "Competence is the assessed ability to perform a cybersecurity role; awareness is the broader understanding needed by anyone whose decisions affect cybersecurity",
        "Awareness is documented; competence is not",
        "They are interchangeable terms in clause 5"
      ],
      answer: 1,
      explain: "Competence management targets role performance and is assessed. Awareness targets the wider population: recognition, reporting, and decision impact."
    },
    {
      q: "A project fixes a vulnerability in a reused library but informs no other project. Which clause 5 element most directly failed?",
      options: [
        "Tool management",
        "Information sharing",
        "Organisational audit",
        "Tailoring"
      ],
      answer: 1,
      explain: "Information sharing is the defined mechanism by which cybersecurity knowledge travels across projects, customers and suppliers."
    }
  ]
});
