import { ChevronDown } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  height?: 'full' | 'large' | 'medium';
}

export default function Hero({ title, subtitle, image, height = 'large' }: HeroProps) {
  const heightClasses = {
    full: 'h-screen',
    large: 'h-[600px]',
    medium: 'h-[400px]',
  };

  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/75 to-slate-gray/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
          {subtitle}
        </p>
      </div>

      {/* Scroll Indicator */}
      {height === 'full' && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white opacity-75" />
        </div>
      )}
    </div>
  );
}
