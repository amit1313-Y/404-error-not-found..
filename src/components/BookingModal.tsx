import React, { useState } from 'react';
import { Room, Booking, BookingAddOns } from '../types';
import { formatIndianDate } from '../data/initialData';
import { X, Calendar, User, CreditCard, CheckCircle2, ShieldCheck, Printer, ArrowRight, ArrowLeft, Coffee, Car, Waves, Clock, Smartphone, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  room: Room | null;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
  onClose: () => void;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onClose,
  onBookingConfirmed
}) => {
  if (!room) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formError, setFormError] = useState<string | null>(null);

  // Dates & Guests
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || '2026-10-12');
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || '2026-10-15');
  const [adults, setAdults] = useState<number>(initialGuests || 2);
  const [children, setChildren] = useState<number>(0);

  // Add-ons (INR)
  const [addOns, setAddOns] = useState<BookingAddOns>({
    breakfast: true,
    airportPickup: false,
    spaPackage: false,
    lateCheckout: false
  });

  // Guest Information
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Payment
  const [paymentOption, setPaymentOption] = useState<'upi' | 'card' | 'front-desk'>('upi');
  const [upiId, setUpiId] = useState<string>('guest@okaxis');
  const [cardNumber, setCardNumber] = useState<string>('6074 •••• •••• 9102');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Calculate nights
  const calculateNights = (): number => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();
  const roomRateTotal = room.pricePerNight * nights;

  // Add-ons computation in INR (₹)
  const breakfastTotal = addOns.breakfast ? 450 * (adults + children) * nights : 0;
  const airportTotal = addOns.airportPickup ? 850 : 0;
  const spaTotal = addOns.spaPackage ? 1800 : 0;
  const lateCheckoutTotal = addOns.lateCheckout ? 650 : 0;
  const addOnsTotal = breakfastTotal + airportTotal + spaTotal + lateCheckoutTotal;

  // Taxes: GST 12% (CGST 6% + SGST 6%) & Resort / Service Cess (₹200 / night)
  const resortFeeTotal = 200 * nights;
  const taxesTotal = Number(((roomRateTotal + addOnsTotal) * 0.12).toFixed(2));
  const totalAmount = Number((roomRateTotal + addOnsTotal + taxesTotal + resortFeeTotal).toFixed(2));

  const handleProceedToDetails = () => {
    setFormError(null);
    setStep(2);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      setFormError('Please enter your full name, email address, and Indian mobile number to proceed.');
      return;
    }
    setFormError(null);
    setStep(3);
  };

  const handleFinalizeBooking = () => {
    // Generate clean reference code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `GV-2029-${randomSuffix}`;

    let methodLabel = 'Pay at Hotel Front Desk';
    if (paymentOption === 'upi') {
      methodLabel = `UPI (${upiId || 'Instant UPI'})`;
    } else if (paymentOption === 'card') {
      methodLabel = 'RuPay / Credit Card (Secure)';
    }

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingReference: reference,
      guestName,
      guestEmail,
      guestPhone,
      roomId: room.id,
      roomNumber: room.number,
      roomName: room.name,
      roomType: room.type,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      adults,
      children,
      addOns,
      roomRateTotal,
      addOnsTotal,
      taxesTotal,
      resortFeeTotal,
      totalAmount,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: methodLabel,
      specialRequests: specialRequests.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Header */}
        <div className="bg-[#0B132B] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Reservation Desk · Suite {room.number}</span>
            </div>
            <h3 className="text-xl font-serif font-semibold mt-0.5">
              {room.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
            <span className={`flex items-center gap-1.5 font-medium ${step >= 1 ? 'text-amber-800 font-semibold' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#0B132B] text-amber-300' : 'bg-slate-200 text-slate-600'}`}>1</span>
              Dates & Options
            </span>
            <span className="text-slate-300" aria-hidden="true">→</span>
            <span className={`flex items-center gap-1.5 font-medium ${step >= 2 ? 'text-amber-800 font-semibold' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#0B132B] text-amber-300' : 'bg-slate-200 text-slate-600'}`}>2</span>
              Guest Profile
            </span>
            <span className="text-slate-300" aria-hidden="true">→</span>
            <span className={`flex items-center gap-1.5 font-medium ${step >= 3 ? 'text-amber-800 font-semibold' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#0B132B] text-amber-300' : 'bg-slate-200 text-slate-600'}`}>3</span>
              Payment & Lock
            </span>
            <span className="text-slate-300" aria-hidden="true">→</span>
            <span className={`flex items-center gap-1.5 font-medium ${step === 4 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
              Voucher Confirmation
            </span>
          </div>
          <span className="text-slate-400 text-[11px] hidden md:inline">Currency: INR (₹)</span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* STEP 1: Dates, Guests & Curated Add-ons */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Check-In Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Check-Out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Children (under 12)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none cursor-pointer"
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Curated Indian Hospitality Add-Ons
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addOns.breakfast}
                      onChange={(e) => setAddOns({ ...addOns, breakfast: e.target.checked })}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                        <Coffee className="w-3.5 h-3.5 text-amber-700" />
                        <span>Artisan Breakfast Buffet</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">₹450 per guest / night · Fresh organic spread & barista</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addOns.airportPickup}
                      onChange={(e) => setAddOns({ ...addOns, airportPickup: e.target.checked })}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                        <Car className="w-3.5 h-3.5 text-amber-700" />
                        <span>Private Airport Chauffeur Pickup</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">₹850 fixed one-way · Luxury sedan with luggage concierge</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addOns.spaPackage}
                      onChange={(e) => setAddOns({ ...addOns, spaPackage: e.target.checked })}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                        <Waves className="w-3.5 h-3.5 text-amber-700" />
                        <span>Ayurvedic Wellness Spa Session</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">₹1,800 · 60-min signature relaxation therapy</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addOns.lateCheckout}
                      onChange={(e) => setAddOns({ ...addOns, lateCheckout: e.target.checked })}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Guaranteed 2:00 PM Late Check-Out</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">₹650 flat · Enjoy extended relaxation without rush</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Rate Breakdown Summary Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Suite Tariff ({nights} night{nights > 1 ? 's' : ''} × ₹{room.pricePerNight.toLocaleString('en-IN')})</span>
                  <span className="font-mono">₹{roomRateTotal.toLocaleString('en-IN')}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Selected Add-On Services</span>
                    <span className="font-mono">+₹{addOnsTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>GST (12% CGST + SGST on tariff & services)</span>
                  <span className="font-mono">+₹{taxesTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Resort Cess & Service Fee (₹200/night)</span>
                  <span className="font-mono">+₹{resortFeeTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Payable (INR)</span>
                  <span className="font-mono text-base text-amber-800">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Details Form */}
          {step === 2 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (for Digital Voucher) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. amit@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone Number (Indian SMS updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Quiet floor, extra feather pillows, anniversary setup"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your contact data is strictly used for check-in confirmation and e-key delivery.</span>
              </div>
            </form>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Select Preferred Payment Method (INR)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('upi')}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentOption === 'upi'
                        ? 'border-amber-600 bg-amber-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-700 mb-2" />
                    <p className="font-semibold text-xs text-slate-900">Instant UPI (GPay/PhonePe)</p>
                    <p className="text-[11px] text-slate-500 mt-1">Zero surcharge · Instant QR / VPA</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('card')}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentOption === 'card'
                        ? 'border-amber-600 bg-amber-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-700 mb-2" />
                    <p className="font-semibold text-xs text-slate-900">RuPay / Debit / Credit Card</p>
                    <p className="text-[11px] text-slate-500 mt-1">Encrypted 256-bit checkout</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('front-desk')}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentOption === 'front-desk'
                        ? 'border-amber-600 bg-amber-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <User className="w-5 h-5 text-amber-700 mb-2" />
                    <p className="font-semibold text-xs text-slate-900">Pay at Front Desk</p>
                    <p className="text-[11px] text-slate-500 mt-1">Settle at check-in via cash/card</p>
                  </button>
                </div>
              </div>

              {paymentOption === 'upi' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">UPI Virtual Payment Address (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">Collect request will be routed to your UPI app upon authorization.</p>
                </div>
              )}

              {paymentOption === 'card' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number (RuPay / Visa / Master)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CVV / CVN</label>
                      <input
                        type="password"
                        defaultValue="823"
                        maxLength={3}
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Final Payable summary */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-900 block font-medium">Grand Total Payable</span>
                  <span className="text-xs text-stone-500">Includes all taxes, GST, and chosen services</span>
                </div>
                <span className="font-mono font-bold text-xl text-amber-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed Voucher Slip */}
          {step === 4 && confirmedBooking && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6 text-slate-800">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-slate-500">
                  Booking Reference: <strong className="font-mono text-slate-900 text-sm tracking-wider">{confirmedBooking.bookingReference}</strong>
                </p>
              </div>

              {/* Voucher Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-4 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Guest Name</span>
                    <span className="font-semibold text-slate-900 text-sm">{confirmedBooking.guestName}</span>
                    <span className="text-slate-500 block text-[11px]">{confirmedBooking.guestEmail} · {confirmedBooking.guestPhone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase">Suite Reserved</span>
                    <span className="font-semibold text-slate-900 text-sm">{confirmedBooking.roomName}</span>
                    <span className="font-mono text-amber-800 block text-[11px]">Suite #{confirmedBooking.roomNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Check-In</span>
                    <span className="font-medium text-slate-800">{formatIndianDate(confirmedBooking.checkInDate)}</span>
                    <span className="text-slate-400 block text-[10px]">From 3:00 PM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Check-Out</span>
                    <span className="font-medium text-slate-800">{formatIndianDate(confirmedBooking.checkOutDate)}</span>
                    <span className="text-slate-400 block text-[10px]">By 11:00 AM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Occupancy</span>
                    <span className="font-medium text-slate-800">{confirmedBooking.adults} Adults {confirmedBooking.children > 0 ? `, ${confirmedBooking.children} Ch` : ''}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Payment</span>
                    <span className="font-medium text-emerald-700 capitalize">{confirmedBooking.paymentStatus}</span>
                    <span className="text-slate-400 block text-[10px]">{confirmedBooking.paymentMethod}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-slate-700">Total Folio Amount</span>
                  <span className="font-mono font-bold text-lg text-slate-900">
                    ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  Print Official Voucher
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Step
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step === 1 && (
              <button
                type="button"
                onClick={handleProceedToDetails}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                Continue to Guest Profile
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                Proceed to Payment
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleFinalizeBooking}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                Confirm & Pay ₹{totalAmount.toLocaleString('en-IN')}
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0B132B] hover:bg-[#131E3D] rounded-lg transition-colors cursor-pointer"
              >
                Done / Close Desk
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
