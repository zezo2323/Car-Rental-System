import { Search, Filter, Car as CarIcon, Users, Fuel, Settings } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface CarListUserProps {
  onRentCar: (carId: number) => void;
  isLoggedIn: boolean;
  onShowLoginPopup: () => void;
}

const mockCars = [
  {
    id: 1,
    name: 'Tesla Model S',
    type: 'Luxury Sedan',
    price: 120,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Electric',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Range Rover Sport',
    type: 'Luxury SUV',
    price: 150,
    seats: 7,
    transmission: 'Auto',
    fuel: 'Diesel',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 98,
  },
  {
    id: 3,
    name: 'Porsche 911',
    type: 'Sports Car',
    price: 200,
    seats: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxODM1OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviews: 156,
  },
  {
    id: 4,
    name: 'BMW X5',
    type: 'SUV',
    price: 130,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 87,
  },
  {
    id: 5,
    name: 'Mercedes S-Class',
    type: 'Luxury Sedan',
    price: 140,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 142,
  },
  {
    id: 6,
    name: 'Audi A8',
    type: 'Luxury Sedan',
    price: 135,
    seats: 5,
    transmission: 'Auto',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviews: 76,
  },
];

export function CarListUser({ onRentCar, isLoggedIn, onShowLoginPopup }: CarListUserProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleRentClick = (carId: number) => {
    if (!isLoggedIn) {
      onShowLoginPopup();
    } else {
      onRentCar(carId);
    }
  };

  const filteredCars = mockCars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Available Cars</h1>
        <p className="text-muted-foreground mt-1">
          Choose from our premium fleet of vehicles
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by car name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-secondary">{car.type}</Badge>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1">{car.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(car.rating)
                              ? 'text-yellow-500'
                              : 'text-muted-foreground'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {car.rating} ({car.reviews})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{car.fuel}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Price per day</p>
                    <p className="text-2xl font-semibold text-primary">${car.price}</p>
                  </div>
                  <Button onClick={() => handleRentClick(car.id)} className="gap-2">
                    <CarIcon className="w-4 h-4" />
                    Rent Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
