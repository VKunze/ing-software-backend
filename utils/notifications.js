require("dotenv").config();
const OneSignal = require("onesignal-node");
const client = new OneSignal.Client(
  process.env.ONE_SIGNAL_APP_ID,
  process.env.ONE_SIGNAL_REST_API_KEY
);

exports.sendPushNotificationToAdmins = async () => {
  const notification = {
    include_external_user_ids: ["admin"],
    contents: { en: "Tiene una nueva solicitud!" },
  };
  try {
    await client.createNotification(notification);
    console.log("sent!");
  } catch (e) {
    throw e;
  }
};

exports.sendPushNotificationToAppliants = async (appliantCis) => {
  const notification = {
    include_external_user_ids: appliantCis,
    contents: { en: "Su solicitud ha sido actualizada!" },
  };
  try {
    await client.createNotification(notification);
    console.log("sent!");
  } catch (e) {
    throw e;
  }
};
