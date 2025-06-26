// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI)
  .then((client) => {
    db = client.db("aqidb");
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.error("Connection failed:", err));


// Get all cities
app.get("/cities", async (req, res) => {
  try {
    const data = await db.collection("cities").find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Get AQI for specific city_id, date, hour
app.get("/aqi", async (req, res) => {
  const { id, date, hour } = req.query;
  if (!id || !date || !hour) {
    return res
      .status(400)
      .json({ error: "city_id, date, and hour are required" });
  }

  try {
    const obj = {
      city_id: parseInt(id),
      date,
      hour: parseInt(hour),
    };
    const data = await db.collection("aqi_live_data").findOne(obj);
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Get average AQI for a day
app.get("/avgaqi", async (req, res) => {
  const { id, date } = req.query;
  if (!id || !date) {
    return res.status(400).json({ error: "city_id and date are required" });
  }

  try {
    const agg = await db
      .collection("aqi_live_data")
      .aggregate([
        { $match: { city_id: parseInt(id), date } },
        { $group: { _id: null, average_aqi: { $avg: "$aqi" } } },
      ])
      .toArray();
    res.json(agg[0]?.average_aqi ?? null);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Manually insert AQI data
app.post("/insert", async (req, res) => {
  const { id, date, hour, aqi } = req.body;

  try {
    const query = {
      city_id: parseInt(id),
      date,
      hour: parseInt(hour),
    };

    const exists = await db.collection("aqi_live_data").findOne(query);
    if (!exists) {
      const result = await db.collection("aqi_live_data").insertOne({
        city_id: parseInt(id),
        date,
        hour: parseInt(hour),
        aqi,
        created_at: new Date(),
      });
      res.json({ message: "Data inserted", result });
    } else {
      res.json({ message: "Duplicate ignored" });
    }
  } catch (err) {
    res.status(500).json({ error: "Insert failed" });
  }
});

// Delete AQI data older than 8 days
app.delete("/cleanup", async (req, res) => {
  try {
    const result = await db.collection("aqi_live_data").deleteMany({
      created_at: { $lt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
    });
    console.log(`Deleted ${result.deletedCount} documents older than 8 days`);
    res.json({ message: "Old data deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Failed to delete old data:", err);
    res.status(500).json({ error: "Cleanup failed" });
  }
});


// ping
app.get("/ping", (req, res) => res.send("OK"));
// health check
app.get("/healthz", (req, res) => res.send("OK"));

// Search cities via OpenStreetMap
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter: q" });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { format: "json", q: query },
        headers: { "User-Agent": "aqi-tracker (asimmahati170@gmail.com)" },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Nominatim error:", err.message);
    res.status(500).json({ error: "Nominatim fetch failed" });
  }
});
