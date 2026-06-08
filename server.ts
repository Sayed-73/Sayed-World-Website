import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// AI Assistant Chat Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, roleContext } = req.body;

    if (!message) {
       res.status(400).json({ error: "Message is required" });
       return;
    }

    if (!ai) {
       res.json({
        response: `[Gemini API not configured] Hello there! I am the Sayed-World AI Assistant. As the API Key is not set, I am running in Offline Demonstration mode. How can I help you understand the multi-vendor architecture or Laravel 12 configuration for Sayed-World?`
      });
      return;
    }

    const systemInstruction = `
      You are the official AI Assistant for "Sayed-World", a world-class, multi-vendor e-commerce platform.
      Your avatar/character depends on the current persona being interacted with, which is: ${roleContext || "General"}.
      
      Sayed-World represents a massive Multi-Vendor architecture similar to Amazon + Daraz + Etsy, built on:
      - Laravel 12 (latest stable, leveraging native type-hinting, route caching, and optimal dependency injection)
      - Tall Stack: Blade + Tailwind CSS + Alpine.js + Livewire
      - MySQL, Redis caching, Tailwind dark mode, and SSLCommerz / bKash / Stripe payments.
      - Integrated Steadfast and Pathao couriers for Bangladesh local shipping.

      Guidelines:
      1. Give deep, professional, and practical answers.
      2. If asked technical questions about configuring database migrations, routes, models, Livewire components, or queue workers, write actual, clean Laravel 12 / PHP code blocks. Let them be exceptionally high-quality.
      3. For customer support queries (e.g. refunds, wallet system, order tracking), provide helpful, localized advice (mentioning BDT currency, district-based shipping, and local couriers where appropriate).
      4. Keep responses concise, well-structured (with markdown), and strictly avoid low-quality AI filler or dramatic intro sentences.
    `;

    // Process chat history into format expected or clean it
    const prompt = message;

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Populate historical messages if any
    if (history && history.length > 0) {
      // Reconstruct simple context with past questions or just insert message
    }

    const result = await chatInstance.sendMessage({ message: prompt });
    const replyText = result.text || "Sorry, I am unable to process that message right now.";

    res.json({ response: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Mock SSLCommerz Payment Initiation Endpoint
app.post("/api/payment/initiate", (req, res) => {
  const { amount, phone, name, address, paymentMethod } = req.body;
  const transactionId = "SW-TXN-" + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    status: "SUCCESS",
    message: "Payment request successfully generated",
    transactionId,
    amount: amount || "1250.00",
    gatewayUrl: `/checkout/simulated-gateway?txnId=${transactionId}&amount=${amount}&method=${paymentMethod}`
  });
});

// Mock Courier Booking Endpoint
app.post("/api/shipping/book-courier", (req, res) => {
  const { orderId, courier } = req.body;
  const consignmentTracker = `${courier.toUpperCase()}-${Math.floor(1000000 + Math.random() * 9000000)}`;
  
  res.json({
    status: "SUCCESS",
    message: `Courier booking recorded with ${courier}`,
    consignmentId: consignmentTracker,
    estimatedDelivery: "3-4 business days"
  });
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sayed-World backend active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
