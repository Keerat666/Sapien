import { Coffee, Heart, Github, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background-secondary border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Sapien</h3>
            <p className="text-muted-foreground">The ultimate marketplace for AI prompts and creative ideas.</p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
             
                <li>
                  <Link to="/browse" className="hover:text-primary transition-colors" onClick={handleScrollToTop}>
                  Browse Prompts
                  </Link>
                </li>
              
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Categories
                </a>
              </li>
              <li>
              <Link to="/trending">
                <a href="#" className="hover:text-primary transition-colors">
                  Trending
                </a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Top Rated
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Community</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
              <Link to="/contributors">
                <a href="#" className="hover:text-primary transition-colors">
                  Creators
                </a>
              </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Featured
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-glass-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Sapien. Made with <Heart className="w-4 h-4 inline text-red-400" /> for the AI community.
          </p>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-primary">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-primary">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-primary">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;