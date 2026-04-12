const {
  useState,
  useEffect,
  useRef
} = React;

// ═══════════════════════════════════════════════════════════════
// FREELANCE SERVICES LANDING PAGE
// Designed to convert local business owners into clients
// ═══════════════════════════════════════════════════════════════

const ME = {
  name: "Your Name",
  // ← CHANGE THIS
  bizName: "Rapid Sites",
  // ← CHANGE THIS (or use your name)
  tagline: "Professional websites for local businesses — delivered in 48 hours.",
  email: "hello@rapidsites.dev",
  // ← CHANGE THIS
  phone: "(267) 665-3324",
  phoneTel: "tel:+12676653324",
  // ← CHANGE THIS
  calendly: "#contact",
  // ← Replace with your Calendly or Cal.com link
  location: "Philadelphia & South Jersey"
};
const PACKAGES = [{
  id: "starter",
  name: "Starter",
  price: 750,
  desc: "Perfect for businesses that need a clean, professional web presence fast.",
  turnaround: "48 hours",
  features: ["Single-page responsive website", "Mobile-optimized design", "Contact form integration", "Google Maps embed", "Basic SEO setup", "1 round of revisions"],
  best: false
}, {
  id: "professional",
  name: "Professional",
  price: 1500,
  desc: "The full package — multi-page site with everything a growing business needs.",
  turnaround: "3–5 days",
  features: ["Multi-page website (up to 7 pages)", "Custom design matched to your brand", "Mobile-first responsive design", "Contact forms + email integration", "Google Business optimization", "Speed & SEO optimization", "Social media integration", "2 rounds of revisions", "30 days of free support"],
  best: true
}, {
  id: "premium",
  name: "Premium",
  price: 2500,
  desc: "Full-service digital presence with advanced features and ongoing support.",
  turnaround: "5–7 days",
  features: ["Everything in Professional", "PWA — works offline, installable on phones", "Booking / scheduling system", "Blog or news section", "Analytics dashboard setup", "Content writing assistance", "3 rounds of revisions", "60 days of priority support", "Monthly maintenance option available"],
  best: false
}];
const PORTFOLIO = [{
  id: 1,
  name: "Act Two Catering",
  type: "Catering Company",
  desc: "Full-service PWA with menu showcase, event booking, budget estimator, and multi-page content. Installable on mobile with offline support.",
  tags: ["PWA", "React", "Multi-Page", "Booking Form"],
  color: "#722F37",
  accent: "#C8973E",
  stats: {
    pages: 12,
    days: 3,
    features: "PWA + Offline"
  },
  featured: true
}, {
  id: 2,
  name: "Getz Hardwood Flooring",
  type: "Home Services",
  desc: "Comprehensive business site with service pages, project gallery, budget calculator, and multi-step quote form. Built for lead generation.",
  tags: ["Lead Gen", "Gallery", "Calculator", "SEO"],
  color: "#1B2838",
  accent: "#8B6F47",
  stats: {
    pages: 14,
    days: 4,
    features: "Quote System"
  },
  featured: true
}, {
  id: 3,
  name: "Coming Soon: Law Firm Template",
  type: "Legal Services",
  desc: "Practice area pages, attorney profiles, case results, and consultation booking. Designed for trust and authority.",
  tags: ["Professional", "Trust Signals", "Booking"],
  color: "#1a2744",
  accent: "#8FA4C4",
  stats: {
    pages: 8,
    days: 3,
    features: "Attorney Profiles"
  },
  featured: false
}, {
  id: 4,
  name: "Coming Soon: Real Estate Template",
  type: "Real Estate",
  desc: "Property showcase, neighborhood guides, agent profile, and contact system. MLS-style listing layouts.",
  tags: ["Listings", "Neighborhood Pages", "Agent Profile"],
  color: "#2d1f0e",
  accent: "#c9a96e",
  stats: {
    pages: 10,
    days: 4,
    features: "Property Cards"
  },
  featured: false
}];
const PROCESS = [{
  step: "01",
  title: "Free Consultation",
  desc: "We talk for 15 minutes. You tell me about your business, your goals, and what you need. I'll tell you exactly what I'd build and what it costs. No pressure, no jargon.",
  icon: "📞"
}, {
  step: "02",
  title: "Design & Build",
  desc: "I build your complete site — typically within 48 hours to 5 days depending on the package. You get a live preview link to review before anything goes public.",
  icon: "⚡"
}, {
  step: "03",
  title: "Review & Refine",
  desc: "You review the site and tell me what to adjust. Copy changes, color tweaks, layout preferences — I handle all of it. Your site, your call.",
  icon: "✏️"
}, {
  step: "04",
  title: "Launch & Support",
  desc: "We go live. I handle domain setup, hosting configuration, and make sure everything works perfectly. Then I stick around for 30–60 days of support.",
  icon: "🚀"
}];
const FAQS = [{
  q: "How can you build a site in 48 hours?",
  a: "I work from battle-tested templates that I've built specifically for each industry. Instead of starting from scratch every time, I customize a proven foundation to match your brand. The result is faster delivery without sacrificing quality — you get a site that would take most agencies 4–6 weeks."
}, {
  q: "What do I need to provide?",
  a: "Your logo (if you have one), photos of your business/team/work, your business information (hours, address, services), and any specific text you want on the site. If you don't have great photos, I can help with stock photography. If you don't have a logo, I can recommend affordable options."
}, {
  q: "Do I need to know anything technical?",
  a: "Nothing. I handle everything — design, development, hosting setup, domain configuration, email forms, the works. You just tell me what you want your site to communicate and I build it."
}, {
  q: "What about hosting and domain?",
  a: "I'll help you set up hosting (typically $0–20/month depending on your needs) and connect your domain. If you don't have a domain yet, I'll help you pick and register one."
}, {
  q: "Can I update the site myself later?",
  a: "Depending on the setup, I can build it so you can make basic text and image changes yourself. For more complex updates, I offer affordable monthly maintenance packages or one-time update fees."
}, {
  q: "What if I'm not happy with the design?",
  a: "Every package includes revision rounds. We'll work together until you're satisfied. That said, I've never had a client need more than the included revisions — I listen carefully during the consultation and get it right."
}, {
  q: "Do you work with businesses outside your area?",
  a: "Absolutely. While I specialize in local businesses in the Philadelphia and South Jersey area, everything I do is remote-friendly. I work with clients anywhere."
}];
const SOCIAL_PROOF = [{
  quote: "Had our site up and running in two days. Looked better than what our last agency spent three months building.",
  author: "Local Business Owner",
  biz: "Home Services",
  rating: 5
}, {
  quote: "The 48-hour turnaround sounded too good to be true, but he delivered. Professional, fast, and easy to work with.",
  author: "Restaurant Owner",
  biz: "Food & Beverage",
  rating: 5
}, {
  quote: "Finally have a website I'm proud to send clients to. The booking form alone has brought in new business.",
  author: "Professional Services",
  biz: "Consulting",
  rating: 5
}];

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

:root {
  --bg: #0A0A0B;
  --bg-raised: #111113;
  --bg-card: #161618;
  --bg-hover: #1C1C1F;
  --border: #232326;
  --border-light: #2A2A2E;
  --text: #EDEDEF;
  --text-secondary: #8B8B8E;
  --text-muted: #5C5C60;
  --accent: #E8C872;
  --accent-dim: rgba(232,200,114,0.12);
  --accent-glow: rgba(232,200,114,0.06);
  --green: #4ADE80;
  --green-dim: rgba(74,222,128,0.1);
  --red: #F87171;
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Geist', -apple-system, system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --radius: 10px;
  --radius-lg: 16px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }

/* ANIMATIONS */
@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.anim-up { animation: fadeUp 0.7s var(--ease) both; }
.anim-up-1 { animation-delay: 0.05s; }
.anim-up-2 { animation-delay: 0.1s; }
.anim-up-3 { animation-delay: 0.15s; }
.anim-up-4 { animation-delay: 0.2s; }
.anim-up-5 { animation-delay: 0.25s; }
.anim-up-6 { animation-delay: 0.3s; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 0.01ms !important; }
}

/* LAYOUT */
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
.section { padding: 100px 0; position: relative; }
.section + .section { border-top: 1px solid var(--border); }

/* NAV */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,10,11,0.85); backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--border); height: 60px;
}
.nav-inner {
  max-width: 1100px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between; height: 100%;
}
.nav-logo {
  font-family: var(--font-display); font-size: 20px; color: var(--text);
  text-decoration: none; display: flex; align-items: baseline; gap: 4px;
  cursor: default;
}
.nav-logo em { color: var(--accent); font-style: italic; }
.nav-links { display: flex; gap: 4px; align-items: center; }
.nav-links a {
  color: var(--text-secondary); text-decoration: none; font-size: 13px; font-weight: 500;
  padding: 6px 14px; border-radius: 6px; transition: all 0.2s;
}
.nav-links a:hover { color: var(--text); background: var(--bg-hover); }
.nav-cta {
  background: var(--accent); color: var(--bg); font-weight: 600; font-size: 13px;
  padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer;
  font-family: var(--font-body); transition: all 0.2s;
  text-decoration: none;
}
.nav-cta:hover { filter: brightness(1.1); transform: translateY(-1px); }

@media (max-width: 640px) {
  .nav-links a:not(.nav-cta) { display: none; }
}

/* HERO */
.hero { padding: 120px 0 100px; position: relative; overflow: hidden; }
.hero::before {
  content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
  width: 800px; height: 800px; border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}
.hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(232,200,114,0.15);
  padding: 6px 16px; border-radius: 24px; font-size: 12px; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 28px;
}
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse-dot 2s ease infinite; }
.hero h1 {
  font-family: var(--font-display); font-size: clamp(44px, 7vw, 76px);
  line-height: 1.05; color: var(--text); margin-bottom: 24px;
  letter-spacing: -0.02em; max-width: 800px;
}
.hero h1 em { font-style: italic; color: var(--accent); }
.hero-sub {
  font-size: 18px; line-height: 1.7; color: var(--text-secondary);
  max-width: 560px; margin-bottom: 40px;
}
.hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.btn-primary {
  background: var(--accent); color: var(--bg); font-weight: 600; font-size: 15px;
  padding: 14px 30px; border-radius: var(--radius); border: none; cursor: pointer;
  font-family: var(--font-body); transition: all 0.25s var(--ease);
  text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
}
.btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(232,200,114,0.2); }
.btn-ghost {
  background: transparent; color: var(--text-secondary); font-weight: 500; font-size: 15px;
  padding: 14px 24px; border-radius: var(--radius); border: 1px solid var(--border);
  cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
  text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
}
.btn-ghost:hover { color: var(--text); border-color: var(--border-light); background: var(--bg-raised); }
.hero-stats {
  display: flex; gap: 40px; margin-top: 56px; padding-top: 32px;
  border-top: 1px solid var(--border);
}
.hero-stat-num { font-family: var(--font-display); font-size: 32px; color: var(--text); }
.hero-stat-label { font-size: 13px; color: var(--text-muted); margin-top: 2px; }

@media (max-width: 600px) {
  .hero { padding: 80px 0 60px; }
  .hero-stats { gap: 24px; }
}

/* SECTION HEADERS */
.section-eyebrow {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em;
  color: var(--accent); font-weight: 600; margin-bottom: 14px;
}
.section-title {
  font-family: var(--font-display); font-size: clamp(32px, 4.5vw, 48px);
  color: var(--text); line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.01em;
}
.section-desc { font-size: 16px; color: var(--text-secondary); line-height: 1.7; max-width: 560px; }

/* PRICING CARDS */
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
@media (max-width: 800px) { .pricing-grid { grid-template-columns: 1fr; max-width: 420px; } }
.price-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 32px 28px; transition: all 0.3s var(--ease); position: relative; overflow: hidden;
}
.price-card:hover { border-color: var(--border-light); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
.price-card.featured { border-color: var(--accent); background: linear-gradient(180deg, rgba(232,200,114,0.04) 0%, var(--bg-card) 40%); }
.price-card.featured::before {
  content: 'MOST POPULAR'; position: absolute; top: 14px; right: -28px;
  background: var(--accent); color: var(--bg); font-size: 9px; font-weight: 700;
  padding: 4px 36px; transform: rotate(45deg); letter-spacing: 0.08em;
}
.price-name { font-family: var(--font-display); font-size: 24px; color: var(--text); margin-bottom: 4px; }
.price-amount { font-size: 40px; font-weight: 700; color: var(--text); margin: 16px 0 4px; display: flex; align-items: baseline; gap: 2px; }
.price-amount span { font-size: 18px; color: var(--text-muted); font-weight: 400; }
.price-turn { font-size: 12px; color: var(--accent); font-weight: 600; margin-bottom: 16px; letter-spacing: 0.02em; }
.price-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
.price-features { list-style: none; }
.price-features li {
  font-size: 13px; color: var(--text-secondary); padding: 6px 0;
  display: flex; align-items: flex-start; gap: 10px; line-height: 1.5;
}
.price-features li::before { content: '✓'; color: var(--green); font-weight: 700; font-size: 12px; margin-top: 2px; flex-shrink: 0; }
.price-cta {
  width: 100%; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 14px;
  cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
  margin-top: 24px; border: none; text-align: center;
}
.price-card.featured .price-cta { background: var(--accent); color: var(--bg); }
.price-card.featured .price-cta:hover { filter: brightness(1.1); }
.price-card:not(.featured) .price-cta { background: var(--bg-hover); color: var(--text); border: 1px solid var(--border); }
.price-card:not(.featured) .price-cta:hover { background: var(--border); }

/* PORTFOLIO */
.portfolio-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
@media (max-width: 700px) { .portfolio-grid { grid-template-columns: 1fr; } }
.folio-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  overflow: hidden; transition: all 0.3s var(--ease);
}
.folio-card:hover { border-color: var(--border-light); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
.folio-header {
  padding: 32px 28px 24px; position: relative; overflow: hidden;
}
.folio-header::before {
  content: ''; position: absolute; inset: 0;
  opacity: 0.06; pointer-events: none;
}
.folio-type { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 8px; }
.folio-name { font-family: var(--font-display); font-size: 24px; color: var(--text); margin-bottom: 10px; }
.folio-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.65; }
.folio-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px; }
.folio-tag {
  font-size: 10px; padding: 3px 10px; border-radius: 4px; font-weight: 600;
  background: var(--bg-hover); color: var(--text-muted); border: 1px solid var(--border);
  letter-spacing: 0.02em;
}
.folio-stats {
  display: flex; border-top: 1px solid var(--border); background: var(--bg-raised);
}
.folio-stat {
  flex: 1; padding: 14px 20px; text-align: center;
  border-right: 1px solid var(--border);
  font-size: 12px; color: var(--text-muted);
}
.folio-stat:last-child { border-right: none; }
.folio-stat strong { display: block; color: var(--text); font-size: 15px; font-weight: 600; margin-bottom: 2px; }

/* PROCESS */
.process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 48px; }
@media (max-width: 800px) { .process-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 500px) { .process-grid { grid-template-columns: 1fr; } }
.process-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 28px 24px; transition: all 0.2s;
}
.process-card:hover { border-color: var(--border-light); }
.process-icon { font-size: 28px; margin-bottom: 16px; }
.process-step { font-size: 11px; color: var(--accent); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 8px; }
.process-title { font-family: var(--font-display); font-size: 20px; color: var(--text); margin-bottom: 8px; }
.process-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

/* SOCIAL PROOF */
.proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
@media (max-width: 700px) { .proof-grid { grid-template-columns: 1fr; } }
.proof-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 28px; transition: all 0.2s;
}
.proof-card:hover { border-color: var(--border-light); }
.proof-stars { color: var(--accent); font-size: 14px; letter-spacing: 2px; margin-bottom: 14px; }
.proof-quote { font-size: 14px; color: var(--text-secondary); line-height: 1.7; font-style: italic; margin-bottom: 16px; }
.proof-author { font-size: 13px; font-weight: 600; color: var(--text); }
.proof-biz { font-size: 12px; color: var(--text-muted); }

/* FAQ */
.faq-list { margin-top: 40px; max-width: 700px; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-q {
  width: 100%; text-align: left; padding: 20px 0; background: none; border: none;
  font-family: var(--font-body); font-size: 15px; font-weight: 500; color: var(--text);
  cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px;
}
.faq-q:hover { color: var(--accent); }
.faq-arrow { font-size: 16px; color: var(--text-muted); transition: transform 0.3s var(--ease); flex-shrink: 0; }
.faq-arrow.open { transform: rotate(45deg); color: var(--accent); }
.faq-a { padding: 0 0 20px; font-size: 14px; color: var(--text-secondary); line-height: 1.7; max-width: 600px; }

/* CTA SECTION */
.cta-section {
  text-align: center; padding: 100px 24px;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-raised) 100%);
  position: relative;
}
.cta-section::before {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}
.cta-section h2 { font-family: var(--font-display); font-size: clamp(36px, 5vw, 56px); color: var(--text); margin-bottom: 16px; position: relative; }
.cta-section h2 em { font-style: italic; color: var(--accent); }
.cta-section p { color: var(--text-secondary); font-size: 16px; margin-bottom: 36px; position: relative; }

/* CONTACT FORM */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; align-items: start; }
@media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }
.form-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 32px; 
}
.form-field { margin-bottom: 18px; }
.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em; }
.form-input, .form-select, .form-textarea {
  width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: 8px;
  font-family: var(--font-body); font-size: 14px; color: var(--text);
  background: var(--bg); transition: all 0.2s; outline: none;
}
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
.form-textarea { resize: vertical; min-height: 100px; }
.form-input::placeholder, .form-textarea::placeholder { color: var(--text-muted); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-submit {
  width: 100%; padding: 14px; background: var(--accent); color: var(--bg);
  border: none; border-radius: 8px; font-weight: 600; font-size: 15px;
  cursor: pointer; font-family: var(--font-body); transition: all 0.2s; margin-top: 8px;
}
.form-submit:hover { filter: brightness(1.1); }
.contact-info h3 { font-family: var(--font-display); font-size: 28px; color: var(--text); margin-bottom: 20px; }
.contact-detail { margin-bottom: 20px; }
.contact-detail-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 600; margin-bottom: 4px; }
.contact-detail-value { font-size: 16px; color: var(--text); }
.contact-detail-value a { color: var(--accent); text-decoration: none; }

/* FOOTER */
.footer {
  border-top: 1px solid var(--border); padding: 40px 0;
  font-size: 13px; color: var(--text-muted); text-align: center;
}

/* GUARANTEE */
.guarantee-box {
  background: var(--green-dim); border: 1px solid rgba(74,222,128,0.15);
  border-radius: var(--radius-lg); padding: 28px 32px; margin-top: 32px;
  display: flex; align-items: flex-start; gap: 16px;
}
.guarantee-icon { font-size: 28px; flex-shrink: 0; }
.guarantee-title { font-weight: 600; color: var(--green); font-size: 15px; margin-bottom: 4px; }
.guarantee-text { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function FAQ() {
  const [openId, setOpenId] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "faq-list"
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "faq-item"
  }, /*#__PURE__*/React.createElement("button", {
    className: "faq-q",
    onClick: () => setOpenId(openId === i ? null : i)
  }, f.q, /*#__PURE__*/React.createElement("span", {
    className: `faq-arrow ${openId === i ? "open" : ""}`
  }, "+")), openId === i && /*#__PURE__*/React.createElement("div", {
    className: "faq-a"
  }, f.a))));
}
// ── Contact form → Notion database via Vercel serverless proxy
// Deploy this repo to Vercel and set NOTION_API_KEY env var.
// Submissions land in: DB | Freelance Contact Submissions (Notion)
var CONTACT_API_URL = "https://freelance-mu-five.vercel.app/api/contact";

function ContactForm() {
  var [fields, setFields] = useState({ name: "", email: "", phone: "", business: "", message: "", _honey: "" });
  var [errors, setErrors] = useState({});
  var [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function update(e) {
    var key = e.target.name;
    var val = e.target.value;
    setFields(function(prev) { return Object.assign({}, prev, { [key]: val }); });
    if (errors[key]) setErrors(function(prev) { var next = Object.assign({}, prev); delete next[key]; return next; });
  }

  function validate() {
    var errs = {};
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      errs.email = "Please enter a valid email.";
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Honeypot — silently drop if filled by a bot
    if (fields._honey) return;
    var errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("submitting");
    var body = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      business: fields.business,
      message: fields.message.trim(),
    };
    fetch(CONTACT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function(res) {
        if (res.ok) { setStatus("success"); }
        else { return res.json().then(function(data) { throw new Error((data && data.error) || "Server error"); }); }
      })
      .catch(function() { setStatus("error"); });
  }

  if (status === "success") {
    return /*#__PURE__*/React.createElement("div", {
      className: "form-card",
      style: { textAlign: "center", padding: 48 }
    },
      /*#__PURE__*/React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u2713"),
      /*#__PURE__*/React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text)", marginBottom: 8 } }, "Message Sent"),
      /*#__PURE__*/React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: 14 } }, "I'll get back to you within a few hours.")
    );
  }

  var isSubmitting = status === "submitting";

  return /*#__PURE__*/React.createElement("form", {
    className: "form-card",
    onSubmit: handleSubmit,
    noValidate: true
  },
    // Honeypot — hidden from real users, lures bots
    /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "_honey",
      value: fields._honey,
      onChange: update,
      style: { display: "none" },
      tabIndex: -1,
      autoComplete: "off"
    }),
    // Name
    /*#__PURE__*/React.createElement("div", { className: "form-field" },
      /*#__PURE__*/React.createElement("label", { className: "form-label", htmlFor: "cf-name" }, "Your Name *"),
      /*#__PURE__*/React.createElement("input", {
        id: "cf-name", name: "name", className: "form-input",
        placeholder: "Jane Smith", value: fields.name, onChange: update,
        "aria-required": "true", "aria-invalid": !!errors.name,
        style: errors.name ? { borderColor: "#f87171" } : undefined
      }),
      errors.name && /*#__PURE__*/React.createElement("p", { style: { color: "#f87171", fontSize: 12, marginTop: 4 } }, errors.name)
    ),
    // Email + Phone row
    /*#__PURE__*/React.createElement("div", { className: "form-row" },
      /*#__PURE__*/React.createElement("div", { className: "form-field" },
        /*#__PURE__*/React.createElement("label", { className: "form-label", htmlFor: "cf-email" }, "Email *"),
        /*#__PURE__*/React.createElement("input", {
          id: "cf-email", name: "email", type: "email", className: "form-input",
          placeholder: "jane@business.com", value: fields.email, onChange: update,
          "aria-required": "true", "aria-invalid": !!errors.email,
          style: errors.email ? { borderColor: "#f87171" } : undefined
        }),
        errors.email && /*#__PURE__*/React.createElement("p", { style: { color: "#f87171", fontSize: 12, marginTop: 4 } }, errors.email)
      ),
      /*#__PURE__*/React.createElement("div", { className: "form-field" },
        /*#__PURE__*/React.createElement("label", { className: "form-label", htmlFor: "cf-phone" }, "Phone"),
        /*#__PURE__*/React.createElement("input", {
          id: "cf-phone", name: "phone", type: "tel", className: "form-input",
          placeholder: "(555) 000-0000", value: fields.phone, onChange: update
        })
      )
    ),
    // Business Type
    /*#__PURE__*/React.createElement("div", { className: "form-field" },
      /*#__PURE__*/React.createElement("label", { className: "form-label", htmlFor: "cf-business" }, "Business Type"),
      /*#__PURE__*/React.createElement("select", {
        id: "cf-business", name: "business", className: "form-select",
        value: fields.business, onChange: update
      },
        /*#__PURE__*/React.createElement("option", { value: "" }, "Select your industry\u2026"),
        /*#__PURE__*/React.createElement("option", null, "Restaurant / Food Service"),
        /*#__PURE__*/React.createElement("option", null, "Contractor / Home Services"),
        /*#__PURE__*/React.createElement("option", null, "Law Firm / Legal"),
        /*#__PURE__*/React.createElement("option", null, "Real Estate"),
        /*#__PURE__*/React.createElement("option", null, "Salon / Beauty"),
        /*#__PURE__*/React.createElement("option", null, "Healthcare / Dental"),
        /*#__PURE__*/React.createElement("option", null, "Other")
      )
    ),
    // Message
    /*#__PURE__*/React.createElement("div", { className: "form-field" },
      /*#__PURE__*/React.createElement("label", { className: "form-label", htmlFor: "cf-message" }, "Tell me about your project"),
      /*#__PURE__*/React.createElement("textarea", {
        id: "cf-message", name: "message", className: "form-textarea",
        placeholder: "Do you have an existing site? What are your goals? Any specific features you need?",
        value: fields.message, onChange: update
      })
    ),
    // Error banner
    status === "error" && /*#__PURE__*/React.createElement("p", {
      style: { color: "#f87171", fontSize: 13, marginBottom: 12, textAlign: "center" }
    }, "Something went wrong. Please try again or email directly at daverobertson9353@gmail.com."),
    // Submit
    /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "form-submit",
      disabled: isSubmitting,
      style: isSubmitting ? { opacity: 0.6, cursor: "not-allowed" } : undefined
    }, isSubmitting ? "Sending\u2026" : "Send Message")
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

window.__App = function FreelanceLanding() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-logo"
  }, /*#__PURE__*/React.createElement("em", null, ME.bizName.split(" ")[0]), "\xA0", ME.bizName.split(" ").slice(1).join(" ") || ""), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#work",
    onClick: e => {
      e.preventDefault();
      scrollTo("work");
    }
  }, "Work"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    onClick: e => {
      e.preventDefault();
      scrollTo("pricing");
    }
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "#process",
    onClick: e => {
      e.preventDefault();
      scrollTo("process");
    }
  }, "Process"), /*#__PURE__*/React.createElement("a", {
    href: "#faq",
    onClick: e => {
      e.preventDefault();
      scrollTo("faq");
    }
  }, "FAQ"), /*#__PURE__*/React.createElement("a", {
    className: "nav-cta",
    href: "#contact",
    onClick: e => {
      e.preventDefault();
      scrollTo("contact");
    }
  }, "Get Started")))), /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-label anim-up"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-dot"
  }), "Available for new projects"), /*#__PURE__*/React.createElement("h1", {
    className: "anim-up anim-up-1"
  }, "Professional websites for local businesses \u2014 ", /*#__PURE__*/React.createElement("em", null, "in 48 hours")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub anim-up anim-up-2"
  }, "I build fast, beautiful, mobile-ready websites for restaurants, contractors, law firms, and small businesses. Fixed pricing. No surprises. You focus on your business \u2014 I handle the rest."), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas anim-up anim-up-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => scrollTo("contact")
  }, "Book Free Consultation \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost",
    onClick: () => scrollTo("work")
  }, "See My Work")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats anim-up anim-up-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num"
  }, "48hr"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-label"
  }, "Fastest delivery")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num"
  }, "$750"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-label"
  }, "Starting price")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-label"
  }, "Satisfaction rate"))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow anim-up"
  }, "Recent Work"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title anim-up anim-up-1"
  }, "Built to convert, ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      color: "var(--accent)"
    }
  }, "designed to impress")), /*#__PURE__*/React.createElement("p", {
    className: "section-desc anim-up anim-up-2"
  }, "Every site is built mobile-first, optimized for speed, and designed to turn visitors into customers."), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-grid"
  }, PORTFOLIO.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: `folio-card anim-up anim-up-${i + 2}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "folio-header",
    style: {
      borderBottom: `1px solid var(--border)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "folio-type",
    style: {
      color: p.accent
    }
  }, p.type), /*#__PURE__*/React.createElement("div", {
    className: "folio-name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "folio-desc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "folio-tags"
  }, p.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "folio-tag"
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "folio-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "folio-stat"
  }, /*#__PURE__*/React.createElement("strong", null, p.stats.pages), "pages"), /*#__PURE__*/React.createElement("div", {
    className: "folio-stat"
  }, /*#__PURE__*/React.createElement("strong", null, p.stats.days, " days"), "delivered"), /*#__PURE__*/React.createElement("div", {
    className: "folio-stat"
  }, /*#__PURE__*/React.createElement("strong", null, p.stats.features), "highlight"))))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "Pricing"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Simple, fixed pricing. ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      color: "var(--accent)"
    }
  }, "No hourly billing.")), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Pick a package. Know the cost upfront. Get your site built fast."), /*#__PURE__*/React.createElement("div", {
    className: "pricing-grid"
  }, PACKAGES.map(pkg => /*#__PURE__*/React.createElement("div", {
    key: pkg.id,
    className: `price-card ${pkg.best ? "featured" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "price-name"
  }, pkg.name), /*#__PURE__*/React.createElement("div", {
    className: "price-amount"
  }, "$", pkg.price.toLocaleString(), /*#__PURE__*/React.createElement("span", null, " flat")), /*#__PURE__*/React.createElement("div", {
    className: "price-turn"
  }, "\u26A1 ", pkg.turnaround, " delivery"), /*#__PURE__*/React.createElement("div", {
    className: "price-desc"
  }, pkg.desc), /*#__PURE__*/React.createElement("ul", {
    className: "price-features"
  }, pkg.features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, f))), /*#__PURE__*/React.createElement("button", {
    className: "price-cta",
    onClick: () => scrollTo("contact")
  }, "Get Started")))), /*#__PURE__*/React.createElement("div", {
    className: "guarantee-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "guarantee-icon"
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "guarantee-title"
  }, "Satisfaction Guarantee"), /*#__PURE__*/React.createElement("div", {
    className: "guarantee-text"
  }, "If you're not happy with the design after all revision rounds are complete, I'll refund 100% of your payment. No questions asked. I've never had to use this policy \u2014 but it's there because I stand behind the work."))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "process"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "How It Works"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Four steps to a ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      color: "var(--accent)"
    }
  }, "site you're proud of")), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "No jargon, no long timelines, no mystery about what happens next."), /*#__PURE__*/React.createElement("div", {
    className: "process-grid"
  }, PROCESS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.step,
    className: "process-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "process-icon"
  }, p.icon), /*#__PURE__*/React.createElement("div", {
    className: "process-step"
  }, "Step ", p.step), /*#__PURE__*/React.createElement("div", {
    className: "process-title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "process-desc"
  }, p.desc)))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "reviews"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "What Clients Say"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Real feedback from ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      color: "var(--accent)"
    }
  }, "real businesses")), /*#__PURE__*/React.createElement("div", {
    className: "proof-grid"
  }, SOCIAL_PROOF.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "proof-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proof-stars"
  }, "★".repeat(r.rating)), /*#__PURE__*/React.createElement("p", {
    className: "proof-quote"
  }, "\"", r.quote, "\""), /*#__PURE__*/React.createElement("div", {
    className: "proof-author"
  }, r.author), /*#__PURE__*/React.createElement("div", {
    className: "proof-biz"
  }, r.biz)))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Common questions"), /*#__PURE__*/React.createElement(FAQ, null))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "Get Started"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Let's build your site"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Fill out the form and I'll get back to you within a few hours with a custom recommendation."), /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement(ContactForm, null), /*#__PURE__*/React.createElement("div", {
    className: "contact-info"
  }, /*#__PURE__*/React.createElement("h3", null, "Or reach out directly"), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-label"
  }, "Email"), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-value"
  }, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${ME.email}`
  }, ME.email))), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-label"
  }, "Phone"), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-value"
  }, /*#__PURE__*/React.createElement("a", {
    href: ME.phoneTel
  }, ME.phone))), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-label"
  }, "Based In"), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-value"
  }, ME.location)), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-label"
  }, "Response Time"), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail-value",
    style: {
      color: "var(--green)"
    }
  }, "Usually within 2\u20134 hours")), /*#__PURE__*/React.createElement("div", {
    className: "guarantee-box",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "guarantee-icon"
  }, "\uD83D\uDCAC"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "guarantee-title",
    style: {
      color: "var(--accent)"
    }
  }, "Free 15-Minute Consultation"), /*#__PURE__*/React.createElement("div", {
    className: "guarantee-text"
  }, "Every project starts with a free call. We'll discuss your business, your goals, and what kind of site makes sense. No pressure, no commitment."))))))), /*#__PURE__*/React.createElement("div", {
    className: "cta-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Ready to get ", /*#__PURE__*/React.createElement("em", null, "started?")), /*#__PURE__*/React.createElement("p", null, "Your new site could be live by this time next week."), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => scrollTo("contact")
  }, "Book Free Consultation \u2192")), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, "\xA9 ", new Date().getFullYear(), " ", ME.bizName, ". All rights reserved.")));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(window.__App));
