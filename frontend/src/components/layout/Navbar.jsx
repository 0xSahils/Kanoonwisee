import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Calendar, 
  FileText, 
  Star, 
  Search,
  LogOut,
  Sun,
  Moon
} from 'lucide-react'
import { Button } from '../ui/button'
import { logout } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate('/')
      toast.success('Logged out successfully')
    } catch {
      toast.error('Logout failed')
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const lawyerLinks = [
    { to: '/lawyer/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/lawyer/profile', icon: User, label: 'Profile' },
    { to: '/lawyer/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/lawyer/appointments', icon: FileText, label: 'Appointments' },
  ]

  const clientLinks = [
    { to: '/client/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/client/search', icon: Search, label: 'Find Lawyers' },
    { to: '/client/appointments', icon: FileText, label: 'My Appointments' },
    { to: '/client/reviews', icon: Star, label: 'Reviews' },
  ]

  const links = user?.role === 'lawyer' ? lawyerLinks : clientLinks

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">KanoonWise</span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 w-9"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isAuthenticated && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
