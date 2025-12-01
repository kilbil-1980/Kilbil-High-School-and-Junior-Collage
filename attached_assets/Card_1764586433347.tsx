import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function Card({ title, description, image, icon, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="mb-4 text-royal-blue">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-royal-blue transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
