const db = require('../../lib/connection')
const Character = require('../models/character')

db.on('open', () => {
    console.log('Connected to MongoDB')

    const character = {
        firstName: 'Benjamin',
        lastName: 'Sisko',
        age: 43,
        isStarFleet: true,
        department: 'Command'
    }

    Character.create(character)
    .then(character => {
        console.log('Created character', character)
    })
    .then(() => {
        db.close()
    })
    .catch(err => {
        console.error(err)
    })
})