import { Star, Heart, Eye, User, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar?: string;
  category: string;
  stars: number;
  views: number;
  isStarred?: boolean;
  isLiked?: boolean;
  size?: "default" | "large";
}

const PromptCard = ({ 
  id,
  title, 
  description, 
  author, 
  avatar, 
  category, 
  stars, 
  views, 
  isStarred = false, 
  isLiked = false,
  size = "default"
}: PromptCardProps) => {
  const navigate = useNavigate();
  const cardSize = size === "large" ? "lg:col-span-2" : "";
  const titleSize = size === "large" ? "text-2xl" : "text-lg";

  const handleCardClick = () => {
    navigate(`/prompt/${id}`);
  };

  return (
    <div 
      className={`glass-hover p-6 rounded-2xl card-hover group cursor-pointer ${cardSize}`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-primary-foreground" />
            )}
          </div>
          <div>
            <div className="font-medium text-foreground">{author}</div>
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              {category}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-2 ${isStarred ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`}
          >
            <Star className="w-4 h-4" fill={isStarred ? "currentColor" : "none"} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-2 ${isLiked ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'}`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={`font-bold text-foreground mb-2 group-hover:text-primary transition-colors ${titleSize}`}>
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-accent">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-primary">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;