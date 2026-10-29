export type SocialProvider = "google" | "github" | "facebook" | "discord";

export function getEnabledSocialProviders(): SocialProvider[] {
  const providers: SocialProvider[] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push("google");
  }
  const githubClientId = process.env.GITHUB_ID || process.env.GITHUB_CLIENT_ID;
  const githubClientSecret =
    process.env.GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET;
  if (githubClientId && githubClientSecret) {
    providers.push("github");
  }
  if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    providers.push("facebook");
  }
  if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
    providers.push("discord");
  }

  return providers;
}
