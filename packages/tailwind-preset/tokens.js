/**
 * NeoBr-UI Design Tokens
 * Clean Neo Brutalism Edition
 */

export const colors = {
    // Background colors (brutalist palette)
    bg: {
        light: '#fafafa',     // Raw White - pure, unfiltered
        dark: '#2c2c2c',      // Grayscale Base - mechanical gray
        accent: '#00ffff',     // Bold Cyan - digital neon
        warning: '#ff0033',    // Sharp Red - urgent, raw
        muted: '#ffb3b3',      // Muted Pink - vintage warmth
        success: '#bfff00',    // Lime Punch - digital green
    },

    // Foreground colors
    fg: {
        light: '#000000',     // Pure Black - absolute contrast
        dark: '#ffffff',      // Raw White - maximum brightness
        accent: '#00ffff',     // Bold Cyan - digital neon
        warning: '#ff0033',    // Sharp Red - urgent, raw
        muted: '#ffb3b3',      // Muted Pink - vintage warmth
        success: '#bfff00',    // Lime Punch - digital green
    },

    // Semantic colors (brutalist variants)
    primary: {
        DEFAULT: '#00ffff',      // Bold Cyan - digital neon
        hover: '#00cccc',     // Darker Cyan - mechanical depth
        active: '#00a3a3',    // Deep Cyan - raw intensity
        foreground: '#000000',
    },
    secondary: {
        DEFAULT: '#ffb3b3',      // Muted Pink - vintage warmth
        hover: '#ff9999',     // Brighter Pink - mechanical glow
        active: '#ff8080',    // Deep Pink - raw intensity
        foreground: '#2c2c2c',
    },
    destructive: {
        DEFAULT: '#ff0033',      // Sharp Red - urgent, raw
        hover: '#cc0029',     // Darker Red - mechanical depth
        active: '#990020',    // Deep Red - raw intensity
        foreground: '#fafafa',
    },
    neutral: {
        DEFAULT: '#2c2c2c',      // Grayscale Base - mechanical gray
        hover: '#1a1a1a',     // Darker Gray - mechanical depth
        active: '#0d0d0d',    // Deep Gray - raw intensity
        foreground: '#ffffff',
    },
    background: '#fafafa',
    foreground: '#000000',
    muted: {
        DEFAULT: '#f3f4f6',
        foreground: '#6b7280',
    },
    accent: {
        DEFAULT: '#f3f4f6',
        foreground: '#111827',
    },
    popover: {
        DEFAULT: '#ffffff',
        foreground: '#09090b',
    },
    card: {
        DEFAULT: '#ffffff',
        foreground: '#09090b',
    },
    input: '#e5e7eb',
    border: '#e5e7eb',
    ring: '#00ffff', // primary
}

export const typography = {
    fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'], // Mechanical precision
        sans: ['Inter', 'system-ui', 'sans-serif']          // System fonts
    },
    fontSize: {
        xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem',
        display: '3rem', // Brutalist display typography
        hero: '4.5rem'   // Maximum impact
    },
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: {
        tight: '-0.025em', normal: '0em', wide: '0.025em',
        brutalist: '0.1em', // Mechanical tracking for impact
        uppercase: '0.2em'  // Maximum mechanical precision
    }
}

export const spacing = {
    xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem',
    brutalist: '0.75rem', // Mechanical spacing for structure
    impact: '3rem'        // Maximum spacing for impact
}

export const radius = {
    none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem',
    brutalist: '12px'      // Final refined rounding for optimal aesthetic
}

export const shadow = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    brutalist: '0px 5px 0px 0px rgba(0,0,0,1)', // Mechanical offset
    impact: '0px 10px 0px 0px rgba(0,0,0,1)',  // Maximum impact
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
}

export const zIndex = {
    dropdown: 1000, modal: 1050, toast: 1100, tooltip: 1200,
    brutalist: 2000  // Maximum z-index for brutalist overlays
}

export const duration = { fast: '150ms', normal: '300ms', slow: '500ms' }
export const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }
