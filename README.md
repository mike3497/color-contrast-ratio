## color-contrast-ratio

A JavaScript library for calculating color contrast ratios and WCAG conformance.

This library provides functions to calculate the contrast ratio between two colors and determine if the contrast meets the Web Content Accessibility Guidelines (WCAG) requirements.

**Installation**

    npm install color-contrast-ratio

**Usage**

    import { calculateContrast, meetsWCAG } from 'color-contrast-ratio';

    // Calculate contrast ratio
    const contrastRatio = calculateContrast('#000000', '#FFFFFF'); // Black on white console.log(contrastRatio); // Output: 21 (approx)

    // Check WCAG conformance
    const isWCAGAA = meetsWCAG('#333333', '#EEEEEE', 'AA'); // AA contrast for dark text on light background console.log(isWCAGAA); // Output: true (if contrast meets AA requirements)

**Supported WCAG Levels**

    'AA'
    'AAA'

**Explanation**

- The `calculateContrast` function takes two color values (e.g., hex codes, RGB) as input and calculates the contrast ratio according to the WCAG formula.
- The `meetsWCAG` function takes three arguments: foreground color, background color, and WCAG level (defaults to 'AA'). It calculates the contrast ratio using `calculateContrast` and compares it to the minimum required contrast ratio for the specified WCAG level.

**Contributing**

I welcome contributions to this project! Feel free to submit pull requests with improvements or new features.
