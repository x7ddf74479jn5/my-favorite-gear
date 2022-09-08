import { Message } from "firebase-functions/v1/pubsub";
import * as functions from "firebase-functions";
import { CloudBillingClient } from "@google-cloud/billing";

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const BILLING_ACCOUNT_NAME = process.env.BILLING_ACCOUNT_NAME;
const billing = new CloudBillingClient();
const timezone = "Asia/Tokyo";
process.env.TZ = timezone;

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

/**
 * Determine whether billing is enabled for a project
 * @param {string} projectName Name of project to check if billing is enabled
 * @return {bool} Whether project has billing enabled or not
 */
const _isBillingEnabled = async (projectName: string) => {
  try {
    const [res] = await billing.getProjectBillingInfo({ name: projectName });
    return res.billingEnabled;
  } catch (e) {
    console.log(
      "Unable to determine if billing is enabled on specified project, assuming billing is enabled"
    );
    return true;
  }
};

/**
 * Disable billing for a project by removing its billing account
 * @param {string} projectName Name of project disable billing on
 * @return {string} Text containing response from disabling billing
 */
const _disableBillingForProject = async (projectName: string) => {
  const [res] = await billing.updateProjectBillingInfo({
    name: projectName,
    projectBillingInfo: {
      billingAccountName: BILLING_ACCOUNT_NAME,
    },
  });
  return `Billing disabled: ${JSON.stringify(res)}`;
};

export const stopBilling = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .pubsub.topic("budget-notifications")
  .onPublish(async (message: Message) => {
    const pubsubData = JSON.parse(
      Buffer.from(message.data, "base64").toString()
    );
    if (pubsubData.costAmount <= pubsubData.budgetAmount) {
      return `No action necessary. (Current cost: ${pubsubData.costAmount})`;
    }

    if (!PROJECT_ID) {
      return "No project specified";
    }

    const billingEnabled = await _isBillingEnabled(PROJECT_NAME);
    if (billingEnabled) {
      return _disableBillingForProject(PROJECT_NAME);
    } else {
      return "Billing already disabled";
    }
  });
