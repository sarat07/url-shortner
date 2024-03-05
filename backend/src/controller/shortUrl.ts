import express, { response } from "express";
import {urlModel} from "../model/shortUrl";

export const createUrl = async(
    req: express.Request,
    res:express.Response
)=>{
    try{
        console.log("The fullUrl is ", req.body.fullUrl);
        const {fullUrl}= req.body;
        const urlFound = await urlModel.find({fullUrl});
        if(urlFound.length > 0){
            res.status(409);
            res.send(urlFound);
        }else{
            const shortUrl = await urlModel.create({fullUrl});
            res.status(201).send(shortUrl);
        }
    }catch(error){
        res.status(500).send({message: "Internal server error"});
    }
};

export const getAllUrls = async(
    req: express.Request,
    res:express.Response
)=>{
    try{
    const shortUrls= await urlModel.find();
    if(shortUrls.length < 0){
        res.status(404).send({message: "Short urls not found"})
    }else{
        res.status(200).send(shortUrls);
    }

    }catch(error){
        res.status(500).send({message: "Internal server error"});
    }
};

export const getUrl = async(
    req: express.Request,
    res:express.Response
)=>{
    try{
        const shortUrl = await urlModel.findOne({shortUrl: req.params.id});
    if(!shortUrl){
        res.status(404).send({message: "404- Page not found"});
    }else{
        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(`${shortUrl.fullUrl}`);
    }
    }catch(error){
        res.status(500).send({message: "Internal server error"});
    }
};

export const deleteUrl = async(
    req: express.Request,
    res:express.Response
)=>{
    try{
        const shortUrl = await urlModel.findByIdAndDelete({_id: req.params.id});
        if(shortUrl){
            res.status(200).send({message: "The requested url has been successfully deleted"});
        }
    }catch(error){
        res.status(500).send({message: "Internal server error"});
    }
};