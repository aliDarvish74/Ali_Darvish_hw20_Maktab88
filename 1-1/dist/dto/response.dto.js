"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseDto {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.default = ResponseDto;
