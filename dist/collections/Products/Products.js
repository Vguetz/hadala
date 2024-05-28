"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = void 0;
var categories = {
    Billeteras: ['Merlina', 'Titana'],
    Bolsos: ['Benito', 'Liso', 'Alma'],
    Carteras: ['Chicas', 'Grandes'],
    Mochilas: ['Canguro', 'Con tapa', 'Venusina'],
    Riñoneras: ['Aine', 'Clarck', 'Clásica', 'Liana', 'Triana']
};
var isSubCategorie = function (category) {
    return Object.keys(categories).includes(category);
};
exports.Productos = {
    slug: 'products',
    admin: {
        useAsTitle: 'Productos'
    },
    access: {},
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; }
            }
        },
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: 'Descripción del producto',
            type: 'textarea'
        },
        {
            name: 'price',
            label: 'Precio en pesos uruguayos',
            type: 'number',
            min: 0,
            max: 100000,
            required: true
        },
        {
            name: 'category',
            label: 'Categoría',
            type: 'select',
            options: [
                'Bandoleras',
                'Billeteras',
                'Bolsos',
                'Carteras',
                'Materas',
                'Mochilas',
                'Monederos',
                'Morrales',
                'Riñoneras',
                'Phone Bags'
            ],
            required: true
        },
        {
            name: 'subcategory',
            label: 'Subcategoría',
            type: 'select',
            options: [
                'Merlina',
                'Titana',
                'Benito',
                'Liso',
                'Alma',
                'Chicas',
                'Grandes',
                'Canguro',
                'Con tapa',
                'Venusina',
                'Aine',
                'Clarck',
                'Clásica',
                'Liana',
                'Triana',
                'Leica',
                'Milay',
                'Blanca'
            ],
            required: false
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'altura',
                    label: 'Altura (cm)',
                    type: 'text',
                    required: false
                },
                {
                    name: 'Ancho',
                    label: 'Ancho (cm)',
                    type: 'text',
                    required: false
                },
                {
                    name: 'laterales',
                    label: 'Laterales (cm)',
                    type: 'text',
                    required: false
                },
                {
                    name: 'cierreprincipal',
                    label: 'Cierre Principal',
                    type: 'text',
                    required: false
                }
            ]
        },
        {
            name: 'stock',
            label: 'Check si es diseño Unico',
            type: 'checkbox',
            required: false
        },
        {
            name: 'interior',
            label: 'Interior',
            type: 'textarea',
            required: false
        },
        {
            name: 'product_files',
            label: 'Archivos del producto',
            type: 'relationship',
            relationTo: 'product_files',
            admin: {
                hidden: true
            },
            hasMany: false
        },
        {
            name: 'approvedForSale',
            label: 'Estado del producto',
            type: 'select',
            defaultValue: 'pending',
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                }
            },
            options: [
                { label: 'Pendiente', value: 'pending' },
                { label: 'Aprobado', value: 'approved' },
                { label: 'Rechazado', value: 'denied' },
                { label: 'Agotado', value: 'sold-out' }
            ]
        },
        {
            name: 'priceId',
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; }
            },
            type: 'text',
            admin: {
                hidden: true
            }
        },
        {
            name: 'mercadoPagoId',
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; }
            },
            type: 'text',
            admin: {
                hidden: true
            }
        },
        {
            name: 'images',
            type: 'array',
            label: 'Imágenes del producto',
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: 'Imagen',
                plural: 'Imágenes'
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ]
        }
    ]
};
