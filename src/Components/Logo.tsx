interface Props {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * Dizaino World mark: an archway framing a smaller doorway, standing on a
 * ground line. Drawn with currentColor so it follows the surrounding text
 * colour (white over hero photos, ink on light backgrounds).
 */
export function LogoMark({ size = 28, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M7 28V14a9 9 0 0 1 18 0v14" />
      <path d="M13 28v-7a3 3 0 0 1 6 0v7" />
      <path d="M3 28h26" />
    </svg>
  );
}

export default function Logo({ size = 28, className }: Props) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
      <LogoMark size={size} />
      <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>Dizaino World</span>
    </span>
  );
}
