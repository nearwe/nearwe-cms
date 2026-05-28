import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface TemplateData {
  heroTitle: string;
  heroSub: string;
  greeting: string;
  para1: string;
  para2: string;
  closing: string;
}

type TemplateKey = "custom" | "intro" | "proposal" | "followup" | "thankyou" | "invoice" | "onboarding";

// ─── Template Presets ────────────────────────────────────────────────────────
const templates: Record<TemplateKey, TemplateData> = {
  custom: { heroTitle: "", heroSub: "", greeting: "", para1: "", para2: "", closing: "" },
  intro: {
    heroTitle: "Let's Connect & Build Together",
    heroSub: "Nearwe Labs — Bringing businesses closer through smart technology.",
    greeting: "Dear [Recipient Name],",
    para1: "I hope this message finds you well. I'm reaching out from Nearwe Labs LLP, a technology company based in Indore, Madhya Pradesh, focused on building location-aware and proximity-based digital solutions.",
    para2: "We'd love to explore how we can collaborate or add value to your business. Our team has deep expertise in building scalable tech products and we'd be happy to schedule a quick call at your convenience.",
    closing: "Looking forward to connecting with you!",
  },
  proposal: {
    heroTitle: "A Proposal for Your Consideration",
    heroSub: "Nearwe Labs — Tailored technology solutions for modern businesses.",
    greeting: "Dear [Recipient Name],",
    para1: "Thank you for your time and interest. We are pleased to present this proposal from Nearwe Labs LLP, outlining how our technology solutions can address your specific business needs.",
    para2: "Our team has carefully reviewed your requirements and we're confident we can deliver exceptional results within your timeline and budget. Please find the detailed scope and pricing below.",
    closing: "We look forward to the opportunity to work with you.",
  },
  followup: {
    heroTitle: "Following Up on Our Conversation",
    heroSub: "Nearwe Labs — Always here when you need us.",
    greeting: "Dear [Recipient Name],",
    para1: "I wanted to follow up on our previous conversation and check if you had a chance to review the information we shared. We're very excited about the potential of working together.",
    para2: "Please let us know if you have any questions or need any additional details. We're happy to schedule a call at a time that works best for you.",
    closing: "Looking forward to your response!",
  },
  thankyou: {
    heroTitle: "Thank You — We Appreciate You!",
    heroSub: "Your trust means everything to us at Nearwe Labs.",
    greeting: "Dear [Recipient Name],",
    para1: "We wanted to take a moment to sincerely thank you for your support and partnership. It's clients and collaborators like you that inspire us to build better technology every single day.",
    para2: "We remain committed to delivering the best possible experience and value. Please don't hesitate to reach out anytime — we're always here for you.",
    closing: "With gratitude, the Nearwe Labs team.",
  },
  invoice: {
    heroTitle: "Invoice & Payment Details",
    heroSub: "Nearwe Labs LLP — GST Registered | GSTIN: 23AAZFN7216J1ZR",
    greeting: "Dear [Recipient Name],",
    para1: "Please find attached the invoice for services rendered as per our agreement. Kindly review the details and process the payment at your earliest convenience.",
    para2: "For any queries regarding this invoice, please contact us at support@nearwe.in or reply to this email. We accept bank transfers, UPI, and other standard payment methods.",
    closing: "Thank you for your prompt attention to this matter.",
  },
  onboarding: {
    heroTitle: "Welcome to Nearwe Labs!",
    heroSub: "We're thrilled to have you on board. Let's build something amazing together.",
    greeting: "Dear [Recipient Name],",
    para1: "Welcome! We're absolutely delighted to have you as part of the Nearwe Labs family. This email contains everything you need to get started — your account details, next steps, and our support contacts.",
    para2: "Our team is fully dedicated to making this journey smooth and successful for you. You can reach us anytime at support@nearwe.in and we'll respond within 24 hours.",
    closing: "Excited to get started with you!",
  },
};

// ─── Build plain-text email HTML for clipboard ───────────────────────────────
function buildEmailHTML(
  heroTitle: string,
  heroSub: string,
  greeting: string,
  para1: string,
  para2: string,
  closing: string
): string {
  const footer = `<table width="100%" cellpadding="0" cellspacing="0" style="background:#0D1117;border-radius:0 0 10px 10px;"><tr><td style="padding:16px 32px;"><div style="font-size:11px;color:#5a6a7a;line-height:1.8;font-family:Arial,sans-serif;">122, Prime Square, Omaxe City 1, Indore — 452001, Madhya Pradesh, India<br>© 2026 Nearwe Labs LLP. All rights reserved. · LLP ID: ACW-4838 · PAN: AAZFN7216J · TAN: BPLN08426F</div></td></tr></table>`;

  return `<div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D1117;border-radius:10px 10px 0 0;"><tr><td style="padding:22px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td><table cellpadding="0" cellspacing="0"><tr>
          <td style="width:34px;height:34px;background:#1a1f2e;border-radius:8px;border:1px solid #2a3040;text-align:center;vertical-align:middle;padding:0 8px;"><span style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#2D68FF;">N</span></td>
          <td style="padding-left:10px;"><div style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;">NEARWE LABS</div></td>
        </tr></table></td>
        <td align="right"><span style="background:#1a2744;border:1px solid #2a4a8a;border-radius:20px;padding:3px 10px;font-size:10px;color:#6ab0f5;font-family:Arial,sans-serif;">LLP · ACW-4838</span></td>
      </tr></table></td></tr></table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D1117;border-top:1px solid #1a2030;"><tr><td style="padding:28px 32px 32px;">
      <span style="display:inline-block;background:#1a2744;border:1px solid #2a4a8a;color:#6ab0f5;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:3px 9px;border-radius:4px;font-family:Arial,sans-serif;">📍 Indore, Madhya Pradesh</span>
      <div style="font-family:Arial,sans-serif;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;margin:12px 0 10px;">${heroTitle}</div>
      <div style="font-size:13px;color:#7a8a9a;line-height:1.7;margin-bottom:20px;font-family:Arial,sans-serif;">${heroSub}</div>
      <a href="https://www.nearwe.in" style="display:inline-block;background:#2D68FF;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;padding:10px 20px;border-radius:6px;text-decoration:none;">Visit nearwe.in →</a>
    </td></tr></table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;"><tr><td style="padding:28px 32px;">
      <div style="font-size:14px;font-weight:600;color:#1a1f2e;margin-bottom:12px;font-family:Arial,sans-serif;">${greeting}</div>
      <div style="font-size:13px;color:#4a5568;line-height:1.8;margin-bottom:12px;font-family:Arial,sans-serif;">${para1}</div>
      ${para2 ? `<div style="font-size:13px;color:#4a5568;line-height:1.8;margin-bottom:12px;font-family:Arial,sans-serif;">${para2}</div>` : ""}
      ${closing ? `<div style="font-size:13px;color:#6b7280;line-height:1.8;margin-bottom:12px;font-style:italic;font-family:Arial,sans-serif;">${closing}</div>` : ""}
      <div style="height:1px;background:#f0f2f5;margin:20px 0;"></div>
      <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;font-weight:600;font-family:Arial,sans-serif;">Get in touch</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fb;border:1px solid #e8ecf0;border-radius:8px;"><tr>
        <td style="padding:14px 16px;"><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,sans-serif;">Support</div><div style="font-size:12px;color:#2D68FF;font-weight:600;font-family:Arial,sans-serif;">support@nearwe.in</div></td>
        <td style="padding:14px 16px;"><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,sans-serif;">Website</div><div style="font-size:12px;color:#2D68FF;font-weight:600;font-family:Arial,sans-serif;">www.nearwe.in</div></td>
        <td style="padding:14px 16px;"><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,sans-serif;">No-Reply</div><div style="font-size:12px;color:#2D68FF;font-weight:600;font-family:Arial,sans-serif;">noreplynearwe@gmail.com</div></td>
      </tr></table>
    </td></tr></table>
    ${footer}
  </div>`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EmailDrafter() {
  const [recipientName, setRecipientName] = useState("");
  const [templateType, setTemplateType] = useState<TemplateKey>("custom");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [greeting, setGreeting] = useState("");
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [closing, setClosing] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Computed preview values
  const previewGreeting = greeting
    ? greeting.replace("[Recipient Name]", recipientName || "[Recipient Name]")
    : recipientName
    ? `Dear ${recipientName},`
    : "Dear [Recipient Name],";

  const previewHeroTitle = heroTitle || "Hello from Nearwe Labs LLP";
  const previewHeroSub = heroSub || "Building smart, location-aware technology solutions from the heart of India.";
  const previewPara1 = para1 || "We're excited to connect with you. At Nearwe Labs, we're building the next generation of proximity and location-based technology solutions to help businesses and communities connect more meaningfully.";

  function applyTemplate(key: TemplateKey) {
    setTemplateType(key);
    const t = templates[key];
    setHeroTitle(t.heroTitle);
    setHeroSub(t.heroSub);
    setGreeting(t.greeting);
    setPara1(t.para1);
    setPara2(t.para2);
    setClosing(t.closing);
  }

  function resetAll() {
    setRecipientName("");
    setTemplateType("custom");
    setHeroTitle("");
    setHeroSub("");
    setGreeting("");
    setPara1("");
    setPara2("");
    setClosing("");
  }

  function copyForGmail() {
    const html = buildEmailHTML(
      previewHeroTitle,
      previewHeroSub,
      previewGreeting,
      previewPara1,
      para2,
      closing
    );
    const blob = new Blob([html], { type: "text/html" });
    const item = new ClipboardItem({ "text/html": blob });
    navigator.clipboard
      .write([item])
      .then(showToast)
      .catch(() => {
        // Fallback: select preview text
        const el = document.getElementById("emailPreview");
        if (!el) return;
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        document.execCommand("copy");
        sel?.removeAllRanges();
        showToast();
      });
  }

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }

  // ─── Styles (inline to keep self-contained) ────────────────────────────────
  const s: Record<string, React.CSSProperties> = {
    root: { display: "flex", flexDirection: "row", minHeight: "100vh", background: "#0f1117", color: "#e5e9f0", fontFamily: "'DM Sans', Arial, sans-serif", overflow: "hidden" },
    left: { width: 360, minWidth: 320, maxWidth: 360, background: "#161b27", borderRight: "1px solid #2a3348", display: "flex", flexDirection: "column", height: "100vh", position: "sticky" as const, top: 0, overflowY: "auto", flexShrink: 0 },
    ph: { padding: "20px 22px 14px", borderBottom: "1px solid #2a3348", background: "#161b27" },
    phRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 3 },
    phLogo: { width: 28, height: 28, background: "#1a2744", borderRadius: 7, border: "1px solid #3a4a6a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    phName: { fontFamily: "'Space Grotesk', Arial, sans-serif", fontSize: 15, fontWeight: 700, color: "#ffffff" },
    phSub: { fontSize: 11, color: "#7a8aa0", letterSpacing: "0.4px" },
    fa: { padding: "18px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 14, background: "#161b27" },
    fg: { display: "flex", flexDirection: "column", gap: 5 },
    label: { fontSize: 10, fontWeight: 600, color: "#7a8aa0", textTransform: "uppercase" as const, letterSpacing: "1px" },
    input: { background: "#0f1117", border: "1px solid #2a3348", borderRadius: 7, color: "#e5e9f0", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: 13, padding: "8px 11px", width: "100%", outline: "none", appearance: "none" as const },
    textarea: { background: "#0f1117", border: "1px solid #2a3348", borderRadius: 7, color: "#e5e9f0", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: 13, padding: "8px 11px", width: "100%", outline: "none", minHeight: 72, lineHeight: "1.6", resize: "vertical" as const },
    select: { background: "#0f1117", border: "1px solid #2a3348", borderRadius: 7, color: "#e5e9f0", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: 13, padding: "8px 11px", width: "100%", outline: "none", appearance: "none" as const },
    dl: { fontSize: 10, color: "#3a4a6a", textTransform: "uppercase" as const, letterSpacing: "1.5px", display: "flex", alignItems: "center", gap: 8 },
    aa: { padding: "14px 22px 22px", display: "flex", flexDirection: "column", gap: 9, borderTop: "1px solid #2a3348", background: "#161b27" },
    btnP: { background: "#2D68FF", color: "#ffffff", border: "none", borderRadius: 8, padding: "11px 18px", fontFamily: "'Space Grotesk', Arial, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, letterSpacing: "0.3px" },
    btnS: { background: "transparent", color: "#7a8aa0", border: "1px solid #2a3348", borderRadius: 8, padding: "9px 18px", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
    right: { flex: 1, padding: "28px 24px", overflowY: "auto", background: "#d8dadc", display: "flex", alignItems: "flex-start", justifyContent: "center" },
    ew: { width: "100%", maxWidth: 580, borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 32px rgba(0,0,0,0.18)" },
    // Email header
    eh: { background: "#0D1117", padding: "22px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    ehLa: { display: "flex", alignItems: "center", gap: 10 },
    ehLb: { width: 34, height: 34, background: "#1a1f2e", borderRadius: 8, border: "1px solid #2a3040", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    ehBn: { fontFamily: "'Space Grotesk', Arial, sans-serif", fontSize: 15, fontWeight: 700, color: "#ffffff" },
    ehBs: { fontSize: 10, color: "#5a6a7a", textTransform: "uppercase" as const, letterSpacing: "1.5px", marginTop: 2 },
    ehBadge: { background: "#1a2744", border: "1px solid #2a4a8a", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#6ab0f5", fontFamily: "'DM Sans', Arial, sans-serif", whiteSpace: "nowrap" as const },
    // Hero
    eher: { background: "#0D1117", padding: "28px 32px 32px", borderBottom: "1px solid #1a2030" },
    eherTag: { display: "inline-block", background: "#1a2744", border: "1px solid #2a4a8a", color: "#6ab0f5", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase" as const, padding: "3px 9px", borderRadius: 4, marginBottom: 14, fontFamily: "'DM Sans', Arial, sans-serif" },
    eherT: { fontFamily: "'Space Grotesk', Arial, sans-serif", fontSize: 24, fontWeight: 700, color: "#ffffff", lineHeight: "1.3", marginBottom: 10 },
    eherS: { fontSize: 13, color: "#7a8a9a", lineHeight: "1.7", marginBottom: 20, fontFamily: "'DM Sans', Arial, sans-serif" },
    eherCta: { display: "inline-block", background: "#2D68FF", color: "#ffffff", fontFamily: "'Space Grotesk', Arial, sans-serif", fontSize: 12, fontWeight: 600, padding: "10px 20px", borderRadius: 6, textDecoration: "none", letterSpacing: "0.3px" },
    // Body
    eb: { padding: "28px 32px", background: "#ffffff" },
    ebGr: { fontSize: 14, fontWeight: 600, color: "#1a1f2e", marginBottom: 12, fontFamily: "'DM Sans', Arial, sans-serif" },
    ebTx: { fontSize: 13, color: "#4a5568", lineHeight: "1.8", marginBottom: 12, fontFamily: "'DM Sans', Arial, sans-serif" },
    ebCl: { fontSize: 13, color: "#6b7280", lineHeight: "1.8", marginBottom: 12, fontStyle: "italic", fontFamily: "'DM Sans', Arial, sans-serif" },
    ebDiv: { height: 1, background: "#f0f2f5", margin: "20px 0" },
    ebCtHead: { fontSize: 10, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "1px", marginBottom: 10, fontWeight: 600, fontFamily: "'DM Sans', Arial, sans-serif" },
    ebCtStrip: { background: "#f8f9fb", border: "1px solid #e8ecf0", borderRadius: 8, padding: "14px 16px", display: "flex", gap: 20, flexWrap: "wrap" as const },
    ebCi: { display: "flex", alignItems: "center", gap: 8 },
    ebCiLbl: { fontSize: 10, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.5px", fontFamily: "'DM Sans', Arial, sans-serif" },
    ebCiVal: { fontSize: 12, color: "#2D68FF", fontWeight: 600, fontFamily: "'DM Sans', Arial, sans-serif" },
    // Footer
    ef: { background: "#0D1117", padding: "16px 32px" },
    efLegal: { fontSize: 11, color: "#5a6a7a", lineHeight: "1.8", fontFamily: "'DM Sans', Arial, sans-serif" },
    // Toast
    toast: { position: "fixed", bottom: 24, left: "50%", transform: toastVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(80px)", background: "#28c840", color: "#ffffff", fontFamily: "'Space Grotesk', Arial, sans-serif", fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 100, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 9999, pointerEvents: "none" },
  };

  const dividerStyle: React.CSSProperties = { ...s.dl };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div style={s.root}>
        {/* ── LEFT PANEL ────────────────────────────────────────── */}
        <div style={s.left}>
          {/* Header */}
          <div style={s.ph}>
            <div style={s.phRow}>
              <div style={s.phLogo}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#3a4a6a" strokeWidth="1" />
                  <path d="M6 14L10 5L14 14" stroke="#2D68FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="5" r="1.5" fill="#2D68FF" />
                </svg>
              </div>
              <span style={s.phName}>Nearwe Labs</span>
            </div>
            <div style={s.phSub}>Email Composer — Customize &amp; Copy to Gmail</div>
          </div>

          {/* Form Area */}
          <div style={s.fa}>
            <div style={dividerStyle}>
              <span style={{ flex: 1, height: 1, background: "#2a3348", display: "block" }} />
              Email Details
              <span style={{ flex: 1, height: 1, background: "#2a3348", display: "block" }} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Recipient Name</label>
              <input style={s.input} type="text" placeholder="e.g. Rahul Sharma" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Template</label>
              <select style={s.select} value={templateType} onChange={(e) => applyTemplate(e.target.value as TemplateKey)}>
                <option value="custom">✏️ Custom</option>
                <option value="intro">👋 Introduction / Outreach</option>
                <option value="proposal">📋 Business Proposal</option>
                <option value="followup">🔄 Follow Up</option>
                <option value="thankyou">🙏 Thank You</option>
                <option value="invoice">🧾 Invoice / Payment</option>
                <option value="onboarding">🚀 Client Onboarding</option>
              </select>
            </div>

            <div style={s.fg}>
              <label style={s.label}>Hero Title</label>
              <input style={s.input} type="text" placeholder="e.g. Let's Build Something Great" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Hero Subtitle</label>
              <input style={s.input} type="text" placeholder="e.g. Connecting people through smart technology." value={heroSub} onChange={(e) => setHeroSub(e.target.value)} />
            </div>

            <div style={dividerStyle}>
              <span style={{ flex: 1, height: 1, background: "#2a3348", display: "block" }} />
              Body
              <span style={{ flex: 1, height: 1, background: "#2a3348", display: "block" }} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Greeting Line</label>
              <input style={s.input} type="text" placeholder="Dear Rahul," value={greeting} onChange={(e) => setGreeting(e.target.value)} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Paragraph 1</label>
              <textarea style={s.textarea} placeholder="Opening paragraph..." value={para1} onChange={(e) => setPara1(e.target.value)} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Paragraph 2 (optional)</label>
              <textarea style={s.textarea} placeholder="Additional details..." value={para2} onChange={(e) => setPara2(e.target.value)} />
            </div>

            <div style={s.fg}>
              <label style={s.label}>Closing Line</label>
              <input style={s.input} type="text" placeholder="e.g. Looking forward to hearing from you." value={closing} onChange={(e) => setClosing(e.target.value)} />
            </div>
          </div>

          {/* Actions */}
          <div style={s.aa}>
            <button style={s.btnP} onClick={copyForGmail}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy for Gmail
            </button>
            <button style={s.btnS} onClick={resetAll}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7a8aa0" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL — LIVE PREVIEW ────────────────────────── */}
        <div style={s.right}>
          <div style={s.ew} id="emailPreview">

            {/* Email Header */}
            <div style={s.eh}>
              <div style={s.ehLa}>
                <div style={s.ehLb}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#2a3040" strokeWidth="1" />
                    <path d="M6 14L10 5L14 14" stroke="#2D68FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="5" r="1.5" fill="#2D68FF" />
                  </svg>
                </div>
                <div>
                  <div style={s.ehBn}>NEARWE LABS</div>
                  <div style={s.ehBs}>nearwe.in</div>
                </div>
              </div>
              <span style={s.ehBadge}>LLP · ACW-4838</span>
            </div>

            {/* Hero */}
            <div style={s.eher}>
              <span style={s.eherTag}>📍 Indore, Madhya Pradesh</span>
              <div style={s.eherT}>{previewHeroTitle}</div>
              <div style={s.eherS}>{previewHeroSub}</div>
              <a href="https://www.nearwe.in" style={s.eherCta}>Visit nearwe.in →</a>
            </div>

            {/* Body */}
            <div style={s.eb}>
              <div style={s.ebGr}>{previewGreeting}</div>
              <div style={s.ebTx}>{previewPara1}</div>
              {para2 && <div style={s.ebTx}>{para2}</div>}
              {closing && <div style={s.ebCl}>{closing}</div>}

              <div style={s.ebDiv} />

              <div style={s.ebCtHead}>Get in touch</div>
              <div style={s.ebCtStrip}>
                {[
                  { lbl: "Support", val: "support@nearwe.in" },
                  { lbl: "Website", val: "www.nearwe.in" },
                  { lbl: "No-Reply", val: "noreplynearwe@gmail.com" },
                ].map((ci) => (
                  <div key={ci.lbl} style={s.ebCi}>
                    <div>
                      <div style={s.ebCiLbl}>{ci.lbl}</div>
                      <div style={s.ebCiVal}>{ci.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={s.ef}>
              <div style={s.efLegal}>
                122, Prime Square, Omaxe City 1, Indore — 452001, Madhya Pradesh, India<br />
                © 2026 Nearwe Labs LLP. All rights reserved. &nbsp;·&nbsp; LLP ID: ACW-4838 &nbsp;·&nbsp; PAN: AAZFN7216J &nbsp;·&nbsp; TAN: BPLN08426F
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Toast */}
      <div style={s.toast}>✓ Copied! Paste in Gmail body</div>
    </>
  );
}