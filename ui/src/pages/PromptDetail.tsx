import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink, Heart, Bookmark, Plus, Share, MoreHorizontal, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import RatingComponent from '@/components/RatingComponent';
import CommentSection from '@/components/CommentSection';
import { mockPrompts, mockUsers } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const prompt = mockPrompts.find(p => p.id === id);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Prompt Not Found</h2>
          <Button onClick={() => navigate('/feed')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    toast({
      title: "Copied to clipboard",
      description: "Prompt content has been copied to your clipboard.",
    });
  };

  const handleFavorite = () => {
    toast({
      title: "Added to favorites",
      description: "This prompt has been saved to your favorites.",
    });
  };

  const handleAddToList = () => {
    toast({
      title: "Add to list",
      description: "Choose a list to add this prompt to.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Prompt link has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/feed')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Feed
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Prompt Header */}
        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={prompt.author.avatar} alt={prompt.author.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {prompt.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{prompt.author.name}</h3>
                  <p className="text-muted-foreground">@{prompt.author.username}</p>
                  <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
                    {prompt.category}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleFavorite}>
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleAddToList}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add to List
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold gradient-text mb-4">{prompt.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {prompt.description}
            </p>

            <div className="flex items-center justify-between">
              <RatingComponent 
                currentRating={prompt.rating || 4.5}
                totalRatings={prompt.ratingCount || 127}
                size="lg"
              />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{prompt.views} views</span>
                <span>•</span>
                <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Content */}
        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Prompt Content</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Try it
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-6 border border-border">
              <pre className="whitespace-pre-wrap text-foreground font-mono text-sm leading-relaxed">
                {prompt.content}
              </pre>
            </div>

            {/* Samples Section */}
            {prompt.samples && prompt.samples.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Sample Outputs</h3>
                <div className="grid gap-4">
                  {prompt.samples.map((sample, index) => (
                    <div key={index} className="bg-muted/10 rounded-lg p-4 border border-border">
                      <p className="text-foreground leading-relaxed">{sample}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sample Uploads Section */}
            {prompt.sampleUploads && prompt.sampleUploads.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Sample Uploads</h3>
                <div className="grid gap-4">
                  {prompt.sampleUploads.map((sample, index) => (
                    <div key={index} className="bg-muted/10 rounded-lg p-4 border border-border">
                      {sample.type === 'image' && (
                        <img 
                          src={sample.url} 
                          alt={sample.caption || 'Sample output'} 
                          className="max-w-full h-auto rounded-lg"
                        />
                      )}
                      {sample.type === 'video' && (
                        <video 
                          src={sample.url} 
                          controls 
                          className="max-w-full h-auto rounded-lg"
                        />
                      )}
                      {sample.type === 'text' && (
                        <p className="text-foreground leading-relaxed">{sample.caption}</p>
                      )}
                      {sample.caption && sample.type !== 'text' && (
                        <p className="text-muted-foreground text-sm mt-2">{sample.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Result Type & Best Models */}
            <div className="mt-8 space-y-4">
              {prompt.resultType && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Result Type</h3>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    <Monitor className="w-3 h-3 mr-1" />
                    {prompt.resultType}
                  </Badge>
                </div>
              )}
              
              {prompt.bestModels && prompt.bestModels.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Works Best With</h3>
                  <div className="flex flex-wrap gap-2">
                    {prompt.bestModels.map((model) => (
                      <Badge
                        key={model}
                        variant="secondary"
                        className="bg-secondary/10 text-secondary-foreground border-secondary/20"
                      >
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Comments Section */}
        <CommentSection promptId={prompt.id} />
      </div>
    </div>
  );
};

export default PromptDetail;