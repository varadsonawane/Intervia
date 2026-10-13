require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { DeepgramClient } = require("@deepgram/sdk");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.DEEPGRAM_API_KEY) {
  console.error("Missing DEEPGRAM_API_KEY in server/.env");
  process.exit(1);
}

const deepgram = new DeepgramClient({
  apiKey: process.env.DEEPGRAM_API_KEY,
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Intervia backend is running!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Intervia",
  });
});

app.post("/api/deepgram/token", async (req, res) => {
  try {
    const tokenResponse = await deepgram.auth.v1.tokens.grant({
      ttl_seconds: 30,
    });

    if (!tokenResponse?.access_token) {
      console.error("Deepgram response did not contain an access token.");

      return res.status(502).json({
        error: "Deepgram did not return a token.",
      });
    }

    console.log("Temporary Deepgram token created successfully.");

    return res.json({
      token: tokenResponse.access_token,
      expiresIn: tokenResponse.expires_in,
    });
  } catch (error) {
    console.error("Deepgram token creation failed:", error);

    return res.status(500).json({
      error: "Failed to create temporary voice credentials.",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Intervia server running at http://localhost:${PORT}`);
});