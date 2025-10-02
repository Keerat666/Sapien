import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProfileDialog = ({ open, onOpenChange }: EditProfileDialogProps) => {
  const { user, updateProfile, isLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
  });
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // In a real app, you'd upload the avatar file here
      const updates: any = {
        username: formData.username,
        bio: formData.bio,
      };

      // Simulate avatar upload with local preview
      if (previewAvatar) {
        updates.avatar = previewAvatar;
      }

      await updateProfile(updates);
      toast.success('Profile updated successfully!');
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const resetForm = () => {
    setFormData({
      username: user?.username || '',
      bio: user?.bio || '',
    });
    setPreviewAvatar(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const removeAvatar = () => {
    setPreviewAvatar(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-card overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 h-full overflow-wrap py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage 
                  src={previewAvatar || user?.avatar} 
                  alt={user?.name}
                />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {previewAvatar && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={removeAvatar}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="glass-hover"
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              JPG, PNG or GIF. Max 5MB.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your username"
                className="mt-1"
                maxLength={80}
              />
            </div>

            <div style={{ width: '100%', maxWidth: '377px', overflow: 'hidden' }}>
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                rows={3}
                className="mt-1 resize-none"
                style={{ 
                  width: '100%',
                  maxWidth: '100%',
                  wordBreak: 'break-all',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  overflow: 'hidden',
                  boxSizing: 'border-box'
                }}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.bio.length}/160 characters
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="p-4 rounded-lg bg-muted/20 border border-border" style={{ maxWidth: '377px', overflow: 'hidden' }}>
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Preview
            </Label>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage 
                  src={previewAvatar || user?.avatar} 
                  alt={formData.username}
                />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {formData.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  @{formData.username}
                </p>
                {formData.bio && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2" style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
                    {formData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isLoading || !formData.username.trim()}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
