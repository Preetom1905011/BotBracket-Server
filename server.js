require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const botRoutes = require("./routes/participants");
const matchRoutes = require("./routes/matches");
const tournamentRoutes = require("./routes/tournaments");
const selectedTMRoutes = require("./routes/selectedTM");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 4000;

// express app
const app = express();

// middleware
app.use(cors({
  origin: process.env.BASE_URL
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/api/", (req, res) => {
    res.status(200).json({message: "it's working"})
})
app.use("/api/participants", botRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/selectedTM", selectedTMRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("connect to db & listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
