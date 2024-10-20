import express, { response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io';
import {createServer} from 'http';
import { UserRouter } from './routes/user.js';
import { ProductRouter } from './routes/product.js';
import { auctionItems } from './data/dummyData.js';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
app.use('/api/auth', UserRouter);
app.use('/api/product', ProductRouter);

mongoose.connect(process.env.CONNECTION_STRING).then(async resp => {
    const result = await resp.connection.db.collection('products').findOne({});
    if(result === null){
        await resp.connection.db.collection('products').insertMany(auctionItems);
    }
});

io.on('connection', (socket) => {
    console.log('socket connected....');

    socket.on('placeBid', (message) => {
        io.emit('placeBid', message);
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected....');
    });
});

server.listen(process.env.PORT, () => {
    console.log("Server is running on port: ", process.env.PORT);
})
