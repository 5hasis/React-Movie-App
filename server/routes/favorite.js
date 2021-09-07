const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {

    //mongoDB에서 favorite 숫자 가져오기
    Favorite.find({"moviId" : req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            //그다음 프론트에 다시 숫자 정보 보내주기
            res.status(200).json({ success:true, favoriteNumber:info.length })
        })
});

router.post("/favorited", (req, res) => {
    
    //내가 이 영화를 Favorite 했는지 정보는 DB에서 가져오기
    Favorite.find({"moviId" : req.body.movieId, "userFrom" : req.body.userFrom})
        .exec((err,info) => {
            if(err) return res.status(400).send(err)
            
            let result = false;
            if(info.length!==0) {
                result = true
            }
            res.status(200).json({ success:true, favorited:result })
        })
    
});

router.post("/addToFavorite", (req, res) => {
    
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success:true, doc })
    })
    
});

router.post("/removeFromFavorite", (req, res) => {
    
    Favorite.findOneAndDelete({ movieId:req.body.movieId, userFrom:req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, doc })
        })
    
});



module.exports = router;
