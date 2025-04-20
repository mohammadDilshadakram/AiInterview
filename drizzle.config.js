/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-interview-mocker_owner:oMkhFsTPem31@ep-purple-recipe-a52rrc1h.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  }
};