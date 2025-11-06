import React from "react";

interface FooterProps {
  phoneNumber: string;
  location: string;
  optionalSlots?: React.ReactNode[];
  bottomLinks?: { text: string; href: string }[];
}

const Footer: React.FC<FooterProps> = ({
  phoneNumber,
  location,
  optionalSlots = [],
  bottomLinks = [],
}) => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-6 gap-6">
      <div className="sm:col-span-2 space-y-2">
        <h3 className="font-bold text-lg">Contact Info</h3>
        <p>
          Phone: <a href={`tel:${phoneNumber}`} className="underline">{phoneNumber}</a>
        </p>
        <p>Location: {location}</p>
      </div>

      {optionalSlots.slice(0, 4).map((slot, idx) => (
        <div key={idx} className="sm:col-span-1">
          {slot}
        </div>
      ))}
    </div>

    <div className="bg-black border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 justify-center">
        {bottomLinks.map(({ text, href }, idx) => (
          <a
            key={idx}
            href={href}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white text-sm transition"
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;