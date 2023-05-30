//const express = require("express")

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {Configuration, OpenAIApi} from "openai";
dotenv.config();

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);
const app = express();


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}))




app.get("/", (req, res)=>{
    return res.status(200).send("server is up");
})

app.post("/generate", async (req,res)=>{
    const {prompt, size} = req.body;

    if (!prompt || !size){
        return res.status(400).send({message:"Bad Request"});
    }

    try {
        const imageParameters = {
            prompt: prompt,
            n:1,
            size: size,
          };
        const response = await openai.createImage(imageParameters);
         
        const image_url = response.data.data[0].url;
        return res.status(200).send({
            src: image_url,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Unknown server error"})
    }

})

const port = process.env.PORT || 8181;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})