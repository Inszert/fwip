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
      setSuccess("Vaša správa bola úspešne odoslaná!");
      setBusinessName("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPostal("");
      setMessage("");
    } else {
      setError(result.error || "Správu sa nepodarilo odoslať");
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-[#40DDCB] py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full mx-auto rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 space-y-6 sm:space-y-7 font-sans overflow-hidden bg-white"
        style={{
          border: `2px solid ${SIGNATURE_COLOR}`,
          boxSizing: "border-box",
        }}
      >
        <div className="flex items-center text-lg font-bold mb-2" style={{ color: SIGNATURE_COLOR }}>
          <span role="img" aria-label="user" className="mr-2 text-2xl">👤</span>
          <span className="truncate text-base sm:text-lg">
            Povedzte nám niečo o sebe…
          </span>
        </div>

        {/* Názov firmy */}
        <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
          <span className="mr-2 text-xl" role="img" aria-label="office" style={{ color: SIGNATURE_COLOR }}>🏢</span>
          <input
            type="text"
            placeholder="Názov firmy"
            className={inputBase}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        {/* Meno */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <span className="mr-2 text-xl" style={{ color: SIGNATURE_COLOR }}>🧑</span>
            <input
              type="text"
              placeholder="Meno"
              className={inputBase}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <span className="mr-2 text-xl" style={{ color: SIGNATURE_COLOR }}>🧑</span>
            <input
              type="text"
              placeholder="Priezvisko"
              className={inputBase}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email & Telefón */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <span className="mr-2 text-xl" style={{ color: SIGNATURE_COLOR }}>✉️</span>
            <input
              type="email"
              placeholder="E-mail"
              className={inputBase}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
            <span className="mr-2 text-xl" style={{ color: SIGNATURE_COLOR }}>📱</span>
            <input
              type="tel"
              placeholder="Telefónne číslo"
              className={inputBase}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* PSČ */}
        <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
          <span className="mr-2 text-xl" style={{ color: SIGNATURE_COLOR }}>🏠</span>
          <input
            type="text"
            placeholder="Mesto/Obec"
            className={inputBase}
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>

        {/* Správa */}
        <div className="flex items-center bg-gray-50 rounded-full pr-3 pl-3 w-full border border-gray-200">
          <span className="mr-2 text-xl" style={{ color: SIGNATURE_COLOR }}>💬</span>
          <input
            type="text"
            placeholder="Ako vám môžeme pomôcť?"
            className={inputBase}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Odoslať */}
        <div className="flex justify-center sm:justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 sm:px-10 py-3 rounded-full font-bold text-base sm:text-lg text-white disabled:opacity-50 w-full sm:w-auto"
            style={{
              background: "linear-gradient(90deg,#40DDCB 0%,#8B5CF6 100%)",
            }}
          >
            {loading ? "Odosielam…" : "Odoslať"}
          </button>
        </div>

        {success && <p className="text-green-800 font-semibold">{success}</p>}
        {error && <p className="text-red-800 font-semibold">{error}</p>}
      </form>
    </div>
  );
};

export default ModernForm;
