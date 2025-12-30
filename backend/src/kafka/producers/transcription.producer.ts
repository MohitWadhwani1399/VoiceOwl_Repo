import {kafka} from '../../config/kafka.config.js';
import {TranscriptionRequestedEvent} from '../messageTypes.js';
import { KAFKA_TOPICS } from '../topics.js';

const producer = kafka.producer();

export async function publishTranscription(payload: TranscriptionRequestedEvent){
    await producer.connect();
    
    await producer.send({
        topic: KAFKA_TOPICS.TRANSCRIPTION_REQUESTED,
        messages:[
            {
                key: payload.jobId,
                value: JSON.stringify(payload)
            }
        ]
    })
}