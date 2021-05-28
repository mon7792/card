import { Api} from './api/api';
import path from 'path';
import express from 'express'
console.log('coin-card-demo');


let ap = new Api(3000);
ap.app.use('/static', express.static(path.join(__dirname, 'ui/static')));
ap.addRoute('/', (req, res) => res.sendFile(path.join(__dirname, 'ui/index.html')));
ap.listenAndServe();