/* ISO/SAE 21434 study guide — modules 06-07 */
window.MODULES = window.MODULES || [];

window.MODULES.push({
  id: "m6",
  num: "06",
  title: "Clause 9 — Concept phase",
  blurb: "Item definition, the TARA, cybersecurity goals and claims, and the cybersecurity concept.",
  lessons: [
    {
      id: "m6l1",
      title: "Item definition: the boundary that decides everything",
      minutes: 12,
      body: `
<p class="lead">Every TARA argument is only as good as the item definition it starts from. This is the highest-leverage document in the whole lifecycle and the one most often done badly.</p>

<h2>What an item definition contains</h2>
<div class="table-wrap"><table>
<thead><tr><th>Element</th><th>What to capture</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Function and purpose</td><td>What the item does, for whom, in which operating modes</td><td>Defines which assets have value and which damage scenarios are credible</td></tr>
<tr><td>Boundary</td><td>What is inside and explicitly outside</td><td>Prevents gaps and double-counting between items</td></tr>
<tr><td>Components</td><td>ECUs, software, sensors, actuators, third-party parts</td><td>Where requirements will be allocated</td></tr>
<tr><td>Interfaces</td><td>Every external connection: buses, wireless, diagnostics, cloud, service tools</td><td>Each interface is an entry point for attack paths</td></tr>
<tr><td>Data flows</td><td>Signals, messages, files, keys, personal data, control commands, direction of travel</td><td>Assets are found on data flows, not only in boxes</td></tr>
<tr><td>Operating environment</td><td>Vehicle states, users, service and production phases</td><td>Physical access assumptions belong here</td></tr>
<tr><td>Assumptions</td><td>Trusted components, network isolation, supplier obligations</td><td>Every assumption is a risk someone else must validate</td></tr>
<tr><td>Preliminary architecture</td><td>Block diagram with trust boundaries</td><td>Makes segmentation and attack paths visible</td></tr>
</tbody></table></div>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">The test of a good boundary</div>
<p>If you cannot say which component terminates each interface, the boundary is not defined. If two items both claim the gateway, or neither does, you will find the gap during validation &mdash; at the worst possible time.</p></div></div>

<h2>Trust boundaries are the point</h2>
<p>Draw the item with its trust boundaries marked: internet/cloud &rarr; telematics &rarr; gateway &rarr; domain controllers &rarr; sensors and actuators. Every crossing is a place where data must be authenticated, filtered or mediated. Most real vehicle compromises are attacks across a boundary that was assumed to be safe because it was internal.</p>

<h2>Common mistakes</h2>
<ul>
<li><strong>Starting from the org chart.</strong> The item is defined by function and interfaces, not by which department owns the ECU.</li>
<li><strong>Forgetting service and production.</strong> OBD dongles, workshop testers and end-of-line equipment are interfaces with enormous privilege.</li>
<li><strong>Ignoring data.</strong> Personal data (location, contacts, voice, video) creates privacy damage scenarios that pure control-flow thinking misses.</li>
<li><strong>Hidden assumptions.</strong> &ldquo;The gateway filters that&rdquo; &mdash; recorded where? Verified by whom? An assumption without an owner is a vulnerability with a delay.</li>
<li><strong>No version.</strong> The item definition changes with the architecture. If it is not versioned and linked to the TARA version, traceability collapses.</li>
</ul>

<h2>Minimum viable item definition</h2>
<p>For a real project, produce: a one-page functional description; an architecture diagram with trust boundaries; an interface table (name, type, direction, protocol, peer, authentication, filtering); a data-flow list with classification; an assumption register with owners; and a version/change history. Everything downstream &mdash; threat scenarios, requirements, test cases &mdash; references these identifiers.</p>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Question: why does ISO 21434 put item definition before TARA?</div>
<p>&ldquo;Because risk is contextual. The same component carries completely different risk depending on what it connects to, what data it handles and who can reach it. The item definition fixes that context, including the boundary and assumptions, so that threat scenarios and feasibility ratings mean something and can be reviewed. Without it, a TARA becomes a generic list of threats with no defensible ratings.&rdquo;</p></div></div>
`
    },
    {
      id: "m6l2",
      title: "TARA in the concept phase",
      minutes: 13,
      body: `
<p class="lead">At concept stage the TARA is coarse and architectural. Its job is to rank risk and force decisions before the design hardens.</p>

<h2>The seven steps (method detail lives in module 10)</h2>
<ol class="steps">
<li><strong>Asset identification</strong> &mdash; what has value and which cybersecurity property matters for it.</li>
<li><strong>Threat scenario identification</strong> &mdash; asset + property + cause. Use STRIDE, attack libraries (e.g. EVITA, HEAVENS, MITRE ATT&amp;CK-style catalogues) or the UN R155 Annex 5 threat list as stimuli.</li>
<li><strong>Impact rating</strong> &mdash; damage scenarios rated for safety, financial, operational and privacy impact.</li>
<li><strong>Attack path analysis</strong> &mdash; sequences of steps that realise the threat scenario; attack trees work well.</li>
<li><strong>Attack feasibility rating</strong> &mdash; high/medium/low/very low, via attack potential, CVSS or attack-vector approach.</li>
<li><strong>Risk value determination</strong> &mdash; combine impact and feasibility, typically on a 5&times;5 matrix producing 1&ndash;5.</li>
<li><strong>Risk treatment decision</strong> &mdash; avoid, reduce, share or retain, with rationale.</li>
</ol>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">The method is modular, not a rigid pipeline</div>
<p>Clause 15 allows the steps in different orders &mdash; you can start from a catalogue of damage scenarios and work back to assets, or start from the asset inventory. What is not optional is the causal chain: every threat scenario must name an asset and property, and every asset must connect to a credible damage scenario.</p></div></div>

<h2>Concept-stage realities</h2>
<ul>
<li><strong>You will not know everything.</strong> Rate with the information available, record the uncertainty, and set a trigger to revisit at design and again at validation.</li>
<li><strong>Architecture dominates.</strong> At concept stage the cheapest risk reductions are structural: remove a connection, put a gateway in the path, separate safety and infotainment domains, avoid storing a secret where it need not be.</li>
<li><strong>Reuse the catalogue, not the conclusion.</strong> Threat catalogues speed you up; risk ratings must be re-derived for this context.</li>
<li><strong>Involve safety early.</strong> Use the HARA&rsquo;s hazardous events as damage-scenario candidates so security and safety analyses speak the same language.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Anti-pattern: the compliance TARA</div>
<p>A 600-row spreadsheet assembled after the design is frozen, with every risk value 3 and every treatment &ldquo;reduce&rdquo;, is not a risk analysis. Signs: no attack paths, no feasibility rationale, no rejected scenarios, no changed design decisions, and no one on the team can name the top three risks.</p></div></div>

<h2>What the concept TARA must output</h2>
<ul>
<li>A ranked risk list, with the top risks defensible in one sentence each.</li>
<li>Cybersecurity goals for every risk treated by reduction (or explicit claims for those shared/retained).</li>
<li>Assumptions and open questions with owners.</li>
<li>Inputs to the cybersecurity concept: which controls, in which architectural location.</li>
<li>Records of rejected threat scenarios and why &mdash; the reasoning is the value.</li>
</ul>

<h2>How long should it take?</h2>
<p>Long enough to change a decision, short enough to finish before the architecture is fixed. A pragmatic sequence is a two-day workshop to identify assets and threat scenarios, a week to build attack paths and ratings with the architects, then a review gate with safety, quality and the supplier interface in the room. Re-run on change, not annually as a ritual.</p>
`
    },
    {
      id: "m6l3",
      title: "Cybersecurity goals and claims",
      minutes: 12,
      body: `
<p class="lead">Goals are where risk becomes engineering. A bad goal produces unverifiable requirements for the rest of the programme.</p>

<h2>What a cybersecurity goal is</h2>
<p>A high-level, technology-independent objective that the item must satisfy, derived from a risk treatment decision. It states the protected asset and property, and the outcome required &mdash; not the mechanism.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Weak goal</th><th>Better goal</th></tr></thead>
<tbody>
<tr><td>Use encryption</td><td>The confidentiality of stored personal data shall be preserved against unauthorised read access to the storage medium</td></tr>
<tr><td>Secure the CAN bus</td><td>Safety-critical actuator commands shall not be accepted from unauthorised sources</td></tr>
<tr><td>Prevent hacking</td><td>Only authenticated and authorised update packages shall be accepted by the item</td></tr>
<tr><td>Implement secure boot</td><td>The integrity and authenticity of executable software shall be preserved from production through operation</td></tr>
</tbody></table></div>

<h2>Properties of a usable goal</h2>
<ul>
<li><strong>Traceable</strong> &mdash; linked to specific threat scenarios and damage scenarios.</li>
<li><strong>Technology-independent</strong> &mdash; says what must hold, not which library to use.</li>
<li><strong>Verifiable</strong> &mdash; you can imagine the test or analysis that demonstrates it.</li>
<li><strong>Scoped</strong> &mdash; names the asset, property and boundary condition.</li>
<li><strong>Stable</strong> &mdash; survives a design change; if it does not, it was a requirement in disguise.</li>
</ul>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">A goal is not a requirement</div>
<p>&ldquo;The telematics unit shall only accept firmware signed with an OEM key held in an HSM&rdquo; is a requirement: it names a mechanism. The goal is &ldquo;the integrity and authenticity of item software shall be preserved across updates&rdquo;. Goals let the architecture choose the mechanism; requirements pin it down.</p></div></div>

<h2>Cybersecurity claims</h2>
<p>A claim records a judgement: a risk is retained, shared, or out of scope, and here is why. Claims are what stop an assessor from finding an unaddressed risk with no explanation.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Claim type</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Retained risk</td><td>Relay attack on keyless entry is accepted because the residual risk after UWB ranging is judged low relative to cost; monitored under clause 8</td></tr>
<tr><td>Shared risk</td><td>Back-end infrastructure security is provided by the cloud provider under contract, with defined controls and audit rights</td></tr>
<tr><td>Out of scope</td><td>Attacks requiring destruction of the ECU are excluded because the vehicle cannot be operated afterwards; rationale recorded</td></tr>
<tr><td>Assumption-based</td><td>The item is assumed to be behind a filtering gateway; if that changes, this claim is invalid</td></tr>
</tbody></table></div>
<p>A claim needs: the risk it addresses, the rationale, the supporting evidence, the owner and approver, and the conditions under which it becomes invalid. Retained and shared risks must also be fed into clause 8 monitoring.</p>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">&ldquo;Accepted risk&rdquo; is not a magic word</div>
<p>You cannot claim away a risk that would injure someone. Safety-relevant risk needs a control or an explicit, documented safety argument &mdash; and regulators will look for it. Claims are for judgement calls, not for avoiding work on the top of your risk list.</p></div></div>

<h2>Checklist before leaving this lesson</h2>
<ul>
<li>Can I state three goals for a telematics item from memory?</li>
<li>Can I explain the difference between a goal, a claim and a requirement in one sentence each?</li>
<li>Can I say who approves a retained risk and where it is recorded?</li>
</ul>
`
    },
    {
      id: "m6l4",
      title: "The cybersecurity concept",
      minutes: 11,
      body: `
<p class="lead">The concept is the bridge between &ldquo;what must be true&rdquo; (goals) and &ldquo;how this architecture makes it true&rdquo; (requirements and design).</p>

<h2>What the concept contains</h2>
<ul>
<li><strong>Goals and claims</strong> for the item, with their trace to threat scenarios.</li>
<li><strong>Cybersecurity requirements allocated at concept level</strong> &mdash; still fairly abstract but assigned to architectural elements or processes.</li>
<li><strong>Control strategy per goal</strong> &mdash; prevention, detection, response, or a combination, and where in the architecture it sits.</li>
<li><strong>Defence in depth</strong> &mdash; the layered argument: what happens when the first control fails?</li>
<li><strong>Dependencies and assumptions</strong> &mdash; supplier obligations, production provisioning, operational processes.</li>
<li><strong>Verification strategy outline</strong> &mdash; how each goal will be shown to be met.</li>
</ul>

<h2>Think in layers</h2>
<div class="table-wrap"><table>
<thead><tr><th>Layer</th><th>Typical controls</th><th>Failure it buys time against</th></tr></thead>
<tbody>
<tr><td>External interface</td><td>Authentication, rate limiting, input validation, firewalling, TLS with pinned trust</td><td>Remote exploitation, scanning, malformed input</td></tr>
<tr><td>Domain boundary</td><td>Gateway filtering, domain separation, message authentication, allow-lists</td><td>Lateral movement from infotainment to chassis</td></tr>
<tr><td>ECU platform</td><td>Secure boot, HSM, debug lock, memory protection, signed software</td><td>Firmware substitution, key extraction, code injection</td></tr>
<tr><td>Application</td><td>Least privilege, authorisation checks, safe defaults, logging</td><td>Privilege escalation, misconfiguration</td></tr>
<tr><td>Back end</td><td>Identity, per-vehicle credentials, API authorisation, audit logs</td><td>Fleet-scale takeover through a weak API</td></tr>
<tr><td>Process</td><td>Secure development, key management, production controls, monitoring</td><td>Insider, supply chain, leaked secrets</td></tr>
</tbody></table></div>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Defence in depth, stated properly</div>
<p>It is not &ldquo;many controls&rdquo;. It is the argument that <em>if control A fails, control B still prevents the damage scenario, and if B fails, control C detects and contains it</em>. Each layer should name the damage scenario it protects and the assumption it depends on.</p></div></div>

<h2>Design principles that consistently pay off</h2>
<ul>
<li><strong>Minimise attack surface</strong> &mdash; disable unused services, ports and debug interfaces before production.</li>
<li><strong>Separate domains by criticality</strong> &mdash; nothing from infotainment should be able to command brakes; enforce it, do not assume it.</li>
<li><strong>Least privilege</strong> &mdash; every process, diagnostic session and service account gets the minimum rights.</li>
<li><strong>Secure by default</strong> &mdash; unique per-vehicle keys, no default passwords, locked debug, fail secure.</li>
<li><strong>Fail safe, not fail open</strong> &mdash; define behaviour when authentication or a security service is unavailable.</li>
<li><strong>Trust nothing outside the boundary</strong> &mdash; including the &ldquo;internal&rdquo; network and the workshop tool.</li>
<li><strong>Detect and log</strong> &mdash; you will need evidence after an incident, and clause 13 needs it.</li>
</ul>

<h2>Concept review questions</h2>
<ol class="steps">
<li>For each top risk, which control prevents it, and which control detects it if prevention fails?</li>
<li>Which controls depend on a supplier or on production provisioning, and is that obligation agreed?</li>
<li>What happens to each control when the vehicle is in service mode, transport mode or failsafe mode?</li>
<li>Which goal is verified only by analysis and not by test &mdash; and is that acceptable?</li>
<li>If the gateway is compromised, what still protects the brakes?</li>
</ol>
`
    }
  ],
  quiz: [
    {
      q: "What is the most important property of an item definition?",
      options: [
        "It lists every component part number",
        "It fixes a boundary, interfaces, data flows and assumptions that make risk ratings meaningful",
        "It is approved by the supplier",
        "It includes the full TARA"
      ],
      answer: 1,
      explain: "Risk is contextual. The item definition establishes the context, boundary and assumptions that threat scenarios and feasibility ratings depend on."
    },
    {
      q: "Which sequence matches the TARA method structure in clause 15?",
      options: [
        "Impact, asset, feasibility, threat, risk, treatment",
        "Asset identification, threat scenarios, impact, attack paths, feasibility, risk value, treatment decision",
        "HARA, ASIL, safety goal, verification",
        "Threat, vulnerability, exploit, patch"
      ],
      answer: 1,
      explain: "The steps are modular in order but this is the canonical chain: assets and damage scenarios, threat scenarios, impact, attack paths, feasibility, risk value, treatment."
    },
    {
      q: "Which is a cybersecurity goal rather than a requirement?",
      options: [
        "The ECU shall use AES-128-GCM for bus authentication",
        "Safety-critical actuator commands shall not be accepted from unauthorised sources",
        "The gateway shall drop CAN frames with an invalid MAC within 1 ms",
        "The HSM shall store the private key in slot 3"
      ],
      answer: 1,
      explain: "A goal states the outcome and property, independent of mechanism. The others name specific technical mechanisms."
    },
    {
      q: "What must accompany a retained cybersecurity risk?",
      options: [
        "Nothing, if the team agrees verbally",
        "A recorded claim with rationale, evidence, owner, approver and monitoring under clause 8",
        "Only a mention in the release notes",
        "A reduction of the CAL level"
      ],
      answer: 1,
      explain: "Retained and shared risks are recorded as claims with rationale and approval, and remain under continual monitoring."
    },
    {
      q: "Which statement best describes defence in depth as used in the concept?",
      options: [
        "Deploying as many security products as possible",
        "An argument that if one control fails, another still prevents, detects or contains the damage scenario",
        "Encrypting everything twice",
        "Relying on the gateway for all security"
      ],
      answer: 1,
      explain: "Depth is a layered argument tied to specific damage scenarios and assumptions, not a count of controls."
    }
  ]
});

window.MODULES.push({
  id: "m7",
  num: "07",
  title: "Clause 10 — Product development",
  blurb: "Requirements, architecture, implementation, integration, verification and weakness management.",
  lessons: [
    {
      id: "m7l1",
      title: "Cybersecurity requirements specification",
      minutes: 12,
      body: `
<p class="lead">This is where most programmes quietly fail: goals that cannot be verified become requirements that nobody can test.</p>

<h2>From goal to requirement</h2>
<p>A requirement refines a goal into something allocated, specific and verifiable. The chain must be traceable both ways: goal &rarr; requirement &rarr; architecture element &rarr; test case &rarr; result.</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Goal</th><th>Refined requirement</th><th>Verification</th></tr></thead>
<tbody>
<tr><td>Safety-critical actuator commands shall not be accepted from unauthorised sources</td><td>The chassis domain controller shall accept torque requests only from the ADAS controller, authenticated with a per-vehicle key, and shall enter a safe state on authentication failure</td><td>Penetration test injecting forged frames; fault-injection of authentication failure; key provisioning audit</td></tr>
<tr><td>Confidentiality of stored personal data shall be preserved</td><td>The infotainment unit shall encrypt user data at rest with a per-device key stored in the HSM, and shall erase it on factory reset</td><td>Storage dump analysis; factory-reset test; key-accessible-only-in-HSM review</td></tr>
</tbody></table></div>

<h2>Characteristics of a good cybersecurity requirement</h2>
<ul>
<li><strong>Unambiguous</strong> &mdash; one interpretation, defined terms.</li>
<li><strong>Verifiable</strong> &mdash; a named method can demonstrate it (test, analysis, inspection, demonstration).</li>
<li><strong>Allocated</strong> &mdash; assigned to a component, interface or process with an owner.</li>
<li><strong>Bounded</strong> &mdash; states behaviour on failure, not just on success.</li>
<li><strong>Traceable</strong> &mdash; parent goal or claim, and children in design and test.</li>
<li><strong>Feasible</strong> &mdash; respects timing, memory, power and cost constraints of the ECU.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Unverifiable requirement smells</div>
<p>&ldquo;The system shall be secure.&rdquo; &ldquo;The software shall follow best practices.&rdquo; &ldquo;Strong cryptography shall be used.&rdquo; &ldquo;The attacker shall not be able to...&rdquo; Each of these cannot be closed out. Rewrite with a mechanism, a boundary and a pass criterion.</p></div></div>

<h2>Where requirements come from</h2>
<ol class="steps">
<li><strong>Goals</strong> from the TARA &mdash; the primary source.</li>
<li><strong>Claims</strong> &mdash; a retained risk may still need a monitoring or detection requirement.</li>
<li><strong>Assumptions</strong> &mdash; if the design depends on &ldquo;the gateway filters&rdquo;, that becomes a requirement on the gateway.</li>
<li><strong>Reuse and OTS constraints</strong> &mdash; configuration hardening, disabling debug, update obligations.</li>
<li><strong>Regulatory and customer requirements</strong> &mdash; R155 Annex 5 mitigations, OEM specifications, ISO 24089 update requirements.</li>
<li><strong>Vulnerability findings</strong> &mdash; from clause 8, feeding back as new or changed requirements.</li>
</ol>

<h2>Requirement quality gate</h2>
<p>Before design starts, sample ten requirements and ask: can a tester who has never met the author write a pass/fail test from this sentence alone? If not, the specification is not ready, and the verification phase will produce arguments instead of evidence.</p>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Question: how do you keep security requirements from being ignored under schedule pressure?</div>
<p>&ldquo;Three mechanisms. First, traceability &mdash; every goal has requirements and every requirement has a test, so a dropped requirement is visible in the coverage report, not discovered at assessment. Second, release gating &mdash; the cybersecurity case must show no unverified requirements. Third, ownership &mdash; each requirement has a named engineer, and deviations need written approval with a recorded risk.&rdquo;</p></div></div>
`
    },
    {
      id: "m7l2",
      title: "Architectural design and security principles",
      minutes: 13,
      body: `
<p class="lead">Architecture is where cybersecurity is cheap. Once hardware and networks are fixed, most controls become expensive workarounds.</p>

<h2>What clause 10 asks of the architecture</h2>
<p>The design must satisfy the cybersecurity requirements, and it must document the reasoning: which architectural element implements which requirement, which interfaces carry which trust assumptions, and how the design avoids single points of security failure. The standard does not mandate a specific architecture; it demands a defensible one.</p>

<h2>Structural decisions with the biggest payoff</h2>
<div class="table-wrap"><table>
<thead><tr><th>Decision</th><th>Effect</th><th>Cost of getting it wrong later</th></tr></thead>
<tbody>
<tr><td>Domain separation / zoning</td><td>A compromised infotainment domain cannot command safety actuators</td><td>Very high &mdash; gateway hardware may need redesign</td></tr>
<tr><td>Filtering gateway with allow-lists</td><td>Removes most lateral movement paths</td><td>High &mdash; requires message catalogue and validation</td></tr>
<tr><td>HSM / secure element per safety-relevant ECU</td><td>Key isolation, secure boot, hardware-backed attestation</td><td>Very high &mdash; silicon change</td></tr>
<tr><td>Centralised key management and provisioning</td><td>Unique per-vehicle credentials, revocable</td><td>Very high &mdash; production line change</td></tr>
<tr><td>Removal of unnecessary connectivity and debug</td><td>Shrinks attack surface permanently</td><td>Low if done at concept, high later</td></tr>
<tr><td>Authenticated in-vehicle communication</td><td>Raises the bar for frame injection</td><td>Medium &mdash; bandwidth and timing budget</td></tr>
</tbody></table></div>

<h2>Patterns worth knowing</h2>
<ul>
<li><strong>Trust zones and conduits</strong> &mdash; group components by criticality and control the conduits between zones.</li>
<li><strong>Secure boot chain</strong> &mdash; root of trust in immutable hardware, each stage verifies the next, and failure is handled deliberately (recovery mode, not silent continue).</li>
<li><strong>Least privilege and capability-based access</strong> &mdash; a diagnostic routine should not inherit full bus access.</li>
<li><strong>Defence in depth</strong> &mdash; prevention, detection, containment, recovery, each with an owner.</li>
<li><strong>Separation of duties in key management</strong> &mdash; no single engineer can extract or inject a production key.</li>
<li><strong>Fail-secure state machines</strong> &mdash; explicitly define behaviour on authentication failure, key unavailability and tamper detection.</li>
</ul>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">The automotive constraint</div>
<p>Security controls compete with real-time deadlines, limited flash and RAM, boot-time budgets, power consumption and cost per unit. A control that misses a 10 ms control loop deadline is not a control. Automotive security architecture is therefore as much about <em>where you can afford</em> a control as about what is theoretically strongest.</p></div></div>

<h2>Documenting the architecture argument</h2>
<p>For each requirement, record: implementing element, mechanism, the trust assumption it relies on, and the fallback if it fails. A simple traceability matrix plus an annotated block diagram with trust boundaries is enough &mdash; but it must exist, be versioned, and be reviewed by someone who did not design it.</p>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Review question that finds real problems</div>
<p>&ldquo;Assume the most exposed component is fully compromised. What can the attacker do next, and which control stops them?&rdquo; If the answer is &ldquo;everything&rdquo;, the architecture has a single point of security failure regardless of how many controls are listed on paper.</p></div></div>
`
    },
    {
      id: "m7l3",
      title: "Implementation, integration and weakness management",
      minutes: 12,
      body: `
<p class="lead">Designs do not get hacked; implementations do. Clause 10 requires that implementation follow the design, that integration be verified, and that weaknesses found along the way be recorded and handled.</p>

<h2>Implementation expectations</h2>
<ul>
<li><strong>Follow the design</strong> &mdash; deviations are documented and assessed, not silently absorbed.</li>
<li><strong>Secure coding practice</strong> &mdash; defined standards, static analysis, peer review, no secrets in source or build artefacts.</li>
<li><strong>Configuration control</strong> &mdash; production configuration (debug disabled, services off, keys provisioned) is defined and enforced by build, not by manual steps.</li>
<li><strong>Dependency management</strong> &mdash; pinned, tracked versions and an SBOM produced automatically per build.</li>
<li><strong>Compiler and toolchain integrity</strong> &mdash; reproducible builds where feasible, controlled toolchain versions.</li>
<li><strong>Third-party code</strong> &mdash; assessed, licence-checked, and monitored for vulnerabilities (clause 8).</li>
</ul>

<h2>Integration and integration verification</h2>
<p>Integration is where assumptions meet reality: the ECU that was secure alone now shares a bus with a compromised head unit. Integration verification checks that:</p>
<ul>
<li>Interfaces behave as specified under malformed, replayed and out-of-order input.</li>
<li>Authentication and filtering actually operate in the integrated configuration (not just in unit tests with mocks).</li>
<li>Security-relevant configuration survived flashing and provisioning.</li>
<li>Failure modes are as designed &mdash; authentication failure, key missing, tamper detected.</li>
<li>Timing and resource budgets still hold with security enabled.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The classic integration defect</div>
<p>Secure boot enabled in the development build, disabled in the production configuration &ldquo;to speed up the line&rdquo;. Or debug access locked in the ECU but left open on the gateway. Integration verification exists to catch configuration drift between what was designed and what ships.</p></div></div>

<h2>Cybersecurity weaknesses</h2>
<p>Weaknesses are discovered continuously: reviews, static analysis, fuzzing, integration tests, penetration tests, field reports. The standard expects them to be <strong>recorded and managed</strong>, not just fixed quietly. A usable weakness record contains:</p>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Field</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Identifier, title, description</td><td>Traceability and reporting</td></tr>
<tr><td>Affected item, component, version</td><td>Scope of impact; supports clause 14 end-of-support and field actions</td></tr>
<tr><td>Discovery source and date</td><td>Trend analysis: which activity finds which class of defect</td></tr>
<tr><td>Severity and risk assessment</td><td>Prioritisation; reuse of TARA scales keeps it comparable</td></tr>
<tr><td>Treatment decision and owner</td><td>Accountability</td></tr>
<tr><td>Verification of the fix</td><td>Closure evidence</td></tr>
<tr><td>Link to requirements / TARA update</td><td>Feedback into the analysis; prevents repeat classes</td></tr>
</tbody></table></div>

<h2>Verification of cybersecurity requirements</h2>
<p>Each requirement needs a method and a result. Typical mix:</p>
<ul>
<li><strong>Inspection / review</strong> &mdash; configuration, key handling, design conformance.</li>
<li><strong>Analysis</strong> &mdash; attack-tree closure, protocol analysis, timing analysis of security functions.</li>
<li><strong>Test</strong> &mdash; functional security tests, negative tests, fuzzing, fault injection.</li>
<li><strong>Demonstration</strong> &mdash; operational behaviour, e.g. safe state on authentication failure.</li>
</ul>
<p>Coverage must be visible: requirement &rarr; method &rarr; result &rarr; evidence reference. Requirements verified only by argument should be flagged, because validation (clause 11) is where the argument gets tested.</p>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Question: verification vs validation</div>
<p>&ldquo;Verification asks whether we built the requirement correctly &mdash; did the control do what the specification says? Validation asks whether we built the right thing &mdash; with the vehicle in its real context, can an attacker still achieve the damage scenario? A requirement can pass verification and still fail validation, which is exactly why clause 11 exists.&rdquo;</p></div></div>
`
    },
    {
      id: "m7l4",
      title: "Working with suppliers during development",
      minutes: 10,
      body: `
<p class="lead">Clause 10 obligations rarely sit in one company. This lesson is the practical glue between clause 7 and the development phase.</p>

<h2>What you need from a supplier during development</h2>
<ul>
<li>Their component-level TARA, or a defensible extract covering the interfaces you expose.</li>
<li>Requirements derived from your goals, with traceability to your identifiers.</li>
<li>Verification results mapped to those requirements, not a generic test report.</li>
<li>Configuration and hardening guide &mdash; what must be disabled, provisioned or locked in production.</li>
<li>Assumption list, with the conditions under which their analysis holds.</li>
<li>SBOM and vulnerability contact for the support period.</li>
</ul>

<h2>What you owe them</h2>
<ul>
<li>Item context: interfaces, data flows, trust boundaries, operating modes.</li>
<li>The allocated goals and requirements, unambiguous and stable.</li>
<li>Decisions on open issues within an agreed time, recorded.</li>
<li>Notification of changes that invalidate their assumptions.</li>
<li>Clarity on who validates at vehicle level and who responds to field incidents.</li>
</ul>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">The integration review that saves a programme</div>
<p>Sit with the supplier and walk one attack path end to end across the boundary. Who authenticates what, where, with which key, provisioned by whom, revocable by whom? Most distributed-security failures are discovered in exactly this conversation &mdash; usually too late. Have it at design freeze.</p></div></div>

<h2>Reused and OTS components in development</h2>
<p>For reused software, the delta is the work: changed interfaces, changed configuration, changed threat information, changed platform. Record the delta analysis and the evidence that old verification results still apply to the new build and configuration. For OTS components, the deliverable is a hardening and integration specification plus a monitoring commitment, since you cannot change the internals.</p>

<h2>Documentation you should be able to produce on demand</h2>
<ol class="steps">
<li>A traceability matrix from customer goals to supplier requirements to verification results.</li>
<li>A list of assumptions with owners and validation status.</li>
<li>A configuration item list showing exactly which software versions were assessed.</li>
<li>A weakness register covering the integrated item, not just your own code.</li>
</ol>
`
    }
  ],
  quiz: [
    {
      q: "Which is the strongest sign that a cybersecurity requirement is well written?",
      options: [
        "It references a specific cryptographic library",
        "A tester who did not write it can derive a pass/fail test from the sentence alone",
        "It is approved by the supplier",
        "It contains the word 'secure'"
      ],
      answer: 1,
      explain: "Verifiability is the practical test: unambiguous, allocated, with defined behaviour and a pass criterion."
    },
    {
      q: "What does verification of a cybersecurity requirement establish?",
      options: [
        "That the vehicle is secure against all attackers",
        "That the implemented control meets its specified requirement",
        "That the threat analysis was complete",
        "That the supplier is capable"
      ],
      answer: 1,
      explain: "Verification is conformance to specification. Whether the specified control actually prevents the damage scenario in the real vehicle is validation (clause 11)."
    },
    {
      q: "Why is domain separation such a high-value architectural decision?",
      options: [
        "It reduces the bill of materials",
        "It prevents a compromise in an exposed domain from directly commanding safety-critical actuators",
        "It removes the need for a TARA",
        "It eliminates the need for authentication"
      ],
      answer: 1,
      explain: "It breaks lateral movement paths, which is exactly the Jeep-style failure. It also becomes very expensive to retrofit."
    },
    {
      q: "What must a cybersecurity weakness record include?",
      options: [
        "Only a description and a fix commit",
        "Identifier, affected versions, discovery source, severity, treatment, owner and closure evidence",
        "The name of the person who introduced the defect",
        "A CVSS score and nothing else"
      ],
      answer: 1,
      explain: "Weakness management requires traceable records that support prioritisation, disclosure, field action and feedback into the TARA."
    },
    {
      q: "At design freeze, which supplier conversation is most valuable?",
      options: [
        "Negotiating the price of the ECU",
        "Walking one attack path end to end across the organisational boundary to confirm who authenticates what",
        "Reviewing the supplier's marketing material",
        "Confirming the delivery date"
      ],
      answer: 1,
      explain: "Cross-boundary attack path walkthroughs expose gaps in key ownership, provisioning and filtering before they are expensive."
    }
  ]
});
