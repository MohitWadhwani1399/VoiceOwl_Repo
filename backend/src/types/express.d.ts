declare global{
    namespace Express{
        interface Request{
            audioUrl?: string
        }
    }
}

export {}