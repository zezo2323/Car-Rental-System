import { useState, useEffect } from 'react';
import { Calendar, Clock, Car, MapPin, CreditCard, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RentalPageProps {
  carId: number;
  onConfirmBooking: (bookingData: any) => void;
  onCancel: () => void;
}

const mockCarData = {
  1: {
    name: 'Tesla Model S',
    type: 'Luxury Sedan',
    price: 120,
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  2: {
    name: 'Range Rover Sport',
    type: 'Luxury SUV',
    price: 150,
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  3: {
    name: 'Porsche 911',
    type: 'Sports Car',
    price: 200,
    image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxODM1OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
};

export function RentalPage({ carId, onConfirmBooking, onCancel }: RentalPageProps) {
  const car = mockCarData[carId as keyof typeof mockCarData] || mockCarData[1];
  
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [insurance, setInsurance] = useState(false);
  const [days, setDays] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
      setSubtotal(diffDays * car.price);
    }
  }, [pickupDate, returnDate, car.price]);

  const insuranceFee = insurance ? 15 * days : 0;
  const tax = (subtotal + insuranceFee) * 0.1;
  const total = subtotal + insuranceFee + tax;

  const handleConfirm = () => {
    const bookingData = {
      carId,
      carName: car.name,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      location,
      insurance,
      days,
      subtotal,
      insuranceFee,
      tax,
      total,
    };
    onConfirmBooking(bookingData);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1>Complete Your Booking</h1>
        <p className="text-muted-foreground mt-1">Fill in the details to rent your car</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Car Details */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3>{car.name}</h3>
                  <p className="text-muted-foreground">{car.type}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-secondary">${car.price}/day</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Rental Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnTime">Return Time</Label>
                  <Input
                    id="returnTime"
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  />
                </div>
              </div>

              {days > 0 && (
                <div className="p-3 rounded-lg bg-accent">
                  <p className="text-sm">
                    <span className="text-accent-foreground">Rental Duration: </span>
                    <span className="font-semibold">{days} {days === 1 ? 'day' : 'days'}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter pickup location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Full Insurance Coverage</p>
                    <p className="text-sm text-muted-foreground">$15/day - Complete protection</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your rental details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Car rental ({days} days)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {insurance && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Insurance</span>
                    <span>${insuranceFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-semibold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleConfirm}
                  className="w-full gap-2"
                  disabled={!pickupDate || !returnDate || !location || days === 0}
                >
                  <CreditCard className="w-4 h-4" />
                  Confirm Booking
                </Button>
                <Button onClick={onCancel} variant="outline" className="w-full">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
