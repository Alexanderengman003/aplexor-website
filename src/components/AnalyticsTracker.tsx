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
          sessionStorage.setItem('session_start_time', Date.now().toString());
        }

        // Get geolocation data
        const locationData = await getLocationData();

        // Create or update session
        if (isNewSession) {
          await supabase.from('aplexor_sessions').insert({
            session_id: sessionId,
            country: locationData.country,
            device_type: getDeviceType(),
            browser: getBrowser(),
            referrer: document.referrer || null,
            page_views_count: 1,
            bounce: true
          });
        } else {
          // Update existing session
          const sessionStartTime = parseInt(sessionStorage.getItem('session_start_time') || Date.now().toString());
          const durationSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
          
          // Get current page view count
          const { data: currentSession } = await supabase
            .from('aplexor_sessions')
            .select('page_views_count')
            .eq('session_id', sessionId)
            .single();

          const newPageViewCount = (currentSession?.page_views_count || 1) + 1;

          await supabase
            .from('aplexor_sessions')
            .update({
              last_activity_at: new Date().toISOString(),
              page_views_count: newPageViewCount,
              duration_seconds: durationSeconds,
              bounce: false // If they visit a second page, it's not a bounce
            })
            .eq('session_id', sessionId);
        }

        // Track page view
        await supabase.from('aplexor_page_views').insert({
          session_id: sessionId,
          page_path: location.pathname,
          page_title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          browser: getBrowser(),
          operating_system: getOperatingSystem(),
          country: locationData.country,
          city: locationData.city
        });

        // Track event
        await supabase.from('aplexor_events').insert({
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

const getLocationData = async (): Promise<{country: string, city: string}> => {
  // Try session cache first to avoid repeated requests/rate limits
  try {
    const cached = sessionStorage.getItem('analytics_geo');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (_e) {}

  // Use ipwho.is (CORS-friendly, no auth) with a short timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const response = await fetch('https://ipwho.is/?fields=country,city,success', {
      signal: controller.signal,
      cache: 'no-store'
    });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const result = {
        country: (data && (data.success === true || data.success === undefined) && data.country) || 'Unknown',
        city: (data && (data.success === true || data.success === undefined) && data.city) || 'Unknown'
      };
      try { sessionStorage.setItem('analytics_geo', JSON.stringify(result)); } catch (_e) {}
      return result;
    }
  } catch (error) {
    console.debug('Geolocation error:', error);
  }

  const fallback = { country: 'Unknown', city: 'Unknown' };
  try { sessionStorage.setItem('analytics_geo', JSON.stringify(fallback)); } catch (_e) {}
  return fallback;
};

export default AnalyticsTracker;