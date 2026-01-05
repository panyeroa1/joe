'use client';

import React, { useState, useEffect } from 'react';
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

export default function SettingsPage() {
  const router = useRouter();

  // Audio settings
  const [voiceFocusEnabled, setVoiceFocusEnabled] = useState(true);
  const [noiseSuppressionEnabled, setNoiseSuppressionEnabled] = useState(true);
  const [echoCancellationEnabled, setEchoCancellationEnabled] = useState(true);
  const [autoGainEnabled, setAutoGainEnabled] = useState(true);

  // Video settings
  const [mirrorVideo, setMirrorVideo] = useState(true);
  const [hdVideo, setHdVideo] = useState(false);
  const [virtualBackground, setVirtualBackground] = useState('none');

  // Display settings
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [showCaptions, setShowCaptions] = useState(true);

  // Notification settings
  const [soundNotifications, setSoundNotifications] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [participantJoinNotifications, setParticipantJoinNotifications] = useState(true);

  // Accessibility settings
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('eburon_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.voiceFocusEnabled !== undefined) setVoiceFocusEnabled(parsed.voiceFocusEnabled);
        if (parsed.noiseSuppressionEnabled !== undefined) setNoiseSuppressionEnabled(parsed.noiseSuppressionEnabled);
        if (parsed.echoCancellationEnabled !== undefined) setEchoCancellationEnabled(parsed.echoCancellationEnabled);
        if (parsed.autoGainEnabled !== undefined) setAutoGainEnabled(parsed.autoGainEnabled);
        if (parsed.mirrorVideo !== undefined) setMirrorVideo(parsed.mirrorVideo);
        if (parsed.hdVideo !== undefined) setHdVideo(parsed.hdVideo);
        if (parsed.virtualBackground !== undefined) setVirtualBackground(parsed.virtualBackground);
        if (parsed.theme !== undefined) setTheme(parsed.theme);
        if (parsed.showCaptions !== undefined) setShowCaptions(parsed.showCaptions);
        if (parsed.soundNotifications !== undefined) setSoundNotifications(parsed.soundNotifications);
        if (parsed.chatNotifications !== undefined) setChatNotifications(parsed.chatNotifications);
        if (parsed.participantJoinNotifications !== undefined) setParticipantJoinNotifications(parsed.participantJoinNotifications);
        if (parsed.reducedMotion !== undefined) setReducedMotion(parsed.reducedMotion);
        if (parsed.highContrast !== undefined) setHighContrast(parsed.highContrast);
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      voiceFocusEnabled,
      noiseSuppressionEnabled,
      echoCancellationEnabled,
      autoGainEnabled,
      mirrorVideo,
      hdVideo,
      virtualBackground,
      theme,
      showCaptions,
      soundNotifications,
      chatNotifications,
      participantJoinNotifications,
      reducedMotion,
      highContrast,
    };
    localStorage.setItem('eburon_settings', JSON.stringify(settings));
  }, [
    voiceFocusEnabled,
    noiseSuppressionEnabled,
    echoCancellationEnabled,
    autoGainEnabled,
    mirrorVideo,
    hdVideo,
    virtualBackground,
    theme,
    showCaptions,
    soundNotifications,
    chatNotifications,
    participantJoinNotifications,
    reducedMotion,
    highContrast,
  ]);

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
                  checked={voiceFocusEnabled}
                  onChange={(e) => setVoiceFocusEnabled(e.target.checked)}
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
                  checked={noiseSuppressionEnabled}
                  onChange={(e) => setNoiseSuppressionEnabled(e.target.checked)}
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
                  checked={echoCancellationEnabled}
                  onChange={(e) => setEchoCancellationEnabled(e.target.checked)}
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
                  checked={autoGainEnabled}
                  onChange={(e) => setAutoGainEnabled(e.target.checked)}
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
                  checked={mirrorVideo}
                  onChange={(e) => setMirrorVideo(e.target.checked)}
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
                  checked={hdVideo}
                  onChange={(e) => setHdVideo(e.target.checked)}
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
                value={virtualBackground}
                onChange={(e) => setVirtualBackground(e.target.value)}
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
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'dark' | 'light' | 'system')}
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
                  checked={showCaptions}
                  onChange={(e) => setShowCaptions(e.target.checked)}
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
                  checked={soundNotifications}
                  onChange={(e) => setSoundNotifications(e.target.checked)}
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
                  checked={chatNotifications}
                  onChange={(e) => setChatNotifications(e.target.checked)}
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
                  checked={participantJoinNotifications}
                  onChange={(e) => setParticipantJoinNotifications(e.target.checked)}
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
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
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
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
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
