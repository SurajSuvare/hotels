const express = require('express');
const router = express.Router();

const person = require('../models/menuItem');


//post route to add a menuItem
router.post('/' , async (req,res) => {
    try{
          const data = req.body;
          const newMenu = new menu(data);

          const response = await newMenu.save();
          console.log("data saved");
          res.status(200).json(response);    
    }
    catch(err){
                  console.log(err);
                  res.status(500).json({error: 'Internal server Error'});
    }
})

// get the menuItem  data from database 
router.get('/' , async (req,res) => {
try{
    const data = await menu.find();
    console.log("data fetched");
    res.status(200).json(data);

}
catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server Error'});
}
})

 // parametraied apis
 router.get('/:tastetType', async (req,res) =>{
    try{
          const tasteType  = req.params.tasteType;  // Extract the work type from the URL parameter
          if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
          
            const response = await menu.find({taste: tasteType});
            console.log("response fatched");
            res.status(200).json(response);
          } 
          else{
            res.status(404).json({error: 'Invalid taste type'});
          }
    }
    catch(err){
                  console.log(err);
                  res.status(500).json({error: 'Internal server Error'});
    }
  })



// exports router module 

module.exports = router;

// coment added