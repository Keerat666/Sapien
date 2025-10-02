import { Github, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const contributors = [
  {
    name: "Gurkeerat",
    githubId: "keerat666",
    role: "Maintainer",
    avatar: "https://avatars.githubusercontent.com/u/18071315?v=4",
  },
  {
    name: 'Mehedi Hasan Khairul',
    githubId: 'mehedihasankhairul',
    role: 'Developer',
    avatar: 'https://avatars.githubusercontent.com/u/55708248?v=4',
    
  },
  {
    name: 'Krishna Awasthi',
    githubId: 'opbot-xd',
    role: 'Developer',
    avatar: 'https://avatars.githubusercontent.com/u/140143710?v=4',
    
  },
  {
    name: 'Devansh Verma',
    githubId: 'Devansh422',
    role: 'Developer',
    avatar: 'https://avatars.githubusercontent.com/u/65439049?v=4',
    
  },
  {
    name: 'Deepesh Kumar',
    githubId: 'akadeepesh',
    role: 'Developer',
    avatar: 'https://avatars.githubusercontent.com/u/100466756?v=4',
  },
  {
    name: 'Sajith Rajan P',
    githubId: 'Sajithrajan03',
    role: 'Developer',
    avatar: 'https://avatars.githubusercontent.com/u/93327106?v=4',
  },
];

const Contributors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16 mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Contributors</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the amazing people who have contributed to building this platform
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contributors.map((contributor) => (
            <Card key={contributor.githubId} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/10"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <h3 className="font-semibold text-lg mb-1">{contributor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{contributor.role}</p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(`https://github.com/${contributor.githubId}`, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  @{contributor.githubId}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Want to Contribute?</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented developers to join our community. 
                Check out our GitHub repository to get started!
              </p>
              <Button
                size="lg"
                onClick={() => window.open('https://github.com/Keerat666/Sapien', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                Visit GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contributors;