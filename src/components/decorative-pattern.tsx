import {
  CalendarDays,
  Camera,
  Heart,
  Megaphone,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Play,
  type LucideIcon,
} from 'lucide-react';

type PatternName = 'hero' | 'closing';

// A phone and stand drawn to the same 24px, rounded-outline specification as Lucide.
function PhoneTripod({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="12" rx="2" />
    <path d="M11 11h2M12 14v3M12 17l-5 5M12 17l5 5M7 22h10" />
  </svg>;
}

const icons: Record<PatternName, { name: string; Icon: LucideIcon | typeof PhoneTripod }[]> = {
  hero: [
    { name: 'camera', Icon: Camera },
    { name: 'video-editing', Icon: MonitorPlay },
    { name: 'megaphone', Icon: Megaphone },
    { name: 'phone-tripod', Icon: PhoneTripod },
    { name: 'microphone', Icon: Mic2 },
    { name: 'speech', Icon: MessageCircle },
    { name: 'calendar', Icon: CalendarDays },
  ],
  closing: [
    { name: 'speech', Icon: MessageCircle },
    { name: 'calendar', Icon: CalendarDays },
    { name: 'play', Icon: Play },
    { name: 'heart', Icon: Heart },
    { name: 'camera', Icon: Camera },
    { name: 'microphone', Icon: Mic2 },
  ],
};

export function DecorativePattern({ variant }: { variant: PatternName }) {
  return <div className={`decorative-pattern decorative-pattern--${variant}`} aria-hidden="true">
    {icons[variant].map(({ name, Icon }) => <span className={`decorative-pattern__icon decorative-pattern__icon--${name}`} key={name}><Icon /></span>)}
  </div>;
}
