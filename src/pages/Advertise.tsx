"use client";
import React from "react";
import { Megaphone } from "lucide-react";
import social from "../assets/images/social.png";
import Map from "../assets/images/map.png";
import Home from "../assets/images/home.png";
export default function AdvertiseWithUs() {
  return (
    <div className="bg-[#0a0e1a] text-white min-h-screen pt-28 px-6">
      <section className="max-w-6xl mx-auto pb-20">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Megaphone className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm">
              Advertising
            </span>
          </div>

          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Advertise With Us
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Grow your business by reaching thousands of users across our platform.
            Promote your brand, products, or services directly within NearWe.
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Why Advertise on NearWe?
            </h2>
            <p>
              NearWe provides a powerful platform for businesses and individuals
              to showcase their offerings. Your ads are visible across our mobile
              applications on both Android and iOS, helping you reach a highly
              engaged audience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Ad Placements
            </h2>
            <section>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* MAP ADS */}
                <div className="bg-[#11141c] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition group flex flex-col">
                  <div className="relative h-44 bg-black">
                    <img
                      src={Map}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 bg-cyan-500 text-black text-xs px-2 py-1 rounded">
                      MAP VIEW
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white">Map Ads</h3>
                    <p className="text-cyan-400 text-xs mb-2">
                      Location-Based Promotion
                    </p>
                    <p className="text-gray-400 text-sm mb-6 flex-1">
                      Reach users exploring nearby areas with hyper-local targeting.
                    </p>

                    <p className="text-xl font-bold text-white">
                      ₹100 <span className="text-gray-500 text-sm">/ banner</span>
                    </p>
                  </div>
                </div>

                {/* FEED ADS */}
                <div className="bg-[#11141c] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition group flex flex-col scale-105 shadow-lg shadow-cyan-500/10">
                  <div className="relative h-44 bg-black">
                    <img
                      src={social}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                      FEED
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white">Social Feed Ads</h3>
                    <p className="text-cyan-400 text-xs mb-2">
                      Sponsored Engagement
                    </p>
                    <p className="text-gray-400 text-sm mb-6 flex-1">
                      Appear natively in feeds for maximum engagement & clicks.
                    </p>

                    <p className="text-xl font-bold text-white">
                      ₹200 <span className="text-gray-500 text-sm">/ post</span>
                    </p>
                  </div>
                </div>

                {/* PREMIUM */}
                <div className="bg-[#11141c] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition group flex flex-col">
                  <div className="relative h-44 bg-black">
                    <img
                      src={Home}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                      PREMIUM
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white">Main Event Cards</h3>
                    <p className="text-cyan-400 text-xs mb-2">
                      Premium Placement
                    </p>
                    <p className="text-gray-400 text-sm mb-6 flex-1">
                      Get top visibility on main event pages with high impact cards.
                    </p>

                    <p className="text-xl font-bold text-white">
                      ₹1000 <span className="text-gray-500 text-sm">/ feature</span>
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Who Can Advertise?
            </h2>
            <p>
              Business owners, startups, brands, and individuals looking to promote
              their services or products can run ad campaigns on NearWe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">
              Benefits
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Reach local and targeted users",
                "Increase brand visibility",
                "Drive traffic and conversions",
                "Affordable advertising options",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <span className="text-cyan-400">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Easy Campaign Setup
            </h2>
            <p>
              Setting up your ad campaign is simple. Share your requirements,
              creatives, and target audience — our team will handle the rest.
            </p>
          </section>

          <section className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Contact Us
            </h2>

            <p className="text-gray-400 mb-6">
              Ready to promote your business? Reach out to our advertising team.
            </p>

            <a
              href="mailto:support@nearwe.in"
              className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition"
            >
              support@nearwe.in
            </a>
          </section>
        </div>
      </section>
    </div>
  );
}