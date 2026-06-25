
import React from "react";
import { assets, exclusiveOffers } from "../assets/assets";
import Title from "./Title";

const ExclusiveOffers = () => {
  return (
    <section className="px-6 md:px-12 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <Title
          title="Exclusive Offers"
          subtitle="Check out our limited-time deals and special offers."
          align="left"
          font="text-3xl"
        />

        <button className="group flex items-center gap-2 text-blue-600 font-medium mt-4 md:mt-0">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="Arrow"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exclusiveOffers.map((item) => (
          <div
            key={item.id}
            className="relative h-80 rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute bottom-0 p-6 text-white w-full">
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
                {item.priceOffer}% OFF
              </span>

              <h3 className="text-2xl font-bold mt-3">
                {item.title}
              </h3>

              <p className="text-sm mt-2 opacity-90">
                {item.description}
              </p>

              <p className="text-xs mt-3 opacity-80">
                Expires: {item.expiryDate}
              </p>

              <button className="group mt-4 flex items-center gap-2 font-medium">
                View Offer
                <img
                  src={assets.arrowIcon}
                  alt="Arrow"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveOffers;
