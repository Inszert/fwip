import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** Internal route — renders a <Link> instead of <button> */
  to?: string
  /** External URL — renders an <a> instead of <button> */
  href?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-dark hover:bg-primary-dark hover:text-white shadow-md hover:shadow-lg',
  secondary: 'bg-dark text-white hover:bg-dark/85 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-primary text-primary-dark hover:bg-primary hover:text-dark bg-transparent',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-2.5 text-sm md:text-base',
  lg: 'px-8 py-3.5 text-base md:text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
