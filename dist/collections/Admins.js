"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
exports.Admins = {
    slug: 'admins',
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "''>Verifica tu cuenta</a>");
            }
        }
    },
    access: {
        read: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
        },
        create: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
        }
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'admin',
            required: true,
            type: 'select',
            options: [
                {
                    label: 'Administrador',
                    value: 'admin'
                },
                {
                    label: 'Usuario',
                    value: 'user'
                }
            ]
        }
    ]
};
