"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ormconfig_1 = __importDefault(require("./configs/ormconfig"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const eventRouter_1 = __importDefault(require("./routes/eventRouter"));
dotenv_1.default.config();
const errorHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
};
ormconfig_1.default.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Routes
    app.use('/users', userRouter_1.default);
    app.use('/events', eventRouter_1.default);
    app.use(errorHandler);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log('Error during Data Source initialization', error));
