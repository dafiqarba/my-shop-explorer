import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
