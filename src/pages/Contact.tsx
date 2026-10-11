import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Mail, Phone, UsersRound } from "lucide-react";

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:support@nearwe.in?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Helmet>
        <title>Contact NearWe - Get in Touch with Our Team</title>
        <meta name="description" content="Contact NearWe for support, partnerships, or advertising inquiries. Get help from our team for any questions about our local events and community app." />
        <meta name="keywords" content="contact us, support, nearwe, customer service, partnerships, advertising" />
        <meta property="og:title" content="Contact NearWe" />
        <meta property="og:description" content="Get in touch with NearWe for support, partnerships, or advertising opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nearwe.in/contact" />
        <meta name="robots" content="index, follow" />
        <meta name="canonical" content="https://nearwe.in/contact" />
      </Helmet>
    <div className="min-h-screen bg-[#0a0e1a] text-white py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white mb-8"><ArrowRight className="w-4 h-4 rotate-180" /> NearWe Labs</Link>
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 items-start">
          <div>
            <p className="text-xs font-bold tracking-widest text-cyan-300 uppercase mb-3">Talk to NearWe</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact us.</h1>
            <p className="text-gray-300 mb-8 max-w-xl leading-relaxed">Clients, business enquiries, partnerships, and careers: reach our team through the official NearWe inbox.</p>

            <div className="grid sm:grid-cols-2 gap-3">
              <a href="mailto:support@nearwe.in?subject=Client%20support" className="rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-400/50 transition-colors">
                <UsersRound className="w-5 h-5 text-cyan-300 mb-4" /><b className="block mb-1">Clients & support</b><span className="text-sm text-gray-400">support@nearwe.in</span>
              </a>
              <a href="mailto:support@nearwe.in?subject=Business%20enquiry" className="rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-400/50 transition-colors">
                <BriefcaseBusiness className="w-5 h-5 text-cyan-300 mb-4" /><b className="block mb-1">Business & partnerships</b><span className="text-sm text-gray-400">support@nearwe.in</span>
              </a>
              <a href="mailto:support@nearwe.in?subject=HR%20and%20careers" className="rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-400/50 transition-colors">
                <Mail className="w-5 h-5 text-cyan-300 mb-4" /><b className="block mb-1">HR & jobs</b><span className="text-sm text-gray-400">support@nearwe.in</span>
              </a>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <Phone className="w-5 h-5 text-cyan-300 mb-4" /><b className="block mb-1">Call us</b><a href="tel:8770162378" className="text-sm text-gray-400 hover:text-white">8770162378</a>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">We currently use one official inbox for all enquiries. Job openings and applications are also listed on our <Link to="/careers" className="text-cyan-300 hover:text-white">Careers page</Link>.</p>
            <p className="text-sm text-gray-400 mt-6">Address: NearWe Technologies, Mumbai, India</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-[#11141c] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
            <p className="text-sm text-gray-400 mb-6">Your email app will open with your message addressed to our team.</p>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm text-gray-300">Name<input required name="name" type="text" autoComplete="name" className="w-full px-4 py-3 rounded-lg bg-[#111a2b] border border-cyan-500/20 text-white" /></label>
              <label className="grid gap-2 text-sm text-gray-300">Email<input required name="email" type="email" autoComplete="email" className="w-full px-4 py-3 rounded-lg bg-[#111a2b] border border-cyan-500/20 text-white" /></label>
              <label className="grid gap-2 text-sm text-gray-300">Message<textarea required name="message" rows={5} className="w-full px-4 py-3 rounded-lg bg-[#111a2b] border border-cyan-500/20 text-white" /></label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-black rounded-full font-bold hover:bg-cyan-300 transition">Email NearWe <ArrowRight className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
