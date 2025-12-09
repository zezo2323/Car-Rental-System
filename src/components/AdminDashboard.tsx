import { useState } from 'react';
import { Car, DollarSign, Key, TrendingUp, Plus, Eye, Edit, Trash2, FileText, AlertCircle, Calendar, Zap, Fuel, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  onNavigate: (page: string, carId?: number) => void;
}

interface CarData {
  id: number;
  name: string;
  type: string;
  price: number;
  status: 'Available' | 'Rented' | 'Maintenance';
  image: string;
  year: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  seats: number;
}

const initialMockCars: CarData[] = [
  {
    id: 1,
    name: 'Tesla Model S',
    type: 'Luxury Sedan',
    price: 120,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
  },
  {
    id: 2,
    name: 'Range Rover Sport',
    type: 'Luxury SUV',
    price: 150,
    status: 'Rented',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: 2023,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
  },
  {
    id: 3,
    name: 'Porsche 911',
    type: 'Sports Car',
    price: 200,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxODM1OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 2,
  },
  {
    id: 4,
    name: 'BMW X5',
    type: 'SUV',
    price: 130,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: 2023,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
  },
  {
    id: 5,
    name: 'Mercedes S-Class',
    type: 'Luxury Sedan',
    price: 140,
    status: 'Rented',
    image: 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
  },
  {
    id: 6,
    name: 'Audi Q7',
    type: 'Premium SUV',
    price: 135,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MTczNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: 2023,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
  },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [cars, setCars] = useState<CarData[]>(initialMockCars);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<number | null>(null);

  const handleDeleteClick = (carId: number, carName: string, status: string) => {
    if (status === 'Rented') {
      toast.error('Cannot delete rented car', {
        description: `${carName} is currently rented and cannot be deleted.`,
      });
      return;
    }
    setCarToDelete(carId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (carToDelete !== null) {
      const deletedCar = cars.find((c) => c.id === carToDelete);
      setCars(cars.filter((car) => car.id !== carToDelete));
      toast.success('Car deleted successfully', {
        description: `${deletedCar?.name} has been removed from your fleet.`,
      });
    }
    setDeleteDialogOpen(false);
    setCarToDelete(null);
  };

  const handleEditClick = (carId: number) => {
    onNavigate('edit-car', carId);
  };

  const totalCars = cars.length;
  const availableCars = cars.filter((c) => c.status === 'Available').length;
  const rentedCars = cars.filter((c) => c.status === 'Rented').length;

  const stats = [
    {
      title: 'Total Cars',
      value: totalCars.toString(),
      change: 'In fleet',
      icon: Car,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      title: 'Cars Rented',
      value: rentedCars.toString(),
      change: 'Currently active',
      icon: Key,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      title: 'Revenue Today',
      value: '$2,450',
      change: '+15% from yesterday',
      icon: DollarSign,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
    {
      title: 'Active Rentals',
      value: rentedCars.toString(),
      change: 'Ongoing contracts',
      icon: TrendingUp,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your rental business
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('add-car')} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Car
          </Button>
          <Button onClick={() => onNavigate('invoices')} variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Invoices
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('add-car')}
            >
              <Plus className="w-6 h-6 text-primary" />
              <span>Add New Car</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('rented-cars')}
            >
              <Key className="w-6 h-6 text-primary" />
              <span>View Rentals</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('invoices')}
            >
              <FileText className="w-6 h-6 text-primary" />
              <span>Generate Invoice</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cars Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Car Fleet Management</CardTitle>
              <CardDescription>Add, edit, or remove vehicles from your fleet</CardDescription>
            </div>
            <Button onClick={() => onNavigate('car-management')} variant="outline" size="sm">
              View All Cars
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {cars.length === 0 ? (
            <div className="text-center py-12">
              <Car className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">No cars in your fleet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by adding your first vehicle
              </p>
              <Button onClick={() => onNavigate('add-car')} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Car
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="mb-1">{car.name}</h4>
                        <p className="text-sm text-muted-foreground">{car.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={car.status === 'Available' ? 'default' : 'secondary'}
                          className={
                            car.status === 'Available'
                              ? 'bg-green-500 hover:bg-green-600'
                              : car.status === 'Rented'
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'bg-yellow-500 hover:bg-yellow-600'
                          }
                        >
                          {car.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="w-4 h-4 text-primary" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Fuel className="w-4 h-4 text-primary" />
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{car.seats} Seats</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                      <span className="text-primary">${car.price}/day</span>
                      <div className="flex gap-2 ml-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(car.id)}
                          className="gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive gap-2"
                          onClick={() => handleDeleteClick(car.id, car.name, car.status)}
                          disabled={car.status === 'Rented'}
                          title={car.status === 'Rented' ? 'Cannot delete rented car' : 'Delete car'}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this car from your fleet? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Car
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
