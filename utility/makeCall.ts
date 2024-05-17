export const makeCall = async (
  endpoint: string,
  body: Record<string, any> = {},
  headers: Record<string, string> = {},
  reqType: string = ""
): Promise<any> => {
  try {
    const requestOptions: RequestInit = {
      method: reqType,
      headers: headers,
    };

    // Add body only if the request type is not "GET" or "HEAD"
    if (reqType.toUpperCase() !== "GET" && reqType.toUpperCase() !== "HEAD") {
      requestOptions.body = JSON.stringify(body);
    }
    // console.log("in in in here", endpoint, "omo");

    const response = await fetch(endpoint, requestOptions);
    // console.log(response, "hiiiiiii");

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // console.log("error", error);
    throw error;
  }
};

export {};
