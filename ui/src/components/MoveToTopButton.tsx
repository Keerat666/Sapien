import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const MoveToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
 
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Move to top"
        >
          <div className="glass-hover p-3 rounded-full transition-all duration-300 hover:scale-110 glow-primary">
            <ChevronUp 
              className="w-6 h-6 text-primary group-hover:text-primary-glow transition-colors duration-300" 
            />
          </div>
        </button>
      )}
    </>
  );
};

export default MoveToTopButton;
