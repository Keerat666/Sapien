import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Search, User, LogOut, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import PublishPromptDialog from './PublishPromptDialog';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
    } border-b border-primary/10`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6  pt-2">
            {/* <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Sapien</span> */}
            <img width="140" src="./logo3.png" alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <Link to="/browse" className="text-foreground hover:text-primary transition-colors story-link">
              Browse
            </Link> */}
            {!isAuthenticated && (
              <Link to="/about" className="text-foreground hover:text-primary transition-colors story-link">
                About
              </Link>
            )}
            {isAuthenticated ? (
              <Link to="/feed" className="text-foreground hover:text-primary transition-colors story-link">
                Feed
              </Link>
            ) : (
              <Link to="/contributors" className="text-foreground hover:text-primary transition-colors story-link">
                Contributors
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] lg:w-[300px] pl-9 h-9 bg-background/50 border-primary/20"
              />
            </form>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-neon" onClick={() => setPublishDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {user?.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 glass-card border-primary/20" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/feed')}>
                      <Search className="mr-2 h-4 w-4" />
                      Feed
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="glass-hover">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-foreground">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/20 md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 bg-background/50 border-primary/20"
              />
            </form>
            <hr className="border-primary/20" />
            <Link to="/browse" className="text-foreground hover:text-primary transition-colors py-2 story-link">
              Browse
            </Link>
            {!isAuthenticated && (
              <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                About
              </Link>
            )}
            {isAuthenticated ? (
              <Link to="/feed" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                Feed
              </Link>
            ) : (
              <Link to="/contributors" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                Contributors
              </Link>
            )}
            <hr className="border-primary/20" />
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                    Profile
                  </Link>
                  <Button variant="ghost" className="justify-start glass-hover" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="justify-start glass-hover w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="justify-start bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      
      {/* Publish Prompt Dialog */}
      <PublishPromptDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
      />
    </nav>
  );
};

export default Navigation;