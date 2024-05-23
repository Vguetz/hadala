"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTest = void 0;
exports.TransferTest = {
    slug: 'Transferencias_Hadala',
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
            name: 'transferId',
            label: 'Transfer ID',
            access: {
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'superadmin';
                }
            },
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
            name: 'cartTotal',
            access: {
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'superadmin';
                }
            },
            label: 'Total del carrito',
            type: 'number',
            required: true
        },
        {
            name: 'items',
            label: 'Items',
            type: 'array',
            required: true,
            labels: {
                singular: 'Item',
                plural: 'Items'
            },
            minRows: 1,
            maxRows: 10,
            fields: [
                {
                    name: 'item',
                    label: 'Item',
                    type: 'text',
                    required: true
                }
            ]
        },
        {
            name: 'name',
            label: 'Nombre',
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
            name: 'direccion',
            label: 'Dirección',
            type: 'text',
            required: true
        },
        {
            name: 'isTransfered',
            label: 'Transferido',
            type: 'checkbox',
            defaultValue: false,
            required: false
        }
    ]
};
