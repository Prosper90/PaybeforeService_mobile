import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

const accessbank = require("../assets/banks/access-bank.png");
const citibank = require("../assets/banks/citibank-nigeria.png");
const defaultImage = require("../assets/banks/default-image.png");
const diamondbank = require("../assets/banks/access-bank.png");
const ecobank = require("../assets/banks/ecobank-nigeria.png");
const fidelitybank = require("../assets/banks/fidelity-bank.png");
const firstbank = require("../assets/banks/first-bank-of-nigeria.png");
const firstcitybank = require("../assets/banks/first-city-monument-bank.png");
const gtb = require("../assets/banks/guaranty-trust-bank.png");
const heritagebank = require("../assets/banks/heritage-bank.png");
const keystone = require("../assets/banks/keystone-bank.png");
const kudabank = require("../assets/banks/kuda-bank.png");
const polarisbank = require("../assets/banks/polaris-bank.png");
const stanbicbank = require("../assets/banks/stanbic-ibtc-bank.png");
const standardcharterd = require("../assets/banks/standard-chartered-bank.png");
const sterling = require("../assets/banks/sterling-bank.png");
const unionbank = require("../assets/banks/union-bank-of-nigeria.png");
const uba = require("../assets/banks/united-bank-for-africa.png");
const wemabank = require("../assets/banks/wema-bank.png");
const zenithbank = require("../assets/banks/zenith-bank.png");

export const copyCode = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const downloadReceipt = async (
  type: "image" | "pdf",
  viewShotRef: React.RefObject<ViewShot>
) => {
  try {
    if (type === "image") {
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri);
    } else {
      const uri = await viewShotRef.current.captureAsync({
        format: "pdf",
        quality: 1,
      });
      await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
    }
  } catch (error) {
    console.error("Error downloading receipt:", error);
  }
};

export const formatDate = (dateString: Date | undefined | string) => {
  if (!dateString) return ""; // If dateString is falsy (e.g., undefined), return an empty string
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    // minute: '2-digit',
    // second: '2-digit',
    // timeZoneName: 'short',
  };
  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};

export const getTime = (data: string) => {
  // Given date
  const date = data;
  // Parse string to Date object
  const expiry = new Date(date);
  // Current time
  const now = new Date();
  // Difference in milliseconds
  const diff = expiry.getTime() - now.getTime();
  // Set duration
  const durationcalc = diff / 1000; // convert to seconds
  return durationcalc;
};

//sample live https://paybeforeservice.onrender.com/PayBeforeService/v1
//sample test  http://localhost:8000/PayBeforeService/v1

export const END_URL: string =
  "https://paybeforeservice.onrender.com/PayBeforeService/v1";
