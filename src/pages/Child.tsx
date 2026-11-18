"use client";
import React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { ShieldCheck } from "lucide-react";

export default function ChildSafetyPolicy() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <SiteHeader />
      <div className="border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span className="text-blue-700 font-semibold text-sm">
              Safety Policy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Child Safety & CSAE Policy
          </h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Zero Tolerance Policy
            </h2>
            <p>
              NearWe has a zero-tolerance policy toward child sexual abuse and
              exploitation (CSAE). Any content involving minors in a sexual
              context is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Prohibited Content
            </h2>
            <p>
              This includes child sexual abuse material (CSAM), grooming,
              exploitation, trafficking, or any behavior that harms minors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              In-App Reporting
            </h2>
            <p>
              Users can report suspicious or inappropriate behavior directly
              within the app. Reports are reviewed promptly by our moderation
              team.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Moderation & Enforcement
            </h2>
            <p>
              We use a combination of automated tools and manual review. Accounts
              violating child safety rules are permanently banned.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Legal Compliance
            </h2>
            <p>
              NearWe complies with all applicable child protection laws and
              cooperates fully with regional and national authorities when
              required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Reporting to Authorities
            </h2>
            <p>
              Confirmed CSAM cases are reported to appropriate law enforcement
              agencies and child protection organizations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Contact for Child Safety
            </h2>
            <p>
              If you have child safety concerns, contact us at:
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
  );
}