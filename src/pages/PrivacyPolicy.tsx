"use client";
import React from "react";
import { Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | NearWe - Your Local Community App</title>
        <meta name="description" content="Read NearWe's comprehensive privacy policy. Learn how we collect, use, and protect your personal data when using our local events and community discovery app." />
        <meta name="keywords" content="privacy policy, data protection, nearwe, local events, community app" />
        <meta property="og:title" content="Privacy Policy | NearWe" />
        <meta property="og:description" content="Read NearWe's comprehensive privacy policy and learn about our data protection practices." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nearwe.in/privacy" />
        <meta name="robots" content="index, follow" />
        <meta name="canonical" content="https://nearwe.in/privacy" />
      </Helmet>
      <div className="bg-white text-slate-900 min-h-screen">
      <SiteHeader />
      <div className="border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-700" />
            <span className="text-blue-700 font-semibold text-sm">
              Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Privacy Policy
          </h1>

          <p className="text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              1. Introduction
            </h2>
            <p>
              NearWe ("we", "our", or "us") respects your privacy. This Privacy Policy explains
              how we collect, use, and protect your information when you use our mobile application and website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              2. Information We Collect
            </h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Location data (to show nearby events and places)</li>
              <li>Account information (such as name, email, profile details)</li>
              <li>Device information (device type, OS version)</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              3. How We Use Your Information
            </h2>
            <p>
              We use collected data to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and improve app functionality</li>
              <li>Show relevant content and nearby events</li>
              <li>Display advertisements (if applicable)</li>
              <li>Ensure security and prevent misuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              4. Third-Party Services
            </h2>
            <p>
              NearWe may use third-party services that collect information, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Google AdMob (for advertisements)</li>
              <li>Google Maps / Places API (for location services)</li>
              <li>Firebase (analytics and notifications, if used)</li>
            </ul>
            <p className="mt-3">
              These third-party services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              5. Children’s Privacy
            </h2>
            <p>
              NearWe is not intended for children under the age of 13.
              We do not knowingly collect personal information from children.
              If you believe a child has provided personal data, please contact us
              and we will remove the information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              6. Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your information.
              However, no system is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              7. Your Rights
            </h2>
            <p>
              You may request access, correction, or deletion of your data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:
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