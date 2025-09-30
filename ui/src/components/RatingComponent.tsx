import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RatingComponentProps {
  currentRating?: number;
  totalRatings?: number;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const RatingComponent = ({
  currentRating = 0,
  totalRatings = 0,
  onRate,
  size = 'md',
  readonly = false
}: RatingComponentProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleRate = (rating: number) => {
    if (readonly) return;
    
    setUserRating(rating);
    onRate?.(rating);
    
    toast({
      title: "Rating submitted",
      description: `You rated this prompt ${rating} star${rating !== 1 ? 's' : ''}`,
    });
  };

  const displayRating = userRating || currentRating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            className="p-0 h-auto hover:bg-transparent"
            disabled={readonly}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            onClick={() => handleRate(star)}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors ${
                star <= (hoverRating || displayRating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span className="font-medium">
          {displayRating.toFixed(1)}
        </span>
        {totalRatings > 0 && (
          <span>({totalRatings} rating{totalRatings !== 1 ? 's' : ''})</span>
        )}
      </div>
    </div>
  );
};

export default RatingComponent;