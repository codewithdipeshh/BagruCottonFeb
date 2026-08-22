import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

type ReviewImageUploadProps = {
  images: File[];
  setImages: (images: File[]) => void;
  maxImages?: number;
};

export default function ReviewImageUpload({
  images,
  setImages,
  maxImages = 5,
}: ReviewImageUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const newProgress: Record<string, number> = {};

    files.forEach((file) => {
      // Validate file type
      if (
        !file.type.match(/image\/(jpeg|jpg|png|webp)/)
      ) {
        setError('Only JPG, PNG, and WEBP images are allowed');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Maximum file size is 5MB');
        return;
      }

      validFiles.push(file);
      newProgress[file.name] = 0;
    });

    if (validFiles.length === 0) return;

    if (images.length + validFiles.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError(null);
    setUploadProgress(newProgress);

    // Simulate upload progress
    validFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: progress,
        }));

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });

    // After "upload", add images
    setTimeout(() => {
      setImages([...images, ...validFiles]);
      setUploadProgress({});
    }, 600);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const getImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-[#F7DA96] transition-colors">
        <input
          type="file"
          id="review-images"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleImageSelect}
          className="hidden"
          disabled={images.length >= maxImages}
        />
        <label
          htmlFor="review-images"
          className={`cursor-pointer flex flex-col items-center gap-3 ${
            images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
            <Upload className="w-6 h-6 text-stone-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900">
              {images.length >= maxImages
                ? 'Maximum images reached'
                : 'Upload review images'}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              JPG, PNG, WEBP (max 5MB each)
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-stone-200"
            >
              {uploadProgress[image.name] !== undefined ? (
                <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#F7DA96] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs text-stone-600">
                      {uploadProgress[image.name]}%
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={getImagePreview(image)}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-stone-500 text-right">
        {images.length}/{maxImages} images
      </p>
    </div>
  );
}