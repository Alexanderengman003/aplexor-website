import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track if on lovable domain or preview
    if (window.location.hostname.includes('lovable') || 
        window.location.hostname.includes('localhost') ||
        window.location.search.includes('preview')) {
      return;
    }

    const trackPageView = async () => {
      try {
        // Generate or get session ID
        let sessionId = sessionStorage.getItem('analytics_session_id');
        const isNewSession = !sessionId;
        
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          sessionStorage.setItem('analytics_session_id', sessionId);
        }

        // Create or update session
        if (isNewSession) {
          await supabase.from('analytics_sessions').insert({
            session_id: sessionId,
            country: 'Unknown',
            device_type: getDeviceType(),
            browser: getBrowser(),
            referrer: document.referrer || null
          });
        }

        // Track page view
        await supabase.from('analytics_page_views').insert({
          session_id: sessionId,
          page_path: location.pathname,
          page_title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          browser: getBrowser(),
          operating_system: getOperatingSystem(),
          country: 'Unknown',
          city: 'Unknown'
        });

        // Track event
        await supabase.from('analytics_events').insert({
          session_id: sessionId,
          event_type: 'page_view',
          page_path: location.pathname,
          event_data: {
            title: document.title,
            timestamp: new Date().toISOString()
          }
        });

      } catch (error) {
        // Silently fail to avoid disrupting user experience
        console.debug('Analytics tracking error:', error);
      }
    };

    // Delay tracking slightly to ensure page is loaded
    const timer = setTimeout(trackPageView, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width <= 768) return 'Mobile';
  if (width <= 1024) return 'Tablet';
  return 'Desktop';
};

const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

const getOperatingSystem = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
};

export default AnalyticsTracker;