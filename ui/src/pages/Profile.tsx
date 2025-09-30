import { useState } from 'react';
import { Edit, Star, Eye, Grid3X3, Bookmark, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PromptCard from '@/components/PromptCard';
import EditProfileDialog from '@/components/EditProfileDialog';
import { useAuth } from '@/contexts/AuthContext';
import { mockPrompts, savedPrompts, mockLists } from '@/lib/mockData';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('prompts');
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (!user) {
    return null;
  }

  const userPrompts = mockPrompts.filter(prompt => prompt.author.id === user.id);
  const userSavedPrompts = mockPrompts.filter(prompt => savedPrompts.includes(prompt.id));

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {user.name}
                </h1>
                <p className="text-muted-foreground mb-2">@{user.username}</p>
                <p className="text-muted-foreground mb-4 max-w-md">
                  {user.bio || 'AI enthusiast exploring the creative potential of prompts.'}
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="glass-hover"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {user.totalPrompts}
                    </div>
                    <div className="text-sm text-muted-foreground">Prompts</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {user.totalStars}
                    </div>
                    <div className="text-sm text-muted-foreground">Stars</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {mockLists.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Lists</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-muted/20 mb-8">
            <TabsTrigger value="prompts" className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              My Prompts ({userPrompts.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Saved ({userSavedPrompts.length})
            </TabsTrigger>
            <TabsTrigger value="lists" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Lists ({mockLists.length})
            </TabsTrigger>
          </TabsList>

          {/* My Prompts */}
          <TabsContent value="prompts">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Prompts</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userPrompts.map((prompt) => (
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
                />
              ))}
            </div>
          </TabsContent>

          {/* Saved Prompts */}
          <TabsContent value="saved">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Saved Prompts</h2>
              <p className="text-muted-foreground">Prompts you've bookmarked for later</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userSavedPrompts.map((prompt) => (
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
                  isStarred={true}
                />
              ))}
            </div>
          </TabsContent>

          {/* Lists */}
          <TabsContent value="lists">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">My Lists</h2>
                <p className="text-muted-foreground">Organize your prompts into collections</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create List
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockLists.map((list) => (
                <Card key={list.id} className="glass-card cursor-pointer hover-scale">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {list.name}
                      <Badge variant={list.isPublic ? "default" : "secondary"}>
                        {list.isPublic ? "Public" : "Private"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {list.description || 'No description'}
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{list.prompts.length} prompts</span>
                      <span>Created {new Date(list.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
};

export default Profile;