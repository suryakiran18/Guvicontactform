import axios from 'axios';

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById('contactForm') as HTMLFormElement;
    const responseMessage = document.getElementById('responseMessage') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const contactNumber = (document.getElementById('contactNumber') as HTMLInputElement).value;
        const subject = (document.getElementById('subject') as HTMLInputElement).value;
        const message = (document.getElementById('message') as HTMLTextAreaElement).value;

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

            const res = await axios.post('https://6715ddc033bc2bfe40bb5b6d.mockapi.io/formsubmissions', formData);
            if (res.status === 201) {
                responseMessage.innerText = "Form Submitted Successfully!";
                responseMessage.style.color = 'green'; 
                form.reset(); 
            }
        } catch (error) {
            console.error('Submission Error:', error); 
            responseMessage.innerText = "Submission Failed. Please try again.";
            responseMessage.style.color = 'red'; 
        }
    });

    function validateForm(name: string, email: string, contactNumber: string, subject: string, message: string): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === '') return 'Name is required.';
        if (!emailRegex.test(email)) return 'Invalid email address.';
        if (contactNumber === '') return 'Contact Number is required.';
        if (subject === '') return 'Subject is required.';
        if (message === '') return 'Message is required.';

        return ''; 
    }
});