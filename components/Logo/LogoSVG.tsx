export default function LogoSVG({ size = 200 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden
    >
      <g fill="#4cae66">
        <circle cx="56" cy="100" r="12" />
        <circle cx="86.4" cy="58.2" r="9.2" />
        <circle cx="135.6" cy="74.1" r="4.8" />
        <circle cx="135.6" cy="125.9" r="4.8" />
        <circle cx="86.4" cy="141.8" r="9.2" />
      </g>
      <g fill="#ff8f00">
        <circle cx="64.4" cy="74.1" r="11.2" />
        <circle cx="144" cy="100" r="4" />
        <circle cx="64.4" cy="125.9" r="11.2" />
      </g>
      <g fill="#4f9bd7">
        <circle cx="113.6" cy="58.2" r="6.8" />
        <circle cx="113.6" cy="141.8" r="6.8" />
      </g>
    </svg>
  )
}
