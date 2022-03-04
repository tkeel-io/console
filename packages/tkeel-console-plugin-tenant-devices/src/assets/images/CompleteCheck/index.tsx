/* eslint-disable react/no-unknown-property */

export interface Props {
  colors: {
    main: string;
    sub: string;
    sub2: string;
  };
}

export default function App({
  colors = { main: '#2580FF', sub2: '#CEE3FF', sub: '#E9F2FF' },
}: Props) {
  const { main, sub, sub2 } = colors;
  return (
    <svg
      width="117"
      height="116"
      viewBox="0 0 117 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.8"
        d="M105.569 50.9076L102.782 40.5922L73.2585 48.4655L92.9079 25.1583L84.683 18.2814L63.581 43.3274V10.6426H52.8435V41.0611L35.3142 16.1519L26.52 22.2669L44.0494 47.1956L15.3311 36.7826L11.6603 46.8244L40.3786 57.2374L10.8555 65.0912L13.6429 75.4261L43.1464 67.5528L23.5167 90.8405L31.7415 97.7174L52.8435 72.6909V105.356H63.581V74.9572L81.1104 99.8664L89.9045 93.7319L72.3751 68.8227L101.093 79.2162L104.764 69.1743L76.0459 58.7808L105.569 50.9076Z"
        fill="url(#paint0_radial_2136_108814)"
      />
      <path
        opacity="0.3"
        d="M105.791 63.4067L105.768 52.7214L75.2132 52.6852L100.225 35.2578L94.0607 26.4865L67.1953 45.2175L75.6548 13.6464L65.2832 10.8673L57.4103 40.2494L46.9252 11.652L36.848 15.2825L47.3281 43.8987L22.2834 26.4077L16.1387 35.1573L41.1834 52.6483L10.6335 52.5933L10.6511 63.2975L41.1871 63.3286L16.1989 80.7422L22.3636 89.5135L49.2239 70.8014L40.7695 102.354L51.1411 105.133L59.0089 75.7695L69.494 104.367L79.5763 100.718L69.0912 72.1201L94.1409 89.5923L100.286 80.8427L75.2359 63.3705L105.791 63.4067Z"
        fill="url(#paint1_radial_2136_108814)"
      />
      <path
        opacity="0.6"
        d="M98.9552 31.7656L100.91 35.0363L104.18 36.9909L100.91 38.9454L98.9552 42.2161L97.0007 38.9454L93.73 36.9909L97.0007 35.0363L98.9552 31.7656Z"
        fill={main}
      />
      <path
        d="M15.3348 44.9748L16.7241 46.2394L18.5466 46.6949L17.2821 48.0842L16.8265 49.9067L15.4373 48.6421L13.6148 48.1866L14.8793 46.7974L15.3348 44.9748Z"
        fill={sub2}
      />
      <path
        d="M108.907 80.3816L108.738 82.2526L109.476 83.9802L107.605 83.8118L105.878 84.5498L106.046 82.6788L105.308 80.9513L107.179 81.1197L108.907 80.3816Z"
        fill={sub2}
      />
      <path
        opacity="0.6"
        d="M14.4945 72.6443L17.3497 75.1674L21.0594 76.0369L18.5363 78.892L17.6668 82.6017L14.8117 80.0786L11.102 79.2091L13.6251 76.354L14.4945 72.6443Z"
        fill={main}
      />
      <circle cx="57.7189" cy="57.9987" r="23.6784" fill={sub} />
      <circle cx="57.7189" cy="57.998" r="20.6483" fill={sub2} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M69.173 51.6943L55.8256 65.0417C55.0551 65.8122 53.8057 65.8122 53.0351 65.0417L46.2651 58.2717L48.1255 56.4113L54.4304 62.7162L67.3126 49.834L69.173 51.6943Z"
        fill={main}
      />
      <defs>
        <radialGradient
          id="paint0_radial_2136_108814"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(58.2123 57.9994) rotate(90) scale(47.3568)"
        >
          <stop stop-color={main} stop-opacity="0.12" />
          <stop offset="0.859375" stop-color={main} stop-opacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_2136_108814"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(58.2121 58) rotate(105) scale(47.3568)"
        >
          <stop stop-color={main} stop-opacity="0.12" />
          <stop offset="0.859375" stop-color={main} stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
