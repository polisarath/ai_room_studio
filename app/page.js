"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeSection from "./dashboard/_components/HomeSection";

export default function Home() {
  const latestWorks = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "10.jpg",
    "9.jpg",
    "8.jpg",
  ];
  const videoSources = [
    "/v2.mp4",
    "/v7.mp4",
    "/v3.mp4",
    "/v5.mp4",
    
  ];
  const intervalTime = 7000; // 5 seconds
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % videoSources.length
      );
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      {/* 🔹 Background Video Banner Section */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <div className="relative w-full h-full">
          <video
            key={currentVideoIndex} // Forces re-render when index changes
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src={videoSources[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* <div className="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md z-20"> */}
        <div className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md z-50">
          <Link href="/">
            <h1 className="text-white text-2xl font-bold">InteriorAI Studio</h1>
          </Link>

          <div className="space-x-4">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-white hover:text-violet-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="ghost"
                className="text-white hover:text-violet-300"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Text and Button Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <h2 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            Welcome to InteriorAI Studio platform.
          </h2>
          <p className="text-white text-lg mt-4 max-w-xl drop-shadow-sm">
            Your intelligent workspace for collaboration, automation, and
            creativity. Start your journey now.
          </p>
          <Link href="/sign-up">
            {/* <Button className="mt-6 bg-violet-600 text-white hover:bg-violet-700 rounded-full px-6 py-3 text-lg">
              Get Started
            </Button> */}
            <Button  className="inline-flex mt-6 items-center text-lg px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
              Get Started
            </Button>
            
          </Link>
        </div>
      </div>

      <HomeSection/>

      {/* 🔹 Additional Section */}
      <div className="px-8 py-16 text-center relative z-20 bg-white">
        <h3 className="text-3xl font-bold mb-4">
          Why Choose InteriorAI Studio?
        </h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Build faster, smarter, and more collaboratively. Our AI-enhanced
          features streamline your development and project flow.
        </p>
      </div>

      {/* 🔹 Latest Works Section */}
      <div className="px-8 py-16 text-center bg-gray-50 relative z-20">
        <h3 className="text-3xl font-bold mb-4">Latest Works</h3>
        <p className="max-w-2xl mx-auto text-gray-700 mb-10">
          Explore some of our most recent and innovative creations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {latestWorks.map((imgName, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={`/${imgName}`}
                alt={`Project ${index + 1}`}
                width={400}
                height={250}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-10 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-2">InteriorAI Studio</h2>
            <p className="text-gray-400 text-sm">
              AI-powered interior design, reimagined. Dream. Design. Deliver.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Explore</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} InteriorAI Studio. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
