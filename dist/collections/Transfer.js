"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
exports.Transfer = {
    slug: 'Transferencias',
    admin: {
        useAsTitle: 'Transfer',
        description: 'Transferencias de dinero en Hadala'
    },
    access: {
        read: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        create: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        }
    },
    fields: [
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            required: true
        },
        {
            name: 'phone',
            label: 'Teléfono',
            type: 'text',
            required: true
        },
        {
            name: 'address',
            label: 'Dirección',
            type: 'text',
            required: true
        },
        {
            name: 'monto',
            label: 'Monto en pesos uruguayos',
            type: 'number',
            min: 0,
            max: 100000,
            required: true
        },
        {
            name: 'transferId',
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; }
            },
            type: 'text',
            admin: {
                hidden: true
            }
        }
    ]
};
