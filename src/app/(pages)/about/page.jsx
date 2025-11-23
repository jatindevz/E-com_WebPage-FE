"use client";
import Button from "@/components/section/Button";
import { useState } from "react";

const TeamMember = ({ name, role, image, bio }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
                <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-coral-red"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-coral-red font-semibold mt-1">{role}</p>
                    <p className={`text-slate-gray dark:text-gray-400 mt-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {bio}
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-coral-red hover:text-coral-red/90 text-sm font-medium mt-2 transition-colors duration-200"
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ValueCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
            <div className="w-12 h-12 bg-coral-red rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{title}</h3>
            <p className="text-slate-gray dark:text-gray-400 mt-2">{description}</p>
        </div>
    );
};

export default function About() {
    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "50+", label: "Store Locations" },
        { number: "15+", label: "Years Experience" },
        { number: "100%", label: "Satisfaction Guarantee" }
    ];

    const values = [
        {
            icon: "✓",
            title: "Quality First",
            description: "Every product is crafted with premium materials and undergoes rigorous quality checks."
        },
        {
            icon: "♻",
            title: "Sustainability",
            description: "We're committed to reducing our environmental impact through eco-friendly practices."
        },
        {
            icon: "💡",
            title: "Innovation",
            description: "Constantly pushing boundaries with cutting-edge technology and design innovations."
        },
        {
            icon: "❤",
            title: "Community",
            description: "Supporting athletes and communities through partnerships and local initiatives."
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "https://loremflickr.com/200/200/portrait?lock=1",
            bio: "With over 15 years in the footwear industry, Sarah founded NikeStore with a vision to bring premium athletic wear to everyone. Her leadership has driven our company's growth and commitment to excellence."
        },
        {
            name: "Michael Chen",
            role: "Head of Design",
            image: "https://loremflickr.com/200/200/portrait?lock=2",
            bio: "Michael brings innovative design concepts to life, combining functionality with style. His expertise in ergonomics and materials science ensures our products meet the highest standards of comfort and performance."
        },
        {
            name: "Emily Rodriguez",
            role: "Customer Experience Director",
            image: "https://loremflickr.com/200/200/portrait?lock=3",
            bio: "Emily is passionate about creating unforgettable customer journeys. Her team ensures every interaction with NikeStore exceeds expectations, from browsing to after-sales support."
        },
        {
            name: "David Kim",
            role: "Operations Manager",
            image: "https://loremflickr.com/200/200/portrait?lock=4",
            bio: "David optimizes our supply chain and logistics to ensure timely delivery and inventory management. His efficient systems keep our operations running smoothly across all locations."
        }
    ];

    const milestones = [
        { year: "2008", event: "First Store Opening" },
        { year: "2012", event: "Expanded to 10 Locations" },
        { year: "2015", event: "Launched E-commerce Platform" },
        { year: "2018", event: "Reached 1M Customers" },
        { year: "2020", event: "Sustainability Initiative Launch" },
        { year: "2023", event: "50+ Stores Nationwide" }
    ];

    return (
        <section className="max-container mt-12 py-20 px-4 transition-colors duration-300">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-palanquin font-bold text-gray-900 dark:text-white">
                    Our <span className="text-coral-red">Story</span>
                </h1>
                <p className="text-slate-gray dark:text-gray-400 mt-4 max-w-3xl mx-auto text-lg">
                    From a single store to a nationwide presence, we've been dedicated to bringing
                    the best Nike products to athletes and enthusiasts for over 15 years.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                            {stat.number}
                        </div>
                        <div className="text-slate-gray dark:text-gray-400 mt-2 font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Story Section */}
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
                <div className="flex-1">
                    <img
                        src="https://loremflickr.com/600/400/store,interior?lock=5"
                        alt="Our first store"
                        className="rounded-2xl shadow-lg w-full h-auto"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white mb-6">
                        Our <span className="text-coral-red">Journey</span>
                    </h2>
                    <div className="space-y-4 text-slate-gray dark:text-gray-400">
                        <p>
                            Founded in 2008, NikeStore began as a small boutique with a big dream: to make
                            premium athletic footwear accessible to everyone. What started as a single store
                            has grown into a nationwide network of 50+ locations, serving over 10,000
                            satisfied customers.
                        </p>
                        <p>
                            Our commitment goes beyond just selling shoes. We're passionate about the
                            Nike brand story - innovation, performance, and empowering athletes at every
                            level. From professional athletes to weekend warriors, we believe everyone
                            deserves quality footwear that enhances their performance and style.
                        </p>
                        <p>
                            Today, we continue to evolve, embracing new technologies and sustainable
                            practices while staying true to our core values of quality, community, and
                            customer satisfaction.
                        </p>
                    </div>
                    <div className="mt-8">
                        <Button label="Visit Our Stores" />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white text-center mb-12">
                    Our <span className="text-coral-red">Values</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <ValueCard key={index} {...value} />
                    ))}
                </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white text-center mb-12">
                    Our <span className="text-coral-red">Milestones</span>
                </h2>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-coral-red/20"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`flex items-center w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className="w-1/2 px-8">
                                    <div className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <div className="text-2xl font-bold text-coral-red mb-2">
                                            {milestone.year}
                                        </div>
                                        <div className="text-gray-900 dark:text-white font-semibold">
                                            {milestone.event}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-8 h-8 bg-coral-red rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
                                <div className="w-1/2 px-8"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-palanquin font-bold text-gray-900 dark:text-white text-center mb-12">
                    Meet Our <span className="text-coral-red">Team</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {team.map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-coral-red to-coral-red/90 rounded-2xl p-8 lg:p-12 text-center text-white">
                <h2 className="text-3xl lg:text-4xl font-palanquin font-bold mb-4">
                    Ready to Find Your Perfect Pair?
                </h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-8">
                    Join thousands of satisfied customers who've found their ideal Nike footwear.
                    Experience the quality, comfort, and style that define our collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        label="Shop Now"
                        backgroundColor="bg-white"
                        textColor="text-coral-red"
                        borderColor="border-white"
                    />
                    <Button
                        label="Contact Us"
                        backgroundColor="bg-transparent"
                        textColor="text-white"
                        borderColor="border-white"
                    />
                </div>
            </div>
        </section>
    );
}