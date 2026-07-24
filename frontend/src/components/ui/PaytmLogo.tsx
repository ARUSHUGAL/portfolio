interface PaytmLogoProps {
  className?: string;
}

/**
 * Paytm wordmark inside its signature circle.
 * Rendered as inline SVG so it stays crisp at any size and needs no asset file.
 * Kept small and subtle to sit beside the role's organization label.
 */
export function PaytmLogo({ className }: PaytmLogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label="Paytm"
      fill="none"
    >
      <circle cx="256" cy="256" r="236" stroke="#002970" strokeWidth="16" />
      <text
        x="50%"
        y="52%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="'SF Pro Display', -apple-system, 'Segoe UI', Arial, sans-serif"
        fontWeight="800"
        fontSize="150"
        letterSpacing="-6"
      >
        <tspan fill="#002970">pay</tspan>
        <tspan fill="#00baf2">tm</tspan>
      </text>
    </svg>
  );
}
