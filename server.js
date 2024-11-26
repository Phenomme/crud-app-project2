const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const path = require("path")

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

const Character = require("./models/favoritecharacter.js")
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "public")))

app.get("/", async (req,res) => {
    res.render("index.ejs")
})

app.get("/characters", async (req, res) => {
    const allCharacters = await Character.find()
    res.render("characters/index.ejs", {characters: allCharacters})
})

app.get("/characters/new", (req, res) => {
    res.render("characters/new.ejs")
})

app.get("/characters/:characterId", async (req, res) =>{
    const characterProfile = await Character.findById(req.params.characterId)
    res.render("characters/show.ejs", {character: characterProfile})
})

app.delete("/characters/:characterId", async (req, res) => {
    await Character.findByIdAndDelete(req.params.characterId)
    res.redirect("/characters")
})

app.get("/characters/:characterId/edit", async (req,res) => {
    const characterProfile = await Character.findById(req.params.characterId)
    res.render("characters/edit.ejs", {character: characterProfile})
})

app.put("/characters/:characterId", async (req, res) => {
    await Character.findByIdAndUpdate(req.params.characterId, req.body)
    res.redirect(`/characters/${req.params.characterId}`)
})

app.post("/characters", async (req, res) => {
    await Character.create(req.body)
    res.redirect("characters")
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})  