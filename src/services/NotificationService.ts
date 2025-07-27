import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export interface EnhancedNotification {
  title: string;
  body: string;
  id?: number;
  schedule?: {
    at: Date;
    allowWhileIdle?: boolean;
  };
  extra?: any;
  attachments?: {
    id: string;
    url: string;
  }[];
  actionTypeId?: string;
  actions?: Array<{
    id: string;
    title: string;
    icon?: string;
    input?: boolean;
  }>;
  sound?: string;
  smallIcon?: string;
  iconColor?: string;
  ongoing?: boolean;
  autoCancel?: boolean;
  largeIcon?: string;
  summaryText?: string;
  group?: string;
  groupSummary?: boolean;
  channelId?: string;
  threadId?: string;
}

export class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;
  private permissionGranted = false;
  private token: string | null = null;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications are only available on native platforms');
      return;
    }

    try {
      // Request permission for push notifications
      await this.requestPermissions();
      
      // Register for push notifications
      await PushNotifications.register();
      
      // Set up listeners
      this.setupListeners();
      
      this.isInitialized = true;
      console.log('Notification service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
    }
  }

  private async requestPermissions(): Promise<void> {
    // Request push notification permissions
    const pushResult = await PushNotifications.requestPermissions();
    this.permissionGranted = pushResult.receive === 'granted';

    // Request local notification permissions
    const localResult = await LocalNotifications.requestPermissions();
    
    if (!this.permissionGranted || localResult.display !== 'granted') {
      throw new Error('Notification permissions not granted');
    }
  }

  private setupListeners(): void {
    // Push notification listeners
    PushNotifications.addListener('registration', (token: Token) => {
      this.token = token.value;
      console.log('Push registration success, token: ' + token.value);
      // Send token to your backend server
      this.sendTokenToServer(token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Registration error:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push notification received: ', notification);
      this.handleNotificationReceived(notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push notification action performed', notification);
      this.handleNotificationAction(notification);
    });

    // Local notification listeners
    LocalNotifications.addListener('localNotificationReceived', (notification: LocalNotificationSchema) => {
      console.log('Local notification received: ', notification);
    });

    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
      console.log('Local notification action performed', notificationAction);
      this.handleLocalNotificationAction(notificationAction);
    });
  }

  private async sendTokenToServer(token: string): Promise<void> {
    try {
      // Send token to your backend server for storing user's device token
      // This would typically be a POST request to your API
      console.log('Sending token to server:', token);
      
      // Store token locally for now
      localStorage.setItem('pushToken', token);
    } catch (error) {
      console.error('Failed to send token to server:', error);
    }
  }

  private handleNotificationReceived(notification: PushNotificationSchema): void {
    // Handle incoming push notification
    if (notification.data) {
      const data = notification.data;
      
      switch (data.type) {
        case 'booking_confirmed':
          this.showBookingConfirmation(data);
          break;
        case 'match_reminder':
          this.scheduleMatchReminder(data);
          break;
        case 'price_drop':
          this.showPriceDrop(data);
          break;
        default:
          console.log('Unknown notification type:', data.type);
      }
    }
  }

  private handleNotificationAction(notification: ActionPerformed): void {
    const action = notification.actionId;
    const data = notification.notification.data;

    // Use modern navigation approach
    const navigate = (path: string) => {
      // Dispatch custom event for navigation
      window.dispatchEvent(new CustomEvent('notification-navigate', { 
        detail: { path } 
      }));
    };

    switch (action) {
      case 'view_booking':
        // Navigate to booking details
        navigate('/dashboard');
        break;
      case 'buy_tickets':
        // Navigate to ticket purchase
        navigate(`/events/${data.eventId}`);
        break;
      case 'set_reminder':
        this.scheduleMatchReminder(data);
        break;
      case 'view_matches':
        navigate('/events');
        break;
      case 'view_event':
        navigate(`/events/${data.eventId}`);
        break;
      case 'customize':
        navigate('/dashboard?tab=preferences');
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  private handleLocalNotificationAction(notificationAction: any): void {
    const action = notificationAction.actionId;
    const data = notificationAction.notification.extra;

    // Use modern navigation approach
    const navigate = (path: string) => {
      window.dispatchEvent(new CustomEvent('notification-navigate', { 
        detail: { path } 
      }));
    };

    switch (action) {
      case 'view_event':
        navigate(`/events/${data.eventId}`);
        break;
      case 'snooze':
        this.snoozeReminder(data);
        break;
      case 'view_booking':
        navigate('/dashboard');
        break;
      case 'share':
        // Open share modal
        window.dispatchEvent(new CustomEvent('open-share', { 
          detail: data 
        }));
        break;
      default:
        console.log('Unknown local notification action:', action);
    }
  }

  // Enhanced notification methods
  async scheduleMatchReminder(eventData: any): Promise<void> {
    const notification: EnhancedNotification = {
      title: `🏏 ${eventData.title} starts soon!`,
      body: `${eventData.teams} • ${eventData.venue}`,
      id: Date.now(),
      schedule: {
        at: new Date(eventData.reminderTime),
        allowWhileIdle: true
      },
      attachments: eventData.image ? [{
        id: 'event-image',
        url: eventData.image
      }] : undefined,
      actions: [
        {
          id: 'view_event',
          title: 'View Details',
          icon: 'ic_action_view'
        },
        {
          id: 'snooze',
          title: 'Remind in 15 min',
          icon: 'ic_action_snooze'
        }
      ],
      extra: eventData,
      sound: 'match_alert.wav',
      iconColor: '#FF6B35',
      channelId: 'match-reminders'
    };

    await this.scheduleLocalNotification(notification);
  }

  async showBookingConfirmation(bookingData: any): Promise<void> {
    const notification: EnhancedNotification = {
      title: '✅ Booking Confirmed!',
      body: `Your tickets for ${bookingData.eventTitle} are confirmed`,
      id: Date.now(),
      attachments: [{
        id: 'qr-code',
        url: bookingData.qrCodeUrl
      }],
      actions: [
        {
          id: 'view_booking',
          title: 'View Tickets',
          icon: 'ic_action_ticket'
        },
        {
          id: 'share',
          title: 'Share',
          icon: 'ic_action_share'
        }
      ],
      extra: bookingData,
      sound: 'booking_success.wav',
      iconColor: '#4CAF50',
      channelId: 'booking-updates'
    };

    await this.showInstantNotification(notification);
  }

  async showPriceDrop(priceData: any): Promise<void> {
    const notification: EnhancedNotification = {
      title: '💰 Price Drop Alert!',
      body: `${priceData.eventTitle} tickets now ₹${priceData.newPrice} (was ₹${priceData.oldPrice})`,
      id: Date.now(),
      actions: [
        {
          id: 'buy_tickets',
          title: 'Buy Now',
          icon: 'ic_action_buy'
        },
        {
          id: 'view_more',
          title: 'View Details',
          icon: 'ic_action_view'
        }
      ],
      extra: priceData,
      sound: 'price_alert.wav',
      iconColor: '#FF9800',
      channelId: 'price-alerts'
    };

    await this.showInstantNotification(notification);
  }

  async scheduleLiveMatchUpdates(matchData: any): Promise<void> {
    const updates = [
      { time: 15, message: 'First quarter completed' },
      { time: 30, message: 'Half time' },
      { time: 45, message: 'Third quarter completed' },
      { time: 60, message: 'Match completed' }
    ];

    for (const update of updates) {
      const notification: EnhancedNotification = {
        title: `🔴 LIVE: ${matchData.title}`,
        body: `${update.message} • Current score: ${matchData.score}`,
        id: Date.now() + update.time,
        schedule: {
          at: new Date(Date.now() + update.time * 60 * 1000)
        },
        extra: { ...matchData, updateType: 'live-score' },
        sound: 'score_update.wav',
        iconColor: '#F44336',
        channelId: 'live-updates'
      };

      await this.scheduleLocalNotification(notification);
    }
  }

  async sendPersonalizedNotifications(userPreferences: any): Promise<void> {
    const { favoriteTeams, sports, location } = userPreferences;

    // Send notifications based on user preferences
    const notification: EnhancedNotification = {
      title: `🎯 Matches near ${location}`,
      body: `${favoriteTeams.join(', ')} and more ${sports.join(', ')} events this week`,
      id: Date.now(),
      actions: [
        {
          id: 'view_matches',
          title: 'View Matches',
          icon: 'ic_action_calendar'
        },
        {
          id: 'customize',
          title: 'Customize',
          icon: 'ic_action_settings'
        }
      ],
      extra: userPreferences,
      iconColor: '#2196F3',
      channelId: 'recommendations'
    };

    await this.showInstantNotification(notification);
  }

  private async scheduleLocalNotification(notification: EnhancedNotification): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [this.formatLocalNotification(notification)]
      });
      console.log('Local notification scheduled successfully');
    } catch (error) {
      console.error('Failed to schedule local notification:', error);
    }
  }

  private async showInstantNotification(notification: EnhancedNotification): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [this.formatLocalNotification(notification)]
      });
      console.log('Instant notification shown successfully');
    } catch (error) {
      console.error('Failed to show instant notification:', error);
    }
  }

  private formatLocalNotification(notification: EnhancedNotification): LocalNotificationSchema {
    return {
      title: notification.title,
      body: notification.body,
      id: notification.id || Date.now(),
      schedule: notification.schedule,
      attachments: notification.attachments,
      actionTypeId: notification.actionTypeId,
      extra: notification.extra,
      sound: notification.sound,
      smallIcon: notification.smallIcon,
      iconColor: notification.iconColor,
      ongoing: notification.ongoing,
      autoCancel: notification.autoCancel,
      largeIcon: notification.largeIcon,
      summaryText: notification.summaryText,
      group: notification.group,
      groupSummary: notification.groupSummary,
      channelId: notification.channelId
    };
  }

  private async snoozeReminder(data: any): Promise<void> {
    const snoozeTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    const notification: EnhancedNotification = {
      ...data,
      schedule: {
        at: snoozeTime,
        allowWhileIdle: true
      }
    };

    await this.scheduleLocalNotification(notification);
  }

  // Utility methods
  async clearAllNotifications(): Promise<void> {
    await LocalNotifications.removeAllDeliveredNotifications();
  }

  async clearNotification(id: number): Promise<void> {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('pushToken');
  }

  isPermissionGranted(): boolean {
    return this.permissionGranted;
  }
}

export default NotificationService.getInstance();