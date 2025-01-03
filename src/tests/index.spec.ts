import { calculateContrast, meetsWCAG } from '../index';
import { describe, test, expect } from 'vitest';

describe('calculateContrast', () => {
  test('given black text on white background, should calculate the correct contrast ratio', () => {
    const foreground = '#000000';
    const background = '#FFFFFF';
    const expectedRatio = 21;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });

  test('given white text on black background, should calculate the correct contrast ratio', () => {
    const foreground = '#FFFFFF';
    const background = '#000000';
    const expectedRatio = 21;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });

  test('should handle low contrast correctly', () => {
    const foreground = '#EEEEEE';
    const background = '#DDDDDD';
    const expectedRatio = 1.17;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });

  test('should handle high contrast correctly', () => {
    const foreground = '#000000';
    const background = '#FFFF00';
    const expectedRatio = 19.55;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });

  test('given black as rgb text on white as rgb background, should calculate the correct contrast ratio', () => {
    const foreground = 'rgb(0, 0, 0)';
    const background = 'rgb(255, 255, 255)';
    const expectedRatio = 21;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });

  test('given black as string text on white as string background, should calculate the correct contrast ratio', () => {
    const foreground = 'black';
    const background = 'white';
    const expectedRatio = 21;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });

  test('given black as hsl text on white as hsl background, should calculate the correct contrast ratio', () => {
    const foreground = 'hsl(0, 0%, 0%)';
    const background = 'hsl(0, 0%, 100%)';
    const expectedRatio = 21;

    expect(calculateContrast(foreground, background)).toBeCloseTo(
      expectedRatio,
      1
    );
  });
});

describe('meetsWCAG', () => {
  test('given black text on white background, should meet AA level', () => {
    const foreground = '#000000';
    const background = '#FFFFFF';

    expect(meetsWCAG(foreground, background, 'AA')).toBe(true);
  });

  test('given black text on white background, should meet AAA level', () => {
    const foreground = '#000000';
    const background = '#FFFFFF';

    expect(meetsWCAG(foreground, background, 'AAA')).toBe(true);
  });

  test('given white text on black background, should meet AA level', () => {
    const foreground = '#FFFFFF';
    const background = '#000000';

    expect(meetsWCAG(foreground, background, 'AA')).toBe(true);
  });

  test('given white text on black background, should meet AAA level', () => {
    const foreground = '#FFFFFF';
    const background = '#000000';

    expect(meetsWCAG(foreground, background, 'AAA')).toBe(true);
  });

  test('given low contrast, should not meet AA level', () => {
    const foreground = '#EEEEEE';
    const background = '#DDDDDD';

    expect(meetsWCAG(foreground, background, 'AA')).toBe(false);
  });

  test('given low contrast, should not meet AAA level', () => {
    const foreground = '#EEEEEE';
    const background = '#DDDDDD';

    expect(meetsWCAG(foreground, background, 'AAA')).toBe(false);
  });
});
