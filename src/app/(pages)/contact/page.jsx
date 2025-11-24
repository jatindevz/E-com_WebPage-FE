"use client";
import { useState } from "react";
import Button from "@/components/section/Button";

const ContactInfoCard = ({ icon, title, details, description }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
            <div className="w-12 h-12 bg-coral-red rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                <span className="text-white text-xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-coral-red font-semibold mb-2">{details}</p>
            <p className="text-slate-gray dark:text-gray-400 text-sm">{description}</p>
        </div>
    );
};

const StoreLocationCard = ({ name, address, hours, phone, image }) => {

    const openMap = () => {
        console.log("worked");
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
            <div className="h-40 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{name}</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-slate-gray dark:text-gray-400">
                        <span>📍</span>
                        <span>{address}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-gray dark:text-gray-400">
                        <span>🕒</span>
                        <span>{hours}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-gray dark:text-gray-400">
                        <span>📞</span>
                        <span>{phone}</span>
                    </div>
                </div>

                {/* Regular button use karein */}
                <button
                    onClick={openMap}
                    className="mt-4 w-full bg-coral-red text-white py-3 px-6 rounded-full hover:bg-coral-red/90 transition-colors duration-200 font-medium"
                >
                    Get Directions
                </button>
            </div>
        </div>
    );
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Form submitted:", formData);
        setIsSubmitting(false);

        // Reset form
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });

        // Show success message (you can replace with toast notification)
        alert("Thank you for your message! We'll get back to you soon.");
    };

    const contactInfo = [
        {
            icon: "📞",
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon to Fri 9am to 6pm"
        },
        {
            icon: "✉️",
            title: "Email Us",
            details: "support@nikestore.com",
            description: "Send us your query anytime!"
        },
        {
            icon: "📍",
            title: "Visit Us",
            details: "123 Sport Street, NY",
            description: "Visit our flagship store"
        },
        {
            icon: "💬",
            title: "Live Chat",
            details: "Available 24/7",
            description: "Instant support"
        }
    ];

    const storeLocations = [
        {
            name: "Flagship Store - NYC",
            address: "123 Sport Street, New York, NY 10001",
            hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-7PM",
            phone: "+1 (555) 123-4567",
            image: "https://loremflickr.com/400/200/store,interior?lock=10"
        },
        {
            name: "Downtown Location",
            address: "456 Athletic Ave, New York, NY 10002",
            hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
            phone: "+1 (555) 123-4568",
            image: "https://loremflickr.com/400/200/store,interior?lock=11"
        },
        {
            name: "Brooklyn Store",
            address: "789 Runner's Road, Brooklyn, NY 11201",
            hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM",
            phone: "+1 (555) 123-4569",
            image: "https://loremflickr.com/400/200/store,interior?lock=12"
        }
    ];

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for unworn items in original packaging with receipt."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location."
        },
        {
            question: "How can I track my order?",
            answer: "You'll receive a tracking number via email once your order ships. You can also track it in your account."
        },
        {
            question: "Do you price match?",
            answer: "Yes, we offer price matching within 7 days of purchase for identical items from authorized retailers."
        }
    ];

    return (
        <section className="max-container mt-12 py-20 px-4 transition-colors duration-300">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-palanquin font-bold text-gray-900 dark:text-white">
                    Get In <span className="text-coral-red">Touch</span>
                </h1>
                <p className="text-slate-gray dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                    We're here to help you with any questions about our products, stores, or services.
                    Reach out and we'll get back to you as soon as possible.
                </p>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {contactInfo.map((info, index) => (
                    <ContactInfoCard key={index} {...info} />
                ))}
            </div>

            {/* Main Content - Form and Map */}
            <div className="flex flex-col lg:flex-row gap-12 mb-20">
                {/* Contact Form */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white mb-6">
                            Send Us a <span className="text-coral-red">Message</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red/50 focus:border-coral-red transition-colors duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red/50 focus:border-coral-red transition-colors duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red/50 focus:border-coral-red transition-colors duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="What's this regarding?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red/50 focus:border-coral-red transition-colors duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            <Button
                                type="submit"
                                label={isSubmitting ? "Sending..." : "Send Message"}
                                disabled={isSubmitting}
                                className="w-full"
                            />
                        </form>
                    </div>
                </div>

                {/* Store Locations & Map */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                        <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white mb-6">
                            Visit Our <span className="text-coral-red">Stores</span>
                        </h2>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64 mb-6 flex items-center justify-center">
                            <div className="text-center text-slate-gray dark:text-gray-400">
                                <span className="text-4xl mb-2 block">🗺️</span>
                                <p>Interactive Map</p>
                                <p className="text-sm mt-2">Store locations would be displayed here</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {storeLocations.map((store, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                                    <div className="w-8 h-8 bg-coral-red rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{store.name}</h3>
                                        <p className="text-sm text-slate-gray dark:text-gray-400">{store.address}</p>
                                        <p className="text-sm text-slate-gray dark:text-gray-400">{store.hours}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white text-center mb-12">
                    Frequently Asked <span className="text-coral-red">Questions</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-2">
                                <span className="text-coral-red mt-1">•</span>
                                {faq.question}
                            </h3>
                            <p className="text-slate-gray dark:text-gray-400 text-sm">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Store Locations */}
            <div>
                <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white text-center mb-12">
                    All Store <span className="text-coral-red">Locations</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {storeLocations.map((store, index) => (
                        <StoreLocationCard key={index} {...store} />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-coral-red to-coral-red/90 rounded-2xl p-8 lg:p-12 text-center text-white mt-16">
                <h2 className="text-3xl lg:text-4xl font-palanquin font-bold mb-4">
                    Need Immediate Assistance?
                </h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-8">
                    Call us now or visit our live chat for instant support. Our customer service team is ready to help you with any questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        label="Call Now: +1 (555) 123-4567"
                        backgroundColor="bg-white"
                        textColor="text-coral-red"
                        borderColor="border-white"
                    />
                    <Button
                        label="Start Live Chat"
                        backgroundColor="bg-transparent"
                        textColor="text-white"
                        borderColor="border-white"
                    />
                </div>
            </div>
        </section>
    );
}