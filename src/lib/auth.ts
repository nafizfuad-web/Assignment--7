import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const databaseURI = process.env.MONGODB_URI;
const secret = process.env.BETTER_AUTH_SECRET;

if (!databaseURI) {
  throw new Error("MONGODB_URI must be set to connect Better Auth to MongoDB.");
}

if (process.env.NODE_ENV === "production" && !secret) {
  throw new Error("BETTER_AUTH_SECRET must be set in production.");
}

if (secret && secret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

if (Boolean(facebookClientId) !== Boolean(facebookClientSecret)) {
  throw new Error("Set both FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET.");
}

if (Boolean(discordClientId) !== Boolean(discordClientSecret)) {
  throw new Error("Set both DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET.");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};
const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(databaseURI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

const trustedOrigins = [
  baseURL,
  process.env.NEXT_PUBLIC_APP_URL,
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  baseURL,
  secret,
  trustedOrigins,
  database: mongodbAdapter(mongoClient.db(), { client: mongoClient }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
      requireLocalEmailVerified: false,
      allowDifferentEmails: false,
    },
  },
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),
    ...(facebookClientId && facebookClientSecret
      ? {
          facebook: {
            clientId: facebookClientId,
            clientSecret: facebookClientSecret,
          },
        }
      : {}),
    ...(discordClientId && discordClientSecret
      ? {
          discord: {
            clientId: discordClientId,
            clientSecret: discordClientSecret,
          },
        }
      : {}),
  },
});

export async function getCurrentSession() {
  return auth.api.getSession({ headers: await headers() });
}
