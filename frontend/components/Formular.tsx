"use client";

import React, { useState } from "react";
import { submitContactForm, ContactFormData } from "@/lib/strapi";

const SIGNATURE_COLOR = "#40DDCB";

const inputBase =
  "w-full bg-transparent outline-none text-gray-800 text-lg placeholder-gray-400 px-2 py-3 rounded-full focus:ring-2 focus:ring-[#40DDCB] transition-all";

const ModernForm: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const formData: ContactFormData = {
      Business_name: businessName,
      Fname: firstName,
      Lname: lastName,
      emial: email,
      phone_number: phone,
      postal_code: postal,
      message: message,
    };

    const result = await submitContactForm(formData);

    if (result.success) {
      setSuccess("Your message was sent successfully!");
      // Clear form
      setBusinessName("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPostal("");
      setMessage("");
    } else {
      setError(result.error || "Failed to send message");
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-[#40DDCB] py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"> {/* Increased top padding */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full mx-auto rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 space-y-6 sm:space-y-7 font-sans overflow-hidden bg-white"
        style={{ 
          border: `2px solid ${SIGNATURE_COLOR}`, 
          boxSizing: "border-box" 
        }}
      >
        <div className="flex items-center text-lg font-bold mb-2" style={{ color: SIGNATURE_COLOR }}>
          <span role="img" aria-label="user" className="mr-2 text-2xl">
            👤
          </span>
          <span className="truncate text-base sm:text-lg">Tell us a little about who you are...</span>
        </div>

        {/* Business Name */}
        <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
          <label htmlFor="businessName" className="sr-only">
            Business name
          </label>
          <span className="mr-2 text-xl" role="img" aria-label="office" style={{ color: SIGNATURE_COLOR }}>
            🏢
          </span>
          <input
            id="businessName"
            type="text"
            placeholder="Business name"
            aria-label="Business name"
            className={inputBase}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        {/* Name */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <label htmlFor="firstName" className="sr-only">
              First name
            </label>
            <span className="mr-2 text-xl" role="img" aria-label="user" style={{ color: SIGNATURE_COLOR }}>
              🧑
            </span>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              aria-label="First name"
              className={inputBase}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <label htmlFor="lastName" className="sr-only">
              Last name
            </label>
            <span className="mr-2 text-xl" role="img" aria-label="user" style={{ color: SIGNATURE_COLOR }}>
              🧑
            </span>
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              aria-label="Last name"
              className={inputBase}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <span className="mr-2 text-xl" role="img" aria-label="email" style={{ color: SIGNATURE_COLOR }}>
              ✉️
            </span>
            <input
              id="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
              className={inputBase}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <label htmlFor="phone" className="sr-only">
              Mobile phone
            </label>
            <span className="mr-2 text-xl" role="img" aria-label="phone" style={{ color: SIGNATURE_COLOR }}>
              📱
            </span>
            <input
              id="phone"
              type="tel"
              placeholder="Mobile phone"
              aria-label="Mobile phone"
              className={inputBase}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Postal code */}
        <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
          <label htmlFor="postal" className="sr-only">
            Postal code or zip code
          </label>
          <span className="mr-2 text-xl" role="img" aria-label="home" style={{ color: SIGNATURE_COLOR }}>
            🏠
          </span>
          <input
            id="postal"
            type="text"
            placeholder="Postal code/zip code"
            aria-label="Postal code or zip code"
            className={inputBase}
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
          <label htmlFor="message" className="sr-only">
            What can we do for you?
          </label>
          <span className="mr-2 text-xl" role="img" aria-label="message" style={{ color: SIGNATURE_COLOR }}>
            💬
          </span>
          <input
            id="message"
            type="text"
            placeholder="What can we do for you?"
            aria-label="What can we do for you?"
            className={inputBase}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center sm:justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 sm:px-10 py-3 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-[#40DDCB] to-purple-600 shadow-inner text-white transition hover:opacity-90 whitespace-nowrap disabled:opacity-50 w-full sm:w-auto"
            style={{
              background: `linear-gradient(90deg,#40DDCB 0%,#8B5CF6 100%)`,
              border: "none",
            }}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>

        {/* Success/Error messages */}
        {success && <p className="text-green-800 font-semibold text-center sm:text-left">{success}</p>}
        {error && <p className="text-red-800 font-semibold text-center sm:text-left">{error}</p>}
      </form>
    </div>
  );
};

export default ModernForm;