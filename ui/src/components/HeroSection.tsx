import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Users, Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-36">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-hover mb-8 animate-glow">
          <Sparkles className="w-4 h-4 mr-2 text-accent" />
          <span className="text-sm font-medium text-accent">
            Welcome to the Future of AI Prompts
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="text-gradient">Explore, Share &</span>
          <br />
          <span className="text-foreground">Discover AI Prompts</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Join thousands of creators in the ultimate marketplace for AI prompts.
          Find inspiration, share your creativity, and monetize your ideas.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center px-4 py-2 glass-hover rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">
              Manage prompts in one place
            </span>
          </div>
          <div className="flex items-center px-4 py-2 glass-hover rounded-full">
            <div
              className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <span className="text-sm font-medium text-muted-foreground">
              Version control & iterations
            </span>
          </div>
          <div className="flex items-center px-4 py-2 glass-hover rounded-full">
            <div
              className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <span className="text-sm font-medium text-muted-foreground">
              Public & private prompts
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/browse">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon animate-pulse"
              >
                Browse Prompts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-glass text-lg px-8 py-4">
                Start Creating
              </Button>
            </Link>
          </div>

          <Link to="https://buymeacoffee.com/keerat">
            <Button className="btn-accent group text-lg px-8 py-4">
              <Coffee className="w-4 h-4 mr-2" />
              Buy Me a Coffee
              <Heart className="w-4 h-4 ml-2 text-red-400 group-hover:animate-pulse" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="glass-hover p-6 rounded-2xl card-hover">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">10K+</div>
            <div className="text-muted-foreground">Active Creators</div>
          </div>

          <div className="glass-hover p-6 rounded-2xl card-hover">
            <div className="flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">50K+</div>
            <div className="text-muted-foreground">Prompts Shared</div>
          </div>

          <div className="glass-hover p-6 rounded-2xl card-hover">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">1M+</div>
            <div className="text-muted-foreground">Ideas Generated</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
