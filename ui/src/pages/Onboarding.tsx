import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';

const Onboarding = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({ username, bio });
      toast({
        title: "Profile updated!",
        description: "Welcome to Sapien! Your profile has been set up.",
      });
      navigate('/feed');
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      await updateProfile({ username: user?.email?.split('@')[0] || '', bio: '' });
      navigate('/feed');
    } catch (error) {
      navigate('/feed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">Sapien</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Sapien!</h1>
          <p className="text-muted-foreground">Let's set up your profile to get started</p>
        </div>

        <Card className="glass-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us a bit about yourself (you can skip this and update later)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary/40 min-h-20"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Skip for now
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {isLoading ? 'Setting up...' : 'Continue'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;