import { useState } from 'react';
import { FileText, Download, Eye, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface Invoice {
  id: number;
  invoiceNumber: string;
  renterName: string;
  renterEmail: string;
  carName: string;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  issueDate: string;
  dueDate: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    renterName: 'John Doe',
    renterEmail: 'john.doe@email.com',
    carName: 'Tesla Model S',
    total: 1920,
    status: 'Paid',
    issueDate: '2025-10-20',
    dueDate: '2025-10-25',
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    renterName: 'Sarah Johnson',
    renterEmail: 'sarah.j@email.com',
    carName: 'Range Rover Sport',
    total: 1200,
    status: 'Paid',
    issueDate: '2025-10-25',
    dueDate: '2025-10-30',
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-003',
    renterName: 'Michael Chen',
    renterEmail: 'michael.c@email.com',
    carName: 'Porsche 911',
    total: 3000,
    status: 'Unpaid',
    issueDate: '2025-10-15',
    dueDate: '2025-10-20',
  },
  {
    id: 4,
    invoiceNumber: 'INV-2024-004',
    renterName: 'Emma Williams',
    renterEmail: 'emma.w@email.com',
    carName: 'BMW X5',
    total: 2210,
    status: 'Paid',
    issueDate: '2025-10-22',
    dueDate: '2025-10-27',
  },
  {
    id: 5,
    invoiceNumber: 'INV-2024-005',
    renterName: 'David Brown',
    renterEmail: 'david.b@email.com',
    carName: 'Mercedes S-Class',
    total: 1820,
    status: 'Overdue',
    issueDate: '2025-10-10',
    dueDate: '2025-10-15',
  },
  {
    id: 6,
    invoiceNumber: 'INV-2024-006',
    renterName: 'Lisa Anderson',
    renterEmail: 'lisa.a@email.com',
    carName: 'Audi Q7',
    total: 1350,
    status: 'Paid',
    issueDate: '2025-10-28',
    dueDate: '2025-11-02',
  },
];

export function InvoicesPage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.renterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.carName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case 'Unpaid':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Unpaid</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-500 hover:bg-red-600">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleExportPDF = (invoice: Invoice) => {
    toast.success(`Exporting invoice ${invoice.invoiceNumber} as PDF`);
  };

  const handleExportAllCSV = () => {
    toast.success('Exporting all invoices as CSV');
  };

  const totalRevenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.total, 0);
  const unpaidAmount = invoices
    .filter((i) => i.status === 'Unpaid' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.total, 0);
  const paidCount = invoices.filter((i) => i.status === 'Paid').length;
  const unpaidCount = invoices.filter((i) => i.status === 'Unpaid').length;
  const overdueCount = invoices.filter((i) => i.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Invoices & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all rental invoices
          </p>
        </div>
        <Button onClick={handleExportAllCSV} className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{paidCount} paid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Unpaid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-orange-600">
              ${unpaidAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{unpaidCount} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Overdue Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-red-600">{overdueCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{invoices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
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
                placeholder="Search by invoice number, renter, or car..."
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
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>
            {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}{' '}
            found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Renter</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-sm">{invoice.invoiceNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{invoice.renterName}</p>
                        <p className="text-xs text-muted-foreground">{invoice.renterEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{invoice.carName}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">
                        {new Date(invoice.issueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">
                        {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-sm">
                        ${invoice.total.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleExportPDF(invoice)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
