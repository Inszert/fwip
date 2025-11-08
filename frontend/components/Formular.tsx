"use client";

import React from "react";

const SIGNATURE_COLOR = "#40DDCB";

const inputBase =
  "w-full bg-transparent outline-none text-gray-800 text-lg placeholder-gray-400 px-2 py-3 rounded-full focus:ring-2 focus:ring-[#40DDCB] transition-all";

const ModernForm: React.FC = () => {
  const [businessName, setBusinessName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [postal, setPostal] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <form
      className="max-w-2xl w-full mx-auto my-12 bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 md:p-12 space-y-7 font-sans overflow-hidden"
      style={{ border: `2px solid ${SIGNATURE_COLOR}`, boxSizing: "border-box" }}
    >
      <div className="flex items-center text-lg font-bold mb-2" style={{ color: SIGNATURE_COLOR }}>
        <span role="img" aria-label="user" className="mr-2" style={{ fontSize: "1.7em" }}>
          👤
        </span>
        <span className="truncate">Tell us a little about who you are...</span>
      </div>
      {/* Business Name */}
      <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 w-full">
        <label htmlFor="businessName" className="sr-only">
          Business name
        </label>
        <span className="mr-2" role="img" aria-label="office" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
          🏢
        </span>
        <input
          id="businessName"
          type="text"
          placeholder="Business name"
          aria-label="Business name"
          className={inputBase}
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          required
        />
      </div>
      {/* Name */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 flex-1 w-full">
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <span className="mr-2" role="img" aria-label="user" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
            🧑
          </span>
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            aria-label="First name"
            className={inputBase}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 flex-1 w-full">
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <span className="mr-2" role="img" aria-label="user" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
            🧑
          </span>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            aria-label="Last name"
            className={inputBase}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      {/* Email & Phone */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 flex-1 w-full">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <span className="mr-2" role="img" aria-label="email" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
            ✉️
          </span>
          <input
            id="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            className={inputBase}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 flex-1 w-full">
          <label htmlFor="phone" className="sr-only">
            Mobile phone
          </label>
          <span className="mr-2" role="img" aria-label="phone" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
            📱
          </span>
          <input
            id="phone"
            type="tel"
            placeholder="Mobile phone"
            aria-label="Mobile phone"
            className={inputBase}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>
      {/* Postal code */}
      <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 w-full">
        <label htmlFor="postal" className="sr-only">
          Postal code or zip code
        </label>
        <span className="mr-2" role="img" aria-label="home" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
          🏠
        </span>
        <input
          id="postal"
          type="text"
          placeholder="Postal code/zip code"
          aria-label="Postal code or zip code"
          className={inputBase}
          value={postal}
          onChange={e => setPostal(e.target.value)}
        />
      </div>
      {/* Message */}
      <div className="flex items-center bg-gray-100 rounded-full pr-3 pl-3 w-full">
        <label htmlFor="message" className="sr-only">
          What can we do for you?
        </label>
        <span className="mr-2" role="img" aria-label="message" style={{ fontSize: "1.3em", color: SIGNATURE_COLOR }}>
          💬
        </span>
        <input
          id="message"
          type="text"
          placeholder="What can we do for you?"
          aria-label="What can we do for you?"
          className={inputBase}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      {/* Submit */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="px-10 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-[#40DDCB] to-purple-600 shadow-inner text-white transition hover:opacity-90 whitespace-nowrap"
          style={{
            background: `linear-gradient(90deg,#40DDCB 0%,#8B5CF6 100%)`,
            border: "none",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ModernForm;
