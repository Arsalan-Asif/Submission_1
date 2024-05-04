import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
    const [user, setUser] = useState(null);
    const onLogout = () => setUser(null);
    useEffect(() => {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const userExists = email && username && token && email !== "" && username !== "" && token !== ""
        const user = userExists ? { email, username, token } : null
        setUser(user)
    }, []);

    return (
        <div>
            <Header user={user} onLogout={onLogout} />
            <div className="py-16 bg-white">
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div className="md:5/12 lg:w-5/12">
                            <img
                                src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                                alt=""
                            />
                        </div>
                        <div className="md:7/12 lg:w-6/12">
                            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, laudantium quibusdam quasi nulla cumque distinctio!
                            </h2>
                            <p className="mt-6 text-gray-600">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
                                accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
                                aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
                            </p>
                            <p className="mt-4 text-gray-600">
                                Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                                Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}