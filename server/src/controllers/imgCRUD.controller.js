const path = require('path');
const pool = require('../db/databse');
const fs = require('fs');
const { allUsers, postImage, getImages, getHotels } = require('../db/databse')



const getRenderEjs = (_req, res) => {
    res.render('index')
};


const getAllUsers = async (_req, res) => {
    try {
        const [rows] = await allUsers();
        console.log(rows);
        res.json(rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'somethings goes wrong', error })
    }
};

const postImages = async (req, res) => {
    try {
        postImage(req)
        res.status(201).render('uploaded');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while uploading data');
    }
};

const getAllImages = async (_req, res) => {
    try {
        const rows = await getImages()
        res.send(rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'somethings goes wrong', error })
    }
};

const getAllHotels = async (_req, res) => {
    try {
        const rows = await getHotels();
        res.json(rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'somethings goes wrong', error })
    }
}







module.exports = {
    postImages,
    getAllImages,
    getRenderEjs,
    getAllHotels,
    getAllUsers
};
