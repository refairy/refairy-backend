import app from './app';
import getEnv from './utils/getEnv';
import db from './storage'
const PORT = +getEnv('PORT', '8080')
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
console.log(db.port)
