import { getUserProfile } from '@/lib/supabase/actions';
import SettingsClient from './SettingsClient';

export default async function AdminSettingsPage() {
  const profile = await getUserProfile();

  return (
    <div className="max-w-4xl">
      <h1 className="font-display-lg-mobile text-4xl mb-12">Paramètres du Profil</h1>
      <SettingsClient profile={profile} />
    </div>
  );
}
