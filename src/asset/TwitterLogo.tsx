import type { SVGProps } from "react";
import * as React from "react";

export const TwitterLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0-13h120v120H0V-13Z" />
        <path
          d="M120 11.878a49.225 49.225 0 0 1-14.14 3.876c5.083-3.047 8.986-7.871 10.825-13.62a49.304 49.304 0 0 1-15.634 5.974A24.588 24.588 0 0 0 83.081.333c-13.597 0-24.62 11.023-24.62 24.62 0 1.929.218 3.808.637 5.61C38.638 29.536 20.496 19.735 8.354 4.84A24.504 24.504 0 0 0 5.02 17.217c0 8.541 4.346 16.077 10.952 20.492a24.521 24.521 0 0 1-11.151-3.08c-.002.103-.002.206-.002.31 0 11.928 8.486 21.879 19.749 24.14a24.653 24.653 0 0 1-11.118.422c3.132 9.781 12.224 16.9 22.998 17.098A49.398 49.398 0 0 1 5.873 87.138c-1.987 0-3.947-.117-5.873-.344 10.895 6.985 23.836 11.06 37.74 11.06 45.283 0 70.046-37.514 70.046-70.047 0-1.067-.023-2.13-.07-3.185A50.038 50.038 0 0 0 120 11.878"
          fill="#FFF"
        />
      </g>
    </svg>
  );
};
