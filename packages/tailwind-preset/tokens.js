/**
 * NeoBr-UI Design Tokens
 * Clean Neo Brutalism Edition
 */

export const colors = {
    // Background colors (brutalist palette)
    bg: {
        light: 'var(--bg-light)',
        dark: 'var(--bg-dark)',
        accent: 'var(--bg-accent)',
        warning: 'var(--bg-warning)',
        muted: 'var(--bg-muted)',
        success: 'var(--bg-success)',
    },

    // Foreground colors
    fg: {
        light: 'var(--fg-light)',
        dark: 'var(--fg-dark)',
        accent: 'var(--fg-accent)',
        warning: 'var(--fg-warning)',
        muted: 'var(--fg-muted)',
        success: 'var(--fg-success)',
    },

    // Semantic colors (brutalist variants)
    primary: {
        DEFAULT: 'var(--primary)',
        hover: 'var(--primary-hover)',
        active: 'var(--primary-active)',
        foreground: 'var(--primary-foreground)',
    },
    secondary: {
        DEFAULT: 'var(--secondary)',
        hover: 'var(--secondary-hover)',
        active: 'var(--secondary-active)',
        foreground: 'var(--secondary-foreground)',
    },
    destructive: {
        DEFAULT: 'var(--destructive)',
        hover: 'var(--destructive-hover)',
        active: 'var(--destructive-active)',
        foreground: 'var(--destructive-foreground)',
    },
    neutral: {
        DEFAULT: 'var(--neutral)',
        hover: 'var(--neutral-hover)',
        active: 'var(--neutral-active)',
        foreground: 'var(--neutral-foreground)',
    },
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
    },
    accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
    },
    popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'var(--popover-foreground)',
    },
    card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
    },
    input: 'var(--input)',
    border: 'var(--border)',
    ring: 'var(--ring)',
}

export const typography = {
    fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
    },
    fontSize: {
        xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem',
        display: '3rem',
        hero: '4.5rem'
    },
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: {
        tight: '-0.025em', normal: '0em', wide: '0.025em',
        brutalist: '0.1em',
        uppercase: '0.2em'
    }
}

export const spacing = {
    xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem',
    brutalist: '0.75rem',
    impact: '3rem'
}

export const radius = {
    none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem',
    brutalist: '12px'
}

export const shadow = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    brutalist: '0px 5px 0px 0px var(--shadow-color)',
    impact: '0px 10px 0px 0px var(--shadow-color)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
}

export const zIndex = {
    dropdown: 1000, modal: 1050, toast: 1100, tooltip: 1200,
    brutalist: 2000
}

export const duration = { fast: '150ms', normal: '300ms', slow: '500ms' }
export const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }
