import bcrypt from 'bcryptjs';
// import hash from 'bcryptjs';
// import compare from 'bcryptjs';
/**
 * Password without encrypt: Hello.01
 * @param {passwordPlain} passwordPlain 
 */
export const encrypt = async (passwordPlain) => {
    return await bcrypt.hash(passwordPlain, 10);
}

/**
 * Pass password without encrypt and pass password
 * @param {passwordPlain} passwordPlain
 * @param {hashPassword} hashPassword 
 */
export const internalCompare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}