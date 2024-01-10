//require paths to the functions we are testings
const path = require('path');
//connecting to the snapsController file
const snapsController = require('../server/controllers/snapsController');
//connecting to the userController file
const userController = require('../server/controllers/userController'); 
//connect to snapsModel to have access of structure of database
const db = require('../server/models/snapsModel');

//SNAPS CONTROLLER TEST

//mock the DB query function

jest.mock('../server/models/snapsModels'); 

describe('Testing the snapsController.addSnap middleware', () => {
    beforeEach(() => {
        //clear all mocks before each test we implement
        jest.clearAllMocks(); 
    }); 

    it('should add a snap and retrieve snap successfully', async () => {
        db.query.mockResolvedValueOnce()
    })


})

//mock the db query to make sure it's successful with access
//provide request object with necessary properties
//ensure the function calls next with no arguments 

//test the retrieval of snaps from the database
//mock the db query function to simulate a successful retrieval of snaps
//provide a request object with necessary properties
//check if res.locals.allSnaps contain the expected data

//test error handling
//mock the db.query function to throw an error

//edge cases and input validations
//test the function with different input scenarios 
//ensure that the function behaves as expected in these cases 
