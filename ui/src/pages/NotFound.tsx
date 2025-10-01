import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-60"></div>
      </div>

      <div className="text-center z-10 relative">
        {/* Main 404 with glowing effect */}
        <div className="mb-8">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-pulse">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-extrabold text-blue-400 opacity-20 blur-sm animate-pulse">
            404
          </div>
        </div>

        {/* Empty box animation */}
        <div className="relative mb-8 mx-auto w-48 h-32">
          {/* Main box */}
          <div className="relative w-full h-full border-4 border-dashed border-gray-400 rounded-lg bg-gray-800/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            {/* Floating question marks */}
            <div className="absolute -top-4 -right-2 text-2xl text-gray-400 animate-bounce" style={{animationDelay: '0s'}}>?</div>
            <div className="absolute -top-6 left-4 text-lg text-gray-500 animate-bounce" style={{animationDelay: '0.5s'}}>?</div>
            <div className="absolute -bottom-4 -left-2 text-xl text-gray-400 animate-bounce" style={{animationDelay: '1s'}}>?</div>
            
            {/* Empty state icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-gray-500 animate-pulse opacity-50">📭</div>
            </div>
            
            {/* Floating dots inside box */}
            <div className="absolute top-4 left-6 w-1 h-1 bg-gray-500 rounded-full animate-ping opacity-60" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute bottom-6 right-4 w-1 h-1 bg-gray-400 rounded-full animate-ping opacity-40" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-6 right-6 w-0.5 h-0.5 bg-gray-500 rounded-full animate-pulse opacity-50" style={{animationDelay: '1.2s'}}></div>
          </div>
          
          {/* Shadow */}
          <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/20 rounded-full blur-md transform animate-pulse"></div>
        </div>

        {/* Text content */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-white animate-fade-in-up">
            Oops! Nothing Here
          </h2>
          <p className="text-xl text-gray-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            The page you're looking for seems to have vanished into the void
          </p>
          <p className="text-sm text-gray-400 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            Don't worry, even the best explorers get lost sometimes
          </p>
        </div>

        {/* Action button */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <a 
            href="/" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return Home
          </a>
        </div>
      </div>

      {/* Additional CSS for custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
