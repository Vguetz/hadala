"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "''>Verifica tu cuenta</a>");
            }
        }
    },
    access: {
        read: function () { return true; },
        create: function () { return true; }
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'user',
            required: true,
            //TODO: admin user required
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
