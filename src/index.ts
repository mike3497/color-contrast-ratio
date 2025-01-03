import Color from 'color';
import { WCAGLevel } from './wcagLevel';

const AA_CONTRAST = 4.5;
const AAA_CONTRAST = 7;

export const calculateContrast = (
  foreground: string,
  background: string
): number => {
  const foregroundColor = Color(foreground);
  const backgroundColor = Color(background);

  const foregroundRGB = foregroundColor.rgb().array();
  const backgroundRGB = backgroundColor.rgb().array();

  const normalizedForegroundRGB = foregroundRGB.map(
    (color: number) => color / 255
  );
  const normalizedBackgroundRGB = backgroundRGB.map(
    (color: number) => color / 255
  );

  const foregroundLinear = normalizedForegroundRGB.map((color: number) => {
    return color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4);
  });
  const backgroundLinear = normalizedBackgroundRGB.map((color: number) => {
    return color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4);
  });

  const foregroundLuminance =
    0.2126 * foregroundLinear[0] +
    0.7152 * foregroundLinear[1] +
    0.0722 * foregroundLinear[2];
  const backgroundLuminance =
    0.2126 * backgroundLinear[0] +
    0.7152 * backgroundLinear[1] +
    0.0722 * backgroundLinear[2];

  const ratio =
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);

  return ratio;
};

export const meetsWCAG = (
  foreground: string,
  background: string,
  level: WCAGLevel = 'AA'
) => {
  const contrast = calculateContrast(foreground, background);

  switch (level) {
    case 'AA':
      return contrast >= AA_CONTRAST;
    case 'AAA':
      return contrast >= AAA_CONTRAST;
    default:
      return false;
  }
};
