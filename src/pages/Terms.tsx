"use client";
import React from "react";
import { FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | NearWe - Local Community App</title>
        <meta name="description" content="Read NearWe's complete Terms & Conditions. Understand our community guidelines, user responsibilities, and policies for using our local events app." />
        <meta name="keywords" content="terms and conditions, terms of service, nearwe, user agreement, community guidelines" />
        <meta property="og:title" content="Terms & Conditions | NearWe" />
        <meta property="og:description" content="NearWe Terms & Conditions - understand our community guidelines and user policies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nearwe.in/terms" />
        <meta name="robots" content="index, follow" />
        <meta name="canonical" content="https://nearwe.in/terms" />
      </Helmet>
      <div className="bg-white text-slate-900 min-h-screen">
      <SiteHeader />
      <div className="border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <FileText className="w-4 h-4 text-blue-700" />
            <span className="text-blue-700 font-semibold text-sm">
              Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Terms & Conditions
          </h1>

          <p className="text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By using NearWe, you agree to comply with these Terms & Conditions.
              If you do not agree, please do not use the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              2. Use of the App
            </h2>
            <p>
              NearWe allows users to discover local events, connect with people,
              and interact with community content. You agree not to misuse the
              platform or violate any laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account. Any activity performed using your account is your
              responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              4. Prohibited Content
            </h2>
            <p>
              Users must not post illegal, harmful, abusive, or sexually explicit
              content. Content involving minors is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              5. Termination
            </h2>
            <p>
              NearWe reserves the right to suspend or terminate accounts that
              violate these terms or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              NearWe is not responsible for user-generated content or interactions
              between users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              7. Contact
            </h2>
            <p>
              For questions regarding these Terms, contact us at:
              <br />
              <span className="text-blue-700 font-medium">
                support@nearwe.in
              </span>
            </p>
          </section>

        </div>
      </section>
      </div>
      <SiteFooter />
    </div>
    </>
  );
}