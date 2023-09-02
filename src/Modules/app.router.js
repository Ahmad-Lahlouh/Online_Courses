
import connectDB from '../../DB/connection.js';
import { globalErrorHandler } from '../Services/errorHandling.js';
import AuthRouter from './Auth/Auth.router.js';
import UserRouter from './User/User.router.js';
import categoryRouter from './Category/Category.router.js'
import courseRouter from './Course/Course.router.js'
import cartRouter from './Cart/Cart.router.js'


import path from 'path'; 
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath=path.join(__dirname,'../upload');

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/upload',express.static(fullPath));
    app.use("/auth", AuthRouter);
    app.use('/user', UserRouter);
    app.use("/category", categoryRouter);
    app.use("/course", courseRouter);
    app.use("/cart", cartRouter);



    app.use('/*', (req,res)=>{
        return res.json({messaga:"page not found"});
    })

    //global error handler
    app.use(globalErrorHandler)

}

export default initApp;