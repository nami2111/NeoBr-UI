/**
 * NeoBr-UI Design Tokens
 * Clean Neo Brutalism Edition
 */

export const colors = {
    // Background colors (brutalist palette)
    bg: {
        light: 'var(--bg-light, #f5f5f7)',
        dark: 'var(--bg-dark, #11111b)',
        accent: 'var(--bg-accent, #b4befe)',
        warning: 'var(--bg-warning, #f9e2af)',
        muted: 'var(--bg-muted, #fab387)',
        success: 'var(--bg-success, #a6e3a1)',
    },

    // Foreground colors
    fg: {
        light: 'var(--fg-light, #11111b)',
        dark: 'var(--fg-dark, #cdd6f4)',
        accent: 'var(--fg-accent, #b4befe)',
        warning: 'var(--fg-warning, #f9e2af)',
        muted: 'var(--fg-muted, #fab387)',
        success: 'var(--fg-success, #a6e3a1)',
    },

    // Semantic colors (brutalist variants)
    primary: {
        DEFAULT: 'var(--primary, #b4befe)',
        hover: 'var(--primary-hover, #92a1f9)',
        active: 'var(--primary-active, #7685d4)',
        foreground: 'var(--primary-foreground, #11111b)',
    },
    secondary: {
        DEFAULT: 'var(--secondary, #fab387)',
        hover: 'var(--secondary-hover, #ef9f76)',
        active: 'var(--secondary-active, #ea999c)',
        foreground: 'var(--secondary-foreground, #11111b)',
    },
    destructive: {
        DEFAULT: 'var(--destructive, #f38ba8)',
        hover: 'var(--destructive-hover, #e67e80)',
        active: 'var(--destructive-active, #d20f39)',
        foreground: 'var(--destructive-foreground, #f5f5f7)',
    },
    neutral: {
        DEFAULT: 'var(--neutral, #1e1e2e)',
        hover: 'var(--neutral-hover, #181825)',
        active: 'var(--neutral-active, #11111b)',
        foreground: 'var(--neutral-foreground, #cdd6f4)',
    },
    background: 'var(--background, #f5f5f7)',
    foreground: 'var(--foreground, #11111b)',
    muted: {
        DEFAULT: 'var(--muted, #f3f4f6)',
        foreground: 'var(--muted-foreground, #6b7280)',
    },
    accent: {
        DEFAULT: 'var(--accent, #f3f4f6)',
        foreground: 'var(--accent-foreground, #11111b)',
    },
    popover: {
        DEFAULT: 'var(--popover, #ffffff)',
        foreground: 'var(--popover-foreground, #11111b)',
    },
    card: {
        DEFAULT: 'var(--card, #ffffff)',
        foreground: 'var(--card-foreground, #11111b)',
    },
    input: 'var(--input, #e5e7eb)',
    border: 'var(--border, #11111b)',
    ring: 'var(--ring, #b4befe)',
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
    brutalist: '0px 5px 0px 0px var(--shadow-color, #11111b)',
    hover: '0px 7px 0px 0px var(--shadow-color, #11111b)',
    impact: '0px 10px 0px 0px var(--shadow-color, #11111b)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
}

export const zIndex = {
    dropdown: 1000, modal: 1050, toast: 1100, tooltip: 1200,
    brutalist: 2000
}

export const duration = { fast: '150ms', normal: '300ms', slow: '500ms' }
export const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }
