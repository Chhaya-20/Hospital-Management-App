require('dotenv').config({ path: './config/.env' });

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const DoctorRoutes = require("./routes/DoctorRoutes");
const PatientRoutes = require("./routes/PatientRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount routes
app.use("/api/doctor", DoctorRoutes);
app.use("/api/patient", PatientRoutes);

async function main() {
    try {
      await mongoose.connect(
        process.env.DB_URL
      );
      console.log("Successfully connected to the database");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
}
  
main().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
});
