const express = require("express");
const app = express();
const User = require("./database");

// Set view engine and port
app.set("view engine", "ejs");
app.listen(9090);

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  const users = await User.find({});
  res.render("index.ejs", {
    title: "This is homepage",
    users: users,
  });
});

app.post("/register", async (req, res) => {
  // Check if req.body is defined and contains the expected properties
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send("Invalid request body");
  }

  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    const userSave = await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user");
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (user == null) {
    res.redirect("/");
  } else {
    res.render("edit", { user: user });
  }
});

app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const updateuser = await User.findByIdAndUpdate(
    { _id: id },
    { name, email, password },
    { new: true }
  );
  res.redirect("/");

  app.get("/delete", async (req, res) => {
    const { id } = req.params;
    const deleteuser = await User.findByIdAndDelete({ _id: id });
    res.redirect("/");
  });
});
