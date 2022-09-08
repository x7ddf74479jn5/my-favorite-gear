import { Message } from "firebase-functions/v1/pubsub";
import * as functions from "firebase-functions";
import * as slack from "slack";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

const timezone = "Asia/Tokyo";
process.env.TZ = timezone;
const BOT_ACCESS_TOKEN = process.env.BOT_ACCESS_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL || "general";

export const stopBilling = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .pubsub.topic("budget-notifications")
  .onPublish(async (message: Message) => {
    const pubsubAttrs = message.attributes;
    const pubsubData = Buffer.from(message.data, "base64").toString();
    const budgetNotificationText = `${JSON.stringify(
      pubsubAttrs
    )}, ${pubsubData}`;

    await slack.chat.postMessage({
      token: BOT_ACCESS_TOKEN,
      channel: CHANNEL,
      text: budgetNotificationText,
    });

    return "Slack notification sent successfully";
  });
