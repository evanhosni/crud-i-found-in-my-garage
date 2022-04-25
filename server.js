const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

var stuff = [
  {
    id: 0,
    name: "lamp",
    category: "electronics",
    isDusty: true,
  },
  {
    id: 1,
    name: "frog",
    category: "animal",
    isDusty: false,
  },
  {
    id: 2,
    name: "tube tv",
    category: "electronics",
    isDusty: true,
  },
];

//READ (homepage)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//READ (all of api)
app.get("/api/stuff", (req, res) => {
  res.json(stuff);
});

//READ (specific item from api)
app.get("/api/stuff/:id", (req, res) => {
  for (let i = 0; i < stuff.length; i++) {
    if (stuff[i].id == req.params.id) {
      return res.json(stuff[i]);
    }
  }
  res.status(404).send("404: note note found");
});

//CREATE
app.post("/api/stuff", (req, res) => {
  console.log(req.body);
  stuff.push(req.body);
  res.json(stuff);
});

//UPDATE
app.put("/api/stuff/:id", (req, res)=> { //NOTE: i do not have a front-end route for this. You can test this in insomnia
    console.log(req.body)
    for (let i = 0; i < stuff.length; i++) {
        if (stuff[i].id == req.params.id) {
            stuff[i] = req.body
        }
    }
    res.json(stuff)
})

//DELETE
app.delete("/api/stuff/:id", (req, res) => {
  const filtered = stuff.filter((item) => item.id != req.params.id);
  stuff = filtered;
  res.json(stuff);
});

//READ (catch-all for invalid url suffixes)
app.get("*", (req,res)=>{
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
