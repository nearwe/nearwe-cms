import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-[#11141c] border border-cyan-500/30 rounded-2xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 mb-6">
          For support, advertising requests, or partnership enquiries, please use one of the options below.
        </p>

        <div className="space-y-4 text-gray-200">
          <p><strong>Email:</strong> support@nearwe.in</p>
          <p><strong>Phone:</strong> +91 12345 67890</p>
          <p><strong>Address:</strong> NearWe Technologies, Mumbai, India</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Send us a message</h2>
          <form className="grid gap-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-[#111a2b] border border-cyan-500/20 text-white" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-[#111a2b] border border-cyan-500/20 text-white" />
            <textarea rows={5} placeholder="Message" className="w-full px-4 py-3 rounded-lg bg-[#111a2b] border border-cyan-500/20 text-white" />
            <button className="px-6 py-3 bg-cyan-500 text-black rounded-full font-bold hover:bg-cyan-400 transition">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
