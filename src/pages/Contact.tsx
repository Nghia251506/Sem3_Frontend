// import React from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';
import { regionalOffices } from '../data/mockData';

const Contact = () => {
    const regionColors = {
    'North Region': 'bg-blue-100 border-blue-500 text-blue-800',
    'West Region': 'bg-green-100 border-green-500 text-green-800',
    'East Region': 'bg-purple-100 border-purple-500 text-purple-800',
    'South Region': 'bg-orange-100 border-orange-500 text-orange-800'
  };
  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            Let us keep you safe
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Information</h2>
              <p className="text-gray-600 text-lg mb-6">
                {/* {companyHistory.overview} */}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regionalOffices.map((office) => (
              <div 
                key={office.id} 
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`p-4 border-l-4 ${regionColors[office.region as keyof typeof regionColors]}`}>
                  <h3 className="text-xl font-bold mb-2">{office.region}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{office.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-700">{office.contact}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-700">{office.email}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">Contact Person</p>
                        <p className="text-gray-900 font-semibold">{office.contactPerson}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;