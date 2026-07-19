// src/lib/locale.ts
import { cookies } from 'next/headers';

// Returns the current locale. Defaults to Romanian ('ro') if not set.
export async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value;
  return locale === 'en' ? 'en' : 'ro'; // only support 'en' or 'ro'
}

