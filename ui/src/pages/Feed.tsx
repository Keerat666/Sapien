import { useState } from 'react';
import { TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { mockPrompts } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Feed = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recent');

  const getFilteredPrompts = () => {
    // Apply tab filter to mock prompts
    switch (activeTab) {
      case "trending":
        return [...mockPrompts].sort((a, b) => b.stars + b.views - (a.stars + a.views));
      case "following":
        // Mock: show prompts from followed users (exclude own prompts)
        return mockPrompts.filter((prompt) => prompt.author.id !== user?.id);
      default:
        return [...mockPrompts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl mt-16">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            Discover the latest prompts from the community
          </p>
        </div>

        {/* Feed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20">
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6">
              {getFilteredPrompts().map((prompt) => (
                <div key={prompt.id} className="w-full">
                  <PromptCard
                    id={prompt.id}
                    title={prompt.title}
                    description={prompt.description}
                    author={prompt.author.name}
                    avatar={prompt.author.avatar}
                    category={prompt.category}
                    stars={prompt.stars}
                    views={prompt.views}
                    size="large"
                  />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="glass-hover">
                Load More
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Feed;