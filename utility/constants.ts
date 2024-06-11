import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";



export const copyCode = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const downloadReceipt = async (type: "image" | "pdf", viewShotRef: React.RefObject<ViewShot>) => {
  try {
    console.log("Again again");
    
    if (type === "image") {
      console.log(type, "hhhhikeeeeee");
      
      const uri = await viewShotRef.current.capture();
      // const options = {
      //   title: 'Share Content',
      //   message: 'Check out this content',
      //   url: `file://${uri}`,
      //   type: 'image/jpg', // Set the MIME type for images
      // };
      // await Share.open(options);
      await Sharing.shareAsync(uri, {
        mimeType: 'image/jpeg',
        dialogTitle: 'Share Image',
      });
    } else {
      console.log("capture as pdffff");
      
      const uri = await viewShotRef.current.capture({
        format: "pdf",
        quality: 1,
        result: "tmpfile"
      });
      // const options = {
      //   title: 'Share Content',
      //   message: 'Check out this content',
      //   url: `file://${uri}`,
      //   type: 'application/pdf', // Set the MIME type for PDFs
      // };
      // await Share.open(options);
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share PDF',
      });
    }
  } catch (error) {
    console.error("Error sharing receipt:", error);
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
