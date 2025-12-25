import { useState } from "react";
import { createListing } from "../../apis/listingcases.api";

export default function CreatePropertyModal({ onClose }) {
  // Define form data that matches backend DTO fields
  const [form, setForm] = useState({
    title: "",
    description: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    price: "",
    bedrooms: 0,
    bathrooms: 0,
    garages: 0,
    floorArea: 0,
    propertyType: "",
    saleCategory: "",
    listcaseStatus: "Created", // default value
  });

  // Handle input value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields before sending to backend
      const dataToSend = {
        Title: form.title,
        Description: form.description,
        Street: form.street,
        City: form.city,
        State: form.state,
        Postcode: parseInt(form.postcode || 0),
        Price: parseFloat(form.price || 0),
        Bedrooms: parseInt(form.bedrooms || 0),
        Bathrooms: parseInt(form.bathrooms || 0),
        Garages: parseInt(form.garages || 0),
        FloorArea: parseFloat(form.floorArea || 0),
        PropertyType: parseInt(form.propertyType || 0),
        SaleCategory: parseInt(form.saleCategory || 0),
        ListcaseStatus: 1, // default value: Created
      };

      await createListing(dataToSend);
      alert("Property created successfully!");

      onClose(); // Close modal after success
      window.location.reload(); // Temporary solution to refresh table
    } catch (err) {
      console.error(err);
      alert("Failed to create property.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Property
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Luxury Beach House"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description about the property..."
              rows="3"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input
              name="street"
              placeholder="Street"
              value={form.street}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="postcode"
              placeholder="Postcode"
              value={form.postcode}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="price"
              placeholder="Price ($)"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Numeric Fields */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              name="bedrooms"
              type="number"
              placeholder="Bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="bathrooms"
              type="number"
              placeholder="Bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="garages"
              type="number"
              placeholder="Garages"
              value={form.garages}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              name="floorArea"
              type="number"
              placeholder="Floor Area (m²)"
              value={form.floorArea}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Enum Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option value={1}>For Sale</option>
                <option value={2}>For Rent</option>
                <option value={3}>Auction</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Category *
              </label>
              <select
                name="saleCategory"
                value={form.saleCategory}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option value={1}>House</option>
                <option value={2}>Unit</option>
                <option value={3}>Townhouse</option>
                <option value={4}>Villa</option>
                <option value={5}>Others</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
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
