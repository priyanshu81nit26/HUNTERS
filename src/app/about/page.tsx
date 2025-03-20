"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Fantasy Cricket Player",
      text: "DreamTeam has completely changed how I play fantasy cricket. Their analytics are spot on, and I&apos;ve seen a 40% increase in my winning rate!",
      avatar: "/dhoni.jpg"
    },
    {
      name: "Priya Patel",
      role: "Cricket Enthusiast",
      text: "The player performance predictions are incredibly accurate. I love how they break down the stats and make it easy to understand matchups.",
      avatar: "/dhoni.jpg"
    },
    {
      name: "Ajay Kumar",
      role: "IPL Fanatic",
      text: "I&apos;ve tried many fantasy cricket platforms, but DreamTeam&apos;s insights are on another level. The ground analysis tool is particularly valuable.",
      avatar: "/dhoni.jpg"
    },
    {
      name: "Vikram Singh",
      role: "Cricket Analyst",
      text: "As someone who works with cricket data, I&apos;m impressed by the depth of analysis DreamTeam provides. Their machine learning models are excellent.",
      avatar: "/dhoni.jpg"
    },
    {
      name: "Anita Desai",
      role: "Cricket Blogger",
      text: "DreamTeam has become my go-to resource for player insights. The UI is beautiful and the data visualization makes complex stats accessible.",
      avatar: "/dhoni.jpg"
    }
  ];

  // Infinite scroll effect for testimonials
  useEffect(() => {
    if (!testimonialRef.current) return;
    
    setIsVisible(true);
    
    // Clone testimonials for infinite scroll effect
    const scrollContainer = testimonialRef.current;
    const scrollContent = scrollContainer.children[0];
    
    // Set animation
    const animation = scrollContainer.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${scrollContent.clientWidth / 2}px)` }
      ],
      {
        duration: 30000,
        iterations: Infinity,
        easing: "linear"
      }
    );
    
    // Pause animation when not visible or on hover
    const handleVisibilityChange = () => {
      if (document.hidden) {
        animation.pause();
      } else {
        animation.play();
      }
    };
    
    const handleHover = () => {
      animation.pause();
    };
    
    const handleHoverEnd = () => {
      animation.play();
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    scrollContainer.addEventListener("mouseenter", handleHover);
    scrollContainer.addEventListener("mouseleave", handleHoverEnd);
    
    return () => {
      animation.cancel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      scrollContainer.removeEventListener("mouseenter", handleHover);
      scrollContainer.removeEventListener("mouseleave", handleHoverEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">About DreamTeam</h1>
        
        {/* Section 1: What We Are & What We Do */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6 text-blue-800">What We Are & What We Do</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <span className="font-bold">DreamTeam</span> is the ultimate cricket analytics platform 
                  designed to give fans and fantasy players a competitive edge. We leverage advanced data science 
                  and machine learning algorithms to analyze player performance across all formats of cricket.
                </p>
                <p>
                  Our mission is to democratize cricket analytics by making professional-grade performance 
                  insights accessible to everyone. From casual fans to dedicated fantasy players, we provide the 
                  tools needed to make informed decisions about player selection and match predictions.
                </p>
                <p>
                  We analyze thousands of data points from every cricket match - including historical performance, 
                  pitch conditions, weather factors, and player-vs-player statistics - to provide the most accurate 
                  predictions and recommendations for your fantasy cricket teams.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-medium">
                  Advanced Analytics
                </div>
                <div className="bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-medium">
                  Real-time Updates
                </div>
                <div className="bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-medium">
                  Player Insights
                </div>
                <div className="bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-medium">
                  Custom Recommendations
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/dhoni.jpg"
                alt="Cricket Analytics"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">Build Winning Teams</h3>
                <p className="text-white/90">Using advanced statistics and machine learning predictions</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 2: How We Do It */}
        <section className="mb-20 bg-white py-16 px-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-10 text-center text-blue-800">How We Do It</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/dhoni.jpg"
                  alt="Our Process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                    <p className="text-gray-700">
                      We gather comprehensive data from every cricket match across all major tournaments globally. 
                      Our system tracks every ball, every run, and every wicket to build a comprehensive database 
                      of player and team performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                    <p className="text-gray-700">
                      Our proprietary algorithms analyze this data using statistical models and machine learning 
                      techniques. We consider factors like player form, historical performance against specific 
                      teams, venue statistics, and even weather conditions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Performance Prediction</h3>
                    <p className="text-gray-700">
                      Based on our analysis, we generate performance predictions for each player in upcoming 
                      matches. These predictions are continuously refined as new data becomes available, 
                      ensuring that you always have the most up-to-date information.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Team Optimization</h3>
                    <p className="text-gray-700">
                      Finally, we use our predictions to recommend optimal team compositions, captain and 
                      vice-captain selections, and other strategic decisions to help you maximize your 
                      fantasy cricket points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 3: Why Choose Us - with 3 images and overlay text */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center text-blue-800">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/dhoni.jpg"
                alt="Accuracy"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-between p-8 z-10">
                <div className="bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded-full w-fit">01</div>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3">Unmatched Accuracy</h3>
                  <p className="text-white/90">
                    Our predictions achieve over 85% accuracy in player performance forecasting, consistently 
                    outperforming other fantasy cricket platforms.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/dhoni.jpg"
                alt="Expert Insights"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-between p-8 z-10">
                <div className="bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded-full w-fit">02</div>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3">Expert Insights</h3>
                  <p className="text-white/90">
                    Our team includes cricket analysts, data scientists, and former players who bring both 
                    technical expertise and practical knowledge of the game.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/dhoni.jpg"
                alt="User-Friendly Platform"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-between p-8 z-10">
                <div className="bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded-full w-fit">03</div>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3">User-Friendly Platform</h3>
                  <p className="text-white/90">
                    While our technology is complex, our platform is designed to be intuitive and easy to use,
                    helping you make informed decisions without needing to be a data scientist.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Your Cricket Success Partner</h3>
            <p className="text-lg text-gray-700 mb-8">
              DreamTeam combines cutting-edge technology with deep cricket knowledge to give you the ultimate advantage in fantasy cricket.
              With our comprehensive analytics, user-friendly interface, and expert insights, you&apos;ll make more informed decisions and
              improve your chances of winning consistently.
            </p>
          </div>
        </section>
        
        {/* Testimonials Section - Infinite Scroll */}
        <section className="mb-20 py-16 bg-gray-100 rounded-3xl overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-10 text-center text-blue-800">What Our Users Say</h2>
            
            {/* Mobile testimonials (horizontal scroll) */}
            <div className="md:hidden overflow-x-auto pb-4">
              <div className="flex gap-4" style={{ width: "max-content" }}>
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="w-[280px] flex-shrink-0 p-6 bg-white rounded-xl shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 truncate">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop testimonials (scrolling) */}
            <div 
              className="relative overflow-hidden hidden md:block" 
              style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)' }}
            >
              <div 
                ref={testimonialRef} 
                className="whitespace-nowrap"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
              >
                <div className="inline-flex gap-6">
                  {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div 
                      key={index} 
                      className="w-[300px] lg:w-[350px] inline-block p-6 bg-white rounded-xl shadow-md"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 whitespace-normal truncate">{testimonial.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="mt-12 text-center">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
              Try DreamTeam Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 