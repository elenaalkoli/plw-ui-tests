const demoqaBaseUrl = process.env.DEMOQA_BASE_URL;
if (!demoqaBaseUrl) {
  throw new Error("Missing required env variable: DEMOQA_BASE_URL");
}

export const DEMOQA_BASE_URL = demoqaBaseUrl;
