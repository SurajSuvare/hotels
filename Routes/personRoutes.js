const express = require('express');
const router = express.Router();

const person = require('../models/person');


//post route to add a person
router.post('/', async (req,res) => {

    try{
        const data = req.body // assuming the request body contains the person data
  
      // create a new person document using the mongoose model
      const newPerson = new person(data);
      
      // save the new person to the database
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    }
    catch(err){
                console.log(err);
                res.status(500).json({error: 'Internal server Error'});
    }
  })
  

// get the person  data from database 
router.get('/' , async (req,res) => {
    try{
          const data = await person.find();
          console.log("data fetched");
          res.status(200).json(data);
  
    }
    catch(err){
                  console.log(err);
                  res.status(500).json({error: 'Internal server Error'});
    }
  })


  // parametraied apis
router.get('/:worktType', async (req,res) =>{
    try{
          const workType  = req.params.worktType;  // Extract the work type from the URL parameter
          if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
          
            const response = await person.find({work: workType});
            console.log("response fatched");
            res.status(200).json(response);
          } 
          else{
            res.status(404).json({error: 'Invalid work type'});
          }
    }
    catch(err){
                  console.log(err);
                  res.status(500).json({error: 'Internal server Error'});
    }
  })


router.put('/:id' , async (req,res) =>{
      try{
            const personId = req.params.id; //  Extract the id from URL parameter
            const udatedPersonData = req.body; // updated data for the person

            const response = await person.findByIdAndUpdate(personId , udatedPersonData , {
                    new: true, // Return  the updated document 
                    runValidators: true, // run mongoose validation
            });

            if(!response){
                      return res.status(404).json({error: 'person not found'});
            }

            console.log("Data updated");
            res.status(200).json(response);
      }
      catch(err){
                    console.log(err);
                    res.status(500).json({error: 'Internal server Error'});
      }
})  

router.delete('./:id' , async (req,res) =>{
          try{
               const personId = req.params.id; //  Extract the id from URL parameter

               //assuming you have a person model
               const responsem = await person.findByIdAndRemove(personId);

               if(!response){
                             return res.status(404).json({error: 'person not found'});
              }

              console.log("Data deleted");
               res.status(200).json({message: 'person deleted successfully'});

          }
          catch(err){
                        console.log(err);
                        res.status(500).json({error: 'Internal server Error'});
          }
})


// exports router module 

module.exports = router;