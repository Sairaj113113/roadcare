import { useState } from 'react';
import UploadImage from './UploadImage';
import LocationPicker from '../map/LocationPicker';

/**
 * ReportForm — complete pothole report submission form.
 *
 * Props:
 *   onSubmit  {function} — async ({ image, description, latitude, longitude, address, city }) => void
 *   loading   {boolean}
 *   error     {string}   — server-side error message
 */
const ReportForm = ({ onSubmit, loading = false, error = '' }) => {
  const [image, setImage]             = useState(null);
  const [description, setDescription] = useState('');
  const [latitude, setLatitude]       = useState(null);
  const [longitude, setLongitude]     = useState(null);
  const [address, setAddress]         = useState('');
  const [city, setCity]               = useState('');
  const [errors, setErrors]           = useState({});

  const handleLocation = ({ lat, lng }) => {
    setLatitude(lat);
    setLongitude(lng);
    if (errors.location) setErrors((e) => ({ ...e, location: '' }));
  };

  const validate = () => {
    const e = {};
    if (!image)                         e.image    = 'Please upload a pothole image.';
    if (latitude == null || longitude == null) e.location = 'Please select a location.';
    if (description.length > 1000)      e.description = 'Description must be under 1000 characters.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }
    setErrors({});
    await onSubmit({ image, description, latitude, longitude, address, city });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Server error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Image upload */}
      <div>
        <label className="form-label">Pothole Image <span className="text-red-500">*</span></label>
        <UploadImage
          onImageSelect={setImage}
          error={errors.image}
          disabled={loading}
        />
      </div>

      {/* Location */}
      <div>
        <label className="form-label">Location <span className="text-red-500">*</span></label>
        <LocationPicker
          latitude={latitude}
          longitude={longitude}
          onLocation={handleLocation}
          error={errors.location}
          disabled={loading}
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="form-label">Street Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. Near Jubilee Hills Checkpost"
          className="form-input"
          maxLength={255}
          disabled={loading}
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="form-label">City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Hyderabad"
          className="form-input"
          maxLength={100}
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="form-label">
          Description
          <span className="text-gray-400 font-normal ml-2 text-xs">
            ({description.length}/1000)
          </span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the pothole — size, depth, road name, any hazard details…"
          className={`form-input resize-none ${errors.description ? 'border-red-400' : ''}`}
          maxLength={1000}
          disabled={loading}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Submitting Report…
          </span>
        ) : '🚧 Submit Report'}
      </button>
    </form>
  );
};

export default ReportForm;