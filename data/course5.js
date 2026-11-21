/* ISO/SAE 21434 study guide — module 10 (TARA deep dive) */
window.MODULES = window.MODULES || [];

window.MODULES.push({
  id: "m10",
  num: "10",
  title: "Clause 15 — TARA deep dive",
  blurb: "The method library: assets, damage scenarios, impact, attack paths, feasibility, risk value, treatment.",
  lessons: [
    {
      id: "m10l1",
      title: "The method, and how modular it really is",
      minutes: 12,
      body: `
<p class="lead">Clause 15 is the analytical engine of the standard. It defines <em>methods</em>, not a single mandatory sequence &mdash; and that flexibility is a common source of confused answers.</p>

<h2>The seven activities</h2>
<div class="table-wrap"><table>
<thead><tr><th>Step</th><th>Question answered</th><th>Key output</th></tr></thead>
<tbody>
<tr><td>15.3 Asset identification</td><td>What has value, and which property of it matters?</td><td>Asset list with cybersecurity properties</td></tr>
<tr><td>15.4 Threat scenario identification</td><td>How could that property be compromised, and why does it matter?</td><td>Threat scenarios, each linked to damage scenarios</td></tr>
<tr><td>15.5 Impact rating</td><td>How bad is the damage?</td><td>Impact rating per damage scenario (safety, financial, operational, privacy)</td></tr>
<tr><td>15.6 Attack path analysis</td><td>What sequence of steps realises the threat?</td><td>Attack paths, typically as attack trees</td></tr>
<tr><td>15.7 Attack feasibility rating</td><td>How hard is each path?</td><td>High / medium / low / very low per path</td></tr>
<tr><td>15.8 Risk value determination</td><td>How much risk is this?</td><td>Risk value, typically 1&ndash;5</td></tr>
<tr><td>15.9 Risk treatment decision</td><td>What will we do about it?</td><td>Avoid / reduce / share / retain, with rationale</td></tr>
</tbody></table></div>

<h2>Modular means you can start anywhere</h2>
<p>The standard explicitly allows the activities in different orders. Legitimate starting points:</p>
<ul>
<li><strong>Asset-driven</strong> &mdash; inventory what you have, ask what could go wrong with each property.</li>
<li><strong>Damage-driven</strong> &mdash; start from a catalogue of adverse outcomes (or from the HARA) and work back to the assets that enable them.</li>
<li><strong>Threat-driven</strong> &mdash; start from a threat catalogue (STRIDE, EVITA, UN R155 Annex 5) and map each to your architecture.</li>
<li><strong>Path-driven</strong> &mdash; start from a known attack technique or vulnerability and see what it reaches.</li>
</ul>
<p>What is <em>not</em> optional is the chain of justification: every threat scenario names an asset and a compromised property; every asset links to a damage scenario; every rated risk has a treatment decision.</p>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The trap in &ldquo;modular&rdquo;</div>
<p>Teams read &ldquo;any order&rdquo; as &ldquo;do whichever step is convenient&rdquo; and produce a threat list with no assets and impacts with no damage scenarios. The flexibility is about entry point, not about skipping the causal links.</p></div></div>

<h2>Inputs and traceability</h2>
<p>TARA consumes the item definition and produces records that clause 9 uses for goals, clause 10 for requirements and clause 8/13 for re-assessment. Keep identifiers stable: <code>AS-01</code> asset, <code>DS-03</code> damage scenario, <code>TS-07</code> threat scenario, <code>AP-07-2</code> attack path, <code>R-07</code> risk. When a requirement says &ldquo;mitigates TS-07&rdquo;, an assessor can walk the chain in seconds.</p>

<h2>Scope question interviewers love</h2>
<p><strong>&ldquo;Do you TARA the whole vehicle?&rdquo;</strong> No. You TARA an item with a defined boundary and interfaces, then compose item-level results. A vehicle-level TARA is too coarse to produce actionable requirements, and a component-level TARA alone is blind to context. The item definition is the unit of analysis; supplier and OEM analyses meet at the boundary through the interface agreement.</p>

<h2>Consistency rules to set in the method</h2>
<ul>
<li>One impact scale, one feasibility scale, one risk matrix, used by every project.</li>
<li>Documented rationale for every rating, not just the number.</li>
<li>Threat catalogues are stimuli, not answers &mdash; each entry must be instantiated for this item.</li>
<li>Rejected scenarios are recorded with the reason; that record is what makes the analysis reviewable.</li>
</ul>
`
    },
    {
      id: "m10l2",
      title: "Assets, damage scenarios and impact rating",
      minutes: 14,
      body: `
<p class="lead">Impact rating is the half of the risk equation that talks to the rest of the company: safety, finance, operations and privacy all understand damage.</p>

<h2>Finding assets</h2>
<p>An asset is anything whose compromise harms a stakeholder. Look for it on data flows and control paths, not just in the bill of materials:</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Asset class</th><th>Examples</th><th>Properties usually at stake</th></tr></thead>
<tbody>
<tr><td>Control data</td><td>Torque request, brake command, steering angle, gear selection</td><td>Integrity, authenticity, freshness</td></tr>
<tr><td>Software</td><td>Application, calibration, bootloader, update package</td><td>Integrity, authenticity</td></tr>
<tr><td>Credentials</td><td>Private keys, certificates, tokens, diagnostic seeds</td><td>Confidentiality, integrity</td></tr>
<tr><td>Personal data</td><td>Location history, contacts, voice, camera, biometrics</td><td>Confidentiality, privacy</td></tr>
<tr><td>Configuration</td><td>Immobiliser state, odometer, safety settings</td><td>Integrity, authenticity</td></tr>
<tr><td>Availability</td><td>Vehicle function, back-end service, update channel</td><td>Availability</td></tr>
<tr><td>Evidence</td><td>Security logs, audit trails, crash records</td><td>Integrity, non-repudiation</td></tr>
</tbody></table></div>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">The asset test</div>
<p>For each candidate asset, finish this sentence: &ldquo;If an attacker controlled this, they could cause ______.&rdquo; If nothing credible goes in the blank, it is not an asset worth its own row &mdash; but record why, because a reviewer may disagree.</p></div></div>

<h2>Damage scenarios</h2>
<p>A damage scenario describes the adverse consequence to a road user or stakeholder, in their terms. It is not a technical event.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Not a damage scenario</th><th>Damage scenario</th></tr></thead>
<tbody>
<tr><td>CAN frames can be spoofed</td><td>Unintended braking at speed causes loss of control and injury</td></tr>
<tr><td>Keys stored insecurely</td><td>Attacker unlocks and steals the vehicle, or clones keys for resale</td></tr>
<tr><td>Telemetry unencrypted</td><td>Owner&rsquo;s location history is exposed, enabling stalking</td></tr>
</tbody></table></div>

<h2>Impact categories and levels</h2>
<p>Clause 15 names four categories. Annex F provides guidance; your organisation must fix its own definitions and thresholds.</p>
<div class="table-wrap"><table>
<thead><tr><th>Level</th><th>Safety</th><th>Financial</th><th>Operational</th><th>Privacy</th></tr></thead>
<tbody>
<tr><td><strong>Severe</strong></td><td>Fatalities or serious injuries possible</td><td>Very high cost, e.g. major recall or fleet-wide remediation</td><td>Loss of a core vehicle function across the fleet</td><td>Highly sensitive personal data exposed at scale</td></tr>
<tr><td><strong>Major</strong></td><td>Injuries possible; safety margin significantly reduced</td><td>Significant cost to OEM, owner or third party</td><td>Loss of an important function for many users</td><td>Sensitive data exposed for many individuals</td></tr>
<tr><td><strong>Moderate</strong></td><td>Discomfort or minor injury risk</td><td>Moderate cost, recoverable</td><td>Noticeable degradation, workaround exists</td><td>Limited personal data exposure</td></tr>
<tr><td><strong>Negligible</strong></td><td>No plausible injury</td><td>Minor or no cost</td><td>No meaningful effect</td><td>No personal data, or non-identifying</td></tr>
</tbody></table></div>
<p>The overall impact is normally the <strong>maximum</strong> across categories, but keep the category breakdown visible: a privacy-severe, safety-negligible scenario needs a different treatment than a safety-severe one, even if both rate &ldquo;severe&rdquo; overall.</p>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Question: how do you rate safety impact consistently with functional safety?</div>
<p>&ldquo;I reuse the safety team&rsquo;s hazardous events and severity assessments as inputs, so a damage scenario that corresponds to a known hazardous event inherits its severity judgement. Where there is no corresponding hazard, safety and cybersecurity review the scenario together. That keeps the two analyses consistent and avoids inventing a second safety severity scale.&rdquo;</p></div></div>

<h2>Common impact-rating errors</h2>
<ul>
<li>Rating the <em>attack</em> rather than the <em>damage</em> &mdash; impact is about consequences, feasibility is about the attacker.</li>
<li>Ignoring privacy because &ldquo;the vehicle still drives&rdquo;.</li>
<li>Rating every scenario severe &ldquo;to be safe&rdquo;, which destroys prioritisation and credibility.</li>
<li>Leaving the rationale blank, so a reviewer cannot tell whether the rating was considered or guessed.</li>
<li>Forgetting third-party financial impact &mdash; owner costs, dealer costs, insurer costs.</li>
</ul>
`
    },
    {
      id: "m10l3",
      title: "Threat scenarios and attack path analysis",
      minutes: 14,
      body: `
<p class="lead">This is the creative half of TARA: enumerating how the property gets compromised, then mapping the routes an attacker would actually take.</p>

<h2>Anatomy of a threat scenario</h2>
<p>Asset + compromised property + cause. A complete statement is testable and specific:</p>
<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Example</div>
<p><strong>Asset:</strong> beam-mode command &middot; <strong>Property:</strong> authenticity &middot; <strong>Cause:</strong> spoofed CAN frame from a node with physical access to the bus. &ldquo;Spoofing of the beam-mode command by an attacker with bus access&rdquo; &mdash; this is close to the standard&rsquo;s own headlamp example (Annex H).</p></div></div>

<h2>Systematic enumeration</h2>
<p>Use at least two complementary stimuli so you do not rely on one mental model:</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Approach</th><th>What it gives</th><th>Limitation</th></tr></thead>
<tbody>
<tr><td>STRIDE per element/interaction</td><td>Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege</td><td>Software-centric; weak on physical and supply-chain threats</td></tr>
<tr><td>Attack libraries (EVITA, HEAVENS, CAPEC, MITRE)</td><td>Concrete automotive techniques and entry points</td><td>Can bias toward known attacks; needs instantiation</td></tr>
<tr><td>UN R155 Annex 5 threat list</td><td>Regulatory baseline expected by authorities</td><td>Generic; requires mapping to your architecture</td></tr>
<tr><td>Data-flow walkthrough</td><td>Finds missing threats on interfaces you forgot</td><td>Time-consuming; needs good diagrams</td></tr>
<tr><td>Interface/entry-point checklist</td><td>Ensures every external interface is considered</td><td>Produces breadth, not depth</td></tr>
</tbody></table></div>

<h2>Attack paths and attack trees</h2>
<p>A threat scenario says what happens; an attack path says how. Build it as a tree: the scenario is the root, steps are nodes, <strong>AND</strong> gates require all children, <strong>OR</strong> gates require any one.</p>
<ol class="steps">
<li><strong>Root:</strong> realise threat scenario TS-07 (spoof beam command).</li>
<li><strong>OR</strong> &mdash; physical access to the bus.</li>
<li><strong>OR</strong> &mdash; compromise a node that can transmit on the bus.</li>
<li><strong>AND</strong> under that &mdash; gain code execution on the head unit <em>and</em> have frames forwarded across the gateway.</li>
<li><strong>AND</strong> under that &mdash; know the message format <em>and</em> bypass any authentication.</li>
</ol>
<p>The value of drawing it: the AND gate tells you two independent fixes exist, and the OR tells you the attacker only needs the cheapest branch. That is directly actionable architecture guidance.</p>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Read the tree like an attacker</div>
<p>Attackers optimise for cost. For each OR, ask which child is cheapest in effort and equipment. That branch sets the feasibility of the whole path, and it is usually not the branch the design team was worried about.</p></div></div>

<h2>What gets rated</h2>
<p>Attack feasibility is rated per <strong>attack path</strong>, not per threat scenario. The scenario inherits a value at risk determination &mdash; commonly the maximum of its paths, on the assumption that the attacker takes the easiest route. Keep the path-level detail: it is what tells you which control to strengthen.</p>

<h2>Staying honest</h2>
<ul>
<li><strong>Include the boring paths.</strong> The OBD port, the workshop tester, the USB socket and the production tool are entry points.</li>
<li><strong>Include the supply chain.</strong> A malicious or compromised supplier update is an attack path with high impact and, sometimes, disturbing feasibility.</li>
<li><strong>Record exclusions.</strong> &ldquo;Requires destructive disassembly and renders the vehicle inoperable&rdquo; is a reason; state it rather than silently omitting.</li>
<li><strong>Revisit after validation.</strong> A penetration test that succeeds is empirical proof your feasibility rating was too optimistic.</li>
</ul>
`
    },
    {
      id: "m10l4",
      title: "Attack feasibility: three approaches",
      minutes: 15,
      body: `
<p class="lead">Feasibility answers &ldquo;how hard is this for the attacker?&rdquo; The standard offers three approaches; Annex G gives guidelines for each.</p>

<h2>1. Attack-potential based (the workhorse)</h2>
<p>Borrowed from Common Criteria / ISO 18045 thinking. Score five factors, sum them, map the total to a feasibility level.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Factor</th><th>Levels (typical point values)</th></tr></thead>
<tbody>
<tr><td><strong>Elapsed time</strong></td><td>&le; 1 day (0) &middot; &le; 1 week (1) &middot; &le; 1 month (4) &middot; &le; 6 months (17) &middot; &gt; 6 months (19)</td></tr>
<tr><td><strong>Expertise</strong></td><td>Layman (0) &middot; Proficient (3) &middot; Expert (6) &middot; Multiple experts (8)</td></tr>
<tr><td><strong>Knowledge of item</strong></td><td>Public (0) &middot; Restricted (3) &middot; Confidential (7) &middot; Strictly confidential (11)</td></tr>
<tr><td><strong>Window of opportunity</strong></td><td>Unlimited (0) &middot; Easy (1) &middot; Moderate (4) &middot; Difficult (10)</td></tr>
<tr><td><strong>Equipment</strong></td><td>Standard (0) &middot; Specialised (4) &middot; Bespoke (7) &middot; Multiple bespoke (9)</td></tr>
</tbody></table></div>
<p>Typical mapping of the total (Annex G style): <strong>0&ndash;13 high</strong>, <strong>14&ndash;19 medium</strong>, <strong>20&ndash;24 low</strong>, <strong>&ge;25 very low</strong>. Your organisation should fix and document its own table &mdash; consistency matters more than the exact numbers.</p>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Worked scoring</div>
<p>Attacker needs an expert (6), has restricted information from a leaked document (3), needs about a month of work (4), needs physical access for several hours in an unobserved location (moderate = 4), and uses a standard CAN tool plus a laptop (standard = 0). Total = 17 &rarr; <strong>medium</strong> feasibility.</p></div></div>

<h2>2. Attack-vector based (fast, coarse)</h2>
<p>Rate by how the attacker reaches the item:</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Vector</th><th>Indicative feasibility</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Remote (network, cellular, internet)</td><td>High</td><td>Scalable, no physical presence, automatable</td></tr>
<tr><td>Adjacent (Bluetooth, Wi-Fi, key fob, V2X)</td><td>Medium&ndash;high</td><td>Requires proximity, often repeatable</td></tr>
<tr><td>Local (OBD, USB, diagnostic session)</td><td>Low&ndash;medium</td><td>Requires physical access and time</td></tr>
<tr><td>Physical (disassembly, probing, chip-off)</td><td>Very low</td><td>Expensive, often destructive</td></tr>
</tbody></table></div>
<p>Fast and good for early concept work, but it ignores attacker capability and time. Use it to triage, not to defend a rating in an assessment.</p>

<h2>3. CVSS-based (leverages existing scores)</h2>
<p>Use CVSS exploitability metrics (attack vector, complexity, privileges, user interaction) as the feasibility input, often with temporal and environmental adjustments. Good for vulnerabilities discovered in operation, because a CVSS score already exists. Weak for concept-stage analysis of threats that have no CVE.</p>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The two errors that ruin feasibility ratings</div>
<p><strong>Rating the vulnerability, not the path.</strong> A path may require three steps; if you rate only the hardest step you underestimate the attacker, and if you rate only the easiest you overestimate them. Rate the whole path. <strong>Assuming the attacker has no information.</strong> Documentation leaks, vehicles are bought and reverse-engineered, and after one public talk the &ldquo;confidential&rdquo; knowledge becomes public. Consider the state of knowledge at end of production, not today.</p></div></div>

<h2>Choosing an approach</h2>
<ul>
<li><strong>Concept TARA:</strong> attack-vector for speed, then attack-potential for the top risks.</li>
<li><strong>Design TARA:</strong> attack-potential, per path, with rationale recorded.</li>
<li><strong>Vulnerability management:</strong> CVSS as an input, re-rated in vehicle context.</li>
<li><strong>Consistency:</strong> whichever you choose, apply it to everything and document the mapping to high/medium/low/very low.</li>
</ul>
`
    },
    {
      id: "m10l5",
      title: "Risk value, treatment and a worked example",
      minutes: 15,
      body: `
<p class="lead">Risk value turns two ordinal scales into a decision. Treatment turns the decision into engineering.</p>

<h2>Combining impact and feasibility</h2>
<p>Clause 15 expects a risk value derived from impact and attack feasibility, typically 1&ndash;5. A 5&times;5 style matrix is the common implementation:</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Impact \\ Feasibility</th><th>Very low</th><th>Low</th><th>Medium</th><th>High</th></tr></thead>
<tbody>
<tr><td><strong>Severe</strong></td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><td><strong>Major</strong></td><td>2</td><td>2</td><td>3</td><td>4</td></tr>
<tr><td><strong>Moderate</strong></td><td>1</td><td>1</td><td>2</td><td>3</td></tr>
<tr><td><strong>Negligible</strong></td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
</tbody></table></div>
<p>The asymmetry is deliberate: severe impact can never fall below 2, because &ldquo;hard to do&rdquo; is not a safety argument. Attackers improve; impact does not change.</p>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">If asked &ldquo;what is the right risk matrix?&rdquo;</div>
<p>&ldquo;The standard does not prescribe one. It requires that impact and feasibility are combined into a risk value and that the method is defined, documented and applied consistently. I would publish the matrix in the organisation&rsquo;s method, calibrate thresholds with safety and management, and never let a &lsquo;high feasibility&rsquo; argument lower a severe-impact risk below the level that forces action.&rdquo;</p></div></div>

<h2>Treatment options</h2>
<div class="table-wrap"><table>
<thead><tr><th>Option</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Avoid</strong></td><td>Eliminate the risk source; do not build the function or connection</td><td>Remove the remote window-close feature; no cellular path to that ECU</td></tr>
<tr><td><strong>Reduce</strong></td><td>Add controls to lower impact or feasibility</td><td>Authenticate bus commands; segment the network; secure boot</td></tr>
<tr><td><strong>Share</strong></td><td>Transfer part of the risk contractually or via insurance</td><td>Back-end hosting security under a provider contract with defined controls</td></tr>
<tr><td><strong>Retain</strong></td><td>Accept the risk with rationale and monitoring</td><td>Physical chip-off attack accepted as uneconomic; monitored</td></tr>
</tbody></table></div>
<p>Reduce is not automatically the right answer. Removing a feature is often the cheapest and most robust mitigation, and &ldquo;avoid&rdquo; deserves a real hearing at concept stage.</p>

<h2>Worked example: remote door unlock</h2>
<p><strong>Item:</strong> telematics unit with remote lock/unlock via mobile app, connected to the body domain over the gateway.</p>
<ol class="steps">
<li><strong>Assets:</strong> unlock command (authenticity, freshness); vehicle credentials (confidentiality, integrity); owner account data (confidentiality); lock function (availability).</li>
<li><strong>Damage scenarios:</strong> DS-01 theft via unauthorised unlock (financial, major); DS-02 owner locked out during emergency (safety, moderate); DS-03 location data exposed (privacy, major).</li>
<li><strong>Threat scenarios:</strong> TS-01 replay of a captured unlock command (freshness); TS-02 credential theft from the mobile app or back end (confidentiality); TS-03 forged command from a compromised telematics unit (authenticity).</li>
<li><strong>Attack paths:</strong> AP-01 sniff the bus at a workshop, replay the frame (local, needs a tool); AP-02 phish the owner&rsquo;s account, call the unlock API (remote); AP-03 exploit the telematics unit&rsquo;s web service, inject a command (remote, needs a vulnerability).</li>
<li><strong>Feasibility:</strong> AP-01 medium (physical access, low-cost tool, public knowledge); AP-02 high (credential phishing, standard equipment); AP-03 low (needs a specific exploit and expertise).</li>
<li><strong>Risk:</strong> DS-01 severe-ish financial &rarr; impact major; maximum feasibility high &rarr; risk 4. DS-03 impact major, feasibility medium &rarr; 3.</li>
<li><strong>Treatment:</strong> reduce &mdash; freshness (nonce/counter) on unlock commands, per-vehicle credentials, back-end anomaly detection and rate limiting, MFA on the owner account, gateway filtering so unlock frames cannot originate from infotainment. Residual risk recorded as a claim (sophisticated relay or insider) and monitored.</li>
<li><strong>Goals:</strong> &ldquo;Unlock commands shall be accepted only if authentic, fresh and authorised for that vehicle&rdquo;; &ldquo;Owner credentials shall not be usable without a second authentication factor for high-impact actions.&rdquo;</li>
</ol>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Notice what the example demonstrates</div>
<p>The highest risk came from the <em>back end and the app</em>, not from the CAN bus. TARA on the vehicle alone would have missed it. If your analysis never produces a finding outside your own ECU, your item boundary is too small.</p></div></div>

<h2>Closing the loop</h2>
<p>Treatment decisions become goals (reduce), claims (share/retain) or scope changes (avoid). Every goal then needs requirements, verification and validation, and every retained risk needs monitoring under clause 8. A TARA that does not change a single design decision is a document, not an analysis.</p>
`
    }
  ],
  quiz: [
    {
      q: "What does a threat scenario consist of?",
      options: [
        "A damage scenario plus an impact rating",
        "An asset, a compromised cybersecurity property, and the cause of the compromise",
        "An attack path and its feasibility rating",
        "A vulnerability and its CVSS score"
      ],
      answer: 1,
      explain: "Asset + property + cause. Attack paths realise the scenario; damage scenarios are its consequences."
    },
    {
      q: "Attack feasibility is rated for:",
      options: ["Each damage scenario", "Each asset", "Each attack path", "Each component"],
      answer: 2,
      explain: "Feasibility applies to attack paths. A threat scenario inherits a value from its paths, commonly the maximum."
    },
    {
      q: "In attack-potential scoring, which factor captures whether the attacker needs physical access?",
      options: ["Expertise", "Window of opportunity", "Knowledge of the item", "Equipment"],
      answer: 1,
      explain: "Window of opportunity covers access and time available. Equipment covers tooling; knowledge covers information about the item."
    },
    {
      q: "Which risk treatment is often the most robust at concept stage?",
      options: [
        "Retain the risk",
        "Avoid it by removing the function or connection that creates it",
        "Share it with a supplier",
        "Reduce it with a detection control"
      ],
      answer: 1,
      explain: "Eliminating the risk source removes the attack surface permanently. Reduction is valuable but adds controls that must themselves be maintained."
    },
    {
      q: "Why should severe impact never be rated risk 1 even with very low feasibility?",
      options: [
        "Because the matrix requires 5",
        "Because feasibility can change as attacker capability and public knowledge evolve, while impact remains",
        "Because regulators require it",
        "Because low feasibility cannot be justified"
      ],
      answer: 1,
      explain: "Feasibility is a moving estimate; impact is not. Safety-relevant severe impact requires action regardless of current difficulty."
    }
  ]
});
