// Theme configuration based on domain
export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    cartColors: {
      above: string;      // When above minimum order
      below: string;      // When below minimum order
      border: string;     // Border color
      icon: string;       // Icon color
      text: string;       // Text color
    };
  };
  branding: {
    title: string;
    subtitle: string;
    description: string;
    positioning: string;
  };
}

export const themeConfigs: Record<string, ThemeConfig> = {
  // Black/Gold - Premium Licensed Theme
  'mercunberlesen.com': {
    name: 'Premium Black & Gold',
    colors: {
      primary: '214 27% 10%',        // Black
      primaryForeground: '45 93% 75%', // Gold
      secondary: '45 93% 75%',       // Gold
      secondaryForeground: '214 27% 10%', // Black
      accent: '45 93% 75%',          // Gold
      accentForeground: '214 27% 10%', // Black
      cartColors: {
        above: 'from-slate-800 to-slate-700',
        below: 'from-red-800 to-red-700',
        border: 'border-yellow-400',
        icon: 'text-yellow-400',
        text: 'text-yellow-100'
      }
    },
    branding: {
      title: 'Mercuncelebrasi',
      subtitle: 'Distributor Mercun celebrasi Rasmi #1 Malaysia',
      description: '100% legal, kualiti premium, dokumentasi lengkap',
      positioning: 'premium licensed distributor'
    }
  },

  // Red/Silver - Raya Celebration Theme
  'rayafireworks.com': {
    name: 'Red & Silver Raya',
    colors: {
      primary: '0 84% 60%',          // Red-600 (#DC2626)
      primaryForeground: '220 13% 91%', // Gray-200 (#E5E7EB)
      secondary: '220 13% 91%',      // Silver/Gray-200
      secondaryForeground: '0 84% 60%', // Red
      accent: '0 84% 60%',           // Red
      accentForeground: '220 13% 91%', // Silver
      cartColors: {
        above: 'from-red-600 to-red-700',
        below: 'from-red-800 to-red-900',
        border: 'border-gray-300',
        icon: 'text-gray-400',
        text: 'text-gray-100'
      }
    },
    branding: {
      title: 'RayaFireworks',
      subtitle: 'Specialist Bunga Api Hari Raya Malaysia',
      description: 'Sambutan Raya yang meriah dan selamat untuk keluarga',
      positioning: 'raya celebration specialist'
    }
  },

  // Green/Yellow - Traditional Raya Theme (for mercunraya.com reference)
  'mercunraya.com': {
    name: 'Green & Yellow Traditional',
    colors: {
      primary: '120 100% 25%',       // Green
      primaryForeground: '60 100% 95%', // Light Yellow
      secondary: '60 100% 50%',      // Yellow
      secondaryForeground: '120 100% 25%', // Green
      accent: '60 100% 50%',         // Yellow
      accentForeground: '120 100% 25%', // Green
      cartColors: {
        above: 'from-green-600 to-green-700',
        below: 'from-red-800 to-red-700',
        border: 'border-yellow-400',
        icon: 'text-yellow-400',
        text: 'text-yellow-100'
      }
    },
    branding: {
      title: 'MercunRaya',
      subtitle: 'Bunga Api Hari Raya Terbaik Malaysia',
      description: 'Koleksi istimewa untuk sambutan Raya yang meriah',
      positioning: 'traditional raya fireworks'
    }
  },

  // Blue Theme (for fireworksmalaysia.com reference)
  'fireworksmalaysia.com': {
    name: 'Blue Professional',
    colors: {
      primary: '217 91% 60%',        // Blue
      primaryForeground: '220 13% 91%', // Light Gray
      secondary: '220 13% 91%',      // Light Gray
      secondaryForeground: '217 91% 60%', // Blue
      accent: '217 91% 60%',         // Blue
      accentForeground: '220 13% 91%', // Light Gray
      cartColors: {
        above: 'from-blue-600 to-blue-700',
        below: 'from-red-800 to-red-700',
        border: 'border-blue-400',
        icon: 'text-blue-400',
        text: 'text-blue-100'
      }
    },
    branding: {
      title: 'FireworksMalaysia',
      subtitle: 'Professional Fireworks Supplier Malaysia',
      description: 'Quality fireworks for all occasions and celebrations',
      positioning: 'professional fireworks supplier'
    }
  },

  // Purple Theme - BM Firework
  'bmfirework.com': {
    name: 'Purple BM',
    colors: {
      primary: '262 83% 58%',        // Purple
      primaryForeground: '210 40% 98%', // White
      secondary: '220 14% 96%',      // Light Gray
      secondaryForeground: '262 83% 58%', // Purple
      accent: '262 83% 58%',         // Purple
      accentForeground: '210 40% 98%', // White
      cartColors: {
        above: 'from-purple-600 to-purple-700',
        below: 'from-red-800 to-red-700',
        border: 'border-purple-400',
        icon: 'text-purple-400',
        text: 'text-purple-100'
      }
    },
    branding: {
      title: 'BM Firework',
      subtitle: 'Mercun & Bunga Api Murah Malaysia',
      description: 'Harga murah, kualiti terjamin untuk sambutan meriah',
      positioning: 'affordable quality fireworks'
    }
  }
};

// Get current theme based on hostname
export const getCurrentTheme = (): ThemeConfig => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return themeConfigs[hostname] || themeConfigs['bmfirework.com']; // Default fallback
  }
  return themeConfigs['bmfirework.com']; // Server-side fallback
};

// Apply theme colors to CSS variables
export const applyTheme = (theme: ThemeConfig) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--primary-foreground', theme.colors.primaryForeground);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--secondary-foreground', theme.colors.secondaryForeground);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--accent-foreground', theme.colors.accentForeground);
  }
};

// Initialize theme on app load
export const initializeTheme = () => {
  const theme = getCurrentTheme();
  applyTheme(theme);
  return theme;
};