import { Message } from "firebase-functions/v1/pubsub";
import * as functions from "firebase-functions";
import { CloudBillingClient } from "@google-cloud/billing";
import { InstancesClient } from "@google-cloud/compute";

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billingClient = new CloudBillingClient();
const instancesClient = new InstancesClient();
const timezone = "Asia/Tokyo";
const ZONE = "asia-northeast1";
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
    const [res] = await billingClient.getProjectBillingInfo({
      name: projectName,
    });
    return res.billingEnabled;
  } catch (e) {
    console.log(
      "Unable to determine if billing is enabled on specified project, assuming billing is enabled"
    );
    return true;
  }
};

/**
 * @return {Promise} Array of names of running instances
 */
const _listRunningInstances = async (projectId: string, zone: string) => {
  const [instances] = await instancesClient.list({
    project: projectId,
    zone: zone,
  });
  return instances
    .filter((item) => item.status === "RUNNING")
    .map((item) => item.name!);
};

/**
 * @param {Array} instanceNames Names of instance to stop
 * @return {Promise} Response from stopping instances
 */
const _stopInstances = async (
  projectId: string,
  zone: string,
  instanceNames: string[]
) => {
  await Promise.all(
    instanceNames.map((instanceName) => {
      return instancesClient
        .stop({
          project: projectId,
          zone: zone,
          instance: instanceName,
        })
        .then(() => {
          console.log(`Instance stopped successfully: ${instanceName}`);
        });
    })
  );
};

export const limitUse = functions
  .region(ZONE)
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
    if (!billingEnabled) {
      return "Billing already disabled";
    }

    const instanceNames = await _listRunningInstances(PROJECT_ID, ZONE);
    if (!instanceNames.length) {
      return "No running instances were found.";
    }

    await _stopInstances(PROJECT_ID, ZONE, instanceNames);
    return `${instanceNames.length} instance(s) stopped successfully.`;
  });
