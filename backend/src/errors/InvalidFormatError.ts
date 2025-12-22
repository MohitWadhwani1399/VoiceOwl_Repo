import { AppError } from "./AppError.js";

class InvalidFormatError extends AppError{
    constructor(message="Audio File is not in mp3 format"){
        super(message,400);        
    }
}

export {InvalidFormatError};