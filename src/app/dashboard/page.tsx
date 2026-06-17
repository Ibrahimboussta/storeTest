import { redirect } from 'next/navigation'

export default function DashboardPage() {
  // Redirect /dashboard to the admin panel
  redirect('/admin')
}
