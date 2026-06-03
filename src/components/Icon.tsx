import type { SVGProps } from "react";

type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "download"
  | "menu"
  | "close"
  | "sun"
  | "moon"
  | "linkedin"
  | "github"
  | "mail"
  | "external"
  | "chart"
  | "code"
  | "pipeline"
  | "spark"
  | "compass"
  | "check"
  | "pin"
  | "sparkles"
  | "filter"
  | "shield"
  | "trend-up"
  | "trend-down"
  | "trend-flat"
  | "play"
  | "doc"
  | "layers"
  | "target"
  | "quote";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  linkedin: (
    <>
      <path d="M4.5 9.5h3v10h-3zM6 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z" />
      <path d="M10.5 9.5h3v1.6c.5-.9 1.6-1.9 3.4-1.9 2.6 0 3.6 1.7 3.6 4.6v6.2h-3v-5.5c0-1.4-.5-2.3-1.7-2.3-1 0-1.6.7-1.8 1.4-.1.2-.1.6-.1.9v5.5h-3z" />
    </>
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
  chart: <path d="M4 20V10m5 10V4m5 16v-7m5 7V8" />,
  code: <path d="m9 8-5 4 5 4m6-8 5 4-5 4" />,
  pipeline: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H15a3 3 0 0 1 3 3v6M6 8.5V15a3 3 0 0 0 3 3h6.5" />
    </>
  ),
  spark: <path d="M12 3v6m0 6v6m9-9h-6m-6 0H3m13.5-6.5L14 8m-4 8-2.5 2.5m9 0L14 16m-4-8L7.5 5.5" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  check: <path d="m5 13 4 4L19 7" />,
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  sparkles: <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 14l.9 2.1 2.1.9-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" />,
  filter: <path d="M4 5h16l-6 8v5l-4 2v-7z" />,
  shield: <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6z" />,
  "trend-up": <path d="M4 17 10 11l4 4 6-7m0 0h-5m5 0v5" />,
  "trend-down": <path d="M4 7 10 13l4-4 6 7m0 0h-5m5 0v-5" />,
  "trend-flat": <path d="M4 12h16m0 0-4-4m4 4-4 4" />,
  play: <path d="M7 5v14l11-7z" />,
  doc: (
    <>
      <path d="M7 3h7l5 5v13a0 0 0 0 1 0 0H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  quote: <path d="M7 7H4v6h3l-1.5 4H7zM17 7h-3v6h3l-1.5 4H17z" />,
};

export type { IconName };

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
