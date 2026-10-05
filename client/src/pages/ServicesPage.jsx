import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    // Navigate to the booking page AND pass the selected service name!
    navigate('/book', { state: { selectedService: serviceName } });
  };

  const services = [
    { 
      title: 'Bike Repair', 
      iconBg: 'bg-blue-50', 
      iconColor: 'text-blue-500',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> // Note: Using a generic vehicle/motorcycle representation 
    },
    { 
      title: 'Car Repair', 
      iconBg: 'bg-orange-50', 
      iconColor: 'text-[#FF7900]',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h-4M13 16h4.586a1 1 0 00.707-.293l2.414-2.414a1 1 0 00.293-.707V10a1 1 0 00-1-1h-4V9a1 1 0 00-1-1z" />
    },
    { 
      title: 'Engine Repair', 
      iconBg: 'bg-red-50', 
      iconColor: 'text-red-400',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    },
    { 
      title: 'Battery', 
      iconBg: 'bg-yellow-50', 
      iconColor: 'text-yellow-600',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zm6 5h4M2 12h.01M22 12h.01" />
    },
    { 
      title: 'Tyre', 
      iconBg: 'bg-gray-100', 
      iconColor: 'text-gray-700',
      icon: <><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="2" fill="currentColor" /></>
    },
    { 
      title: 'Oil Change', 
      iconBg: 'bg-teal-50', 
      iconColor: 'text-teal-500',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    },
    { 
      title: 'Brake Service', 
      iconBg: 'bg-purple-50', 
      iconColor: 'text-purple-500',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    },
    { 
      title: 'Emergency Breakdown', 
      iconBg: 'bg-red-50', 
      iconColor: 'text-red-600',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-20 px-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[#FF7900] text-sm font-bold tracking-widest uppercase mb-3 block">
            What We Fix
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Service Categories
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From routine maintenance to emergency repairs — we have a specialist for every problem.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((category, index) => (
            <div 
              key={index} 
              onClick={() => handleServiceClick(category.title)}
              className="bg-white p-8 rounded-[2rem] shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${category.iconBg} ${category.iconColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {category.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;