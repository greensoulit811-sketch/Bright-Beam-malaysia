import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  Hourglass, 
  Layers, 
  Truck, 
  History, 
  BadgePercent,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BecomeDealerPage = () => {
  const benefits = [
    {
      title: 'Simple application process',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'No minimum order required',
      icon: <Hourglass className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Extensive product range',
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Fast and affordable shipping options',
      icon: <Truck className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Backorder tracking and fast fulfillment',
      icon: <History className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Significant discounts across inventories',
      icon: <BadgePercent className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    }
  ];

  const steps = [
    {
      id: 1,
      title: 'Complete The Application',
      desc: 'Fill out the online dealer application form to get started.'
    },
    {
      id: 2,
      title: 'Provide Documentation',
      desc: 'Submit a digital copy of your business license with your application.'
    },
    {
      id: 3,
      title: 'Account Verification',
      desc: 'NBPLAZA verifies your business credentials to confirm eligibility.'
    },
    {
      id: 4,
      title: 'Discount Activation',
      desc: 'Once approved, dealer discount is applied directly to your account.'
    }
  ];

  const brands = [
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Acer', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Acer_Logo.svg' },
    { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
    { name: 'AOC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/AOC_logo.svg' },
    { name: 'BenQ', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/BenQ_logo.svg' },
    { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.svg' },
    { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
    { name: 'JOI', logo: 'https://www.joi.com.my/image/catalog/logo/JOI-Logo.png' },
    { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Spacer for Fixed Navbar */}
      <div className="h-20 lg:h-36"></div>

      {/* Benefits Section */}
      <section className="bg-gray-50/50 py-20">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Why Partner With Us</h3>
            <h2 className="text-3xl lg:text-5xl font-black text-[#0A2342]">
               Benefits of <span className="text-blue-600">Partnering</span> with Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col gap-6"
              >
                <div className={`w-14 h-14 ${benefit.bg} rounded-2xl flex items-center justify-center`}>
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-[#0A2342] leading-tight">
                  {benefit.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-24 space-y-4">
             <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">The Process</h3>
             <h2 className="text-3xl lg:text-5xl font-black text-[#0A2342]">How to <span className="text-blue-600">Join</span></h2>
          </div>

          <div className="relative">
             {/* Connection Line */}
             <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-100 -translate-y-1/2 z-0"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-black shadow-xl shadow-blue-200">
                      {step.id}
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-lg font-bold text-[#0A2342]">{step.title}</h4>
                       <p className="text-sm text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-gray-50 py-20 lg:py-32">
         <div className="container mx-auto px-4 lg:px-12">
            <div className="text-center mb-16 space-y-4">
               <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Authorised Brands</h3>
               <h2 className="text-3xl lg:text-5xl font-black text-[#0A2342]">Our <span className="text-blue-600">Brands</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
               {brands.map((brand, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ scale: 1.02 }}
                   className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 flex items-center justify-center group"
                 >
                   <img 
                     src={brand.logo} 
                     alt={brand.name} 
                     className="max-h-12 w-auto grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" 
                   />
                 </motion.div>
               ))}
               <div className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 flex items-center justify-center opacity-40">
                  <span className="text-xs font-bold uppercase text-gray-400">And Many More</span>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
         <div className="container mx-auto px-4 lg:px-12">
            <div className="bg-[#0A2342] rounded-[40px] p-10 lg:p-20 relative overflow-hidden text-center space-y-8">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
               
               <h2 className="text-3xl lg:text-5xl font-black text-white relative z-10">
                  Ready to Grow Your <span className="text-blue-400">Business?</span>
               </h2>
               <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto relative z-10">
                  Join hundreds of successful retailers who are scaling their business with our premium tech inventory.
               </p>
               <div className="flex justify-center relative z-10">
                  <button className="bg-white text-[#0A2342] px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-2xl">
                     Get Started Today
                  </button>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeDealerPage;
