import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('userToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      
      // ⏳ CHANGE THIS NUMBER TO ADJUST SPEED
      // 1000 = 1 second. Try 1500 or 2000 if you want it even slower!
      const duration = 1200; 
      
      let start = null;

      // This creates that buttery "slow start, fast middle, slow end" effect
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Fallback to ensure it lands exactly on the target
          window.scrollTo(0, targetPosition);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#f8f9fa]">
      
      {/* --- HERO SECTION (Existing) --- */}
      <div className="bg-[#1E5EFF] text-white relative overflow-hidden pb-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* Navbar */}
        <nav className="relative z-10 flex justify-between items-center py-6 px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#1E5EFF] font-bold text-xl">🔧</div>
            <h2 className="text-2xl font-bold tracking-tight">FixMyRide</h2>
          </div>
          
          {/* Middle Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/90">
            <Link to="/services" className="hover:text-white transition">Services</Link>
            
            {/* Swapped <a> for <button> with smooth scrolling! */}
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-white transition cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('reviews')} 
              className="hover:text-white transition cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-white transition cursor-pointer"
            >
              Contact
            </button>
          </div>  

          {/* <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-colors text-sm flex items-center">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 bg-[#FF7900] text-white font-medium rounded-full hover:bg-[#e66d00] transition-colors shadow-lg text-sm flex items-center">
              Sign Up
            </Link>
          </div> */}


          {/* Replace your current <div className="flex gap-4"> block in the nav with this: */}
  <div className="flex gap-4">
    {token ? (
      <Link 
       to={userData?.role === 'Mechanic' ? "/mechanic-dashboard" : "/dashboard"} 
       className="px-6 py-2 bg-[#FF7900] text-white font-medium rounded-full hover:bg-[#e66d00] transition-colors shadow-lg text-sm flex items-center"
      >
        Go to Dashboard
     </Link>
    ) : (
     <>
       <Link to="/login" className="px-6 py-2 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-colors text-sm flex items-center">
         Login
       </Link>
        <Link to="/register" className="px-6 py-2 bg-[#FF7900] text-white font-medium rounded-full hover:bg-[#e66d00] transition-colors shadow-lg text-sm flex items-center">
          Sign Up
        </Link>
      </>
   )}
  </div>
        </nav>

        {/* Hero Content */}
        <header className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-10 pt-16 pb-12">
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

            <div className="flex gap-4 mb-8">
              <button className="px-6 py-2.5 bg-white text-[#1E5EFF] font-bold rounded-full text-sm shadow-sm flex items-center gap-2">🚗 Car</button>
              <button className="px-6 py-2.5 border border-white/40 text-white font-bold rounded-full text-sm hover:bg-white/10 transition flex items-center gap-2">🏍️ Bike</button>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => navigate('/book')} className="px-8 py-3.5 bg-[#FF7900] text-white font-bold rounded-full hover:bg-[#e66d00] transition shadow-lg flex items-center gap-2">
                Book Repair ➔
              </button>
              <button onClick={() => navigate('/register')} className="px-8 py-3.5 border border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition flex items-center gap-2">
                🔧 Become a Mechanic
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="w-full h-[450px] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative">
               <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop")' }}></div>
            </div>
            <div className="absolute top-10 -right-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
              <div>
                <p className="text-gray-900 font-bold text-sm">Booking Confirmed</p>
                <p className="text-gray-500 text-xs font-medium">Rahul K. • 4.9 ⭐</p>
              </div>
            </div>
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
          </div>
        </header>

        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8f9fa"></path>
          </svg>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-24 px-10 max-w-7xl mx-auto text-center relative">
        <div className="mb-16">
          <span className="text-[#FF7900] text-sm font-bold tracking-widest uppercase mb-2 block">The Process</span>
          <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-start gap-8 max-w-6xl mx-auto">
          {/* Connecting Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-blue-100 -z-10"></div>

          {[
            { id: 1, title: 'Search', desc: 'Enter your location and vehicle type.', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="10" r="3" /></> },
            { id: 2, title: 'Choose Service', desc: 'Pick from our range of repair categories.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /> },
            { id: 3, title: 'Book', desc: 'Select a mechanic and confirm your slot.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> },
            { id: 4, title: 'Track Live', desc: 'Follow your mechanic on the map in real time.', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="10" r="3" /></> },
            { id: 5, title: 'Repair Done', desc: 'Pay securely and rate your experience.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> }
          ].map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 relative bg-[#f8f9fa] md:bg-transparent z-10 w-full md:w-auto pb-4">
              <div className="w-[90px] h-[90px] bg-white rounded-3xl shadow-md border border-gray-100 flex items-center justify-center relative mb-5">
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#1E5EFF] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#f8f9fa] shadow-sm">
                  {step.id}
                </div>
                <svg className="w-8 h-8 text-[#1E5EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {step.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 max-w-[160px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="py-24 px-10 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-16">
          <span className="text-[#FF7900] text-sm font-bold tracking-widest uppercase mb-2 block">Our Edge</span>
          <h2 className="text-4xl font-extrabold text-gray-900">Why Choose FixMyRide?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Verified Mechanics', desc: 'Every mechanic is background-checked and certified before joining.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { title: 'Live Repair Tracking', desc: 'Watch your repair progress on a real-time map like Uber.', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
            { title: 'Transparent Pricing', desc: 'No hidden fees. Upfront quotes before you confirm.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { title: 'Ratings & Reviews', desc: 'Honest reviews from real customers, not bots.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
            { title: 'Secure Payments', desc: 'Multiple payment methods. Encrypted end-to-end.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { title: 'Fast Response', desc: 'Average mechanic dispatch time under 30 minutes.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-[#1E5EFF] rounded-2xl flex items-center justify-center text-white mb-6 shadow-md shadow-blue-200">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- LIVE TRACKING SECTION --- */}
      <section className="py-24 px-10 bg-[#1E5EFF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#FF7900] text-sm font-bold tracking-widest uppercase mb-2 block">Real-Time Updates</span>
            <h2 className="text-4xl font-extrabold text-white mb-4">Live Tracking Preview</h2>
            <p className="text-blue-100">Know exactly where your mechanic is and what stage the repair is at.</p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-[2rem] p-8 shadow-2xl">
            {/* Card Header */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Order #FMR-20847</p>
                <h3 className="text-xl font-extrabold text-gray-900">Engine Service</h3>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-4 space-y-8">
              {/* Vertical connecting line */}
              <div className="absolute top-2 bottom-6 left-[27px] w-[2px] bg-gray-100 z-0"></div>
              
              {/* Step 1: Done */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 border-white ring-4 ring-white">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="flex-1 flex justify-between items-center -mt-0.5">
                  <p className="text-sm font-bold text-[#10b981]">Booking Accepted</p>
                  <p className="text-xs font-semibold text-[#10b981]">Done ✓</p>
                </div>
              </div>

              {/* Step 2: Done */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 border-white ring-4 ring-white">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="flex-1 flex justify-between items-center -mt-0.5">
                  <p className="text-sm font-bold text-[#10b981]">Mechanic On the Way</p>
                  <p className="text-xs font-semibold text-[#10b981]">Done ✓</p>
                </div>
              </div>

              {/* Step 3: Active */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-6 h-6 bg-[#1E5EFF] rounded-full flex items-center justify-center shrink-0 shadow-md ring-4 ring-blue-50 border-2 border-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 -mt-0.5">
                  <p className="text-sm font-bold text-[#1E5EFF]">In Progress</p>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">Mechanic is working on your car</p>
                </div>
              </div>

              {/* Step 4: Pending */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white ring-4 ring-white shrink-0"></div>
                <div className="flex-1 -mt-0.5">
                  <p className="text-sm font-bold text-gray-400">Repair Complete</p>
                </div>
              </div>
            </div>

            {/* Mechanic Footer Box */}
            <div className="mt-10 bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-xl overflow-hidden">
                👨‍🔧
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900">Arjun Sharma</h4>
                <p className="text-xs text-gray-500 font-medium">Certified Engine Specialist • 4.9 ⭐</p>
              </div>
              <button className="w-10 h-10 bg-[#1E5EFF] hover:bg-blue-600 transition rounded-xl flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-24 px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF7900] text-sm font-bold tracking-widest uppercase mb-2 block">What Customers Say</span>
            <h2 className="text-4xl font-extrabold text-gray-900">Customer Testimonials</h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row gap-8 items-center md:items-start max-w-3xl mx-auto">
            <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[150px]">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Rahul Mehta" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Rahul Mehta</h4>
              <p className="text-sm text-gray-400 mb-3">Mumbai</p>
              <span className="px-3 py-1 bg-blue-50 text-[#1E5EFF] text-xs font-bold rounded-full border border-blue-100">Bike Service</span>
            </div>
            
            <div className="flex-1 text-center md:text-left mt-2">
              <div className="flex justify-center md:justify-start gap-1 mb-4 text-[#FF7900]">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed md:text-xl">
                "Booked a bike repair in 10 minutes. The mechanic showed up right on time and fixed everything in under an hour. Absolutely seamless."
              </p>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-1.5 bg-[#1E5EFF] rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10 px-10 border-t-4 border-[#1E5EFF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-slate-800 pb-16">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#1E5EFF] rounded-md flex items-center justify-center font-bold text-xl">🔧</div>
                <h2 className="text-2xl font-bold tracking-tight">FixMyRide</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Revolutionizing vehicle repair by bringing certified mechanics directly to your doorstep with real-time tracking.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/services" className="hover:text-[#FF7900] transition">Our Services</Link></li>


                <li>
                  <button 
                    onClick={() => scrollToSection('how-it-works')} 
                          className="hover:text-[#FF7900] transition cursor-pointer"
                             >
                         How It Works
                  </button>
                </li>


                <li><Link to="/register" className="hover:text-[#FF7900] transition">Join as Mechanic</Link></li>
              </ul>
            </div>

            {/* Developer Details */}
            <div>
              <h3 className="font-bold text-lg mb-6">Contact & Developer</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="text-[#1E5EFF]">✉️</span> support@fixmyride.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#1E5EFF]">📞</span> +91 98765 43210
                </li>
                <li className="flex flex-col mt-6 pt-6 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Developed By</span>
                  <span className="text-lg font-bold text-white">Daksh</span>
                  <span className="text-xs text-[#FF7900]">Full Stack MERN Developer</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} FixMyRide Platform. All rights reserved.</p>
            <p className="flex items-center gap-2">Built with <span className="text-red-500">❤️</span> for Placement Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;