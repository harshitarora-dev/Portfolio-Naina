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
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
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
  "cyberpeace": {
    client: "CyberPeace Foundation of India",
    category: "SEO Blog & Digital Safety Guide",
    title: "Navigating Digital Safety in the AI Era: A Comprehensive Guide for Young Netizens",
    meta: "Word Count: 1,450 words | Target Audience: Youth & Parents | Keywords: digital safety, AI privacy, cyber hygiene",
    content: `
      <h2>Executive Overview</h2>
      <p>As artificial intelligence becomes woven into the daily digital fabric of young users—from deepfakes and AI chatbots to automated profile cloning—understanding digital hygiene is no longer optional. This comprehensive long-form guide was developed to translate complex cybersecurity concepts into actionable, empowering online safety principles.</p>

      <h3>1. The Emerging Landscape of Synthetic Identity and AI Scams</h3>
      <p>The transition from traditional phishing to hyper-personalized AI-generated social engineering requires a fundamental paradigm shift. Where users once checked for spelling errors and odd email addresses, AI-driven scams now emulate familial voices, replicate writing cadence, and create convincing visual assets.</p>

      <div class="script-cue">
        <strong>Key Research Insight:</strong> Over 64% of teenagers surveyed interact with AI bots without recognizing data harvesting parameters. Communication must focus on empowerment rather than fear.
      </div>

      <h3>2. The 4 Pillars of Cyber Hygiene</h3>
      <p><strong>Pillar I: Zero-Trust Social Sharing</strong> — Never broadcasting real-time location metrics or institutional identifiers in public feeds.<br>
      <strong>Pillar II: Multi-Layer Authentication</strong> — Transitioning beyond SMS verification toward hardware keys and authenticator protocols.<br>
      <strong>Pillar III: Synthetic Media Spotting</strong> — Inspecting audio anomalies, unsynchronized lip movements, and unexpected urgency in financial or emotional requests.<br>
      <strong>Pillar IV: Immediate Redressal Mechanisms</strong> — Knowing national cybercrime reporting portals and emergency helplines.</p>

      <h3>3. Conclusion & Call to Awareness</h3>
      <p>Digital resilience is built through continuous awareness and thoughtful online habits. Technology will continue to evolve, but a mindful, questioning mindset remains the strongest firewall.</p>
    `
  },
  "usi": {
    client: "United Services Institution of India (USI)",
    category: "Executive LinkedIn Series & Thought Leadership",
    title: "Strategic Digital Leadership: Communicating Geopolitical Insights with Impact",
    meta: "Format: Executive LinkedIn Posts | Target: Policy Makers, Think Tanks, Defense Community",
    content: `
      <h2>Executive LinkedIn Campaign Brief</h2>
      <p>Managed the digital leadership and strategic LinkedIn presence for <strong>Dr. B.K. Sharma</strong>, Director General of USI. The core objective was articulating nuanced national security, geopolitical research, and strategic dialogues with dignity, intellectual authority, and high digital engagement.</p>

      <h3>Featured LinkedIn Post Sample</h3>
      <div class="script-cue">
        <strong>Hook:</strong> In an era defined by polycrisis, deterrence is no longer purely kinetic—it is technological, cognitive, and narrative.<br><br>
        <strong>Body:</strong> At USI's recent national security seminar, three strategic imperatives emerged:<br>
        1. <em>Cognitive Resilience:</em> How institutions protect sovereign information domains.<br>
        2. <em>Indigenisation & Defense Tech:</em> Moving from technology importers to indigenous self-reliance.<br>
        3. <em>Strategic Partnerships:</em> Aligning bilateral defense dialogues with actionable maritime and cyber cooperation.<br><br>
        True strategic foresight lies not in reacting to crises, but in shaping the geopolitical architecture before vulnerabilities are tested.<br><br>
        <strong>CTA & Question:</strong> How should emerging policy frameworks balance speed of adoption with institutional security? Looking forward to perspectives from fellow strategists and scholars.<br><br>
        #NationalSecurity #DefenseStrategy #Geopolitics #StrategicLeadership #USI
      </div>

      <h3>Impact & Metrics</h3>
      <p>Achieved a 160% rise in organic executive post impressions, expanded engagement among global think-tank leaders, and established a consistent cadence of research dissemination.</p>
    `
  },
  "montage": {
    client: "Montage IT Solutions",
    category: "SEO Technical Blog",
    title: "Demystifying Cloud Migration: 5 Practical Steps for Growing Enterprises",
    meta: "Word Count: 1,800 words | Industry: Enterprise IT & Cloud Infrastructure | Readability Score: Grade 9",
    content: `
      <h2>Introduction: The Cloud Crossroads</h2>
      <p>For mid-market enterprises, cloud migration is often portrayed as an all-or-nothing leap. Yet, the most successful digital transformations are calculated, phased migrations that minimize legacy friction while unlocking scalable infrastructure.</p>

      <h3>Step 1: Workload Discovery & TCO Audit</h3>
      <p>Before selecting AWS, Azure, or GCP, businesses must categorize workloads into three buckets: Cloud-Native candidates, Refactor essentials, and Retain/Retire legacy monoliths.</p>

      <h3>Step 2: Architecture Strategy — Hybrid vs Multi-Cloud</h3>
      <p>A balanced hybrid approach frequently yields the highest ROI for security-sensitive operations, allowing proprietary customer data to remain on compliant private instances while compute-heavy analytics scale elastically.</p>

      <div class="script-cue">
        <strong>SEO Optimization Note:</strong> Targeted high-intent long-tail keywords including "enterprise cloud migration roadmap 2026", "hybrid cloud cost optimization", and "cloud infrastructure security checklist".
      </div>

      <h3>Step 3: Security & Automated Governance</h3>
      <p>Embedding Zero Trust principles from day zero ensures that identity becomes the new perimeter, preventing misconfiguration leaks.</p>
    `
  },
  "certify-reel": {
    client: "Certify Karo",
    category: "Instagram Reel Script (High Retention)",
    title: "Reel Script: How to Spot a Fake ISO Certificate in 10 Seconds",
    meta: "Format: 30-Second Short Form Script | Platform: Instagram & YouTube Shorts | Target: Business Owners",
    content: `
      <h2>Reel Script & Visual Production Breakdown</h2>
      <p><strong>Goal:</strong> High-energy educational reel communicating certificate authenticity while positioning Certify Karo as the trusted certification partner.</p>

      <div class="script-cue">
        <strong>[0:00 - 0:03] HOOK (Visual & Audio):</strong><br>
        <em>Visual:</em> Creator holding up a fancy gold-stamped certificate, ripping a fake watermark graphic on screen.<br>
        <em>Audio:</em> "90% of business owners are paying for FAKE ISO certificates without even knowing it! Here's how to check yours in 10 seconds."<br><br>

        <strong>[0:03 - 0:12] THE MISTAKE:</strong><br>
        <em>Visual:</em> Quick screen recording showing an unaccredited search portal.<br>
        <em>Audio:</em> "Most people just look at the logo. But anyone can put an ISO logo on Canva! The only thing that matters? The <strong>IAF accreditation mark</strong> and the verifiable certificate number."<br><br>

        <strong>[0:12 - 0:22] THE SOLUTION:</strong><br>
        <em>Visual:</em> Split screen showing IAF CertSearch official portal and entering a live number.<br>
        <em>Audio:</em> "Go to iafcertsearch.org. Type in your company name or certificate ID. If it doesn't show up with an active IAF body? It's not recognized globally."<br><br>

        <strong>[0:22 - 0:30] CTA:</strong><br>
        <em>Visual:</em> Text overlay: 'Comment CERTIFY for a Free Audit'<br>
        <em>Audio:</em> "Want to get genuine, globally accredited certification for your brand without middlemen? Comment 'CERTIFY' and we'll check your status for free!"
      </div>
    `
  },
  "certify-yt": {
    client: "Certify Karo",
    category: "YouTube Long-Form Script",
    title: "YouTube Script: The Ultimate Beginner's Guide to ISO & Business Certifications in India",
    meta: "Duration: 8-10 Minute Explainer | Tone: Authoritative, Approachable, Structured",
    content: `
      <h2>YouTube Long-Form Script Architecture</h2>
      <p>A structured video script designed for maximum average watch duration (AWD) and conversion for prospective enterprise clients.</p>

      <h3>Script Highlights</h3>
      <div class="script-cue">
        <strong>[Intro Hook - 0:00 to 0:45]:</strong> "If you're bidding for government tenders, pitching to corporate clients, or trying to scale your exports, you've likely seen one requirement on every RFP: 'ISO 9001 or ISO 27001 Certified'. But what does it actually cost, how long does it take, and which certification does YOUR specific business need? In this video, we break down every single step..."<br><br>
        <strong>[Chapter 1: The Certification Matrix]:</strong> Explaining ISO 9001 (Quality), ISO 27001 (Data Security), ISO 14001 (Environmental), and GMP.<br><br>
        <strong>[Chapter 2: Cost & Timeline Truths]:</strong> Cutting through broker myths and breaking down actual audit timelines.<br><br>
        <strong>[Chapter 3: Step-by-Step Documentation Checklist]:</strong> Internal audits, policy documents, non-conformance rectifications.<br><br>
        <strong>[Outro & Lead Magnet]:</strong> Free downloadable ISO Readiness Checklist link in pinned comment.
      </div>
    `
  },
  "legal-tech": {
    client: "Legal & Fintech Editorial",
    category: "B.A. LL.B. Research Article",
    title: "Smart Contracts vs Traditional Agreements: A Plain-English Legal Comparison",
    meta: "Specialty: Legal-Tech Analysis | Perspective: B.A. LL.B. Interdisciplinary Insight",
    content: `
      <h2>Bridging Code and Jurisprudence</h2>
      <p>With a background in law (B.A. LL.B.), I specialize in deconstructing dense legal, regulatory, and financial frameworks into compelling, accessible digital literature.</p>

      <h3>The Fundamental Tension: Rigidity vs Ambiguity</h3>
      <p>Traditional contract law deliberately leaves room for commercial flexibility through terms like 'reasonable efforts' and 'good faith'. Smart contracts, executed on distributed ledger protocols, replace ambiguity with strict deterministic logic: <code>if X occurs, execute Y</code>.</p>

      <div class="script-cue">
        <strong>Editorial Takeaway:</strong> Technology does not eliminate legal principles; it formalizes them. Companies bridging both worlds require content that resonates with both developers and legal counsels.
      </div>

      <h3>Key Takeaways for Modern Fintechs</h3>
      <p>1. Hybrid contracts combining natural language agreements with cryptographic triggers.<br>
      2. Jurisdiction and dispute resolution clauses for cross-border tokenized settlements.<br>
      3. Compliance clarity for non-technical enterprise adopters.</p>
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
        if (modalMeta) modalMeta.textContent = sample.meta;
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
