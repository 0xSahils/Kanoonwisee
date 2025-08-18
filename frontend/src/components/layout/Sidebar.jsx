import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  User, 
  Calendar, 
  FileText, 
  Star, 
  Search,
  BarChart3
} from 'lucide-react'
import { cn } from '../../lib/utils'

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()

  const lawyerLinks = [
    { to: '/lawyer/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/lawyer/profile', icon: User, label: 'Profile' },
    { to: '/lawyer/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/lawyer/appointments', icon: FileText, label: 'Appointments' },
    { to: '/lawyer/stats', icon: BarChart3, label: 'Statistics' },
  ]

  const clientLinks = [
    { to: '/client/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/client/search', icon: Search, label: 'Find Lawyers' },
    { to: '/client/appointments', icon: FileText, label: 'My Appointments' },
    { to: '/client/profile', icon: User, label: 'Profile' },
    { to: '/client/reviews', icon: Star, label: 'Reviews' },
  ]

  const links = user?.role === 'lawyer' ? lawyerLinks : clientLinks

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex-1 flex flex-col min-h-0 bg-background border-r border-border">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-lg font-semibold text-foreground">
              {user?.role === 'lawyer' ? 'Lawyer Panel' : 'Client Panel'}
            </span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
