import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main className="mt-16 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* About Sapien Section */}
          <section className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              About Sapien
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/80 text-lg leading-relaxed">
                Sapien is an open-source, community-driven platform designed for sharing and discovering AI prompts. 
                Our mission is to create a collaborative space where prompt engineers, AI enthusiasts, and creators 
                can come together to share their expertise, learn from each other, and collectively improve the way 
                we interact with AI.
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                In a world where AI is rapidly evolving, having access to well-crafted prompts can make all the 
                difference. Sapien empowers the community to contribute, refine, and discover prompts that enhance 
                productivity, creativity, and innovation. Whether you're a seasoned prompt engineer or just getting 
                started, Sapien is your hub for collaborative prompt sharing.
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                By making this platform open source, we ensure that everyone has the opportunity to contribute, 
                customize, and benefit from a truly community-owned resource.
              </p>
            </div>
          </section>

          {/* Meet the Maintainer Section */}
          <section className="space-y-6 glass-card p-8 rounded-2xl border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Meet the Maintainer
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/80 text-lg leading-relaxed">
                Hey there, I'm <span className="font-semibold text-primary">Gurkeerat</span>, and you might know me as{" "}
                <span className="font-mono text-primary">"keerat666"</span> on GitHub.
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                I'm on an exciting journey of transitioning into the world of open source because I genuinely believe 
                that coding should be within everyone's reach. It's a powerful tool for change, innovation, and 
                self-expression, and I'm committed to making it accessible to all who want to pick it up. That is why 
                this year, I want the community to have a portal where people can share and tweak prompts in a 
                collaborative manner.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com/keerat666" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Profile
                  </Button>
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-neon">
                    <Globe className="h-5 w-5" />
                    Portfolio Site
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
