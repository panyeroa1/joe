'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Settings.module.css';

// Icons
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const AudioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z" />
    <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
  </svg>
);

const DisplayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const NotificationsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const AccessibilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v5" />
    <path d="M9 9l6 0" />
    <path d="M12 11l-3 7" />
    <path d="M12 11l3 7" />
  </svg>
);

// Default settings configuration
const defaultSettings = {
  voiceFocusEnabled: true,
  noiseSuppressionEnabled: true,
  echoCancellationEnabled: true,
  autoGainEnabled: true,
  mirrorVideo: true,
  hdVideo: false,
  virtualBackground: 'none',
  theme: 'dark' as 'dark' | 'light' | 'system',
  showCaptions: true,
  soundNotifications: true,
  chatNotifications: true,
  participantJoinNotifications: true,
  reducedMotion: false,
  highContrast: false,
};

type Settings = typeof defaultSettings;

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('eburon_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
  }, []);

  // Debounced save to localStorage
  const saveSettings = useCallback((newSettings: Settings) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('eburon_settings', JSON.stringify(newSettings));
    }, 300);
  }, []);

  // Update a single setting
  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      saveSettings(newSettings);
      return newSettings;
    });
  }, [saveSettings]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Settings</h1>
          <p>Configure your meeting preferences and application settings</p>
        </div>
        <button className={styles.backButton} onClick={handleBack}>
          <BackIcon />
          Back
        </button>
      </header>

      <div className={styles.sectionsGrid}>
        {/* Audio Settings */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <AudioIcon />
            </div>
            <h2 className={styles.sectionTitle}>Audio</h2>
          </div>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Voice Focus</span>
                <span className={styles.settingHint}>Isolate your voice from background noise</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.voiceFocusEnabled}
                  onChange={(e) => updateSetting('voiceFocusEnabled', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Noise Suppression</span>
                <span className={styles.settingHint}>Reduce background noise</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.noiseSuppressionEnabled}
                  onChange={(e) => updateSetting('noiseSuppressionEnabled', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Echo Cancellation</span>
                <span className={styles.settingHint}>Prevent audio feedback</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.echoCancellationEnabled}
                  onChange={(e) => updateSetting('echoCancellationEnabled', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Auto Gain Control</span>
                <span className={styles.settingHint}>Automatically adjust microphone volume</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.autoGainEnabled}
                  onChange={(e) => updateSetting('autoGainEnabled', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Video Settings */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <VideoIcon />
            </div>
            <h2 className={styles.sectionTitle}>Video</h2>
          </div>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Mirror My Video</span>
                <span className={styles.settingHint}>Show mirrored self-view</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.mirrorVideo}
                  onChange={(e) => updateSetting('mirrorVideo', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>HD Video</span>
                <span className={styles.settingHint}>Enable high-definition video quality</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.hdVideo}
                  onChange={(e) => updateSetting('hdVideo', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Virtual Background</span>
                <span className={styles.settingHint}>Choose a background effect</span>
              </div>
              <select
                className={styles.select}
                value={settings.virtualBackground}
                onChange={(e) => updateSetting('virtualBackground', e.target.value)}
              >
                <option value="none">None</option>
                <option value="blur">Blur</option>
                <option value="office">Office</option>
                <option value="nature">Nature</option>
              </select>
            </div>
          </div>
        </section>

        {/* Display Settings */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <DisplayIcon />
            </div>
            <h2 className={styles.sectionTitle}>Display</h2>
          </div>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Theme</span>
                <span className={styles.settingHint}>Choose your preferred color scheme</span>
              </div>
              <select
                className={styles.select}
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value as 'dark' | 'light' | 'system')}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Show Captions</span>
                <span className={styles.settingHint}>Display live captions during meetings</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.showCaptions}
                  onChange={(e) => updateSetting('showCaptions', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <NotificationsIcon />
            </div>
            <h2 className={styles.sectionTitle}>Notifications</h2>
          </div>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Sound Notifications</span>
                <span className={styles.settingHint}>Play sounds for notifications</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.soundNotifications}
                  onChange={(e) => updateSetting('soundNotifications', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Chat Notifications</span>
                <span className={styles.settingHint}>Notify when new messages arrive</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.chatNotifications}
                  onChange={(e) => updateSetting('chatNotifications', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Join Notifications</span>
                <span className={styles.settingHint}>Notify when participants join</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.participantJoinNotifications}
                  onChange={(e) => updateSetting('participantJoinNotifications', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Accessibility Settings */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <AccessibilityIcon />
            </div>
            <h2 className={styles.sectionTitle}>Accessibility</h2>
          </div>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Reduced Motion</span>
                <span className={styles.settingHint}>Minimize animations</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>High Contrast</span>
                <span className={styles.settingHint}>Increase contrast for better visibility</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => updateSetting('highContrast', e.target.checked)}
                />
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
