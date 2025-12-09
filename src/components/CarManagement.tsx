import { useState } from 'react';
import { Edit, Trash2, Plus, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface CarManagementProps {
  onNavigate: (page: string, carId?: number) => void;
}

interface Car {
  id: number;
  name: string;
  model: string;
  brand: string;
  year: number;
  plateNumber: string;
  price: number;
  status: 'Available' | 'Rented' | 'Maintenance';
  image: string;
  description: string;
}

const mockCars: Car[] = [
  {
    id: 1,
    name: 'Tesla Model S',
    model: 'Model S',
    brand: 'Tesla',
    year: 2024,
    plateNumber: 'ABC-1234',
    price: 120,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Luxury electric sedan with autopilot',
  },
  {
    id: 2,
    name: 'Range Rover Sport',
    model: 'Sport',
    brand: 'Range Rover',
    year: 2023,
    plateNumber: 'XYZ-5678',
    price: 150,
    status: 'Rented',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium luxury SUV',
  },
  {
    id: 3,
    name: 'Porsche 911',
    model: '911',
    brand: 'Porsche',
    year: 2024,
    plateNumber: 'POR-9911',
    price: 200,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxODM1OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Iconic sports car experience',
  },
  {
    id: 4,
    name: 'BMW X5',
    model: 'X5',
    brand: 'BMW',
    year: 2023,
    plateNumber: 'BMW-5555',
    price: 130,
    status: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Spacious luxury SUV',
  },
  {
    id: 5,
    name: 'Mercedes S-Class',
    model: 'S-Class',
    brand: 'Mercedes',
    year: 2024,
    plateNumber: 'MER-7890',
    price: 140,
    status: 'Rented',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ultimate luxury sedan',
  },
  {
    id: 6,
    name: 'Audi Q7',
    model: 'Q7',
    brand: 'Audi',
    year: 2023,
    plateNumber: 'AUD-4321',
    price: 135,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium family SUV',
  },
];

export function CarManagement({ onNavigate }: CarManagementProps) {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleAvailability = (carId: number) => {
    setCars(
      cars.map((car) =>
        car.id === carId
          ? {
              ...car,
              status:
                car.status === 'Available'
                  ? 'Maintenance'
                  : car.status === 'Maintenance'
                  ? 'Available'
                  : car.status,
            }
          : car
      )
    );
    toast.success('Car status updated');
  };

  const handleDelete = (carId: number) => {
    setCars(cars.filter((car) => car.id !== carId));
    toast.success('Car deleted successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>;
      case 'Rented':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Rented</Badge>;
      case 'Maintenance':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const availableCount = cars.filter((c) => c.status === 'Available').length;
  const rentedCount = cars.filter((c) => c.status === 'Rented').length;
  const maintenanceCount = cars.filter((c) => c.status === 'Maintenance').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Car Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your vehicle fleet and availability
          </p>
        </div>
        <Button onClick={() => onNavigate('add-car')} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Car
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{cars.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">{availableCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-orange-600">{rentedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">In Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-yellow-600">{maintenanceCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, brand, or plate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Rented">Rented</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cars Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Fleet</CardTitle>
          <CardDescription>
            {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-lg">{car.name}</h3>
                        {getStatusBadge(car.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {car.brand} • {car.year} • {car.plateNumber}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <span className="text-2xl text-primary">${car.price}</span>
                        <span className="text-sm text-muted-foreground">/day</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => onNavigate('edit-car', car.id)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAvailability(car.id)}
                        disabled={car.status === 'Rented'}
                      >
                        {car.status === 'Available' ? (
                          <ToggleRight className="w-4 h-4" />
                        ) : (
                          <ToggleLeft className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(car.id)}
                        className="text-destructive"
                        disabled={car.status === 'Rented'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4>{car.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {car.brand} {car.model} • {car.year} • {car.plateNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">{car.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl text-primary">${car.price}</div>
                      <div className="text-xs text-muted-foreground">per day</div>
                    </div>
                    {getStatusBadge(car.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onNavigate('edit-car', car.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleAvailability(car.id)}
                      disabled={car.status === 'Rented'}
                    >
                      {car.status === 'Available' ? (
                        <ToggleRight className="w-4 h-4" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(car.id)}
                      className="text-destructive"
                      disabled={car.status === 'Rented'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
