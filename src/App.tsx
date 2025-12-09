import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CarListUser } from './components/CarListUser';
import { RentalPage } from './components/RentalPage';
import { InvoicePage } from './components/InvoicePage';
import { CommentsPage } from './components/CommentsPage';
import { RentedCarsAdmin } from './components/RentedCarsAdmin';
import { CarManagement } from './components/CarManagement';
import { AddEditCarForm } from './components/AddEditCarForm';
import { InvoicesPage } from './components/InvoicesPage';
import { SettingsPage } from './components/SettingsPage';
import { Navigation } from './components/Navigation';
import { LoginPopup } from './components/LoginPopup';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type Page = 'login' | 'signup' | 'dashboard' | 'cars' | 'rental' | 'invoice' | 'comments' | 'rented-cars' | 'car-management' | 'add-car' | 'edit-car' | 'invoices' | 'settings';

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [editingCarId, setEditingCarId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - admin@example.com is admin, others are regular users
    const isAdmin = email === 'admin@example.com';
    const name = isAdmin ? 'Admin User' : email.split('@')[0];
    
    setUser({ name, email, isAdmin });
    setCurrentPage(isAdmin ? 'dashboard' : 'cars');
    setShowLoginPopup(false);
    
    toast.success(`Welcome back, ${name}!`, {
      description: 'You have successfully signed in.',
    });
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    setUser({ name, email, isAdmin: false });
    setCurrentPage('cars');
    
    toast.success('Account created successfully!', {
      description: 'Welcome to DriveNow Rentals.',
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    toast.info('Logged out', {
      description: 'You have been successfully logged out.',
    });
  };

  const handleNavigate = (page: string, carId?: number) => {
    setCurrentPage(page as Page);
    if (page === 'edit-car' && carId) {
      setEditingCarId(carId);
    }
  };

  const handleRentCar = (carId: number) => {
    setSelectedCarId(carId);
    setCurrentPage('rental');
  };

  const handleConfirmBooking = (data: any) => {
    setBookingData(data);
    setCurrentPage('invoice');
    
    toast.success('Booking confirmed!', {
      description: 'Your rental has been successfully booked.',
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Not logged in views
  if (!user) {
    if (currentPage === 'signup') {
      return (
        <>
          <SignUpPage
            onSignUp={handleSignUp}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
          <Toaster position="top-right" richColors />
        </>
      );
    }
    
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignUp={() => setCurrentPage('signup')}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Logged in views
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          isAdmin={user.isAdmin}
          userName={user.name}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          {/* Admin Views */}
          {user.isAdmin && currentPage === 'dashboard' && (
            <AdminDashboard onNavigate={handleNavigate} />
          )}
          
          {user.isAdmin && currentPage === 'car-management' && (
            <CarManagement onNavigate={handleNavigate} />
          )}
          
          {user.isAdmin && currentPage === 'add-car' && (
            <AddEditCarForm onBack={() => setCurrentPage('car-management')} />
          )}
          
          {user.isAdmin && currentPage === 'edit-car' && (
            <AddEditCarForm
              carId={editingCarId}
              onBack={() => setCurrentPage('car-management')}
            />
          )}
          
          {user.isAdmin && currentPage === 'rented-cars' && <RentedCarsAdmin />}
          
          {user.isAdmin && currentPage === 'invoices' && <InvoicesPage />}
          
          {user.isAdmin && currentPage === 'settings' && <SettingsPage />}

          {/* User Views */}
          {!user.isAdmin && currentPage === 'cars' && (
            <CarListUser
              onRentCar={handleRentCar}
              isLoggedIn={!!user}
              onShowLoginPopup={() => setShowLoginPopup(true)}
            />
          )}

          {currentPage === 'rental' && selectedCarId && (
            <RentalPage
              carId={selectedCarId}
              onConfirmBooking={handleConfirmBooking}
              onCancel={() => setCurrentPage(user.isAdmin ? 'dashboard' : 'cars')}
            />
          )}

          {currentPage === 'invoice' && bookingData && (
            <InvoicePage
              bookingData={bookingData}
              onBack={() => setCurrentPage(user.isAdmin ? 'dashboard' : 'cars')}
            />
          )}

          {currentPage === 'comments' && <CommentsPage isAdmin={user.isAdmin} />}
        </main>

        <Footer />
      </div>

      {/* Login Popup for non-logged in users trying to rent */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
        onSwitchToSignUp={() => {
          setShowLoginPopup(false);
          setCurrentPage('signup');
        }}
      />

      <Toaster position="top-right" richColors />
    </>
  );
}
