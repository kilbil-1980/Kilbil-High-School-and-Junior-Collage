import { useState, useRef } from 'react';
import { Link } from 'react-router';
import Hero from '@/react-app/components/Hero';
import SectionTitle from '@/react-app/components/SectionTitle';
import useScrollAnimation from '@/react-app/hooks/useScrollAnimation';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryVisible = useScrollAnimation(galleryRef);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'annual', label: 'Annual Day' },
    { id: 'sports', label: 'Sports' },
    { id: 'science', label: 'Science Fair' },
    { id: 'cultural', label: 'Cultural Events' },
    { id: 'academics', label: 'Academic Activities' },
  ];

  const photos = [
    {
      category: 'annual',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      title: 'Annual Day Celebration 2024',
    },
    {
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      title: 'Inter-School Sports Meet',
    },
    {
      category: 'science',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
      title: 'Science Exhibition 2024',
    },
    {
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      title: 'Cultural Festival',
    },
    {
      category: 'academics',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
      title: 'Classroom Learning',
    },
    {
      category: 'annual',
      image: 'https://www.shutterstock.com/image-photo/portrait-happy-school-girl-prize-260nw-2011301486.jpg?w=800&h=600&fit=crop',
      title: 'Prize Distribution Ceremony',
    },
    {
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop',
      title: 'Basketball Tournament',
    },
    {
      category: 'science',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=600&fit=crop',
      title: 'Robotics Workshop',
    },
    {
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
      title: 'Music Performance',
    },
    {
      category: 'academics',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
      title: 'Interactive Learning Session',
    },
    {
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
      title: 'Dance Performance',
    },
    {
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&h=600&fit=crop',
      title: 'Athletics Day',
    },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="Our Gallery"
        subtitle="Capturing Moments, Creating Memories"
        image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&h=600&fit=crop"
        height="medium"
      />

      {/* Category Filter */}
      <section className="py-12 px-4 bg-white sticky top-20 z-40 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-royal-blue text-white shadow-lg'
                    : 'bg-gray-100 text-slate-gray hover:bg-pale-beige'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section
        ref={galleryRef}
        className={`py-20 px-4 bg-gradient-to-br from-gray-50 to-white transition-all duration-1000 ${
          galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="School Life in Pictures"
            subtitle="Browse through our vibrant collection of memorable moments"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={`${selectedCategory}-${index}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">{photo.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No photos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="School Video Tour"
            subtitle="Experience our campus virtually"
          />
          <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-pale-beige to-gray-200 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="inline-block bg-white p-6 rounded-full shadow-lg mb-4">
                  <svg
                    className="w-16 h-16 text-royal-blue"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">Virtual Tour Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-golden-yellow to-terracotta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Be Part of Our Story</h2>
          <p className="text-xl text-gray-700 mb-8">
            Join our vibrant community and create your own memorable moments
          </p>
          <Link
            to="/admissions"
            className="inline-block bg-royal-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-gray transition-all hover:scale-105 shadow-xl"
          >
            Apply for Admission
          </Link>
        </div>
      </section>
    </div>
  );
}
