"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.router = void 0;
var server_1 = require("@trpc/server");
var t = server_1.initTRPC.context().create();
var middleware = t.middleware;
exports.router = t.router;
exports.publicProcedure = t.procedure;