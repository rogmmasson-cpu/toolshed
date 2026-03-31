import Link from 'next/link'
import { Bell, CheckCircle2, MessageSquare, Star, DollarSign, Package, AlertTriangle } from 'lucide-react'
import { timeAgo } from '@/lib/utils/formatting'

type NotifType = 'booking_approved' | 'booking_request' | 'message' | 'review' | 'deposit' | 'reminder' | 'system'

interface Notification {
  id: string
  type: NotifType
  title: string
  body: string
  href: string
  read: boolean
  createdAt: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'booking_approved',
    title: 'Booking approved!',
    body: 'Marcus Rivera approved your request for the Makita 10" Miter Saw (Apr 20–22).',
    href: '/dashboard/rentals',
    read: false,
    createdAt: '2024-04-14T11:30:00Z',
  },
  {
    id: 'n2',
    type: 'message',
    title: 'New message from Marcus Rivera',
    body: '"Hey! Looks good — I\'ll approve this shortly."',
    href: '/messages/conv_4',
    read: false,
    createdAt: '2024-04-14T11:00:00Z',
  },
  {
    id: 'n3',
    type: 'deposit',
    title: 'Deposit released',
    body: 'Your $50.00 deposit for the Sun Joe Pressure Washer has been returned to your card.',
    href: '/dashboard/rentals',
    read: false,
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'n4',
    type: 'review',
    title: 'David left you a review',
    body: '"Alex was a great renter — returned the washer spotless. 5 stars!" View your updated profile.',
    href: '/profile/usr_current',
    read: true,
    createdAt: '2024-01-24T09:00:00Z',
  },
  {
    id: 'n5',
    type: 'booking_request',
    title: 'New rental request',
    body: 'Priya Patel wants to rent your listing for 2 days starting Apr 25.',
    href: '/dashboard/requests',
    read: true,
    createdAt: '2024-04-13T14:20:00Z',
  },
  {
    id: 'n6',
    type: 'reminder',
    title: 'Return reminder',
    body: 'Your rental of the RYOBI Lawn Mower is due back tomorrow (Apr 12). Coordinate return with the owner.',
    href: '/dashboard/rentals',
    read: true,
    createdAt: '2024-04-11T08:00:00Z',
  },
  {
    id: 'n7',
    type: 'message',
    title: 'New message from Sarah Chen',
    body: '"Enjoy the mower! LMK if you have any questions."',
    href: '/messages/conv_3',
    read: true,
    createdAt: '2024-04-10T09:15:00Z',
  },
  {
    id: 'n8',
    type: 'system',
    title: 'Welcome to ToolShed!',
    body: 'Complete your profile and earn verified badges to get faster approvals.',
    href: '/settings',
    read: true,
    createdAt: '2024-01-10T12:00:00Z',
  },
]

const ICON_MAP: Record<NotifType, React.ComponentType<{ size?: number; className?: string }>> = {
  booking_approved: CheckCircle2,
  booking_request: Package,
  message: MessageSquare,
  review: Star,
  deposit: DollarSign,
  reminder: AlertTriangle,
  system: Bell,
}

const COLOR_MAP: Record<NotifType, string> = {
  booking_approved: 'bg-forest-100 text-forest-600',
  booking_request: 'bg-brand-100 text-brand-600',
  message: 'bg-blue-100 text-blue-600',
  review: 'bg-amber-100 text-amber-600',
  deposit: 'bg-forest-100 text-forest-600',
  reminder: 'bg-orange-100 text-orange-600',
  system: 'bg-gray-100 text-gray-600',
}

export default function NotificationsPage() {
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length

  return (
    <div className="container-app py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell size={22} className="text-brand-500" />
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            Mark all read
          </button>
        )}
      </div>

      {MOCK_NOTIFICATIONS.length === 0 ? (
        <div className="card p-16 text-center">
          <Bell size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No notifications yet.</p>
        </div>
      ) : (
        <div className="card divide-y divide-gray-50 overflow-hidden">
          {MOCK_NOTIFICATIONS.map((notif) => {
            const Icon = ICON_MAP[notif.type]
            return (
              <Link
                key={notif.id}
                href={notif.href}
                className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-brand-50/40' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${COLOR_MAP[notif.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-400">{timeAgo(notif.createdAt)}</span>
                      {!notif.read && <span className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{notif.body}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
