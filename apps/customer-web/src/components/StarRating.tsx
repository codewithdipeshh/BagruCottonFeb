import { useState } from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function StarRating({
  rating,
  setRating,
  readonly = false,
  size = 'md',
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleMouseEnter = (star: number) => {
    if (!readonly) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const handleClick = (star: number) => {
    if (!readonly) {
      setRating(star);
    }
  };

  const renderStar = (star: number) => {
    const isFilled = star <= (hoverRating || rating);
    const starColor = isFilled ? '#F7DA96' : '#E5E7EB';

    return (
      <button
        type="button"
        key={star}
        onMouseEnter={() => handleMouseEnter(star)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(star)}
        disabled={readonly}
        className={`transition-colors duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
          readonly ? 'cursor-default' : ''
        }`}
        aria-label={`Rate ${star} stars`}
      >
        <Star
          className={sizeClasses[size]}
          fill={isFilled ? 'currentColor' : 'none'}
          color={starColor}
          strokeWidth={isFilled ? 0 : 2}
        />
      </button>
    );
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
}