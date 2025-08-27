import crypto from 'crypto';

const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Clave secreta (JWT_SECRET): ')
console.log(secretKey);
console.log('Copiar y guardar en archivo .env')