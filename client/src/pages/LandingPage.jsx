import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
     
      <div className="bg-[#1E5EFF] text-white relative overflow-hidden pb-32">
        
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* Navbar */}
        <nav className="relative z-10 flex justify-between items-center py-6 px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#1E5EFF] font-bold text-xl">
              🔧
            </div>
            <h2 className="text-2xl font-bold tracking-tight">FixMyRide</h2>
          </div>
          
          {/* Middle Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/90">
            <a href="#" className="hover:text-white transition">Services</a>
            <a href="#" className="hover:text-white transition">How It Works</a>
            <a href="#" className="hover:text-white transition">Reviews</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>

          <div className="flex gap-4">
          <Link to="/login" 
           className="px-6 py-2 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-colors text-sm flex items-center"
             >
               Login
             </Link>
             <Link to="/login" 
                  className="px-6 py-2 bg-[#FF7900] text-white font-medium rounded-full hover:bg-[#e66d00] transition-colors shadow-lg text-sm flex items-center"
                 >
                  Sign Up
                </Link>
                </div>
        </nav>

        {/* Hero Section (2-Column Grid) */}
        <header className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-10 pt-16 pb-12">
          
          {/* Left Column: Text & CTAs */}
          <div className="text-left">
            <div className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="text-green-400 mr-2">●</span> 500+ Verified Mechanics Ready
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Vehicle Repair <br />
              <span className="text-[#FF7900]">Made Simple.</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-10 max-w-md leading-relaxed">
              Book trusted mechanics at your doorstep or visit nearby garages with live tracking and transparent pricing.
            </p>

            {/* Vehicle Type Toggles */}
            <div className="flex gap-4 mb-8">
              <button className="px-6 py-2.5 bg-white text-[#1E5EFF] font-bold rounded-full text-sm shadow-sm flex items-center gap-2">
                🚗 Car
              </button>
              <button className="px-6 py-2.5 border border-white/40 text-white font-bold rounded-full text-sm hover:bg-white/10 transition flex items-center gap-2">
                🏍️ Bike
              </button>
            </div>
            
            {/* Main Action Buttons */}
            <div className="flex gap-4">
              <button className="px-8 py-3.5 bg-[#FF7900] text-white font-bold rounded-full hover:bg-[#e66d00] transition shadow-lg flex items-center gap-2">
                Book Repair ➔
              </button>
              <button className="px-8 py-3.5 border border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition flex items-center gap-2">
                🔧 Become a Mechanic
              </button>
            </div>
          </div>

          {/* Right Column: Image & Floating Cards */}
          <div className="relative hidden lg:block">
            {/* Main Image Placeholder */}
            <div className="w-full h-[450px] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative">
               {/* Replace src with your actual mechanic image later */}
               <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop")' }}></div>
            </div>

            {/* Floating Card 1: Booking Confirmed */}
            <div className="absolute top-10 -right-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                ✓
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm">Booking Confirmed</p>
                <p className="text-gray-500 text-xs font-medium">Rahul K. • 4.9 ⭐</p>
              </div>
            </div>

            {/* Floating Card 2: Live Tracking */}
            <div className="absolute bottom-16 -left-12 bg-white p-5 rounded-xl shadow-xl w-64">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#1E5EFF]">📍</span>
                <p className="text-gray-900 font-bold text-sm">Live Tracking</p>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1E5EFF] w-2/3 h-full"></div>
              </div>
              <p className="text-gray-400 text-xs font-medium">On the way • 8 min</p>
            </div>

            {/* Decorative Orange Icon */}
            <div className="absolute -bottom-4 right-10 w-12 h-12 bg-[#FF7900] rounded-full flex items-center justify-center shadow-lg border-4 border-[#1E5EFF]">
               <span className="text-white text-xl">📍</span>
            </div>
          </div>
        </header>

        {/* Curved SVG Wave at the bottom to transition to the white section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 px-10 max-w-5xl mx-auto text-center bg-white relative z-20">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Service Categories</h2>
        <p className="text-gray-500 mb-12 font-medium">From routine maintenance to emergency repairs.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Bike Repair', 'Car Repair', 'Oil Change', 'Battery'].map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#1E5EFF] text-2xl">
                🔧
              </div>
              <span className="font-bold text-gray-800">{service}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;