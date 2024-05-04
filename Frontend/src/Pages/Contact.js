import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';
import ContactModal from '../components/ContactModal';

export default function Contact() {
    const form = useRef();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const userExists = email && username && token && email !== "" && username !== "" && token !== "";
        const user = userExists ? { email, username, token } : null;
        setUser(user);
    }, []);

    const onLogout = () => {
        setUser(null);
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_uhz8s6q', 'template_6najlrf', form.current, {
                publicKey: 'Q0U1UJ1Oful5ooKyC',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setSubmitted(true);
                    setTimeout(() => {
                        setSubmitted(false);
                    }, 3000);
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            );
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <Header user={user} onLogout={onLogout} />
            <div className="relative flex items-top justify-center min-h-[500px] bg-white sm:items-center sm:pt-0">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                                <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                                    Get in touch:
                                </h1>
                                <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                                    Fill in the form to start a conversation
                                </p>

                                <div className="flex items-center mt-8 text-gray-600">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40 hover:text-orange-700">
                                        GIGALABS, Lahore
                                    </div>
                                </div>

                                <div className="flex items-center mt-4 text-gray-600">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40 hover:text-orange-700">
                                        +92 332 1234567
                                    </div>
                                </div>

                                <div className="flex items-center mt-2 text-gray-600">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40 hover:text-orange-700">
                                        info@aastore.pk
                                    </div>
                                </div>
                            </div>

                            <form ref={form} onSubmit={sendEmail} className="p-6 flex flex-col justify-center">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="hidden">
                                        Full Name
                                    </label>
                                    <input
                                        type="name"
                                        name="from_name"
                                        id="name"
                                        placeholder="Full Name"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="email" className="hidden">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="from_email"
                                        id="email"
                                        placeholder="Email"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="tel" className="hidden">
                                        Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="from_contact"
                                        id="tel"
                                        placeholder="Telephone Number"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="message" className="hidden">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        placeholder="Drop your query here!"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                                >
                                    Submit
                                    <ContactModal isOpen={showModal} onClose={handleCloseModal}/>
                                </button>
                                {submitted && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                                        <span className="block sm:inline">Successfully Submitted</span>
                                    </div>


                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
