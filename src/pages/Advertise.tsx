"use client";
import React, { useState } from "react";
import { Megaphone } from "lucide-react";
import social from "../assets/images/social.png";
import Map from "../assets/images/map.png";
import Home from "../assets/images/home.png";

export default function AdvertiseWithUs() {

  // ✅ STATE
  const [adType, setAdType] = useState("map");
  const [days, setDays] = useState(1);

  const pricing: any = {
    map: 3000,
    social: 5000,
    home: 2500,
  };

  const total = pricing[adType] * days;

  return (
    <div className="bg-[#0a0e1a] text-white min-h-screen pt-20 px-6">
      <section className="max-w-6xl mx-auto pb-20">

        {/* HEADER */}
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

        <div className="space-y-10 text-gray-300 leading-relaxed">

          {/* WHY */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Why Advertise on NearWe?
            </h2>
            <p>
              NearWe provides a powerful platform for businesses and individuals
              to showcase their offerings across Android and iOS with high engagement.
            </p>
          </section>

          {/* AD PLACEMENTS */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">
              Ad Placements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* MAP */}
              <div className="bg-[#11141c] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition group flex flex-col">
                <div className="relative h-44 bg-black">
                  <img src={Map} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3 bg-cyan-500 text-black text-xs px-2 py-1 rounded">
                    MAP VIEW
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white">Map Ads</h3>
                  <p className="text-cyan-400 text-xs mb-2">Location-Based Promotion</p>
                  <p className="text-gray-400 text-sm mb-6 flex-1">
                    Hyper-local visibility on map view.
                  </p>

                  <p className="text-xl font-bold text-white">
                    ₹3000 <span className="text-gray-500 text-sm">/ day</span>
                  </p>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="bg-[#11141c] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition group flex flex-col scale-105 shadow-lg shadow-cyan-500/10">
                <div className="relative h-44 bg-black">
                  <img src={social} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    FEED
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white">Social Feed Ads</h3>
                  <p className="text-cyan-400 text-xs mb-2">Sponsored Engagement</p>
                  <p className="text-gray-400 text-sm mb-6 flex-1">
                    Appear directly inside user feed.
                  </p>

                  <p className="text-xl font-bold text-white">
                    ₹5000 <span className="text-gray-500 text-sm">/ day</span>
                  </p>
                </div>
              </div>

              {/* HOME */}
              <div className="bg-[#11141c] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition group flex flex-col">
                <div className="relative h-44 bg-black">
                  <img src={Home} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                    HOME
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white">Home Screen Ads</h3>
                  <p className="text-cyan-400 text-xs mb-2">Premium Placement</p>
                  <p className="text-gray-400 text-sm mb-6 flex-1">
                    High visibility on home screen.
                  </p>

                  <p className="text-xl font-bold text-white">
                    ₹2500 <span className="text-gray-500 text-sm">/ day</span>
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/*  CALCULATOR */}
          <section className="bg-[#11141c] border border-cyan-500/20 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Campaign Cost Estimator
            </h2>

            {/* TYPE */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">
                Select Ad Type
              </label>

              <select
                value={adType}
                onChange={(e) => setAdType(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-cyan-500/30 rounded-xl px-4 py-3 text-white outline-none"
              >
                <option value="map">Map Ads (₹3000/day)</option>
                <option value="social">Social Feed Ads (₹5000/day)</option>
                <option value="home">Home Screen Ads (₹2500/day)</option>
              </select>
            </div>

            {/* DAYS */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">
                Campaign Duration (Days)
              </label>

              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full"
              />

              <div className="text-center mt-2 text-cyan-400 font-semibold">
                {days} Day{days > 1 && "s"}
              </div>
            </div>

            {/* RESULT */}
            <div className="text-center mt-8">
              <p className="text-gray-400 mb-2">Estimated Cost</p>

              <h3 className="text-4xl font-bold text-cyan-400">
                ₹{total.toLocaleString()}
              </h3>
            </div>

            {/* NOTE */}
            <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
              *This pricing is currently based on NearWe’s growing traffic and engagement.
              Advertising now can be highly beneficial for your business visibility.
            </p>

          </section>

          {/* BENEFITS */}
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

          {/* CONTACT */}
          <section className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Contact Us
            </h2>

            <p className="text-gray-400 mb-6">
              Ready to promote your business? Reach out to our team.
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