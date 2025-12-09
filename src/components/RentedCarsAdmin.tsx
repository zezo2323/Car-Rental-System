import { Calendar, User, DollarSign, Clock, Eye, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface Rental {
  id: number;
  carName: string;
  carType: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userInitials: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: 'Active' | 'Ending Soon' | 'Overdue';
  location: string;
}

const mockRentals: Rental[] = [
  {
    id: 1,
    carName: 'Tesla Model S',
    carType: 'Luxury Sedan',
    userName: 'John Doe',
    userEmail: 'john.doe@email.com',
    userPhone: '+1 (555) 123-4567',
    userInitials: 'JD',
    startDate: '2025-10-20',
    endDate: '2025-11-05',
    amount: 1920,
    status: 'Active',
    location: 'Los Angeles Airport',
  },
  {
    id: 2,
    carName: 'Range Rover Sport',
    carType: 'Luxury SUV',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@email.com',
    userPhone: '+1 (555) 234-5678',
    userInitials: 'SJ',
    startDate: '2025-10-25',
    endDate: '2025-11-02',
    amount: 1200,
    status: 'Ending Soon',
    location: 'Downtown Branch',
  },
  {
    id: 3,
    carName: 'Porsche 911',
    carType: 'Sports Car',
    userName: 'Michael Chen',
    userEmail: 'michael.c@email.com',
    userPhone: '+1 (555) 345-6789',
    userInitials: 'MC',
    startDate: '2025-10-15',
    endDate: '2025-10-30',
    amount: 3000,
    status: 'Overdue',
    location: 'Beverly Hills',
  },
  {
    id: 4,
    carName: 'BMW X5',
    carType: 'SUV',
    userName: 'Emma Williams',
    userEmail: 'emma.w@email.com',
    userPhone: '+1 (555) 456-7890',
    userInitials: 'EW',
    startDate: '2025-10-22',
    endDate: '2025-11-08',
    amount: 2210,
    status: 'Active',
    location: 'Santa Monica',
  },
  {
    id: 5,
    carName: 'Mercedes S-Class',
    carType: 'Luxury Sedan',
    userName: 'David Brown',
    userEmail: 'david.b@email.com',
    userPhone: '+1 (555) 567-8901',
    userInitials: 'DB',
    startDate: '2025-10-28',
    endDate: '2025-11-10',
    amount: 1820,
    status: 'Active',
    location: 'Los Angeles Airport',
  },
];

export function RentedCarsAdmin() {
  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'Ending Soon':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Ending Soon</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-500 hover:bg-red-600">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const activeRentals = mockRentals.filter((r) => r.status === 'Active').length;
  const endingSoon = mockRentals.filter((r) => r.status === 'Ending Soon').length;
  const overdue = mockRentals.filter((r) => r.status === 'Overdue').length;
  const totalRevenue = mockRentals.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Ongoing Rentals</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage all active car rentals
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-semibold">{activeRentals}</div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                On Track
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Ending Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-semibold">{endingSoon}</div>
              <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-200">
                Alert
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-semibold">{overdue}</div>
              <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
                Action Required
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-primary">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rentals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Details</CardTitle>
          <CardDescription>
            Complete overview of all ongoing car rentals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Rental Period</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRentals.map((rental) => {
                  const remainingDays = calculateRemainingDays(rental.endDate);
                  return (
                    <TableRow key={rental.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {rental.userInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{rental.userName}</p>
                            <p className="text-xs text-muted-foreground">{rental.userEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{rental.carName}</p>
                          <p className="text-xs text-muted-foreground">{rental.carType}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">
                              {new Date(rental.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">
                              {new Date(rental.endDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs text-muted-foreground">{rental.location}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-muted-foreground" />
                          <span className="font-semibold text-sm">
                            {rental.amount.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className={`text-sm ${remainingDays < 0 ? 'text-destructive' : ''}`}>
                            {remainingDays < 0
                              ? `${Math.abs(remainingDays)} days overdue`
                              : `${remainingDays} days`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(rental.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
