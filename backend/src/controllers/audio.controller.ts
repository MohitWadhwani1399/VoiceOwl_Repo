import { IRequest } from "../interfaces/IRequest.js";
import { IResponse } from "../interfaces/IResponse.js";
import {downloadAudioFile, transcribe} from "../utils/audio.utils.js";

const getTranscription = async (req: IRequest,res: IResponse)=>{
    const audioUrl : string = req.body.audioUrl;    
    const audioFile = await downloadAudioFile(audioUrl);
    //const transcribedText = await transcribe(audioFile);
    res.status(200).send("Transcribed Text");
}

const createTranscription = async (req: IRequest,res: IResponse)=>{
    res.status(201).send("Audio Transcribed");
}

export {getTranscription,createTranscription};