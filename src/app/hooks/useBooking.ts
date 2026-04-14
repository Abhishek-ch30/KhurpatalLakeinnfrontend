import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useBooking = () => {
  const { isLoggedIn } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const startBooking = useCallback((room: any) => {
    setSelectedRoom(room);
    if (isLoggedIn) {
      setIsBookingModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleAuthSuccess = useCallback(() => {
    setIsAuthModalOpen(false);
    setIsBookingModalOpen(true);
  }, []);

  return {
    isBookingModalOpen,
    setIsBookingModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    selectedRoom,
    startBooking,
    handleAuthSuccess
  };
};
