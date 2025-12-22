import { AppError } from "./AppError.js";

class FileCorruptedError extends AppError{
    constructor(message="Audio File is corrupted"){
        super(message,400);        
    }
}

export {FileCorruptedError};