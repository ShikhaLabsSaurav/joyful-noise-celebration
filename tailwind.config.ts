import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'celebrate': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'50%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0) rotate(0)' },
					'50%': { transform: 'translateY(-20px) rotate(5deg)' }
				},
				'float-slower': {
					'0%, 100%': { transform: 'translateY(0) rotate(0)' },
					'50%': { transform: 'translateY(-15px) rotate(-5deg)' }
				},
				'float-slowest': {
					'0%, 100%': { transform: 'translateY(0) rotate(0)' },
					'50%': { transform: 'translateY(-10px) rotate(3deg)' }
				},
				'bright-glow': {
					'0%': { 
						opacity: '0',
						backgroundColor: 'rgba(255, 255, 255, 0)'
					},
					'100%': { 
						opacity: '1',
						backgroundColor: 'rgba(255, 255, 255, 0.95)'
					}
				},
				'celebration-flash': {
					'0%': { 
						backgroundColor: 'rgba(239, 68, 68, 0.95)' // red
					},
					'25%': {
						backgroundColor: 'rgba(59, 130, 246, 0.95)' // blue
					},
					'50%': {
						backgroundColor: 'rgba(16, 185, 129, 0.95)' // green
					},
					'75%': {
						backgroundColor: 'rgba(245, 158, 11, 0.95)' // amber
					},
					'100%': {
						backgroundColor: 'rgba(239, 68, 68, 0.95)' // red
					}
				},
				'flame-flicker': {
					'0%, 100%': { 
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					},
					'25%': { 
						transform: 'scale(0.95) rotate(-1deg)',
						opacity: '0.8'
					},
					'75%': { 
						transform: 'scale(1.05) rotate(1deg)',
						opacity: '0.9'
					}
				},
				'flame-dance': {
					'0%, 100%': { 
						transform: 'scale(1) rotate(0deg) translateX(0)'
					},
					'25%': { 
						transform: 'scale(1.1) rotate(-2deg) translateX(-1px)'
					},
					'75%': { 
						transform: 'scale(0.95) rotate(2deg) translateX(1px)'
					}
				},
				'flame-sway': {
					'0%, 100%': { 
						transform: 'rotate(-2deg)'
					},
					'50%': { 
						transform: 'rotate(2deg)'
					}
				},
				'smoke-rise': {
					'0%': { 
						transform: 'translateY(0) scale(1)',
						opacity: '0.4'
					},
					'100%': { 
						transform: 'translateY(-20px) scale(1.5)',
						opacity: '0'
					}
				},
				'glow-pulse': {
					'0%, 100%': { 
						opacity: '0.6',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.8',
						transform: 'scale(1.1)'
					}
				},
				'flame-appear': {
					'0%': { 
						transform: 'scale(0.3) translateY(50%)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(0.7) translateY(25%)',
						opacity: '0.5'
					},
					'100%': { 
						transform: 'scale(1) translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-out': 'slide-out 0.3s ease-out',
				'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
				'celebrate': 'celebrate 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float-slow 3s ease-in-out infinite',
				'float-slower': 'float-slower 4s ease-in-out infinite',
				'float-slowest': 'float-slowest 5s ease-in-out infinite',
				'bright-glow': 'bright-glow 1s ease-in forwards',
				'celebration-flash': 'celebration-flash 2s linear infinite',
				'flame-flicker': 'flame-flicker 3s ease-in-out infinite',
				'flame-dance': 'flame-dance 4s ease-in-out infinite',
				'flame-sway': 'flame-sway 6s ease-in-out infinite',
				'smoke-rise': 'smoke-rise 2s ease-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'flame-appear': 'flame-appear 0.5s ease-out forwards'
			}
		}
	},
	plugins: [animate],
} satisfies Config;
