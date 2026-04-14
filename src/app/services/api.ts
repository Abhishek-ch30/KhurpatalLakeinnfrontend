const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
    return res.json();
  },

  register: async (userData: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
    return res.json();
  },

  checkUser: async (identity: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/check-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Search failed');
    return res.json();
  },

  verifyOtp: async (otpData: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'OTP verification failed');
    return res.json();
  },

  // Availability
  checkAvailability: async (checkData: any) => {
    const res = await fetch(`${API_BASE_URL}/availability/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkData),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to check availability');
    return res.json();
  },

  // Rooms
  getRooms: async (params?: any) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    const res = await fetch(`${API_BASE_URL}/rooms${query}`);
    return res.json();
  },

  // Bookings
  createBooking: async (bookingData: any) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Booking failed');
    return res.json();
  },

  // Admin Metrics
  getMetrics: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/metrics`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch metrics');
    return res.json();
  },

  // Admin Reservations
  getReservations: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/reservations`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch reservations');
    return res.json();
  },

  // Inventory
  getInventory: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/inventory`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Housekeeping
  getHousekeeping: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/housekeeping`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Messages
  getMessages: async () => {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      headers: getHeaders(),
    });
    return res.json();
  }
};
