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

// AI Image Visual Product Search Endpoint
app.post("/api/search-by-image", async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: "Image data (base64) is required" });
      return;
    }

    const cleanMimeType = mimeType || "image/jpeg";
    // Strip header prefix from base64 if present (e.g. "data:image/jpeg;base64,")
    let rawBase64 = imageBase64;
    if (imageBase64.includes("base64,")) {
      rawBase64 = imageBase64.split("base64,")[1];
    }

    if (!ai) {
      // Offline fallback simulation: matching based on basic heuristics or just simulating visual matching
      // Let's match a premium casual watch, executive shirt, or leather derby shoe depending on user input or random
      const catalog = [
        {
          id: "prod-shirt-skybuy",
          title: "Summer Business Casual Executive Shirt",
          category: "Fashion & Apparel",
          explanation: "[Demo Offline Mode] We detected a premium casual shirt in your capture. Matching with our Summer Anti-wrinkle Premium Shirt."
        },
        {
          id: "prod-derby-skybuy",
          title: "Black Brown Square-Toe Leather Derby Shoes",
          category: "Fashion & Apparel",
          explanation: "[Demo Offline Mode] We detected a pair of elegant retro leather derby shoes. Matching with our Square-Toe Old Money Style footwear."
        },
        {
          id: "prod-1",
          title: "Sayed-Watch X Premium Smartwatch",
          category: "Electronics & Gadgets",
          explanation: "[Demo Offline Mode] We detected a modern circular or square premium watch face. Matching with our Wearable Smartwatch flagship."
        }
      ];

      // Give a random match or match first item to keep it reliable and delightful
      const randomMatch = catalog[Math.floor(Math.random() * catalog.length)];

      res.json({
        matchedIds: [randomMatch.id],
        explanation: randomMatch.explanation,
        detectedKeywords: randomMatch.title.toLowerCase() + ", offline, search scan",
        detectedCategory: randomMatch.category,
        isFallback: true
      });
      return;
    }

    const systemInstruction = `
      You are an expert e-commerce visual search engine for "Sayed-World".
      The user is uploading a photo or camera screenshot of a product they want to search in the catalog.
      Your task is to analyze the image and find which of our catalog products (or categories) are the closest match.
      
      Our primary catalog product list is:
      1. id: "prod-shirt-skybuy" | Name: Men's Short-Sleeved Business Casual Shirt (Sky Blue, Black, Pink, Wine)
      2. id: "prod-derby-skybuy" | Name: Black Brown Square-Toe Leather Shoes Old Money Style Unisex Retro Formal Commuting Derby Shoes
      3. id: "prod-1" | Name: Sayed-Watch X Premium Smartwatch
      4. id: "prod-2" | Name: Premium Jamdani Sari - Handwoven Blue
      5. id: "prod-3" | Name: Sylhet Sreemangal Organic Green Tea
      6. id: "prod-4" | Name: Sayed-Pro Bassbuds Wireless
      7. id: "prod-5" | Name: Traditional Brass Water Pitcher (Kalsi)
      8. id: "prod-6" | Name: Surf Excel Liquid Detergent (1 Litre)
      9. id: "prod-7" | Name: Xiaomi Handheld Rechargeable Portable Fan
      10. id: "prod-8" | Name: Walton Direct Cool Refrigerator (220L)
      11. id: "prod-9" | Name: Elegant Kashmiri Georgette Kurti Set
      12. id: "prod-10" | Name: Simple Hydrating Moisturizing Face Wash
      13. id: "prod-11" | Name: Modern Ergonomic Royal Relax Sofa
      14. id: "prod-12" | Name: Sayed-Sound Premium ANC Pro Earphones
      
      Please provide the response in a VALID, STABLE JSON format with the following structure:
      {
        "matchedIds": ["prod-shirt-skybuy"], // Ranked list of closest product IDs from our list that match or look similar
        "explanation": "We found a matching short-sleeved casual shirt. This looks highly similar to our anti-wrinkle Summer Slim-fit executive wear shirt.",
        "detectedKeywords": "shirt, mens fashion, short sleeve, blue cotton",
        "detectedCategory": "Fashion & Apparel"
      }
    `;

    const imagePart = {
      inlineData: {
        mimeType: cleanMimeType,
        data: rawBase64,
      },
    };

    const textPart = {
      text: "Analyze this image and identify the closest product from our database. Return a valid JSON object matching the requested schema.",
    };

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, textPart],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    let rawText = result.text || "{}";
    // Clean codeblock backticks if model generated them despite responseMimeType
    if (rawText.includes("```json")) {
      rawText = rawText.split("```json")[1].split("```")[0];
    } else if (rawText.includes("```")) {
      rawText = rawText.split("```")[1].split("```")[0];
    }

    const searchResponse = JSON.parse(rawText.trim());
    res.json(searchResponse);
  } catch (error: any) {
    console.error("Error in /api/search-by-image:", error);
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
