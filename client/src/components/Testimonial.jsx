import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <section className="px-6 py-12">
      <Title
        title="Testimonials"
        subtitle="What our customers are saying"
        align="center"
        font="text-3xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300"
          >
            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={item.rating || 5} />
            </div>

            {/* Review */}
            <p className="text-gray-600 text-sm leading-6 mb-6">
              {item.review}
            </p>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;