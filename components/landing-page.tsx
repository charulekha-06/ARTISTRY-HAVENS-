import Link from "next/link";
import { ArrowRight, Sparkles, Store, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary font-serif">
          Artistry Havens
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Where tradition meets innovation. An AI-enhanced marketplace connecting
          global artisans with appreciative buyers.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/auth?role=buyer"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors"
        >
          Explore Havens <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          href="/auth?role=artisan"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-secondary-foreground bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
        >
          Join as Artisan <Sparkles className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
        <FeatureCard
          icon={<Store className="h-8 w-8 text-accent" />}
          title="Empower Artisans"
          description="Tools to showcase your craft professionally with AI-enhanced store setup."
        />
        <FeatureCard
          icon={<Sparkles className="h-8 w-8 text-accent" />}
          title="AI Design Studio"
          description="Create custom products or bring your ideas to life with generative AI."
        />
        <FeatureCard
          icon={<Globe className="h-8 w-8 text-accent" />}
          title="Global Reach"
          description="Connect with buyers and sponsors worldwide, breaking language barriers."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border border-border/50">
      <div className="mb-4 p-3 bg-accent/10 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
