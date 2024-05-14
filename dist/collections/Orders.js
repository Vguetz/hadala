"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
exports.Orders = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Tus ordenes',
        description: 'Aqui puedes ver tus ordenes en Hadala'
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
            name: '_productoPagado',
            type: 'checkbox',
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                create: function () { return false; },
                update: function () { return false; }
            },
            admin: {
                hidden: true
            },
            required: true
        },
        {
            name: 'user',
            type: 'relationship',
            admin: {
                hidden: true
            },
            relationTo: 'users',
            required: true
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: true
        }
    ]
};
