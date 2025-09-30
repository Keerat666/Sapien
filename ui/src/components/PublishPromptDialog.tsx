import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { mockCategories } from '@/lib/mockData';
import { X, Upload, Eye, ArrowLeft, Star, User, FileText, Image, Video, Monitor } from 'lucide-react';

interface PublishPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PublishPromptDialog = ({ open, onOpenChange }: PublishPromptDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [resultType, setResultType] = useState<'text' | 'image' | 'video'>('text');
  const [sampleText, setSampleText] = useState('');
  const [bestModels, setBestModels] = useState<string[]>([]);
  const { toast } = useToast();

  const availableModels = [
    'GPT-4', 'GPT-3.5', 'Claude-3', 'Claude-2', 'Gemini Pro', 
    'DALL-E 3', 'Midjourney', 'Stable Diffusion', 'RunwayML', 'Pika Labs'
  ];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim().toLowerCase()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleModelToggle = (model: string) => {
    setBestModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Prompt published successfully!",
      description: "Your prompt is now live and visible to the community.",
    });

    // Reset form
    setTitle('');
    setDescription('');
    setContent('');
    setCategory('');
    setTags([]);
    setCurrentTag('');
    setResultType('text');
    setSampleText('');
    setBestModels([]);
    setIsLoading(false);
    setIsPreviewMode(false);
    onOpenChange(false);
  };

  const handlePreview = () => {
    if (!title || !description || !content || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before previewing.",
        variant: "destructive"
      });
      return;
    }
    setIsPreviewMode(true);
  };

  const handleBackToEdit = () => {
    setIsPreviewMode(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {isPreviewMode ? 'Preview Your Prompt' : 'Publish New Prompt'}
          </DialogTitle>
          <DialogDescription>
            {isPreviewMode 
              ? 'This is how your prompt will appear to the community'
              : 'Share your creative prompt with the Sapien community'
            }
          </DialogDescription>
        </DialogHeader>

        {isPreviewMode ? (
          // Preview Mode
          <div className="space-y-6">
            <div className="glass-hover p-6 rounded-2xl border border-primary/20">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Your Name</div>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>0</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs bg-primary/5 text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Prompt Content Preview */}
              <div className="mt-4 p-4 bg-background/50 border border-primary/10 rounded-lg">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Prompt Content:
                </Label>
                <div className="text-sm text-foreground font-mono whitespace-pre-wrap">
                  {content}
                </div>
              </div>

              {/* Result Type & Models */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    <Monitor className="w-3 h-3 mr-1" />
                    Result: {resultType}
                  </Badge>
                </div>
                {bestModels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {bestModels.slice(0, 3).map((model) => (
                      <Badge
                        key={model}
                        variant="outline"
                        className="text-xs bg-secondary/50 text-secondary-foreground"
                      >
                        {model}
                      </Badge>
                    ))}
                    {bestModels.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{bestModels.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Sample Preview */}
              {sampleText && resultType === 'text' && (
                <div className="mt-4 p-4 bg-muted/10 border border-primary/10 rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Sample Output:
                  </Label>
                  <div className="text-sm text-foreground leading-relaxed">
                    {sampleText}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Form Mode
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Give your prompt a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/50 border-primary/20 focus:border-primary/40"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what your prompt does and what results it produces..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background/50 border-primary/20 focus:border-primary/40 min-h-[100px]"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Prompt Content *</Label>
              <Textarea
                id="content"
                placeholder="Enter your full prompt here. Be detailed and specific for best results..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-background/50 border-primary/20 focus:border-primary/40 min-h-[150px] font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: Use [variables] to make your prompt more flexible
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/20">
                  {mockCategories.filter(cat => cat !== 'All').map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (up to 5)</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag and press Enter"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-background/50 border-primary/20 focus:border-primary/40"
                    disabled={tags.length >= 5}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!currentTag.trim() || tags.length >= 5}
                    variant="outline"
                    className="glass-hover"
                  >
                    Add
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Cover Image (optional)</Label>
              <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop an image
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            {/* Result Type */}
            <div className="space-y-2">
              <Label>Result Type *</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'text', label: 'Text', icon: FileText },
                  { value: 'image', label: 'Image', icon: Image },
                  { value: 'video', label: 'Video', icon: Video }
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    type="button"
                    variant={resultType === value ? "default" : "outline"}
                    onClick={() => setResultType(value as 'text' | 'image' | 'video')}
                    className="flex items-center gap-2 h-12"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sample Upload */}
            <div className="space-y-2">
              <Label>Sample Output (optional)</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Show users what kind of results your prompt produces
              </p>
              
              {resultType === 'text' && (
                <Textarea
                  placeholder="Paste a sample text output your prompt generates..."
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary/40 min-h-[100px]"
                />
              )}
              
              {(resultType === 'image' || resultType === 'video') && (
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload a sample {resultType}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {resultType === 'image' ? 'PNG, JPG up to 10MB' : 'MP4, MOV up to 50MB'}
                  </p>
                </div>
              )}
            </div>

            {/* Best Models */}
            <div className="space-y-2">
              <Label>Works Best With (optional)</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Select AI models this prompt is optimized for
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {availableModels.map((model) => (
                  <div key={model} className="flex items-center space-x-2">
                    <Checkbox
                      id={model}
                      checked={bestModels.includes(model)}
                      onCheckedChange={() => handleModelToggle(model)}
                    />
                    <Label htmlFor={model} className="text-sm font-normal cursor-pointer">
                      {model}
                    </Label>
                  </div>
                ))}
              </div>
              {bestModels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {bestModels.map((model) => (
                    <Badge
                      key={model}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary"
                    >
                      {model}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </form>
        )}

        <DialogFooter className="flex gap-2">
          {isPreviewMode ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToEdit}
                className="glass-hover"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Edit
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? 'Publishing...' : 'Publish Prompt'}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="glass-hover"
                disabled={!title || !description || !content || !category}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="glass-hover"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !title || !description || !content || !category}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? 'Publishing...' : 'Publish Prompt'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishPromptDialog;