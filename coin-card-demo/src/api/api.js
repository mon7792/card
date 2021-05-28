import express from 'express'

export class Api {
    constructor(port){
        this.port = port;
        this.app = express()
    }

    listenAndServe(){
        return this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

    addRoute(route, handler){
        this.app.get(route, handler)
    }
}