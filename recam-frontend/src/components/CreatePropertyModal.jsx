import { useState } from "react";

export default function CreatePropertyModal({ onClose }) {
  // Form state: initial common fields
  const [form, setForm] = useState({
    address: "",
    type: "",
    city: "",
    price: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // For now, just log to console instead of making API request
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    onClose(); // Close modal after save
  };

  return (
    // Semi-transparent background overlay
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* White modal container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Create Property</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="e.g. 93 Beach Road"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="House">House</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Unit">Unit</option>
              <option value="Villa">Villa</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* City + Price two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}