// Небольшой набор линейных иконок (24x24, stroke)
const P = {
  cloud: 'M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  laptop: 'M5 6h14v9H5zM3 18h18',
  network: 'M12 3v6M5 15v-3h14v3M5 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 3h4v6h-4z',
  backup: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5',
  pulse: 'M3 12h4l2-6 4 12 2-6h6',
  cart: 'M3 4h2l2.4 11h10.2L20 8H6.2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  doc: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
  whatsapp: 'M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Zm5-11c0 3 3 6 6 6l1.2-1.5-2-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-2L9 9Z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  minus: 'M6 12h12',
  plus: 'M12 6v12M6 12h12',
  copy: 'M9 9h10v11H9zM5 15V4h10',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  phone: 'M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3Z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  send: 'M4 12l16-8-6 16-2.5-6.5L4 12Z',
  linkedin: 'M5 9h3v10H5zM6.5 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11 9h3v1.5c.6-1 1.8-1.7 3.2-1.7 2.3 0 2.8 1.6 2.8 3.7V19h-3v-5.6c0-1.2-.3-2-1.4-2-1.2 0-1.6.9-1.6 2.1V19h-3z',
};

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  );
}
