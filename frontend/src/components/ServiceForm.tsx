import React, { useState } from 'react';

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    serviceMaster: '',
    description: '',
    image: '',
    features: '',
    pricing: {
      basic: '',
      premium: '',
      enterprise: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      pricing: {
        ...prevData.pricing,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Service Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Short Description</label>
        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required />
      </div>
      <div>
        <label>Service Master</label>
        <input type="text" name="serviceMaster" value={formData.serviceMaster} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Image URL</label>
        <input type="url" name="image" value={formData.image} onChange={handleChange} required />
      </div>
      <div>
        <label>Features (comma-separated)</label>
        <input type="text" name="features" value={formData.features} onChange={handleChange} required />
      </div>
      <div>
        <label>Pricing (Basic)</label>
        <input type="number" name="basic" value={formData.pricing.basic} onChange={handlePricingChange} required />
      </div>
      <div>
        <label>Pricing (Premium)</label>
        <input type="number" name="premium" value={formData.pricing.premium} onChange={handlePricingChange} required />
      </div>
      <div>
        <label>Pricing (Enterprise)</label>
        <input type="number" name="enterprise" value={formData.pricing.enterprise} onChange={handlePricingChange} required />
      </div>
      <button type="submit">Create Service</button>
    </form>
  );
};

export default ServiceForm;
