import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { mockPrompts, mockCategories } from '@/lib/mockData';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  const filteredPrompts = useMemo(() => {
    let filtered = mockPrompts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(prompt => prompt.category === selectedCategory);
    }

    // Sort prompts
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.stars - a.stars);
      case 'views':
        return filtered.sort((a, b) => b.views - a.views);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 gradient-text">
            Browse Prompts
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing AI prompts created by the community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search prompts, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="pl-10 bg-background/50 border-primary/20 focus:border-primary/40"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {mockCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground shadow-neon' 
                        : 'hover:bg-primary/10 hover:border-primary/40'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-background/50 border-primary/20">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/20">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Prompts Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredPrompts.map((prompt) => (
            <PromptCard
              id={prompt.id}
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              author={prompt.author.name}
              avatar={prompt.author.avatar}
              category={prompt.category}
              stars={prompt.stars}
              views={prompt.views}
              size={viewMode === 'list' ? 'large' : 'default'}
            />
          ))}
        </div>

        {/* Load More */}
        {filteredPrompts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="glass-hover">
              Load More Prompts
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Browse;