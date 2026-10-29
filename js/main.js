/**
 * NAINA JAIN PORTFOLIO - MAIN INTERACTIVE LOGIC
 * High Performance Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initProcessStepper();
  initPortfolioFilters();
  initSampleModal();
  initPricingTabs();
  initFaqAccordion();
  initClipboardUtils();
  initContactForm();
  initScrollAnimations();
  initAmbientBackground();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-drawer a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }
}

/* ==========================================================================
   2. HERO DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    "Content Writer | Social Media Strategist",
    "SEO Blog & Article Specialist",
    "Reels & YouTube Scriptwriter",
    "Creative & Brand Voice Strategist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. 6-STEP CONTENT WORKFLOW PROCESS (Interactive Stepper)
   ========================================================================== */
const processData = [
  {
    step: "01",
    tag: "Phase 1: Research & Alignment",
    title: "Discovery & Audience Research",
    desc: "Every powerful piece of writing starts with deep understanding. I investigate your target audience, buyer personas, competitors, and core brand tone before writing a single word.",
    checklist: [
      "Initial brand voice & goal consultation",
      "Audience persona & pain-point mapping",
      "Search intent & keyword landscape review",
      "Competitor messaging & angle analysis"
    ],
    outcome: "Crystal-clear content brief & strategic direction"
  },
  {
    step: "02",
    tag: "Phase 2: Strategy & Architecture",
    title: "Topic Ideation & Content Strategy",
    desc: "Structuring the content strategy around high-value content buckets, SEO pillar clusters, viral hooks for video formats, and dedicated monthly content calendars.",
    checklist: [
      "Content calendar & posting frequency roadmap",
      "Hook ideation (first 3-second retention hooks for reels/YT)",
      "SEO outline with H1, H2, H3 hierarchy",
      "Platform-native formatting strategy"
    ],
    outcome: "Structured outline and hook repository"
  },
  {
    step: "03",
    tag: "Phase 3: Execution & Storytelling",
    title: "In-Depth Research & Drafting",
    desc: "Drafting engaging, research-backed content designed to hook the reader instantly and provide authentic value. Whether it's a technical IT blog or a viral reel script, clarity reigns supreme.",
    checklist: [
      "Original draft creation tailored to brand voice",
      "Incorporating authoritative statistics & verified references",
      "Smooth storytelling pacing & conversational tone",
      "Compelling call-to-actions (CTAs) for conversion"
    ],
    outcome: "Complete first-draft ready for fine-tuning"
  },
  {
    step: "04",
    tag: "Phase 4: Calibration & SEO Polish",
    title: "Tone Calibration & SEO Optimization",
    desc: "Enhancing readability, optimizing keyword placement naturally without keyword stuffing, crafting meta descriptions, click-worthy titles, and thumbnail copy.",
    checklist: [
      "Grammarly & human tone readability check",
      "On-page SEO optimization (Keywords, Meta tags, Alt text)",
      "Video script visual cues & timestamp pacing notes",
      "Fact-checking & originality verification"
    ],
    outcome: "Publication-ready, high-ranking content asset"
  },
  {
    step: "05",
    tag: "Phase 5: Collaborative Feedback",
    title: "Client Review & Revisions",
    desc: "Collaborating closely with you and your team to review the submission, refine nuances, and implement reasonable revisions aligned with the project scope.",
    checklist: [
      "Collaborative Google Docs review flow",
      "Fast turnaround on requested tweaks",
      "Brand guideline alignment verification",
      "Final approval sign-off"
    ],
    outcome: "100% Client satisfaction and approval"
  },
  {
    step: "06",
    tag: "Phase 6: Deployment & Analytics",
    title: "Final Delivery & Publishing Ready",
    desc: "Delivering formatted, ready-to-publish files with supporting assets: SEO tags, thumbnail copy, caption variations, and hashtag clusters for maximum reach.",
    checklist: [
      "Clean formatted delivery (.docx, Google Docs, Notion)",
      "Ready-to-paste caption & hashtag sets",
      "Thumbnail & visual hook suggestions",
      "Post-publishing performance review"
    ],
    outcome: "Seamless publishing & audience engagement"
  }
];

function initProcessStepper() {
  const stepBtns = document.querySelectorAll('.step-nav-btn');
  const stepBadge = document.getElementById('process-step-badge');
  const stepTitle = document.getElementById('process-step-title');
  const stepDesc = document.getElementById('process-step-desc');
  const stepChecklist = document.getElementById('process-step-checklist');
  const stepOutcome = document.getElementById('process-step-outcome');

  if (!stepBtns.length || !stepTitle) return;

  stepBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      stepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProcessStep(index);
    });
  });

  function renderProcessStep(index) {
    const data = processData[index];
    if (!data) return;

    if (stepBadge) stepBadge.textContent = `${data.step} — ${data.tag}`;
    if (stepTitle) stepTitle.textContent = data.title;
    if (stepDesc) stepDesc.textContent = data.desc;
    if (stepOutcome) stepOutcome.textContent = data.outcome;

    if (stepChecklist) {
      stepChecklist.innerHTML = data.checklist
        .map(item => `
          <li>
            <span class="check-icon">✓</span>
            <span>${item}</span>
          </li>
        `).join('');
    }
  }
}

/* ==========================================================================
   4. PORTFOLIO FILTERING
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategory.split(' ').includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'slideInUp 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. SAMPLE WRITING & SCRIPT READER MODAL
   ========================================================================== */
const sampleDatabase = {
  "cyberpeace-cognitive-ai": {
    client: "CyberPeace Foundation of India",
    category: "Published Explainer • Human-Centred AI",
    title: "AI as a Cognitive Assistant or Cognitive Substitute? The Case for Human-Centred AI Use",
    meta: "Byline: By Naina Jain (Intern, Policy & Advocacy) | Published: Sep 12, 2026 • 6 min read",
    liveUrl: "https://cyberpeace.org/resources/blogs/ai-as-a-cognitive-assistant-or-cognitive-substitute-the-case-for-human-centred-ai-use",
    content: `
      <h2>Executive Summary & Core Premise</h2>
      <p>Artificial intelligence tends to attract extreme opinions. Some commentators argue it is eroding our capacity to think; others believe it is freeing our minds for more valuable work. Both views miss the more important point: <strong>the effect of AI depends entirely on how a person chooses to use it.</strong> Whether a chatbot supports someone’s thinking or replaces it altogether is what separates an assistant from a substitute.</p>

      <div class="script-cue">
        <strong>Core Thesis:</strong> "When AI is used as a substitute, users outsource the active cognitive struggle required to form insights. When used as an assistant, it accelerates research while preserving critical human discernment."
      </div>

      <h3>1. The Cognitive Offloading Dilemma</h3>
      <p>Not long ago, generative AI was a novelty. Now it shows up daily in classrooms, newsrooms, and corporate offices—almost everywhere people write, plan, or make decisions. When a professional offloads drafting to an algorithm without revision, they do not simply save time; they gradually surrender their analytical voice.</p>

      <h3>2. The 'Human in the Loop' Framework</h3>
      <p>Human-centred AI usage establishes clear boundaries:
      <br>• <strong>Phase 1 (Ideation & Discovery):</strong> Using AI for divergent topic exploration and structural outlines.
      <br>• <strong>Phase 2 (Critical Synthesis):</strong> Human verification of factual premises, nuanced tone calibration, and ethical verification.
      <br>• <strong>Phase 3 (Discernment):</strong> Retaining sole ownership over conclusions, accountability, and empathy.</p>

      <h3>3. Strategic Takeaway</h3>
      <p>Technology will continue to evolve, but a mindful, questioning mindset remains humanity's strongest cognitive firewall. Organizations must train teams to treat AI tools as intellectual sparring partners rather than autopilot replacements.</p>
    `
  },
  "cyberpeace-irdai": {
    client: "CyberPeace Foundation of India",
    category: "Legal & Regulatory Guide • Cybersecurity Compliance",
    title: "The Insurance Regulatory and Development Authority of India (IRDAI) Cyber Security Guidelines 2026",
    meta: "Byline: By Naina Jain (Intern, Policy & Advocacy) | Published: Aug 27, 2026 • 6 min read",
    liveUrl: "https://cyberpeace.org/resources/blogs/the-insurance-regulatory-and-development-authority-of-india-irdai-cyber-security-guidelines-2026",
    content: `
      <h2>Regulatory Overview</h2>
      <p>Insurance companies hold immense reserves of sensitive consumer data: medical history, bank account details, identity proofs, and years of claims records—all stored on insurer servers, waiting. That makes the sector an easy target. India saw close to <strong>370 million malware attacks in a single recent year</strong>, with banking, financial services, and insurance firms bearing the brunt of it.</p>

      <div class="script-cue">
        <strong>Regulatory Context:</strong> Breaking down IRDAI's mandated cyber security framework across governance, third-party vendor audits, board accountability, and incident reporting timelines.
      </div>

      <h3>Key Mandates from the 2026 Guidelines</h3>
      <p><strong>1. Chief Information Security Officer (CISO) Independence:</strong> Mandating independent reporting channels directly to the Board Risk Management Committee.<br>
      <strong>2. Zero-Trust Architecture:</strong> Moving past perimeter security toward continuous verification of micro-segmented networks.<br>
      <strong>3. Mandatory Vendor Vulnerability Assessments:</strong> Regulating third-party API integrations and cloud SaaS providers handling policyholder data.<br>
      <strong>4. Rapid Incident Disclosure:</strong> Stricter timelines for reporting security breaches to national response centres.</p>

      <h3>Why This Matters for Policyholders & Fintechs</h3>
      <p>Cyber insurance is no longer an afterthought; it is a structural pillar of India's digital economy. As insurance distribution becomes API-driven, compliance with IRDAI guidelines is the baseline requirement for maintaining consumer trust.</p>
    `
  },
  "cyberpeace-semiconductor": {
    client: "CyberPeace Foundation of India",
    category: "Deep Explainer • Global Geopolitics & Tech",
    title: "The Tiny Chip That Runs the Entire World, and Why Everyone's Fighting Over It",
    meta: "Byline: By Naina Jain (Intern, Policy & Advocacy) | Published: Jul 24, 2026 • 5 min read",
    liveUrl: "https://cyberpeace.org/resources/blogs/the-tiny-chip-that-runs-the-entire-world-and-why-everyones-fighting-over-it",
    content: `
      <h2>The Global Silicon Battleground</h2>
      <p>Microchips are the invisible foundation of the modern economy. From consumer smartphones and automotive electronics to military defense systems and generative AI supercomputers, virtually every critical industry relies on semiconductor supply chains.</p>

      <div class="script-cue">
        <strong>The Paradox:</strong> "Small in size, massive in power, critical in control. Yet, despite their ubiquity, chip manufacturing remains one of the most concentrated and vulnerable supply networks on Earth."
      </div>

      <h3>Key Geopolitical Chokepoints Analyzed</h3>
      <p><strong>• The Monopoly of Extreme Ultraviolet (EUV) Lithography:</strong> How Dutch firm ASML remains the sole manufacturer capable of producing machines that print sub-3nm circuits.<br>
      <strong>• The Taiwan Strait & TSMC:</strong> Why over 90% of the world's most advanced processing chips are fabricated on a single island, creating unprecedented geopolitical risk.<br>
      <strong>• India's Semiconductor Mission (ISM):</strong> India’s multi-billion dollar incentive scheme, semiconductor fabrication plants in Gujarat and Assam, and the push toward sovereign silicon self-reliance.</p>

      <h3>Narrative Style & Impact</h3>
      <p>This article deconstructs intricate engineering physics (nanometer scaling, lithography, wafer fabrication) into a gripping narrative of economic statecraft, making high-level technology strategy engaging for diverse readers.</p>
    `
  },
  "cyberpeace-un-divide": {
    client: "CyberPeace Foundation of India",
    category: "UN Policy Analysis • Multilateral Tech Governance",
    title: "AI and the New Global Divide: What a Recent UN Report Warns Us About",
    meta: "Byline: By Naina Jain (Intern, Policy & Advocacy) | Published: Aug 4, 2026 • 5 min read",
    liveUrl: "https://cyberpeace.org/resources/blogs/ai-and-the-new-global-divide-what-a-recent-un-report-warns-us-about",
    content: `
      <h2>International Policy Analysis</h2>
      <p>In July 2026, the United Nations published the first draft of its landmark report on the Development of Artificial Intelligence, authored by 40 international scientists and policymakers from the Independent Scientific Panel on AI, co-chaired by Yoshua Bengio and Maria Ressa.</p>

      <div class="script-cue">
        <strong>The Warning:</strong> The report warns of an intensifying geopolitical chasm: without intervention, AI advancements risk entrenching historic economic inequalities between nations with massive compute capacity and the Global South.
      </div>

      <h3>Key Themes Addressed</h3>
      <p><strong>1. Compute Sovereignty:</strong> Over 85% of global high-end GPU clusters are concentrated within two sovereign territories, leaving developing economies dependent on foreign cognitive infrastructure.<br>
      <strong>2. Algorithmic Bias in Diverse Populations:</strong> The acute risks of training foundational models on Western datasets and deploying them across multilingual Global South jurisdictions without localization.<br>
      <strong>3. Global Digital Compact & Multilateral Frameworks:</strong> Proposing pooled international compute resources, open-source model sharing, and enforceable ethical norms.</p>

      <h3>Research Methodology</h3>
      <p>Authored through deep analysis of primary UN publications, multilateral policy communiqués, and international relations frameworks, bridging legal jurisprudence with technology policy.</p>
    `
  },
  "montage-ai": {
    client: "Montage IT Solutions",
    category: "SEO Technical Guide • Enterprise IT Strategy",
    title: "Why Every Business Needs an AI Strategy in 2026",
    meta: "Word Count: 1,600+ words | Target: Enterprise Leaders, CTOs & SMB Owners | Format: B2B SEO Pillar Article",
    liveUrl: "https://blog.monteage.co.in/why-every-business-needs-an-ai-strategy-in-2026-1",
    content: `
      <h2>The Enterprise Crossroads</h2>
      <p>By 2026, AI is no longer a speculative technology—it has become an integral part of how modern enterprises operate, serve customers, and make commercial decisions. The fundamental question is no longer <em>whether</em> a business should use AI, but <em>how to choose the right tools and govern them effectively</em>.</p>

      <div class="script-cue">
        <strong>Strategic Insight:</strong> "Without a structured approach, businesses adopt too many disconnected AI tools, waste valuable budget, and experience zero measurable ROI. A strategy aligns software adoption with commercial outcomes."
      </div>

      <h3>Structured 6-Pillar Framework for Businesses</h3>
      <p>• <strong>Productivity & Workflow Automation:</strong> Relieving human teams from repetitive data verification and ticketing bottlenecks.<br>
      • <strong>Customer Service Transformation:</strong> Deploying context-aware AI chatbots that understand nuances rather than frustrating users with rigid scripts.<br>
      • <strong>Sales & Marketing Intelligence:</strong> Intent data analysis for personalized outreach without spamming.<br>
      • <strong>Data Security & Proprietary Protection:</strong> Preventing internal enterprise leaks into public training sets.<br>
      • <strong>Continuous Employee Upskilling:</strong> Creating an internal culture that embraces AI as an accelerator rather than a threat.</p>
    `
  },
  "yt-fssai-script": {
    client: "CertifyKaro (YouTube Production)",
    category: "YouTube Long-Form Explainer Video Script & SEO Package",
    title: "FSSAI License 2026: New Rules, New Limits & Risk-Based Inspections Explained",
    meta: "Runtime: 8-10 Minutes | Package: Full Script, Visual Cues, Retention Hooks, High-CTR Title & Description",
    liveUrl: "https://www.youtube.com/watch?v=LlDIj7Mb7ok",
    content: `
      <h2>Complete Video Production Package</h2>
      <p><strong>Client:</strong> CertifyKaro | <strong>Host:</strong> CA Shubham Jain / Team | <strong>Scriptwriter:</strong> Naina Jain</p>
      <p>Crafted to explain complex food safety regulations in simple Hindi-English for restaurant owners, D2C food brands, cloud kitchens, and importers, maintaining viewer retention throughout.</p>

      <div class="script-cue">
        <strong>[0:00 - 0:45] HIGH-RETENTION HOOK:</strong><br>
        <em>Visual:</em> Quick split screen showing a restaurant kitchen inspection notice and penalty numbers.<br>
        <em>Host (Energetic, Authoritative):</em> "Agar aapka restaurant, cloud kitchen, ya packaged food business hai—toh FSSAI ke naye rules 2026 aapka pura operation badal sakte hain! Naye turnover limits, compulsory risk-based inspections, aur penalty jo 5 lakh tak ja sakti hai. Is video mein, har naya rule simple language mein samjhenge!"
      </div>

      <h3>Script Chapter Breakdown</h3>
      <p><strong>Chapter 1 (0:45 - 2:30):</strong> Basic Registration vs State License vs Central License—the exact updated turnover thresholds.<br>
      <strong>Chapter 2 (2:30 - 5:15):</strong> What is 'Risk-Based Inspection'? High-risk food categories (dairy, meat, nutraceuticals) audit checklist.<br>
      <strong>Chapter 3 (5:15 - 7:30):</strong> Documentation shortcuts to avoid rejection: FoSTaC supervisor certificate, water testing reports, and NOCs.<br>
      <strong>Chapter 4 (7:30 - 8:45):</strong> Step-by-step online filing guide on FoSCoS portal.<br>
      <strong>Outro & Lead Magnet (8:45 - 9:30):</strong> "Pinned comment mein free FSSAI 2026 Checklist link hai. Click karke download karein!"</p>

      <h3>SEO Deliverables Provided</h3>
      <p>• <strong>CTR-Optimized Title:</strong> FSSAI License 2026: New Rules, New Limits & Risk-Based Inspections Explained<br>
      • <strong>Description:</strong> 350-word keyword-rich synopsis with timestamps and lead capture links.<br>
      • <strong>Tags:</strong> #FSSAI #FoodLicense #FoSCoS #CloudKitchenIndia #BusinessCompliance</p>
    `
  },
  "yt-asisse-script": {
    client: "CA Shubham Jain / CertifyKaro",
    category: "YouTube Shorts & Instagram Reel Script",
    title: "What Is ASISSE? Got a Government Survey Notice for Your Company? (30s Script)",
    meta: "Format: 30-Second High-Conversion Short | Channels: YouTube Shorts & Instagram Reels",
    liveUrl: "https://www.youtube.com/shorts/3C8ZDboH3hc",
    content: `
      <h2>30-Second Short-Form Script & Visual Flow</h2>
      <p><strong>Goal:</strong> Stop the scroll, alleviate panic, clarify legal reality, and generate client inquiries for CertifyKaro survey compliance assistance.</p>

      <div class="script-cue">
        <strong>[0:00 - 0:04] SCROLL-STOPPING HOOK:</strong><br>
        <em>Visual:</em> Host holding phone looking alarmed, text on screen in bold red/yellow: <em>'Notice for ASISSE Survey?!'</em><br>
        <em>Audio:</em> "Kya aapki company ko Government of India se aisa ASISSE Survey ka notice aaya hai? Rukiye, panic mat kijiye!"<br><br>

        <strong>[0:04 - 0:14] THE PROBLEM & CONTEXT:</strong><br>
        <em>Visual:</em> Screen recording of the Ministry of Statistics & Programme Implementation portal.<br>
        <em>Audio:</em> "Yeh koi tax raid ya penalty notice nahi hai. Yeh hai <strong>Annual Survey of Unincorporated Sector Enterprises (ASISSE)</strong>. Ministry random companies ko survey ke liye select karti hai."<br><br>

        <strong>[0:14 - 0:24] THE RISK (WHY YOU CANNOT IGNORE IT):</strong><br>
        <em>Visual:</em> Host gesturing warning symbol, penalty clause highlighted.<br>
        <em>Audio:</em> "Lekin dhyan rahe: Isko ignore kiya toh Collection of Statistics Act ke under fine lag sakta hai!"<br><br>

        <strong>[0:24 - 0:30] CTA:</strong><br>
        <em>Visual:</em> Host smiling, pointing to comments.<br>
        <em>Audio:</em> "Notice ka reply kaise dena hai? Comment mein 'SURVEY' likho, humari team help karegi!"
      </div>
    `
  },
  "linkedin-viral-shubham": {
    client: "CA Shubham Jain (Co-Founder, CertifyKaro)",
    category: "Viral Founder Storytelling • High Organic Reach",
    title: "“2018 mein mera CA result aaya...” — The Big 4 vs Starting Practice Dilemma",
    meta: "Reach: High Organic Viral Engagement | Platforms: LinkedIn & Twitter/X | Format: Narrative Hook & Dialogue",
    liveUrl: "https://www.linkedin.com/posts/ca-shubham-jain-_incometax-newtaxregime-taxplanning-share-7502975365536059392-AUYF/",
    content: `
      <h2>The Viral Copy Breakdown</h2>
      <p>Written for CA Shubham Jain, this viral post achieved massive organic reach, hundreds of shares, and passionate discussions across the Indian finance and startup ecosystem.</p>

      <div class="script-cue">
        <strong>Full Post Copy (Verbatim):</strong><br><br>
        2018 mein mera CA result aaya, aur tab sabki ek hi advice thi:<br>
        Pehle Big 4 join kar.<br>
        Do teen saal job kar.<br>
        Phir practice ka sochna.<br>
        But...<br>
        I started my own practice instead.<br><br>

        The most common reaction was... "Bina experience ke client kaun dega?"<br><br>
        Honestly, I had the same doubt. But practice taught me something no job could have.<br><br>
        In a job, you see one small part of a client's work.<br>
        In practice, a small business owner sits across the table and hands you everything.<br>
        His GST, his loans, his family's savings, and sometimes his worries too.<br><br>
        He is not just hiring a CA.<br>
        He is deciding whether he can trust a young professional with his life's work.<br><br>
        Paisa der se aaya, lekin seekhna pehle din se shuru ho gaya. And I'd choose it again 100 times.<br><br>
        Fresh CAs: Job first or Practice first? What's your take? 👇<br>
        #CALife #BizWithShubham #Entrepreneurship #IncomeTax
      </div>

      <h3>Why This Post Exploded</h3>
      <p><strong>1. Relatable Vulnerability:</strong> Acknowledging the universal fear ("Bina experience ke client kaun dega?").<br>
      <strong>2. Empathy for Clients:</strong> Highlighting that small business owners entrust their life savings, not just paperwork.<br>
      <strong>3. Polarizing Question CTA:</strong> Sparks genuine comments between professionals debating corporate job stability vs practice independence.</p>
    `
  },
  "certifykaro-linkedin": {
    client: "CertifyKaro (Official Company Page)",
    category: "B2B Brand Communication & Inbound Strategy",
    title: "Corporate Compliance, Trademarks, ISO & GST Simplified for Indian Founders",
    meta: "Format: Carousel Breakdown & Educational Infographics | Audience: MSME Founders, CFOs, Startups",
    liveUrl: "https://www.linkedin.com/posts/certifykaro-trademark-gst-iso-fssai-share-7519658451745087488-gmWk/",
    content: `
      <h2>B2B LinkedIn Brand Strategy</h2>
      <p>Managed social communication and content strategy for <strong>CertifyKaro</strong>, transforming technical compliance procedures (Trademark, GST, ISO, FSSAI, Startup India DPIIT recognition) into accessible, high-trust business educational assets.</p>

      <div class="script-cue">
        <strong>Sample Post Structure:</strong><br><br>
        "Most founders spend ₹2,00,000 on branding, packaging, and digital ads before spending ₹4,500 on their Trademark application.<br><br>
        Then comes the dreaded Objection Notice from a competitor who trademarked the same name 3 months earlier.<br><br>
        Here is the 3-step Trademark Checklist every founder must run before launching their brand in 2026..."
      </div>

      <h3>Strategic Outcome</h3>
      <p>• Transformed a traditionally transactional legal-services brand into an educational authority on founder compliance.<br>
      • Generated direct inbound consultation inquiries through comment triggers and value-first carousel breakdowns.</p>
    `
  },
  "insta-humor-reels": {
    client: "@bizwithshubham & @certifykaro",
    category: "Instagram Reels • Humor, Relatable Culture & Brand Voice",
    title: "Relatable Reels: CA Life, Startup Hustle & Client Realities",
    meta: "Format: 15-30 Second Relatable Skits | Focus: Audio Timing, Punchy Dialogues & Comment Triggers",
    liveUrl: "https://www.instagram.com/reel/DebqohCJXAd/",
    content: `
      <h2>Humor & Relatable Short-Form Production</h2>
      <p>Developing punchy, humorous Instagram Reel concepts and captions for <strong>@bizwithshubham</strong> and <strong>@certifykaro</strong> that resonate with entrepreneurs, chartered accountants, and everyday taxpayers.</p>

      <div class="script-cue">
        <strong>Concept: "The Last Day of ITR Filing"</strong><br>
        <em>Visual:</em> Split screen with trending audio. On one side, client texting 'Bhaiya thoda discount ho jayega kya?'. On the other side, CA staring at 50 Excel tabs at 11:58 PM.<br>
        <em>Caption:</em> "Client: 'Bas 5 minute ka kaam hai.' <br>Me looking at 14 bank statements sent in blurry horizontal photos: 👁️👄👁️ Tag your CA and say thank you before 31st July! #CALife #TaxHumor #BizWithShubham"
      </div>

      <h3>Why Humor Works for Finance & Legal Brands</h3>
      <p>Legal and financial compliance can feel dry and intimidating. Humorous, relatable reels humanize the founder, build instant rapport, and achieve 5x more shares than standard corporate announcements.</p>
    `
  }
};

function initSampleModal() {
  const modal = document.getElementById('sample-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalClient = document.getElementById('modal-client');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalBody = document.getElementById('modal-body-content');
  const copySampleBtn = document.getElementById('modal-copy-btn');
  const readSampleBtns = document.querySelectorAll('.read-sample-btn');

  if (!modal) return;

  readSampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sampleKey = btn.getAttribute('data-sample-key');
      const sample = sampleDatabase[sampleKey];

      if (sample) {
        if (modalClient) modalClient.textContent = `${sample.client} • ${sample.category}`;
        if (modalTitle) modalTitle.textContent = sample.title;
        if (modalMeta) {
          modalMeta.innerHTML = `
            <div>${sample.meta}</div>
            ${sample.liveUrl ? `
              <div style="margin-top: 0.65rem;">
                <a href="${sample.liveUrl}" target="_blank" rel="noopener noreferrer" class="live-link-btn">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>Open Live Published Resource</span>
                </a>
              </div>
            ` : ''}
          `;
        }
        if (modalBody) modalBody.innerHTML = sample.content;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (copySampleBtn) {
    copySampleBtn.addEventListener('click', () => {
      if (modalBody) {
        const textToCopy = modalBody.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast("Sample text copied to clipboard!");
        });
      }
    });
  }
}

/* ==========================================================================
   6. TRANSPARENT PRICING PLANS TABS
   ========================================================================== */
function initPricingTabs() {
  const tabBtns = document.querySelectorAll('.pricing-tab-btn');
  const pricingCards = document.querySelectorAll('.pricing-card');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabCategory = btn.getAttribute('data-tab');

      pricingCards.forEach(card => {
        const cardType = card.getAttribute('data-plan-type');
        if (tabCategory === 'all' || cardType === tabCategory) {
          card.style.display = 'flex';
          card.style.animation = 'slideInUp 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems[0]) {
    const firstContent = faqItems[0].querySelector('.faq-content');
    faqItems[0].classList.add('active');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + "px";
  }
}

/* ==========================================================================
   8. CLIPBOARD & QUICK ACTIONS
   ========================================================================== */
function initClipboardUtils() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard!`);
        }).catch(() => {
          showToast("Failed to copy to clipboard");
        });
      }
    });
  });
}

/* ==========================================================================
   9. CONTACT FORM & VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const service = form.querySelector('#service')?.value;
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      showToast("Please fill out all required fields.");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    // Simulate quick feedback
    setTimeout(() => {
      showToast("Thank you Naina received your message! We'll reply shortly.");
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1200);
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>✦</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   11. SCROLL ENTRANCE ANIMATIONS (Intersection Observer)
   ========================================================================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-fade-in, .service-card, .portfolio-card, .metric-card').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   12. AMBIENT MOVING PARTICLES & SHIMMER STARS (Light Theme Professional)
   ========================================================================== */
function initAmbientBackground() {
  const canvas = document.getElementById('ambient-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let animationId = null;
  let isRunning = true;

  // Track mouse coordinates for interactive response
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 130,
    active: false,
    clearTimer: null
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    if (mouse.clearTimer) clearTimeout(mouse.clearTimer);
    mouse.clearTimer = setTimeout(() => {
      mouse.active = false;
    }, 2000);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Tailored luxury light-theme color palette:
  // Royal Sapphire (#2563EB), Warm Amber Gold (#D97706), Soft Amethyst (#9333EA), Navy Slate (#1E3A8A)
  const colorPalette = [
    { r: 37, g: 99, b: 235 },   // Royal Indigo / Sapphire
    { r: 217, g: 119, b: 6 },   // Warm Amber Gold
    { r: 245, g: 158, b: 11 },  // Bright Champagne Gold
    { r: 147, g: 51, b: 234 },  // Soft Purple
    { r: 30, g: 58, b: 138 }    // Deep Navy
  ];

  class Particle {
    constructor(init = false) {
      this.reset(init);
    }

    reset(init = false) {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = init ? Math.random() * (height || window.innerHeight) : (height || window.innerHeight) + 20 + Math.random() * 30;

      // 4 Particle Types for a rich creative stardust atmosphere:
      // - 4-point star (✦)
      // - Soft glowing orb/dot
      // - Micro diamond (◆)
      // - Editorial cross (+)
      const rand = Math.random();
      if (rand < 0.38) {
        this.type = 'star';
        this.size = 3.2 + Math.random() * 4.5; // Star outer radius
      } else if (rand < 0.72) {
        this.type = 'orb';
        this.size = 1.6 + Math.random() * 2.6;
      } else if (rand < 0.88) {
        this.type = 'diamond';
        this.size = 2.4 + Math.random() * 3.2;
      } else {
        this.type = 'cross';
        this.size = 2.8 + Math.random() * 2.8;
      }

      this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      this.speedY = 0.22 + Math.random() * 0.42; // Upward drift
      this.driftX = 0.18 + Math.random() * 0.35;
      this.driftSpeed = 0.0008 + Math.random() * 0.0018;
      this.seed = Math.random() * 1000;

      // Rotation for stars and geometric glyphs
      this.angle = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.012;

      // Twinkling luminosity
      this.baseAlpha = 0.22 + Math.random() * 0.34;
      this.twinkleSpeed = 0.0015 + Math.random() * 0.003;
      this.phase = Math.random() * Math.PI * 2;

      // Interactive velocity
      this.vx = 0;
      this.vy = 0;
    }

    update(time) {
      this.x += Math.sin(time * this.driftSpeed + this.seed) * this.driftX + this.vx;
      this.y -= this.speedY + this.vy;
      this.angle += this.rotSpeed;

      // Decelerate mouse velocity
      this.vx *= 0.93;
      this.vy *= 0.93;

      // Mouse proximity interaction
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 1.5;
          const nx = dx / dist;
          const ny = dy / dist;
          this.vx += nx * force * 0.5;
          this.vy += ny * force * 0.5;
        }
      }

      // Recycle when moving out of view
      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset(false);
      }
    }

    draw(ctx, time) {
      const twinkle = Math.sin(time * this.twinkleSpeed + this.phase);
      const alpha = Math.max(0.08, Math.min(0.85, this.baseAlpha + twinkle * 0.2));
      const { r, g, b } = this.color;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      if (this.type === 'star') {
        // 4-point sparkle star ✦
        const s = this.size;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.closePath();
        ctx.fill();

        // Bright white center spark
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.24, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'orb') {
        // Soft glowing circular orb
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.55, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'diamond') {
        // Minimalist diamond
        const s = this.size;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.7, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.7, 0);
        ctx.closePath();
        ctx.fill();
      } else if (this.type === 'cross') {
        // Editorial micro cross +
        const s = this.size * 0.85;
        const w = 1.0;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
        ctx.fillRect(-w / 2, -s, w, s * 2);
        ctx.fillRect(-s, -w / 2, s * 2, w);
      }

      ctx.restore();
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const targetCount = width < 768 ? 32 : (width < 1200 ? 50 : 68);

    if (particles.length === 0) {
      for (let i = 0; i < targetCount; i++) {
        particles.push(new Particle(true));
      }
    } else {
      while (particles.length < targetCount) {
        particles.push(new Particle(true));
      }
      if (particles.length > targetCount) {
        particles.length = targetCount;
      }
    }
  }

  // Draw faint dynamic constellation lines
  function drawConstellations() {
    const maxDist = 80;
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  let startTime = performance.now();

  function animate(currentTime) {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    const elapsed = currentTime - startTime;

    // Draw constellations
    drawConstellations();

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(elapsed);
      particles[i].draw(ctx, elapsed);
    }

    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animationId) cancelAnimationFrame(animationId);
    } else {
      isRunning = true;
      startTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    resize();
    animationId = requestAnimationFrame(animate);
  }
}
