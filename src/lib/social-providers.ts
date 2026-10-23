export type SocialProvider = "google" | "github";

export function getEnabledSocialProviders(): SocialProvider[] {
  const providers: SocialProvider[] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push("google");
  }
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push("github");
  }

  return providers;
}
