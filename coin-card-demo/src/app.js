import { Api} from './api/api';
import path from 'path';
import express from 'express'
console.log('coin-card-demo');


let ap = new Api(3000);
ap.app.use('/static', express.static(path.join(__dirname, 'dist/static')));
ap.addRoute('/', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
ap.listenAndServe();