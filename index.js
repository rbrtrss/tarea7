import express from "express";
import { readFile } from "fs/promises";

const puerto = 8080
const data = JSON.parse(await readFile('productos.txt', 'utf-8'))
const app = express()

let llamaItems = 0
let llamaItemRandom = 0

const server = app.listen(puerto, () => {
    console.log(`Levantado en puerto: ${puerto}`)
})

server.on('error', (err) => {
    console.log('Ocurrio un error', err)
})

app.get('/items', (req, res) => {
    llamaItems += 1
    const resultado = {
        items: data,
        cantidad: data.length
    }
    res.json(resultado)
})

app.get('/item-random', (req, res) => {
    llamaItemRandom += 1
    const randomIndex = Math.floor(Math.random() * data.length)
    const resultado = {
        item: data[randomIndex]
    }
    res.json(resultado)
})

app.get('/visitas', (req, res) => {
    const resultado = {
        visitas: {
            items: llamaItems,
            item: llamaItemRandom
        }
    }
    res.json(resultado)
})