/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable operator-assignment */
/* eslint-disable no-bitwise */
/* eslint-disable-next-line arrow-body-style */

import colorPalettes from '@/utils/AvatarColors.json';

const hashCode = (name: string): number => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    const character = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const getDigit = (number: number, ntn: number): number => Math.floor((number / (10 ** ntn)) % 10);

const getBoolean = (number: number, ntn: number): boolean => (!((getDigit(number, ntn)) % 2));

const getUnit = (number: number, range: number, index?: number): number => {
  const value = number % range;
  if (index && ((getDigit(number, index) % 2) === 0)) return -value;
  return value;
};

const getRandomColor = (
  number: number,
  colors: string[],
  range: number,
): string => colors[(number) % range];

const getContrast = (hexColor: string): string => {
  let hexCode = '';
  if (hexColor.slice(0, 1) === '#') {
    hexCode = hexColor.slice(1);
  }
  const r = Number.parseInt(hexCode.substring(0, 2), 16);
  const g = Number.parseInt(hexCode.substring(2, 4), 16);
  const b = Number.parseInt(hexCode.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

const SIZE = 36;

const generateData = (name: string) => {
  const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

  const numFromName = hashCode(name);
  const range = colors && colors.length;
  const wrapperColor = getRandomColor(numFromName, colors, range);
  const preTranslateX = getUnit(numFromName, 10, 1);
  const wrapperTranslateX = preTranslateX < 5 ? preTranslateX + SIZE / 9 : preTranslateX;
  const preTranslateY = getUnit(numFromName, 10, 2);
  const wrapperTranslateY = preTranslateY < 5 ? preTranslateY + SIZE / 9 : preTranslateY;

  const data = {
    wrapperColor,
    faceColor: getContrast(wrapperColor),
    backgroundColor: getRandomColor(numFromName + 13, colors, range),
    wrapperTranslateX,
    wrapperTranslateY,
    wrapperRotate: getUnit(numFromName, 360),
    wrapperScale: 1 + getUnit(numFromName, SIZE / 12) / 10,
    isMouthOpen: getBoolean(numFromName, 2),
    isCircle: getBoolean(numFromName, 1),
    eyeSpread: getUnit(numFromName, 5),
    mouthSpread: getUnit(numFromName, 3),
    faceRotate: getUnit(numFromName, 10, 3),
    faceTranslateX:
      wrapperTranslateX > SIZE / 6 ? wrapperTranslateX / 2 : getUnit(numFromName, 8, 1),
    faceTranslateY:
      wrapperTranslateY > SIZE / 6 ? wrapperTranslateY / 2 : getUnit(numFromName, 7, 2),
  };

  return data;
};

export const generateAvatar = (name: string, size: number) => {
  const data = generateData(name);
  const svg = `
    <svg
      viewBox="0 0 ${SIZE} ${SIZE}"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
    >
      <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
        <rect width="${SIZE}" height="${SIZE}" fill="#FFFFFF" />
      </mask>
      <g mask="url(#mask__beam)">
        <rect width="${SIZE}" height="${SIZE}" fill="${data.backgroundColor}" />
        <rect
          x="0"
          y="0"
          width="${SIZE}"
          height="${SIZE}"
          transform="translate(${data.wrapperTranslateX} ${data.wrapperTranslateY}) rotate(${data.wrapperRotate} ${SIZE / 2} ${SIZE / 2}) scale(${data.wrapperScale})"
          fill="${data.wrapperColor}"
          rx="${data.isCircle ? SIZE : SIZE / 6}"
        />
        <g
          transform="translate(${data.faceTranslateX} ${data.faceTranslateY}) rotate(${data.faceRotate} ${SIZE / 2} ${SIZE / 2})"
        >
          ${data.isMouthOpen ? `
              <path
                d="M15 ${19 + data.mouthSpread} c2 1 4 1 6 0"
                stroke="${data.faceColor}"
                fill="none"
                strokeLinecap="round"
              />
              ` : `
              <path
                d="M13, ${19 + data.mouthSpread} a1,0.75 0 0,0 10,0"
                fill="${data.faceColor}"
              />
          `}
          <rect
            x="${14 - data.eyeSpread}"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="${data.faceColor}"
          />
          <rect
            x="${20 + data.eyeSpread}"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="${data.faceColor}"
          />
        </g>
      </g>
    </svg>
  `;
  return svg;
};
