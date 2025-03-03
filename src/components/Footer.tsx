import Link from 'next/link';

const socials = [
  { name: 'instagram', url: 'https://instagram.com' },
  { name: 'twitter', url: 'https://twitter.com' },
  { name: 'spotify', url: 'https://spotify.com' },
  { name: 'apple music', url: 'https://music.apple.com' },
  { name: 'bandcamp', url: 'https://bandcamp.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-neutral-300/20 py-6 mt-auto">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">
              © {currentYear} Kiefer
            </p>
          </div>
          
          <div className="md:col-span-5">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <Link 
                  href={social.url} 
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors hover-underline"
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-4">
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="email for updates" 
                className="px-2 py-1 bg-transparent border-b border-neutral-300/30 text-xs w-full focus:outline-none focus:border-neutral-500"
                required
              />
              <button 
                type="submit" 
                className="text-xs uppercase tracking-wider"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
} 