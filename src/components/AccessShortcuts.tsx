import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const AccessShortcuts = () => {
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+A for analytics
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        navigate('/analytics');
      }
      
      // Ctrl+Shift+P for portal
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        navigate('/portal');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleAnalyticsIconTap = () => {
    const now = Date.now();
    
    // Reset tap count if more than 2 seconds have passed
    if (now - lastTapTime > 2000) {
      setTapCount(1);
    } else {
      setTapCount(prev => prev + 1);
    }
    
    setLastTapTime(now);

    // Navigate to analytics after 7 taps
    if (tapCount + 1 >= 7) {
      setTapCount(0);
      navigate('/analytics');
    }
  };

  // Only show on mobile/tablet
  const isMobile = window.innerWidth <= 1024;

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleAnalyticsIconTap}
        className="w-8 h-8 bg-muted/50 hover:bg-muted/70 rounded-sm flex items-center justify-center transition-all duration-200"
        style={{ opacity: 0.3 }}
        aria-label="Analytics access"
      >
        <BarChart3 className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default AccessShortcuts;