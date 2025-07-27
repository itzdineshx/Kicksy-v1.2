import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Calendar, Trophy, DollarSign, Smartphone, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/components/NotificationProvider';
import NotificationService from '@/services/NotificationService';

interface NotificationPreferences {
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  categories: {
    bookingUpdates: boolean;
    matchReminders: boolean;
    priceAlerts: boolean;
    liveScores: boolean;
    promotions: boolean;
  };
  timing: {
    beforeMatch: number; // minutes
    beforeBookingExpiry: number; // hours
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  sounds: {
    enabled: boolean;
    volume: number;
    customSounds: {
      booking: string;
      match: string;
      price: string;
      live: string;
    };
  };
}

const NotificationSettings: React.FC = () => {
  const { pushNotificationsEnabled, enablePushNotifications } = useNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    pushEnabled: false,
    emailEnabled: true,
    smsEnabled: false,
    categories: {
      bookingUpdates: true,
      matchReminders: true,
      priceAlerts: true,
      liveScores: false,
      promotions: false,
    },
    timing: {
      beforeMatch: 30,
      beforeBookingExpiry: 24,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00',
      },
    },
    sounds: {
      enabled: true,
      volume: 80,
      customSounds: {
        booking: 'success',
        match: 'alert',
        price: 'notification',
        live: 'score',
      },
    },
  });

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('notificationPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
    
    // Update push notification status
    setPreferences(prev => ({
      ...prev,
      pushEnabled: pushNotificationsEnabled
    }));
  }, [pushNotificationsEnabled]);

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('notificationPreferences', JSON.stringify(updated));
  };

  const handleEnablePush = async () => {
    const enabled = await enablePushNotifications();
    updatePreferences({ pushEnabled: enabled });
  };

  const testNotification = async (type: 'booking' | 'match' | 'price' | 'live') => {
    const testData = {
      booking: {
        title: 'Test Booking Confirmation',
        message: 'Your test booking has been confirmed!',
        eventTitle: 'Test Event',
        qrCodeUrl: '/test-qr.png'
      },
      match: {
        title: 'Test Match Reminder',
        teams: 'Test Team A vs Test Team B',
        reminderTime: new Date(Date.now() + 5000).toISOString(), // 5 seconds from now
        venue: 'Test Stadium',
        image: '/test-match.jpg'
      },
      price: {
        title: 'Test Price Alert',
        eventTitle: 'Test Event',
        newPrice: 500,
        oldPrice: 700,
        eventId: 'test-123'
      },
      live: {
        title: 'Test Live Update',
        score: 'Test Team A: 2 - 1 Test Team B',
        updateType: 'live-score'
      }
    };

    try {
      switch (type) {
        case 'booking':
          await NotificationService.showBookingConfirmation(testData.booking);
          break;
        case 'match':
          await NotificationService.scheduleMatchReminder(testData.match);
          break;
        case 'price':
          await NotificationService.showPriceDrop(testData.price);
          break;
        case 'live':
          await NotificationService.scheduleLiveMatchUpdates(testData.live);
          break;
      }
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Push Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get instant notifications on your device
                </p>
              </div>
              <div className="flex items-center gap-2">
                {pushNotificationsEnabled ? (
                  <Badge variant="default" className="bg-primary">
                    <Smartphone className="w-3 h-3 mr-1" />
                    Enabled
                  </Badge>
                ) : (
                  <Button onClick={handleEnablePush} size="sm">
                    Enable Push
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Communication Channels */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Communication Channels</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="email"
                  checked={preferences.emailEnabled}
                  onCheckedChange={(checked) => 
                    updatePreferences({ emailEnabled: checked })
                  }
                />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sms"
                  checked={preferences.smsEnabled}
                  onCheckedChange={(checked) => 
                    updatePreferences({ smsEnabled: checked })
                  }
                />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="push"
                  checked={preferences.pushEnabled}
                  onCheckedChange={handleEnablePush}
                  disabled={!pushNotificationsEnabled}
                />
                <Label htmlFor="push">Push</Label>
              </div>
            </div>
          </div>

          {/* Notification Categories */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Notification Categories</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-primary" />
                  <div>
                    <Label className="font-medium">Booking Updates</Label>
                    <p className="text-xs text-muted-foreground">Confirmations, cancellations, changes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.categories.bookingUpdates}
                    onCheckedChange={(checked) => 
                      updatePreferences({
                        categories: { ...preferences.categories, bookingUpdates: checked }
                      })
                    }
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => testNotification('booking')}
                    disabled={!preferences.categories.bookingUpdates}
                  >
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-accent" />
                  <div>
                    <Label className="font-medium">Match Reminders</Label>
                    <p className="text-xs text-muted-foreground">Upcoming events you're interested in</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.categories.matchReminders}
                    onCheckedChange={(checked) => 
                      updatePreferences({
                        categories: { ...preferences.categories, matchReminders: checked }
                      })
                    }
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => testNotification('match')}
                    disabled={!preferences.categories.matchReminders}
                  >
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-secondary" />
                  <div>
                    <Label className="font-medium">Price Alerts</Label>
                    <p className="text-xs text-muted-foreground">Price drops and special offers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.categories.priceAlerts}
                    onCheckedChange={(checked) => 
                      updatePreferences({
                        categories: { ...preferences.categories, priceAlerts: checked }
                      })
                    }
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => testNotification('price')}
                    disabled={!preferences.categories.priceAlerts}
                  >
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-destructive" />
                  <div>
                    <Label className="font-medium">Live Scores</Label>
                    <p className="text-xs text-muted-foreground">Real-time match updates</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.categories.liveScores}
                    onCheckedChange={(checked) => 
                      updatePreferences({
                        categories: { ...preferences.categories, liveScores: checked }
                      })
                    }
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => testNotification('live')}
                    disabled={!preferences.categories.liveScores}
                  >
                    Test
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Timing Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Timing</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beforeMatch">Remind me before matches</Label>
                <Select
                  value={preferences.timing.beforeMatch.toString()}
                  onValueChange={(value) => 
                    updatePreferences({
                      timing: { ...preferences.timing, beforeMatch: parseInt(value) }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="1440">1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beforeExpiry">Booking expiry reminders</Label>
                <Select
                  value={preferences.timing.beforeBookingExpiry.toString()}
                  onValueChange={(value) => 
                    updatePreferences({
                      timing: { ...preferences.timing, beforeBookingExpiry: parseInt(value) }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="quietHours"
                  checked={preferences.timing.quietHours.enabled}
                  onCheckedChange={(checked) => 
                    updatePreferences({
                      timing: {
                        ...preferences.timing,
                        quietHours: { ...preferences.timing.quietHours, enabled: checked }
                      }
                    })
                  }
                />
                <Label htmlFor="quietHours">Quiet Hours</Label>
              </div>
              {preferences.timing.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div className="space-y-2">
                    <Label>From</Label>
                    <input
                      type="time"
                      value={preferences.timing.quietHours.start}
                      onChange={(e) => 
                        updatePreferences({
                          timing: {
                            ...preferences.timing,
                            quietHours: {
                              ...preferences.timing.quietHours,
                              start: e.target.value
                            }
                          }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>To</Label>
                    <input
                      type="time"
                      value={preferences.timing.quietHours.end}
                      onChange={(e) => 
                        updatePreferences({
                          timing: {
                            ...preferences.timing,
                            quietHours: {
                              ...preferences.timing.quietHours,
                              end: e.target.value
                            }
                          }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sound Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Sounds</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={preferences.sounds.enabled}
                  onCheckedChange={(checked) => 
                    updatePreferences({
                      sounds: { ...preferences.sounds, enabled: checked }
                    })
                  }
                />
                {preferences.sounds.enabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </div>
            </div>
            
            {preferences.sounds.enabled && (
              <div className="space-y-3 ml-6">
                <div className="space-y-2">
                  <Label>Volume: {preferences.sounds.volume}%</Label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={preferences.sounds.volume}
                    onChange={(e) => 
                      updatePreferences({
                        sounds: { ...preferences.sounds, volume: parseInt(e.target.value) }
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => {
                const defaultPreferences: NotificationPreferences = {
                  pushEnabled: false,
                  emailEnabled: true,
                  smsEnabled: false,
                  categories: {
                    bookingUpdates: true,
                    matchReminders: true,
                    priceAlerts: true,
                    liveScores: false,
                    promotions: false,
                  },
                  timing: {
                    beforeMatch: 30,
                    beforeBookingExpiry: 24,
                    quietHours: {
                      enabled: false,
                      start: '22:00',
                      end: '08:00',
                    },
                  },
                  sounds: {
                    enabled: true,
                    volume: 80,
                    customSounds: {
                      booking: 'success',
                      match: 'alert',
                      price: 'notification',
                      live: 'score',
                    },
                  },
                };
                setPreferences(defaultPreferences);
                localStorage.setItem('notificationPreferences', JSON.stringify(defaultPreferences));
              }}
            >
              Reset to Default
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => NotificationService.clearAllNotifications()}
              >
                Clear All
              </Button>
              <Button>
                Save Preferences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;