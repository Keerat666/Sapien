import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PromptCard from "./PromptCard";
import Footer from "./Footer";
import Navigation from "./Navigation";

const TrendingSection = () => {
  const trendingPrompts = [
    {
      id: 'trending-1',
      title: "Advanced ChatGPT Prompt Engineering",
      description: "Master the art of prompt engineering with this comprehensive guide. Includes 50+ proven templates for content creation, data analysis, and creative writing.",
      author: "Sarah Chen",
      category: "Writing",
      stars: 342,
      views: 1205,
      isStarred: true,
    },
    {
      id: 'trending-2',
      title: "AI Art Generation Masterclass",
      description: "Create stunning visuals with DALL-E, Midjourney, and Stable Diffusion. Complete with style guides and prompt modifiers.",
      author: "Alex Rivera",
      category: "Art",
      stars: 289,
      views: 892,
      isLiked: true,
    },
    {
      id: 'trending-3',
      title: "Code Review Assistant Prompts",
      description: "Improve your code quality with AI-powered review prompts. Covers 15+ programming languages and best practices.",
      author: "DevMaster Pro",
      category: "Programming",
      stars: 156,
      views: 634,
    },
    {
      id: 'trending-4',
      title: "Business Strategy & Analysis",
      description: "Transform your business decisions with AI insights. Includes market analysis, competitor research, and growth strategies.",
      author: "Business Guru",
      category: "Business",
      stars: 198,
      views: 745,
    },
    {
      id: 'trending-5',
      title: "Social Media Content Generator",
      description: "Never run out of content ideas again. Generate engaging posts, captions, and hashtags for all major platforms.",
      author: "Content Queen",
      category: "Marketing",
      stars: 267,
      views: 1089,
    }
  ];

  return (
    <main>
      <Navigation />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-hover mb-6">
              <TrendingUp className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">Hot Right Now</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              <span className="text-gradient">Trending</span> Prompts
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most popular prompts that are transforming how people work with AI
            </p>
          </div>

          {/* Trending Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Featured Large Card */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
              <PromptCard {...trendingPrompts[0]} size="large" />
            </div>

            {/* Regular Cards */}
            {trendingPrompts.slice(1).map((prompt, index) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button className="btn-hero group">
              View All Trending
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TrendingSection;