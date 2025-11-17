// seedTrips.js
const mongoose = require("mongoose");
const dbURI = "mongodb://127.0.0.1/travlr";

require("./app_server/models/trip"); // load Trip model

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Trip = mongoose.model("Trip");

const sampleTrips = [
  {
    code: "PARIS2025",
    name: "Paris, France",
    length: 7,
    start: new Date("2025-06-10"),
    resort: "Hotel Le Meurice",
    price: 2499,
  },
  {
    code: "TOKYO2025",
    name: "Tokyo, Japan",
    length: 8,
    start: new Date("2025-07-01"),
    resort: "Park Hyatt Tokyo",
    price: 3150,
  },
  {
    code: "HAWAII2025",
    name: "Hawaii, USA",
    length: 6,
    start: new Date("2025-08-15"),
    resort: "Royal Hawaiian Resort",
    price: 2200,
  },
  {
    code: "ROME2025",
    name: "Rome, Italy",
    length: 10,
    start: new Date("2025-09-05"),
    resort: "Hotel Eden",
    price: 2899,
  },
];

mongoose.connection.on("connected", async () => {
  try {
    await Trip.deleteMany({});
    const result = await Trip.insertMany(sampleTrips);
    console.log(`Inserted ${result.length} trips`);
  } catch (err) {
    console.error("Error seeding trips:", err);
  } finally {
    mongoose.connection.close();
  }
});
