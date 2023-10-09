import express from "express";
import {PORT, mongoDB_URL} from "./config.js";
import mongoose from "mongoose";
// import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();



// Middleware for parsing request body
app.use(express.json());

// //Option 1 : Allow All Origins with Default of cors (*)
app.use(cors());

//Option 2 : Allow Custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );






app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to Mern Stack Tutorial")
    });

app.use('/books', booksRoute);



// //Route for Save a new Book
// app.post('/books', async (request, response) => {
//     try{
//         if(
//         !request.body.title  || 
//         !request.body.author ||
//         !request.body.publishYear){
//             return response.status(400).send({
//                 message: "Send all required fields : title, author, publishYear"
//             });
//         }
//         const newBook = {
//             title: request.body.title,
//             author : request.body.author,
//             publishYear: request.body.publishYear,
//         };

//         const book = await Book.create(newBook);
//         return response.status(201).send(book);

//     }catch(error){
//             console.log(error.message);
//             response.status(500).send({message: error.message});
//         }
//     });	

// //Route for Get All Books from database
// app.get('/books', async (request, response) => {
//     try{
//         const books = await Book.find({});
//         return response.status(200).json({
//             count: books.length,
//             data: books,
//         })
//     }catch(error){
//             console.log(error.message);
//             response.status(500).send({message: error.message});
//         }
//     });

// //Route for Get One Books from database by id
// app.get('/books/:id', async (request, response) => {
//     try{
//         const {id} = request.params;
//         const books = await Book.findById(id);
//         return response.status(200).json(books);
//     }catch(error){
//             console.log(error.message);
//             response.status(500).send({message: error.message});
//         }
//     });

// // Route for Update a Book
// app.put('/books/:id', async (request, response) => {
//     try{
//         if(
//         !request.body.title  ||
//         !request.body.author ||
//         !request.body.publishYear){
//             return response.status(400).send({
//                 message: "Send all required fields : title, author, publishYear"
//             });
//         }

//         const{id} = request.params;
//         const result = await Book.findByIdAndUpdate(id, request.body);

//         if(!result){
//             return response.status(404).send({message: "Book not found"});
//         }

//         return response.status(200).send({message: "Book updated successfully"});

//     }catch(error){
//             console.log(error.message);
//             response.status(500).send({message: error.message});
//         }
//     });

// // Route for Delete a book
// app.delete('/books/:id', async (request, response) => {
//     try{
//         const {id} = request.params;

//         const result = await Book.findByIdAndDelete(id);

//         if(!result){
//             return response.status(404).send({message: "Book not found"});
//         }

//         return response.status(200).send({message: "Book deleted successfully"});


//     }catch(error){
//             console.log(error.message);
//             response.status(500).send({message: error.message});
//         }
//     });

//Additional port shows error
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//     });

mongoose.connect(mongoDB_URL)
.then(()=> {
console.log("App connected to MongoDB")
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
});
