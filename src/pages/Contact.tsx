import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Mail, Phone, UsersRound } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

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
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-4 sm:px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase mb-3">Talk to NearWe</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Contact us.</h1>
            <p className="text-slate-600 text-lg mb-10 max-w-xl leading-relaxed">Clients, business enquiries, partnerships, and careers: reach our team through the official NearWe inbox.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href="mailto:support@nearwe.in?subject=Client%20support" className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"><UsersRound className="w-5 h-5" /></span><b className="block mb-1 text-slate-900">Clients & support</b><span className="text-sm text-slate-500">support@nearwe.in</span>
              </a>
              <a href="mailto:support@nearwe.in?subject=Business%20enquiry" className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"><BriefcaseBusiness className="w-5 h-5" /></span><b className="block mb-1 text-slate-900">Business & partnerships</b><span className="text-sm text-slate-500">support@nearwe.in</span>
              </a>
              <a href="mailto:support@nearwe.in?subject=HR%20and%20careers" className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"><Mail className="w-5 h-5" /></span><b className="block mb-1 text-slate-900">HR & jobs</b><span className="text-sm text-slate-500">support@nearwe.in</span>
              </a>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"><Phone className="w-5 h-5" /></span><b className="block mb-1 text-slate-900">Call us</b><a href="tel:8770162378" className="text-sm text-slate-500 hover:text-blue-700">8770162378</a>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-6">We currently use one official inbox for all enquiries. Job openings and applications are also listed on our <Link to="/careers" className="font-medium text-blue-700 hover:underline">Careers page</Link>.</p>
            <p className="text-sm text-slate-600 mt-3"><span className="font-semibold text-slate-900">Address:</span> NearWe Technologies, Mumbai, India</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)]">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Send us a message</h2>
            <p className="text-sm text-slate-500 mb-6">Your email app will open with your message addressed to our team.</p>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">Name<input required name="name" type="text" autoComplete="name" placeholder="Your full name" className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-normal placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" /></label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">Email<input required name="email" type="email" autoComplete="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-normal placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" /></label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">Message<textarea required name="message" rows={5} placeholder="Tell us about your project or question" className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-normal placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 resize-y" /></label>
              <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-md font-semibold shadow-sm hover:bg-blue-800 transition-colors">Email NearWe <ArrowRight className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      </div>
      </section>
      <SiteFooter />
    </div>
    </>
  );
};

export default Contact;
