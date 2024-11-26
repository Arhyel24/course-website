import Image from "next/image";
import React from "react";

const Reviews = () => {
  const reviewsData = [
    {
      name: "Ravi Kumar",
      role: "Car Enthusiast",
      comment:
        "The quality of these seat covers is outstanding. They fit perfectly and add a touch of luxury to my car's interior. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      socialLink: "https://twitter.com/ravikumar/status/1234567890",
      iconClass: "fab fa-twitter",
    },
    {
      name: "Anjali Sharma",
      role: "Marketing Professional",
      comment:
        "I love the customizable designs! I was able to choose the perfect color to match my car's interior. The material feels very durable.",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      socialLink: "https://www.instagram.com/p/1234567890",
      iconClass: "fab fa-instagram",
    },
    {
      name: "Vijay Singh",
      role: "Software Developer",
      comment:
        "These seat covers are a game-changer for long drives. The added padding and ergonomic design make a huge difference in comfort.",
      avatar: "https://randomuser.me/api/portraits/men/18.jpg",
      socialLink: "https://www.facebook.com/vijaysingh/posts/1234567890",
      iconClass: "fab fa-facebook",
    },
    {
      name: "Priya Patel",
      role: "Mobile Developer",
      comment:
        "The installation was super easy, and the instructions were clear. My car looks and feels much more upscale now.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      socialLink: "https://twitter.com/priyapatel/status/1234567890",
      iconClass: "fab fa-twitter",
    },
    {
      name: "Arjun Mehta",
      role: "Manager",
      comment:
        "Great value for money. The seat covers have a premium feel and have significantly improved the look of my car's interior.",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      socialLink: "https://www.instagram.com/p/1234567890",
      iconClass: "fab fa-instagram",
    },
    {
      name: "Sneha Rao",
      role: "Product Designer",
      comment:
        "Absolutely love these seat covers. They're stylish, comfortable, and were really easy to install. My car interior looks brand new!",
      avatar: "https://randomuser.me/api/portraits/women/19.jpg",
      socialLink: "https://www.facebook.com/sneharao/posts/1234567890",
      iconClass: "fab fa-facebook",
    },
  ];
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

      <div className="gap-8 space-y-8 md:columns-2 lg:columns-3">
        {reviewsData.map((review, index) => (
          <div
            key={index}
            className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl rounded-3xl shadow-gray-600/10"
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {review.role}
                  </p>
                </div>
                <a
                  href={review.socialLink}
                  className="text-blue-500 hover:text-blue-600 ml-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={review.iconClass}></i>
                </a>
              </div>
            </div>
            <p className="mt-8 dark:text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
