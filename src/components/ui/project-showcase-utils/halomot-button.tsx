import * as React from "react";

export type HalomotButtonProps = {
  inscription: string;
  onClick?: () => void;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  /** Opens `href` in a new tab (adds rel="noopener noreferrer"). */
  newTab?: boolean;
  fixedWidth?: string;
  fillWidth?: boolean;
  gradient?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  outerBorderRadius?: string;
  innerBorderRadius?: string;
  ariaLabel?: string;
  className?: string;
};

/**
 * Button with a 1px gradient outline. On hover the gradient floods the inside.
 * Every colour is a CSS value, so it also accepts var(--token) and follows the site's light/dark theme.
 * The styling lives in `.halomot` in styles.css (it can't be Tailwind: the values are dynamic).
 */
export function HalomotButton({
  inscription,
  onClick,
  href,
  newTab = false,
  fixedWidth,
  fillWidth = false,
  gradient = "linear-gradient(to right, #a123f4, #603dec)",
  backgroundColor = "#111014",
  textColor = "#fff",
  hoverTextColor,
  outerBorderRadius = "6.34px",
  innerBorderRadius = "6px",
  ariaLabel,
  className = "",
}: HalomotButtonProps) {
  const style = {
    "--hm-gradient": gradient,
    "--hm-bg": backgroundColor,
    "--hm-text": textColor,
    "--hm-text-hover": hoverTextColor ?? textColor,
    "--hm-outer": outerBorderRadius,
    "--hm-inner": innerBorderRadius,
    width: fillWidth ? "100%" : fixedWidth,
    flex: fillWidth ? "1 1 0" : undefined,
  } as React.CSSProperties;

  const inner = <span className="halomot-inner">{inscription}</span>;
  const cls = `halomot ${className}`.trim();

  if (href) {
    return (
      <a
        className={cls}
        style={style}
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} style={style} aria-label={ariaLabel} onClick={onClick}>
      {inner}
    </button>
  );
}

export default HalomotButton;
