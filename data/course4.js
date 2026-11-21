/* ISO/SAE 21434 study guide — modules 08-09 */
window.MODULES = window.MODULES || [];

window.MODULES.push({
  id: "m8",
  num: "08",
  title: "Clauses 11–12 — Validation & production",
  blurb: "Proving goals hold in the vehicle, and keeping security intact on the production line.",
  lessons: [
    {
      id: "m8l1",
      title: "Cybersecurity validation",
      minutes: 13,
      body: `
<p class="lead">Clause 11 answers the only question a customer or regulator really cares about: in the actual vehicle, can the cybersecurity goals still be violated?</p>

<h2>Validation vs verification, again</h2>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Verification (clause 10)</th><th>Validation (clause 11)</th></tr></thead>
<tbody>
<tr><td>Question</td><td>Does the implementation meet the requirement?</td><td>Are the goals achieved in the vehicle context?</td></tr>
<tr><td>Object</td><td>Component, interface, function</td><td>Item integrated in the vehicle, with real interfaces and users</td></tr>
<tr><td>Typical methods</td><td>Test, analysis, inspection</td><td>Vehicle-level testing, penetration testing, attack-path replay, field-representative configurations</td></tr>
<tr><td>Who</td><td>Development and test teams</td><td>Independent testers where possible; OEM plus supplier</td></tr>
<tr><td>Output</td><td>Requirement coverage evidence</td><td>Validation report against goals, residual risk view</td></tr>
</tbody></table></div>

<h2>What validation must cover</h2>
<ol class="steps">
<li><strong>Each cybersecurity goal</strong> &mdash; a planned activity demonstrating it holds, or a documented reason why testing is not feasible plus alternative evidence.</li>
<li><strong>Attack paths</strong> &mdash; replay the highest-feasibility paths from the TARA on the real vehicle. If a path still works, the risk was not treated.</li>
<li><strong>Interfaces and entry points</strong> &mdash; every external interface reachable in operation, service and transport modes.</li>
<li><strong>Configuration as shipped</strong> &mdash; validation on a production-representative vehicle, not a development mule with debug enabled.</li>
<li><strong>Failure behaviour</strong> &mdash; what happens when authentication fails, keys are missing, or a security service is unavailable.</li>
<li><strong>Privacy and data handling</strong> &mdash; retention, erasure, telemetry content, factory reset.</li>
</ol>

<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">Penetration testing done properly</div>
<p>Scope derived from the TARA and item definition, not a generic checklist. Time-boxed, with defined entry points and rules of engagement. Performed by testers independent of the design team, with access to architecture documentation but a mandate to find what the documentation missed. Findings triaged into the weakness register, with re-test after fixes. A report saying &ldquo;no critical findings&rdquo; without scope, method and coverage is not evidence.</p></div></div>

<h2>Planning validation</h2>
<p>The plan should state, for each goal: method, environment (bench, HIL, vehicle, fleet), sample configuration, pass criteria, responsible party, and the point in the programme. This plan is normally written during concept &mdash; validation retrofitted at the end cannot influence design, which is where its value lies.</p>

<h2>Handling findings</h2>
<ul>
<li><strong>Confirmed exploitable</strong> &mdash; treat as a weakness: fix, mitigate or formally accept with recorded risk; re-test.</li>
<li><strong>Design-level issue</strong> &mdash; may require revisiting the TARA, the goals and the concept, not just a patch.</li>
<li><strong>Documentation/assumption gap</strong> &mdash; update the item definition and assumptions; notify suppliers whose obligations change.</li>
<li><strong>Out of scope but real</strong> &mdash; record as a known limitation and feed into monitoring and future programmes.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">Validation theatre</div>
<p>Testing only the paths you already mitigated, on a bench, with a cooperative configuration, proves nothing. The value comes from a tester trying to break the goals with the same freedom an attacker would have &mdash; within agreed safety rules.</p></div></div>

<h2>Interview-ready summary</h2>
<p>&ldquo;Validation closes the loop on the TARA. I would plan it against the goals and the highest-feasibility attack paths, run it on production-representative vehicles with independent testers, and treat every confirmed path as either a fix or an explicitly accepted risk. Findings feed back into the TARA, because a validated attack path is new information about feasibility.&rdquo;</p>
`
    },
    {
      id: "m8l2",
      title: "Production: keeping security through the line",
      minutes: 11,
      body: `
<p class="lead">A perfectly engineered item becomes insecure the moment unique keys are copied from a spreadsheet on the production line.</p>

<h2>What clause 12 requires</h2>
<p>A <strong>production control plan</strong> that ensures the post-development cybersecurity requirements are actually applied in production, in the right sequence, with evidence. It covers manufacturing, assembly and end-of-line testing, including the handling of security-relevant data and equipment.</p>

<h2>What the plan must cover</h2>
<div class="table-wrap"><table>
<thead><tr><th>Area</th><th>Concerns to control</th></tr></thead>
<tbody>
<tr><td>Key and credential provisioning</td><td>Unique per vehicle, generated in a secure environment, injected over a controlled channel, never logged or stored in plain text, revocable</td></tr>
<tr><td>Software and configuration</td><td>Correct signed image, production configuration applied, debug locked, test certificates removed</td></tr>
<tr><td>End-of-line testing</td><td>Security functions verified (secure boot active, debug disabled, keys present), results recorded against the VIN</td></tr>
<tr><td>Tooling</td><td>Production tools authenticated, access-controlled, version-controlled, audited; no shared engineer credentials</td></tr>
<tr><td>Data protection</td><td>Key material and personal data protected in transit and at rest; retention limits defined</td></tr>
<tr><td>Rework and service</td><td>Procedure for replacing ECUs without cloning keys; re-provisioning is logged and authorised</td></tr>
<tr><td>Supplier production</td><td>Same obligations flowed down and evidenced, including for OTS modules</td></tr>
</tbody></table></div>

<div class="callout bad"><div class="ci">✕</div><div class="cb"><div class="ct">Real-world production failures</div>
<p>A single symmetric key shared across a vehicle fleet, extractable from one car and reusable on all of them. Debug interfaces left enabled on early builds and never disabled. Test certificates shipped to customers. Key-injection laptops with local copies of the key database. Each is a clause 12 failure with clause 13 consequences.</p></div></div>

<h2>Evidence that survives audit</h2>
<ul>
<li>Production control plan, versioned and approved.</li>
<li>Records showing each vehicle received the correct configuration and keys, tied to VIN.</li>
<li>End-of-line test results for security functions, with pass criteria.</li>
<li>Access logs for key management and provisioning systems.</li>
<li>Deviation and rework records with authorisation.</li>
<li>Supplier production evidence where applicable.</li>
</ul>

<h2>Where production meets operations</h2>
<p>Provisioning creates the identity the vehicle will use for the rest of its life: update authentication, back-end connection, diagnostics authorisation. Get the key lifecycle right at production and clause 13 becomes tractable; get it wrong and every later security control inherits the weakness. Design the revocation path before the first vehicle ships &mdash; you cannot recall a leaked key by wishful thinking.</p>
`
    }
  ],
  quiz: [
    {
      q: "What distinguishes validation from verification in ISO 21434?",
      options: [
        "Validation is performed by the supplier; verification by the OEM",
        "Validation demonstrates that cybersecurity goals are achieved in the vehicle context; verification demonstrates conformance to requirements",
        "Validation uses analysis; verification uses testing",
        "They are the same activity at different milestones"
      ],
      answer: 1,
      explain: "Verification is conformance to specification. Validation tests whether the goals hold against a real attacker in the real vehicle."
    },
    {
      q: "Which is the best basis for scoping penetration testing?",
      options: [
        "A generic OWASP checklist",
        "The item definition, goals and highest-feasibility attack paths from the TARA",
        "The list of known CVEs in the news",
        "The supplier's test report"
      ],
      answer: 1,
      explain: "Scope must follow your own risk analysis and interfaces, otherwise coverage is arbitrary and defence in depth is untested."
    },
    {
      q: "What is the core requirement of clause 12?",
      options: [
        "Production must be outsourced",
        "A production control plan ensures post-development cybersecurity requirements are applied and evidenced",
        "Every vehicle must be penetration tested",
        "Keys must be identical across a production batch for simplicity"
      ],
      answer: 1,
      explain: "The production control plan sequences and evidences the security-relevant steps: provisioning, configuration, end-of-line verification, tool and data protection."
    },
    {
      q: "Why is per-vehicle key uniqueness important?",
      options: [
        "It reduces key storage cost",
        "A key extracted from one vehicle must not compromise the fleet, and it enables revocation",
        "It is required by ISO 26262",
        "It makes diagnostics faster"
      ],
      answer: 1,
      explain: "Shared or fleet-wide keys turn a single compromise into a fleet compromise, and there is no way to revoke one vehicle without breaking all."
    },
    {
      q: "A validation test confirms an attack path from the TARA is still exploitable. What is the correct response?",
      options: [
        "Remove the path from the TARA",
        "Treat it as a weakness: fix, mitigate or formally accept with recorded risk, then re-test and update the analysis",
        "Downgrade the attack feasibility rating",
        "Defer to the next vehicle programme"
      ],
      answer: 1,
      explain: "A validated attack path is evidence the risk treatment failed. The record, decision, and re-test are what close it."
    }
  ]
});

window.MODULES.push({
  id: "m9",
  num: "09",
  title: "Clauses 13–14 — Operations & decommissioning",
  blurb: "Incident response, software updates, end of support and safe retirement.",
  lessons: [
    {
      id: "m9l1",
      title: "Cybersecurity incident response",
      minutes: 13,
      body: `
<p class="lead">Clause 13 is where cybersecurity stops being a document and becomes an operational capability with a clock running.</p>

<h2>What the standard requires</h2>
<p>The organisation must be able to detect and respond to cybersecurity incidents affecting its items, with a defined process, defined responsibilities and a response plan for each incident. This is the vehicle-side counterpart of a PSIRT, and the evidence an R155 CSMS assessor will probe hardest.</p>

<h2>The incident response lifecycle</h2>
<ol class="steps">
<li><strong>Preparation</strong> &mdash; process, roles, contacts (internal, suppliers, customers, authorities), tooling, pre-agreed communication templates and disclosure rules.</li>
<li><strong>Detection and reporting</strong> &mdash; channels for field reports, dealer networks, monitoring alerts, researcher disclosure and customer notification. Include how a vehicle or fleet telemetry can reveal an attack.</li>
<li><strong>Triage and classification</strong> &mdash; is it a real incident? Which vehicles, variants, markets and software versions are affected? Safety-relevant? Assign severity and an incident lead.</li>
<li><strong>Containment</strong> &mdash; short-term actions to limit harm: disable a service, revoke credentials, block a back-end endpoint, push an emergency configuration, instruct owners.</li>
<li><strong>Analysis</strong> &mdash; root cause, attack path, affected population, whether the TARA was wrong (feasibility underestimated, asset missed).</li>
<li><strong>Remediation</strong> &mdash; fix developed, verified and released through the update process; field action if required.</li>
<li><strong>Recovery</strong> &mdash; restore normal operation, confirm the attack no longer succeeds, monitor for recurrence.</li>
<li><strong>Lessons learned</strong> &mdash; update TARA, threat catalogues, requirements, test cases, monitoring rules and supplier obligations. Record it.</li>
</ol>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">An incident response plan per incident</div>
<p>The standard expects a specific plan for each incident, not just a generic procedure. Practically: incident record, scope, severity, lead, containment actions with times, communication plan, remediation plan, and closure criteria. The generic procedure tells you <em>how</em>; the per-incident plan records <em>what you are doing about this one</em>.</p></div></div>

<h2>Detection is the hard part</h2>
<p>Most organisations can write a response process; far fewer can detect an attack on a moving vehicle. Realistic detection sources:</p>
<ul>
<li>Vehicle telemetry and anomaly signals &mdash; unusual diagnostic sessions, repeated authentication failures, unexpected reboots, abnormal bus traffic patterns.</li>
<li>Back-end monitoring &mdash; credential misuse, impossible travel, mass API enumeration, abnormal update requests.</li>
<li>Dealer and workshop reports &mdash; technician notices, warranty patterns, vehicles with unexpected configurations.</li>
<li>External reports &mdash; researchers, bug bounty, CERT advisories, customer reports, media.</li>
</ul>

<div class="callout warn"><div class="ci">!</div><div class="cb"><div class="ct">The uncomfortable truth about updates</div>
<p>An incident is only as fixable as your update capability. If a fix requires a workshop visit, containment and notification strategy must assume months, not days. This is why clause 13 and UN R156/ISO 24089 cannot be designed independently.</p></div></div>

<h2>Who owns what across the supply chain</h2>
<div class="table-wrap"><table class="compact">
<thead><tr><th>Activity</th><th>Typical owner</th></tr></thead>
<tbody>
<tr><td>Fleet-level detection and triage</td><td>OEM PSIRT</td></tr>
<tr><td>Component root cause analysis</td><td>Supplier</td></tr>
<tr><td>Regulatory notification</td><td>OEM (manufacturer of record)</td></tr>
<tr><td>Customer/owner communication</td><td>OEM, with supplier input</td></tr>
<tr><td>Patch development</td><td>Whoever owns the affected software</td></tr>
<tr><td>Disclosure coordination</td><td>OEM PSIRT, with the reporter and suppliers</td></tr>
</tbody></table></div>

<h2>Interview scenario: &ldquo;A researcher claims remote unlock on your vehicle&rdquo;</h2>
<p>Model answer, in order: acknowledge and establish a private channel; open an incident with a lead and severity; ask for reproduction details under agreed terms; assess affected software versions and fleet exposure; check telemetry for signs of exploitation; decide immediate containment (e.g. back-end rate limiting, revoke a token type, temporary feature disable) with safety and legal; validate the finding in-house; develop and verify the fix; coordinate disclosure timing with the researcher; notify customers and authorities within obligations; update the TARA and monitoring; publish a coordinated advisory.</p>
`
    },
    {
      id: "m9l2",
      title: "Software updates as a security control",
      minutes: 11,
      body: `
<p class="lead">Clause 13.4 treats updates as part of operations and maintenance. In practice, update capability is the difference between a vulnerability and a recall.</p>

<h2>Requirements the standard points at</h2>
<ul>
<li>Updates must be <strong>authenticated and integrity-protected</strong> &mdash; the vehicle accepts only packages from an authorised source for that vehicle and configuration.</li>
<li>The update process must preserve cybersecurity during and after the update &mdash; no window where protections are disabled, no leftover debug state.</li>
<li>Dependencies between updates must be managed &mdash; version compatibility across ECUs, rollback safety.</li>
<li>Cybersecurity information about updates (what changed, security relevance) must reach the relevant parties.</li>
<li>Updates must be traceable: which vehicle received which version, when.</li>
</ul>
<p>The engineering detail for update systems sits in ISO 24089 and UN R156 (SUMS): the update campaign process, the vehicle-side update capability, and the evidence that updates are performed safely.</p>

<h2>Update architecture concerns</h2>
<div class="table-wrap"><table>
<thead><tr><th>Concern</th><th>Design question</th></tr></thead>
<tbody>
<tr><td>Authenticity</td><td>How is the package signed, and where is the trust anchor? Per-vehicle or per-model keys?</td></tr>
<tr><td>Confidentiality</td><td>Does the package reveal exploitable details? Is encryption needed as well as signing?</td></tr>
<tr><td>Rollback</td><td>Is anti-rollback enforced to prevent downgrade to a vulnerable version? Is there a safe recovery if an update fails?</td></tr>
<tr><td>Atomicity</td><td>What state is the vehicle in if power is lost mid-update?</td></tr>
<tr><td>Availability</td><td>Can the update be performed without immobilising the customer? Can it be resumed?</td></tr>
<tr><td>Authorisation</td><td>Does the vehicle verify it is entitled to this update, not just that it is genuine?</td></tr>
<tr><td>Audit</td><td>Are update attempts and results logged and reportable to the back end?</td></tr>
</tbody></table></div>

<div class="callout bad"><div class="ci">✕</div><div class="cb"><div class="ct">The classic OTA failure modes</div>
<p>Signed package but no anti-rollback, so an attacker reinstalls an old vulnerable firmware. Update server compromised, so validly signed malicious packages are distributed. Update process disables the intrusion detection during flashing and never re-enables it. Keys for signing held on a build server reachable from a developer laptop.</p></div></div>

<h2>When an update is the incident response</h2>
<p>Emergency update campaigns stress every part of the process: compressed verification, accelerated regression, regulatory notification, customer communication, and fleet-wide monitoring afterwards. Decide in advance who can authorise an emergency release, what testing may be reduced and how that decision is recorded. Improvising this during an incident is how a security fix becomes a safety recall.</p>

<h2>Offline and workshop updates</h2>
<p>Not every vehicle is connected. Workshop updates must be authenticated too, with the diagnostic tester authorised per vehicle and per operation, and the resulting state recorded centrally. A workshop tool that can flash any ECU on any vehicle with one credential is a fleet-wide attack path hiding behind a service process.</p>
`
    },
    {
      id: "m9l3",
      title: "End of support and decommissioning",
      minutes: 10,
      body: `
<p class="lead">Clause 14 is short and frequently skipped &mdash; until a fifteen-year-old vehicle with unsupported software becomes a media story.</p>

<h2>What clause 14 requires</h2>
<ul>
<li><strong>Define and communicate the end of cybersecurity support.</strong> At some point you stop monitoring and patching an item. That decision must be deliberate, documented and communicated to customers and downstream users, with reasonable notice.</li>
<li><strong>Plan decommissioning.</strong> When an item is retired, or a vehicle reaches end of life, cybersecurity-relevant data and access must be handled safely: keys revoked, credentials invalidated, personal data erased, back-end accounts closed, service endpoints retired.</li>
<li><strong>Consider the residual fleet.</strong> Vehicles remain in service after a model is discontinued; end of support does not end risk. The organisation should record what residual risks exist and what mitigating advice is given.</li>
</ul>

<div class="callout plain"><div class="ci">▣</div><div class="cb"><div class="ct">Why this is a real engineering topic</div>
<p>Software outlives the platform team. Back-end services get decommissioned, certificates expire, mobile apps are removed from stores, spare parts change. Each of these silently breaks a security control &mdash; or leaves an authenticated channel alive with nobody watching it. Clause 14 forces someone to own that endgame.</p></div></div>

<h2>Practical end-of-support checklist</h2>
<ol class="steps">
<li><strong>Define the support period</strong> at release (clause 6 release gate) &mdash; years of security monitoring and update support, aligned with regulation and customer expectations.</li>
<li><strong>Communicate</strong> end of support in advance to vehicle owners, dealers and business customers, with guidance on risk and alternatives.</li>
<li><strong>Freeze and archive</strong> the evidence: TARAs, requirements, verification results, SBOMs and vulnerability records, for the retention period your contracts require.</li>
<li><strong>Revoke</strong> credentials, certificates and back-end access for the retired population in a controlled sequence.</li>
<li><strong>Erase</strong> personal and sensitive data from vehicles and back-end systems according to privacy obligations.</li>
<li><strong>Record residual risk</strong> for the fleet that remains in service, and the advice given to owners.</li>
<li><strong>Feed forward</strong> lessons into the next platform&rsquo;s support strategy and supplier contracts.</li>
</ol>

<div class="callout exam"><div class="ci">●</div><div class="cb"><div class="ct">Question: why does a 2021 standard care about decommissioning?</div>
<p>&ldquo;Because cybersecurity risk is lifecycle risk. An abandoned back-end endpoint or a still-valid vehicle certificate is an unmonitored attack surface. Clause 14 makes the end of support an explicit, communicated decision with credential revocation and data erasure, rather than something that happens by accident when a server is switched off.&rdquo;</p></div></div>

<h2>Connecting the lifecycle</h2>
<p>Clause 14 closes the loop opened in clause 6: the support period agreed at release is executed through clause 8 monitoring and clause 13 incident response, then formally ended here. When someone asks &ldquo;what happens after the warranty?&rdquo;, this is the part of the standard that answers them.</p>
`
    }
  ],
  quiz: [
    {
      q: "Which is NOT part of a clause 13 incident response?",
      options: [
        "Triage, classification and scope determination",
        "Containment and remediation",
        "Lessons learned feeding back into the TARA",
        "Re-running the HARA to assign ASIL levels"
      ],
      answer: 3,
      explain: "HARA/ASIL belongs to functional safety (ISO 26262). Incident response covers preparation, detection, triage, containment, analysis, remediation, recovery, learning."
    },
    {
      q: "Why does update capability determine incident severity?",
      options: [
        "Because updates are required by ISO 26262",
        "Because a fix that needs a workshop visit takes months to reach the fleet, extending exposure",
        "Because updates remove the need for monitoring",
        "Because OTA updates are free"
      ],
      answer: 1,
      explain: "Remediation speed defines exposure duration. Without OTA, containment and notification strategy must assume long field-action timelines."
    },
    {
      q: "What does anti-rollback protection prevent?",
      options: [
        "Installation of a genuine newer firmware",
        "Reinstallation of an older, vulnerable but still validly signed firmware",
        "Updates over Wi-Fi",
        "Key rotation"
      ],
      answer: 1,
      explain: "Signature checks alone accept any validly signed version, including old vulnerable ones. Anti-rollback enforces a monotonic version floor."
    },
    {
      q: "What should happen at end of cybersecurity support?",
      options: [
        "Nothing; vehicles continue as before",
        "Communicate the end of support, revoke credentials and certificates, erase data, archive evidence and record residual fleet risk",
        "Delete all TARAs to reduce liability",
        "Extend support indefinitely without resourcing it"
      ],
      answer: 1,
      explain: "Clause 14 requires a deliberate, communicated end of support with credential revocation, data handling, evidence retention and residual risk consideration."
    },
    {
      q: "A workshop diagnostic tool can flash any ECU on any vehicle with a single shared credential. What is the issue?",
      options: [
        "It is a usability problem only",
        "It is a fleet-wide attack path and a clause 12/13 failure in tool and credential management",
        "It is acceptable if the tool is password protected",
        "It only affects out-of-warranty vehicles"
      ],
      answer: 1,
      explain: "Privileged, shared service credentials turn one compromised laptop into fleet-wide capability. Per-vehicle authorisation and audit are required."
    }
  ]
});
