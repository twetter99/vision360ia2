import { findImage } from './placeholder-images';

export const heroData = {
  image: findImage('hero'),
};

export const navigationLinks = [
  { href: '#products', label: 'Products' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#ai-analysis', label: 'AI Analysis' },
  { href: '#news', label: 'News' },
  { href: '#contact', label: 'Contact' },
];

export const products = [
  {
    id: 'prod1',
    name: 'Guardian G1 GPS Tracker',
    description: 'Real-time GPS tracking with geofencing and instant alerts to your phone.',
    price: '$199',
    image: findImage('product1'),
    specs: ['4G LTE Connectivity', '24/7 Monitoring', 'Mobile App Access', 'Tamper Alerts'],
  },
  {
    id: 'prod2',
    name: 'Aegis A5 Smart Alarm',
    description: 'An intelligent alarm system that detects and deters threats with a piercing siren.',
    price: '$249',
    image: findImage('product2'),
    specs: ['Multi-tone Siren', 'Glass Break Sensor', 'Motion Detection', 'Remote Arm/Disarm'],
  },
  {
    id: 'prod3',
    name: 'Sentinel Sentry Dashcam',
    description: 'Record everything on the road and when parked with our AI-powered dashcam.',
    price: '$399',
    image: findImage('product3'),
    specs: ['4K Front & Rear Cams', 'AI Event Detection', 'Cloud Storage', 'Parking Mode'],
  },
];

export const solutions = [
  {
    id: 'sol1',
    vehicleType: 'Personal Cars',
    title: 'Complete Security for Your Daily Drive',
    description: 'Protect your car from theft and break-ins with our integrated system including alarms, immobilizers, and GPS tracking. Enjoy peace of mind knowing your personal vehicle is secure.',
    image: findImage('solution1'),
    features: ['Steering Wheel Locks', 'Advanced Immobilizers', 'Glass Break Sensors', '24/7 GPS Tracking'],
  },
  {
    id: 'sol2',
    vehicleType: 'Commercial Fleet',
    title: 'Total Fleet Management & Security',
    description: 'Monitor your entire fleet in real-time. Optimize routes, monitor driver behavior, and secure your valuable assets against theft and misuse with our comprehensive fleet solution.',
    image: findImage('solution2'),
    features: ['Live Fleet Tracking', 'Driver Behavior Alerts', 'Geofencing & Route History', 'Remote Engine Shutdown'],
  },
  {
    id: 'sol3',
    vehicleType: 'Motorcycles',
    title: 'Compact & Rugged Bike Protection',
    description: 'Secure your motorcycle with our discreet, waterproof, and vibration-resistant trackers and alarms. Get instant alerts if your bike is moved or tampered with.',
    image: findImage('solution3'),
    features: ['Vibration-sensitive Alarm', 'Waterproof GPS Unit', 'Low Power Consumption', 'Tilt & Motion Alerts'],
  },
];

export const newsArticles = [
  {
    id: 'news1',
    title: 'The Rise of Keyless Car Theft and How to Prevent It',
    date: 'October 26, 2023',
    excerpt: 'Keyless entry systems are convenient, but they\'ve also opened the door for a new wave of high-tech car thieves. Learn how relay attacks work and what you can do.',
    image: findImage('news1'),
  },
  {
    id: 'news2',
    title: 'Why GPS Trackers are a Must-Have for Fleet Managers',
    date: 'October 15, 2023',
    excerpt: 'Beyond theft recovery, modern GPS trackers offer a suite of tools to improve efficiency, reduce costs, and enhance safety for commercial fleets of all sizes.',
    image: findImage('news2'),
  },
  {
    id: 'news3',
    title: 'The Future of Vehicle Security: AI and Predictive Analysis',
    date: 'October 5, 2023',
    excerpt: 'Artificial intelligence is no longer science fiction. Discover how AI is revolutionizing vehicle security by predicting and preventing threats before they happen.',
    image: findImage('news3'),
  },
];

export const testimonials = [
  {
    id: 'test1',
    quote: 'Vision360ia\'s system gave me peace of mind. I can check on my truck anytime, anywhere. The installation was seamless and the support team is fantastic!',
    author: 'John D., Trucking Co. Owner',
    avatar: findImage('avatar1'),
  },
  {
    id: 'test2',
    quote: 'After my car was broken into, I installed the Aegis A5 alarm. The sense of security is priceless. I sleep better at night knowing my car is protected.',
    author: 'Sarah K., Urban Driver',
    avatar: findImage('avatar2'),
  },
  {
    id: 'test3',
    quote: 'The GPS tracker for my motorcycle is amazing. It\'s so small and discreet, but incredibly powerful. I got an alert when someone tried to move it and was able to stop them.',
    author: 'Mike R., Motorcycle Enthusiast',
    avatar: findImage('avatar3'),
  },
];

export const faqs = [
  {
    id: 'faq1',
    question: 'How long does installation take?',
    answer: 'Standard installation for most of our products takes between 1-3 hours. Our certified technicians ensure a clean and professional setup without damaging your vehicle\'s interior.',
  },
  {
    id: 'faq2',
    question: 'Will your products drain my vehicle\'s battery?',
    answer: 'Our products are designed for ultra-low power consumption. When your vehicle is parked, they enter a deep sleep mode, drawing minimal power. For most vehicles, our devices can operate for weeks without affecting battery health.',
  },
  {
    id: 'faq3',
    question: 'Is there a monthly subscription fee?',
    answer: 'Some of our products, particularly those with 4G LTE connectivity like our GPS trackers, require a subscription for data and real-time services. We offer various affordable plans to fit your needs.',
  },
  {
    id: 'faq4',
    question: 'Can I install the products myself?',
    answer: 'While some of our products are designed for easy DIY installation, we recommend professional installation for systems that integrate with your vehicle\'s wiring to ensure optimal performance and warranty coverage.',
  },
  {
    id: 'faq5',
    question: 'What happens if a thief disables the device?',
    answer: 'Our systems have built-in tamper alerts. If the power is cut or the device is removed, you will receive an immediate notification on your phone, and the last known location will be recorded.',
  },
];
