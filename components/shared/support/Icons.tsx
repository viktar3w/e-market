import { LucideProps } from "lucide-react";

export const Icons = {
  telegram: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
      <path
        fill="#fff"
        d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
      />
      <path
        fill="#b0bec5"
        d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
      />
      <path
        fill="#cfd8dc"
        d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
      />
    </svg>
  ),
  verificationBadge: (props: LucideProps) => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
      >
        <path
          d="M17.7508 9.41667C17.7508 8.1 17.0217 6.95833 15.9608 6.41667C16.0892 6.05417 16.1592 5.6625 16.1592 5.25C16.1592 3.40833 14.7342 1.91833 12.9775 1.91833C12.5858 1.91833 12.2108 1.98833 11.8642 2.12667C11.3492 1.0125 10.2592 0.25 9.00083 0.25C7.7425 0.25 6.65417 1.01417 6.13667 2.125C5.79083 1.9875 5.415 1.91667 5.02333 1.91667C3.265 1.91667 1.84167 3.40833 1.84167 5.25C1.84167 5.66167 1.91083 6.05333 2.03917 6.41667C0.979167 6.95833 0.25 8.09833 0.25 9.41667C0.25 10.6625 0.901667 11.7483 1.86833 12.3217C1.85167 12.4633 1.84167 12.605 1.84167 12.75C1.84167 14.5917 3.265 16.0833 5.02333 16.0833C5.415 16.0833 5.79 16.0117 6.13583 15.875C6.6525 16.9867 7.74083 17.75 9 17.75C10.26 17.75 11.3483 16.9867 11.8642 15.875C12.21 16.0108 12.585 16.0817 12.9775 16.0817C14.7358 16.0817 16.1592 14.59 16.1592 12.7483C16.1592 12.6033 16.1492 12.4617 16.1317 12.3208C17.0967 11.7483 17.7508 10.6625 17.7508 9.4175V9.41667ZM12.2375 6.63833L8.62583 12.055C8.505 12.2358 8.3075 12.3333 8.105 12.3333C7.98583 12.3333 7.865 12.3 7.75833 12.2283L7.6625 12.15L5.65 10.1375C5.40583 9.89333 5.40583 9.4975 5.65 9.25417C5.89417 9.01083 6.29 9.00917 6.53333 9.25417L8.00833 10.7267L11.1958 5.94333C11.3875 5.65583 11.7758 5.58 12.0625 5.77083C12.3508 5.9625 12.4292 6.35083 12.2375 6.6375V6.63833Z"
          fill="#1D9BF0"
        />
      </svg>
    );
  },
  backgroundPattern: (props: LucideProps) => {
    return (
      <svg
        width="768"
        height="736"
        viewBox="0 0 768 736"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
      >
        <mask
          id="mask0_5036_374506"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-32"
          width="768"
          height="768"
        >
          <rect
            width="768"
            height="768"
            transform="translate(0 -32)"
            fill="url(#paint0_radial_5036_374506)"
          />
        </mask>
        <g mask="url(#mask0_5036_374506)">
          <g clipPath="url(#clip0_5036_374506)">
            <g clipPath="url(#clip1_5036_374506)">
              <line x1="0.5" y1="-32" x2="0.5" y2="736" stroke="#E4E7EC" />
              <line x1="48.5" y1="-32" x2="48.5" y2="736" stroke="#E4E7EC" />
              <line x1="96.5" y1="-32" x2="96.5" y2="736" stroke="#E4E7EC" />
              <line x1="144.5" y1="-32" x2="144.5" y2="736" stroke="#E4E7EC" />
              <line x1="192.5" y1="-32" x2="192.5" y2="736" stroke="#E4E7EC" />
              <line x1="240.5" y1="-32" x2="240.5" y2="736" stroke="#E4E7EC" />
              <line x1="288.5" y1="-32" x2="288.5" y2="736" stroke="#E4E7EC" />
              <line x1="336.5" y1="-32" x2="336.5" y2="736" stroke="#E4E7EC" />
              <line x1="384.5" y1="-32" x2="384.5" y2="736" stroke="#E4E7EC" />
              <line x1="432.5" y1="-32" x2="432.5" y2="736" stroke="#E4E7EC" />
              <line x1="480.5" y1="-32" x2="480.5" y2="736" stroke="#E4E7EC" />
              <line x1="528.5" y1="-32" x2="528.5" y2="736" stroke="#E4E7EC" />
              <line x1="576.5" y1="-32" x2="576.5" y2="736" stroke="#E4E7EC" />
              <line x1="624.5" y1="-32" x2="624.5" y2="736" stroke="#E4E7EC" />
              <line x1="672.5" y1="-32" x2="672.5" y2="736" stroke="#E4E7EC" />
              <line x1="720.5" y1="-32" x2="720.5" y2="736" stroke="#E4E7EC" />
            </g>
            <rect x="0.5" y="-31.5" width="767" height="767" stroke="#E4E7EC" />
            <g clipPath="url(#clip2_5036_374506)">
              <line y1="15.5" x2="768" y2="15.5" stroke="#E4E7EC" />
              <line y1="63.5" x2="768" y2="63.5" stroke="#E4E7EC" />
              <line y1="111.5" x2="768" y2="111.5" stroke="#E4E7EC" />
              <line y1="159.5" x2="768" y2="159.5" stroke="#E4E7EC" />
              <line y1="207.5" x2="768" y2="207.5" stroke="#E4E7EC" />
              <line y1="255.5" x2="768" y2="255.5" stroke="#E4E7EC" />
              <line y1="303.5" x2="768" y2="303.5" stroke="#E4E7EC" />
              <line y1="351.5" x2="768" y2="351.5" stroke="#E4E7EC" />
              <line y1="399.5" x2="768" y2="399.5" stroke="#E4E7EC" />
              <line y1="447.5" x2="768" y2="447.5" stroke="#E4E7EC" />
              <line y1="495.5" x2="768" y2="495.5" stroke="#E4E7EC" />
              <line y1="543.5" x2="768" y2="543.5" stroke="#E4E7EC" />
              <line y1="591.5" x2="768" y2="591.5" stroke="#E4E7EC" />
              <line y1="639.5" x2="768" y2="639.5" stroke="#E4E7EC" />
              <line y1="687.5" x2="768" y2="687.5" stroke="#E4E7EC" />
              <line y1="735.5" x2="768" y2="735.5" stroke="#E4E7EC" />
            </g>
            <rect x="0.5" y="-31.5" width="767" height="767" stroke="#E4E7EC" />
          </g>
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_5036_374506"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(384 384) rotate(90) scale(384 384)"
          >
            <stop />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
          <clipPath id="clip0_5036_374506">
            <rect
              width="768"
              height="768"
              fill="white"
              transform="translate(0 -32)"
            />
          </clipPath>
          <clipPath id="clip1_5036_374506">
            <rect y="-32" width="768" height="768" fill="white" />
          </clipPath>
          <clipPath id="clip2_5036_374506">
            <rect y="-32" width="768" height="768" fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
  }
};
