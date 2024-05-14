"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'El email no es válido' }),
    password: zod_1.z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
});
