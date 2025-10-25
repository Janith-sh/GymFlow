import React from 'react';
import { Dumbbell } from 'lucide-react';

const QRScanAttendance = () => {
  return (
    // Outer container: sets the background and centers the main card
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
      
      {/* Main Card: Light background with rounded corners and subtle shadow */}
      <div className="bg-[var(--color-main)] p-12 sm:p-20 rounded-xl border border-[var(--color-border)] shadow-lg w-full max-w-lg text-center">
        
        {/* Icon and Separator Lines */}
        <div className="flex flex-col items-center mb-10">
          
          {/* Icon Container (The dark square) */}
          <div className="bg-[var(--color-primary)] p-4 rounded-lg mb-4">
            {/* Dumbbell Icon using lucide-react */}
            <Dumbbell className="h-8 w-8 text-[var(--color-font-main)]" />
          </div>
          
          {/* Top Divider (Thick Black Line) */}
          <div className="w-16 h-1 bg-[var(--color-primary)] mb-1"></div>
          
          {/* Bottom Divider (Thin Gray Line) */}
          <div className="w-16 h-px bg-[var(--color-secondary)]"></div>
          
        </div>

        {/* Text Content */}
        <div>
          <p className="text-xl text-[var(--color-secondary)] font-medium tracking-wider mb-2 uppercase">
            SCAN YOUR QR FOR
          </p>
          <h2 className="text-6xl font-light text-[var(--color-primary)] leading-tight">
            Attendance
          </h2>
        </div>
        
      </div>
    </div>
  );
};

export default QRScanAttendance;