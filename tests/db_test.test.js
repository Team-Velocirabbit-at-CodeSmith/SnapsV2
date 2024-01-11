//require paths to the functions we are testings
const fs = require("fs");
const path = require("path");
//connecting to the snapsController file
const snapsController = require("../server/controllers/snapsController");
//connecting to the userController file
const userController = require("../server/controllers/userController");
//connect to snapsModel to have access of structure of database
const db = require("../server/models/snapsModel");
//connect to the sanitize function in userController 
const sanitize = require('../server/controllers/userController'); 

console.log(userController);

//SNAPS CONTROLLER TEST

//mock the query
// jest.mock('../server/models/snapsModels', () => {
//     const originalModule = jest.requreActual('../server/models/snapsModels');

//     return {
//         ...originalModule

//     }
// });

// describe('snapController.addSnap middleware', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     })

//     it ('should successfully add a snap to the database', async () => {
//         const mockQueryObj = {
//             text: 'INSERT INTO Snaps (user_id, title, url, snap_text) VALUES ($1, $2, $3, $4)',
//             values: [req.body.user_id, req.body.title, req.body.url, req.body.snap_text],
//           };

//         const result = db.sync(mockQueryObj);
//         expect(result).not.toBeInstanceOf(Error);
//     })
// })

//USER CONTROLLER


describe("userController.login middleware", () => {

  test("should successfully sanitize inputted username (remove excess white spaces)", () => {
    expect(sanitize(" hello  ")).toBe("hello");
  });

  
});

//mock the DB query function

//get all dependencies of each function from each file

//dependecies injections
//create mock version of the

// describe('Testing the snapsController.addSnap middleware', () => {
//     beforeEach(() => {
//         //clear all mocks before each test we implement
//         jest.clearAllMocks();
//     });

//     it('should add a snap and retrieve snap successfully', async () => {
//         db.query.mockResolvedValueOnce()

//     })

//     //Define a mock request body
//     const mockRequestBody = {
//         user_id: 1,
//         title: 'Test Snap',
//         url: 'https://test',
//         snap_text: 'this is a test',
//     }

//     //mock the response object
//     const mockResponse = {
//         //assing to empty object
//         locals: {},
//     }

//     //create mock function for NEXT
//     const mockNext = jest.fn();

// });

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
