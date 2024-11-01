const express = require('express')
const router = express.Router()

const News = require('../models/newsModel');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
        try{
            const news = await News.find()
            res.status(200).json({
                data : news
            })
        }catch(error){
            res.status(500).json({
                message : 'Unfortunately, the data could not be listed.'
            })
        }
    }) 
    .get('/:id', async (req, res) => {
        try{
             const news = await News.findById(req.params.id)
             res.status(200).json({
                data : news
             })
        }catch(error){
            res.status(500).json({
                message : 'Unfortunately, the data could not be listed.'
            })
        }
    })
    .post('/', authMiddleware, async (req, res) => {
        try{
            if (!req.body.title || !req.body.description || !req.body.texts) {
                return res.status(400).json({
                    message : 'fill in the required fields'
                })
            }
            const news = new News({
                title: req.body.title,
                description : req.body.description,
                texts : req.body.texts
            })

            await news.save();

            res.status(201).json({
                message: 'News successfully added',
                data: news
            });

            }catch(error){
                res.status(500).json({
                message : 'Unfortunately, data could not be added.'
            })
        }
    })
    .delete('/:id', authMiddleware, async (req, res) => {
        try{
            const news = await News.findByIdAndDelete(req.params.id)
            if(!news){
                return res.status(404).json({ message: 'News not found' })
            }
            res.status(200).json({ message: 'News deleted successfully' })
        }catch(error){
            res.status(500).json({
                message : error
            })
        }
    })

module.exports = router