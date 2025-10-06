import express from "express";


const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));