import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export type BookingStep = 'dates' | 'rooms' | 'auth' | 'details' | 'confirm' | 'success';

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  selectedRoom: any | null;
  guestDetails: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests: string;
    arrivalTime: string;
    idProofType: string;
  };
  totalNights: number;
}

export function useBookingFlow() {
  const { user, isLoggedIn, login } = useAuth();
  const [step, setStep] = useState<BookingStep>('dates');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  
  const [state, setState] = useState<BookingState>({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: 'All',
    selectedRoom: null,
    guestDetails: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
      arrivalTime: '',
      idProofType: '',
    },
    totalNights: 0
  });

  const openFlow = useCallback((initialData?: Partial<BookingState>, initialStep: BookingStep = 'dates') => {
    const checkIn = initialData?.checkIn || state.checkIn || new Date().toISOString().split('T')[0];
    const checkOut = initialData?.checkOut || state.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    // Calculate nights for initialization
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

    setState(prev => ({
      ...prev,
      ...initialData,
      checkIn,
      checkOut,
      totalNights: nights,
      guestDetails: {
        ...prev.guestDetails,
        fullName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
      }
    }));
    setStep(initialStep);
    setIsOpen(true);
  }, [user, state.checkIn, state.checkOut]);

  const closeFlow = useCallback(() => {
    setIsOpen(false);
    // Optional: Reset state or keep for next time
  }, []);

  const nextStep = useCallback(() => {
    const steps: BookingStep[] = ['dates', 'rooms', 'auth', 'details', 'confirm', 'success'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    const steps: BookingStep[] = ['dates', 'rooms', 'auth', 'details', 'confirm', 'success'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step]);

  const checkAvailability = async (data: Partial<BookingState>) => {
    setIsLoading(true);
    setAvailableRooms([]);
    setSuggestions([]);
    try {
      const { rooms, suggestions: newSuggestions } = await api.checkAvailability({
        checkIn: data.checkIn || state.checkIn,
        checkOut: data.checkOut || state.checkOut,
        guestCount: data.guests || state.guests,
        type: data.roomType || state.roomType
      });
      setAvailableRooms(rooms);
      setSuggestions(newSuggestions || []);
      
      const checkIn = data.checkIn || state.checkIn;
      const checkOut = data.checkOut || state.checkOut;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = end.getTime() - start.getTime();
      const nights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

      setState(prev => ({ 
        ...prev, 
        ...data,
        checkIn,
        checkOut,
        totalNights: nights 
      }));
      return rooms;
    } catch (error: any) {
      toast.error(error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoomSelect = (room: any) => {
    setState(prev => ({ ...prev, selectedRoom: room }));
    if (!isLoggedIn) {
      setStep('auth');
    } else {
      setStep('details');
    }
  };

  const handleAuthSuccess = (userData: any) => {
    login(userData);
    setState(prev => ({
      ...prev,
      guestDetails: {
        ...prev.guestDetails,
        fullName: userData.name,
        email: userData.email,
        phone: userData.phone,
      }
    }));
    setStep('details');
  };

  const createBooking = async () => {
    setIsLoading(true);
    try {
      const bookingData = {
        roomId: state.selectedRoom.id,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests,
        totalPrice: state.selectedRoom.price * getDays(),
        guestName: state.guestDetails.fullName,
        guestEmail: state.guestDetails.email,
        guestPhone: state.guestDetails.phone,
        specialRequests: state.guestDetails.specialRequests,
        arrivalTime: state.guestDetails.arrivalTime,
        idProofType: state.guestDetails.idProofType,
      };

      await api.createBooking(bookingData);
      setStep('success');
      toast.success('Your Himalayan escape is secured!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getDays = () => {
    if (!state.checkIn || !state.checkOut) return 0;
    const start = new Date(state.checkIn);
    const end = new Date(state.checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const updateDates = useCallback((checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    
    setState(prev => ({
      ...prev,
      checkIn,
      checkOut,
      totalNights: nights
    }));
  }, []);

  return {
    isOpen,
    step,
    state,
    isLoading,
    availableRooms,
    suggestions,
    setStep,
    openFlow,
    closeFlow,
    nextStep,
    prevStep,
    setState,
    checkAvailability,
    handleRoomSelect,
    handleAuthSuccess,
    createBooking,
    getDays,
    updateDates,
  };
}
