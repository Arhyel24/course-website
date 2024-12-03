"use client"

import Image from "next/image";
import React, { useRef, useEffect }  from "react";

const Reviews = () => {
const reviewsData = [
  {
    name: "Chidi Okoro",
    comment: "MIAM has transformed my online business. I've increased my affiliate income by 50% in just a few months!",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg"
  },
  {
    name: "Aisha Bello",
    comment: "The course content is easy to understand and packed with practical tips. I highly recommend it to anyone looking to start or grow their affiliate marketing business.",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    name: "Emeka Nwafor",
    comment: "I was skeptical at first, but MIAM exceeded my expectations. The support and community are incredible.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    name: "Fatima Abubakar",
    comment: "I've tried other courses, but MIAM is the only one that has helped me achieve real results. I'm so grateful for this opportunity.",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg"
  }
];

const reviewsRef = useRef(null);

  useEffect(() => {
    const reviewsElement = reviewsRef.current;

    const scrollReviews = () => {
      if (reviewsElement) {
        reviewsElement.scrollTop += 1; // Scroll down by 1 pixel
        if (reviewsElement.scrollTop >= reviewsElement.scrollHeight - reviewsElement.clientHeight) {
          reviewsElement.scrollTop = 0; // Reset to top when reaching the end
        }
      }
    };

    const interval = setInterval(scrollReviews, 30); // Adjust the speed of scrolling

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pb-12 mx-auto md:pb-20 max-w-7xl">
      <div className="py-4 text-center md:py-8">
        <h4 className="text-base font-bold tracking-wide text-center uppercase text-teal-600">
          Reviews
        </h4>
        <p className="mt-2 tracking-tight text-gray-900 dark:text-gray-200 text-xl md:text-2xl">
          We have some fans.
        </p>
      </div>
	<div
      ref={reviewsRef}
      className="overflow-y-auto max-h-96 gap-8 space-y-8 p-4"
      style={{ scrollBehavior: 'smooth' }} // Smooth scrolling
    >
      {reviewsData.map((review, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl shadow-gray-600/10"
        >
          <div className="flex gap-4 items-start">
            <Image
              className="w-12 h-12 rounded-full"
              src={review.avatar}
              alt="user avatar"
              width="400"
              height="400"
              loading="lazy"
            />
            <div className="flex-1 flex justify-between items-start">
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {review.name}
                </h6>
              </div>
            </div>
            <p className="mt-8 dark:text-gray-300">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
    </section>                                            );                                                    };

export default Reviews;
