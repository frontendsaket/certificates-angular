interface User{
    name: string;
    email: string;
}

interface Certificate{
    title: string;
    description: string;
    image: string;
    recipient: any;
    _id: string;
}

interface Otp{
    otp: string;
    email: string;
}

export { User, Certificate, Otp };