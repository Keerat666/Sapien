import { FolderOpen, GitBranch, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PersonalManagerSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-hover mb-6">
            <FolderOpen className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Personal Workspace</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black mb-6">
            <span className="text-gradient">Your Personal</span> Prompt Manager
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Beyond discovering amazing prompts, Sapien helps you organize, evolve, and perfect your own AI workflows
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-hover p-8 rounded-2xl card-hover text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Centralized Library</h3>
            <p className="text-muted-foreground leading-relaxed">
              Keep all your prompts organized in one secure workspace. No more scattered notes or lost gems.
            </p>
          </div>

          <div className="glass-hover p-8 rounded-2xl card-hover text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
              <GitBranch className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Version Control</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track prompt evolution with built-in versioning. Test, iterate, and perfect your AI interactions.
            </p>
          </div>

          <div className="glass-hover p-8 rounded-2xl card-hover text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <div className="flex items-center justify-center space-x-1">
                <Lock className="w-4 h-4 text-primary" />
                <Unlock className="w-4 h-4 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Privacy Control</h3>
            <p className="text-muted-foreground leading-relaxed">
              Choose what to share with the community and what stays private in your personal collection.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="btn-hero group">
            Start Managing Your Prompts
            <FolderOpen className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalManagerSection;