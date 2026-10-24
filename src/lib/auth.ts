import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export interface AdminAuthResult {
  isAuthorized: boolean;
  user: User | null;
  reason?: "unauthenticated" | "forbidden";
}

/**
 * Validates whether the currently authenticated Supabase session holds verified administrative privileges.
 *
 * TRUSTED AUTHORIZATION CRITERIA (FAIL-CLOSED):
 * 1. Valid Session Check:
 *    The session must be cryptographically validated server-side by Supabase Auth via auth.getUser().
 * 2. Client Metadata Rejection:
 *    user.user_metadata is explicitly UNTRUSTED, as it can be modified by any authenticated user via
 *    supabase.auth.updateUser(). It is never used for authorization decisions.
 * 3. Verified Administrative Claims (Trusted Sources Only):
 *    - app_metadata.role === "admin" or app_metadata.is_admin === true
 *      (app_metadata is strictly server-controlled and cannot be written by clients).
 *    - OR user.email matches server environment variable ADMIN_EMAILS AND user.email_confirmed_at is valid.
 *    - OR user.id matches server environment variable ADMIN_USER_IDS.
 * 4. Fail-Closed Default:
 *    If none of the trusted administrative criteria are met, access is strictly denied (reason: "forbidden").
 *    No sensitive lead or customer data will ever be queried or transmitted.
 */
export async function verifyAdminAuthorization(): Promise<AdminAuthResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { isAuthorized: false, user: null, reason: "unauthenticated" };
    }

    // 1. Check trusted app_metadata (managed exclusively via service_role / Supabase Dashboard)
    const appRole = (user.app_metadata?.role as string | undefined)?.toLowerCase();
    const isAppAdmin = user.app_metadata?.is_admin === true;
    if (appRole === "admin" || isAppAdmin) {
      return { isAuthorized: true, user };
    }

    // 2. Check server environment email allowlist (requires verified email)
    const adminEmailsEnv = process.env.ADMIN_EMAILS;
    if (adminEmailsEnv && user.email) {
      const allowedEmails = adminEmailsEnv
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      const isEmailConfirmed = Boolean(user.email_confirmed_at);
      if (isEmailConfirmed && allowedEmails.includes(user.email.toLowerCase())) {
        return { isAuthorized: true, user };
      }
    }

    // 3. Check server environment user ID allowlist
    const adminUserIdsEnv = process.env.ADMIN_USER_IDS;
    if (adminUserIdsEnv) {
      const allowedIds = adminUserIdsEnv
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      if (allowedIds.includes(user.id)) {
        return { isAuthorized: true, user };
      }
    }

    // Fail closed: User has a valid Supabase Auth account, but lacks verified administrative rights
    return { isAuthorized: false, user, reason: "forbidden" };
  } catch {
    return { isAuthorized: false, user: null, reason: "unauthenticated" };
  }
}

/**
 * Pure evaluation function for testing authorization logic without Supabase network calls.
 */
export function evaluateUserAdminStatus(
  user: Pick<User, "id" | "email" | "email_confirmed_at" | "app_metadata" | "user_metadata"> | null,
  envConfig?: { adminEmails?: string; adminUserIds?: string }
): { isAuthorized: boolean; reason?: "unauthenticated" | "forbidden" } {
  if (!user) {
    return { isAuthorized: false, reason: "unauthenticated" };
  }

  // 1. Trusted app_metadata
  const appRole = (user.app_metadata?.role as string | undefined)?.toLowerCase();
  const isAppAdmin = user.app_metadata?.is_admin === true;
  if (appRole === "admin" || isAppAdmin) {
    return { isAuthorized: true };
  }

  // 2. Environment email allowlist
  const adminEmails = envConfig?.adminEmails ?? process.env.ADMIN_EMAILS;
  if (adminEmails && user.email) {
    const allowedEmails = adminEmails
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const isEmailConfirmed = Boolean(user.email_confirmed_at);
    if (isEmailConfirmed && allowedEmails.includes(user.email.toLowerCase())) {
      return { isAuthorized: true };
    }
  }

  // 3. Environment ID allowlist
  const adminIds = envConfig?.adminUserIds ?? process.env.ADMIN_USER_IDS;
  if (adminIds) {
    const allowedIds = adminIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    if (allowedIds.includes(user.id)) {
      return { isAuthorized: true };
    }
  }

  // Fail closed
  return { isAuthorized: false, reason: "forbidden" };
}
