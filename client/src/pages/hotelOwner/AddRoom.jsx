import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  return (
    <div className="p-6">
      <form className="max-w-5xl">
        <Title
          title="Add Room"
          subtitle="Fill in the details to add a new room."
          align="left"
        />

        {/* Images + Room Details */}
        <div className="mt-6 space-y-5">
          <p className="font-medium text-gray-700">Images</p>

          {/* Image Uploads */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                htmlFor={`roomImage${key}`}
                className="flex flex-col items-center cursor-pointer"
              >
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadArea
                  }
                  alt="upload"
                  className="w-32 h-32 object-cover border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-blue-500 transition"
                />

                <input
                  type="file"
                  accept="image/*"
                  id={`roomImage${key}`}
                  hidden
                  onChange={(e) =>
                    setImages({
                      ...images,
                      [key]: e.target.files[0],
                    })
                  }
                />
              </label>
            ))}
          </div>

          {/* Room Type + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>

              <select
                value={inputs.roomType}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    roomType: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Room Type</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Family Suite">Family Suite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Per Night ($)
              </label>

              <input
                type="number"
                value={inputs.pricePerNight}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    pricePerNight: e.target.value,
                  })
                }
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
<div className="mt-6">
  <p className="font-medium text-gray-700 mb-3">
    Amenities
  </p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {Object.keys(inputs.amenities).map((amenity) => (
      <label
        key={amenity}
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={inputs.amenities[amenity]}
          onChange={(e) =>
            setInputs({
              ...inputs,
              amenities: {
                ...inputs.amenities,
                [amenity]: e.target.checked,
              },
            })
          }
          className="w-4 h-4"
        />

        <span className="text-sm text-gray-700">
          {amenity}
        </span>
      </label>
    ))}
  </div>
</div>

{/* Add Room Button */}
<div className="mt-8">
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
  >
    Add Room
  </button>
</div>
      </form>
    </div>
  );
};

export default AddRoom;