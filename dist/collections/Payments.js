"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
exports.Payments = {
    slug: 'Pagos',
    admin: {
        useAsTitle: 'Tus pagos',
        description: 'Aqui puedes quien ha pagado y quien no en Hadala'
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
            name: 'productoPagado',
            label: 'Producto Pagado',
            type: 'checkbox',
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                create: function () { return false; },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                }
            },
            required: true
        },
        {
            name: 'email',
            type: 'text',
            admin: {
                readOnly: true
            }
        },
        {
            name: 'nombre',
            type: 'text',
            required: true
        },
        {
            name: 'telefono',
            type: 'text',
            required: true
        },
        {
            name: 'direccion',
            type: 'text',
            required: true
        },
        {
            name: 'producto',
            type: 'text',
            required: true
        },
        {
            name: 'dinero',
            type: 'number',
            required: true
        },
        {
            name: 'orderId',
            type: 'text',
            required: true,
            defaultValue: function () { return Math.random().toString(36).substring(2, 10); }
        },
        {
            name: 'transferencia',
            type: 'checkbox',
            required: false
        },
        {
            name: 'transferId',
            type: 'text',
            required: false
        }
    ]
};
