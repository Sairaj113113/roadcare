import { useRef, useState } from 'react';

/**
 * UploadImage — image picker with drag-and-drop and preview.
 *
 * Props:
 *   onImageSelect {function} — (file: File) => void
 *   error         {string}   — validation error message
 *   disabled      {boolean}
 */
const UploadImage = ({ onImageSelect, error = '', disabled = false }) => {
  const inputRef            = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be smaller than 10 MB.');
      return;
    }
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  };

  const handleInputChange = (e) => handleFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {preview ? (
        /* Preview state */
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          <img
            src={preview}
            alt="Pothole preview"
            className="w-full h-52 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white
                       text-xs font-semibold px-3 py-1 rounded-full shadow transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center gap-3 border-2 border-dashed
            rounded-xl h-44 cursor-pointer transition-colors duration-150
            ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 bg-gray-50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-400 bg-red-50' : ''}
          `}
        >
          <span className="text-4xl">📷</span>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              Drop image here or <span className="text-primary-600">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP — max 10 MB</p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />

      {error && <p className="error-message mt-1">{error}</p>}
    </div>
  );
};

export default UploadImage;