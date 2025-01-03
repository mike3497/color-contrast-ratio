import Color from 'color';

export const calculateContrast = (
  foreground: string,
  background: string
): number => {
  const foregroundColor = Color(foreground);
  const backgroundColor = Color(background);

  const foregroundLinear = foregroundColor
    .rgb()
    .array()
    .map((color: number) => {
      return color <= 0.03928
        ? color / 12.92
        : Math.pow((color + 0.055) / 1.055, 2.4);
    });

  const backgroundLinear = backgroundColor
    .rgb()
    .array()
    .map((color: number) => {
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
