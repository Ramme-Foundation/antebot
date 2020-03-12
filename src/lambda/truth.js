import dotenv from "dotenv";
import { WebClient } from "@slack/web-api";
import querystring from "querystring";
dotenv.config();
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const PROBABILITY = 0.5; // 50%

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a queryString
  const params = querystring.parse(event.body);
  console.log("DEBUG PARAMS", params);
  console.log("DEBUG CHANNEL", params.channel);
  const truth = Math.random() >= PROBABILITY;
  return await web.chat.postMessage({
    channel: params.channel,
    text: `Ante talar... ${truth ? "Sanning!" : "Inte Sanning!"}`
  });
};
