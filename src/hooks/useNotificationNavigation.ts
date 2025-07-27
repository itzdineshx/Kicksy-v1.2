import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNotificationNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNotificationNavigate = (event: CustomEvent) => {
      const { path } = event.detail;
      console.log('Notification navigation triggered:', path);
      navigate(path);
    };

    const handleOpenShare = (event: CustomEvent) => {
      const data = event.detail;
      console.log('Share modal triggered:', data);
      // Could open a share modal here
      if (navigator.share) {
        navigator.share({
          title: data.eventTitle || 'Check out this event!',
          text: data.body || 'Amazing sports event',
          url: window.location.origin + `/events/${data.eventId}`
        }).catch(console.error);
      }
    };

    // Listen for custom navigation events from notifications
    window.addEventListener('notification-navigate', handleNotificationNavigate as EventListener);
    window.addEventListener('open-share', handleOpenShare as EventListener);

    return () => {
      window.removeEventListener('notification-navigate', handleNotificationNavigate as EventListener);
      window.removeEventListener('open-share', handleOpenShare as EventListener);
    };
  }, [navigate]);
};