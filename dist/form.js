"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const validationMessage = validateForm(name, email, contactNumber, subject, message);
        if (validationMessage !== '') {
            responseMessage.innerText = validationMessage;
            responseMessage.style.color = 'red';
            return;
        }
        const formData = {
            name,
            email,
            contactNumber,
            subject,
            message,
        };
        try {
            const res = yield axios_1.default.post('https://6715ddc033bc2bfe40bb5b6d.mockapi.io/formsubmissions', formData);
            if (res.status === 201) {
                responseMessage.innerText = "Form Submitted Successfully!";
                responseMessage.style.color = 'green';
                form.reset();
            }
        }
        catch (error) {
            console.error('Submission Error:', error);
            responseMessage.innerText = "Submission Failed. Please try again.";
            responseMessage.style.color = 'red';
        }
    }));
    function validateForm(name, email, contactNumber, subject, message) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name === '')
            return 'Name is required.';
        if (!emailRegex.test(email))
            return 'Invalid email address.';
        if (contactNumber === '')
            return 'Contact Number is required.';
        if (subject === '')
            return 'Subject is required.';
        if (message === '')
            return 'Message is required.';
        return '';
    }
});
