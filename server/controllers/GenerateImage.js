import * as dotenv from "dotenv";
import OpenAI from "openai";
import { createError } from "../error.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    console.log("========== OPENAI RESPONSE ==========");
    console.log(response.data);
    console.log("====================================");

    res.status(200).json({
      photo: `data:image/png;base64,${response.data[0].b64_json}`,
    });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error.message
      )
    );
  }
};