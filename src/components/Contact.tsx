import React from 'react';

const CardsLayout = () => {
  return (
    <div className="container mx-auto p-5 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left section with 2 vertical cards */}
        <div className="flex flex-col gap-5">
          <div className="bg-gray-50 border p-5 rounded-lg shadow-sm">
            <h2 className="text-6xl font-bold text-secondary-color">Get In Touch <span className='text-main-color'>.</span></h2>
            <p className="text-secondary-color text-sm">Considering to be in contact with me regarding a project? Perhaps collaboration? Or just about anything?</p>
          </div>
          <div className="bg-gray-50 border p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-secondary-color">Card 2</h2>
            <p className="text-secondary-color">This is the second card.</p>
          </div>
        </div>

        {/* Right section with 1 card filling the remaining space */}
        <div className="bg-gray-50 border p-5 rounded-lg shadow-sm col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-secondary-color">Card 3</h2>
          <p className="text-secondary-color">This is the third card, filling all remaining space.</p>
        </div>
      </div>
    </div>
  );
};

export default CardsLayout;
