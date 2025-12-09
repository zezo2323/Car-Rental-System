import { Printer, Download, Check, Mail } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface InvoicePageProps {
  bookingData: any;
  onBack: () => void;
}

export function InvoicePage({ bookingData, onBack }: InvoicePageProps) {
  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header with Actions */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h1>Invoice</h1>
          <p className="text-muted-foreground mt-1">Booking confirmation and payment details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Button>
        </div>
      </div>

      {/* Invoice Card */}
      <Card className="print:shadow-none">
        <CardContent className="p-8 md:p-12 space-y-8">
          {/* Company Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl mb-2">DriveNow Rentals</h2>
              <p className="text-muted-foreground">123 Auto Street</p>
              <p className="text-muted-foreground">Los Angeles, CA 90001</p>
              <p className="text-muted-foreground">contact@drivenow.com</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 mb-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-600">PAID</span>
              </div>
              <p className="text-sm text-muted-foreground">Invoice #{invoiceNumber}</p>
              <p className="text-sm text-muted-foreground">Date: {invoiceDate}</p>
            </div>
          </div>

          <Separator />

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-3">Bill To</h3>
              <p>John Doe</p>
              <p className="text-muted-foreground">john.doe@email.com</p>
              <p className="text-muted-foreground">+1 (555) 987-6543</p>
              <p className="text-muted-foreground">456 Customer Ave</p>
              <p className="text-muted-foreground">Los Angeles, CA 90002</p>
            </div>
            <div>
              <h3 className="mb-3">Rental Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup Date:</span>
                  <span>
                    {new Date(bookingData.pickupDate).toLocaleDateString()} at{' '}
                    {bookingData.pickupTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Date:</span>
                  <span>
                    {new Date(bookingData.returnDate).toLocaleDateString()} at{' '}
                    {bookingData.returnTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{bookingData.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Car Details */}
          <div>
            <h3 className="mb-4">Vehicle Information</h3>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{bookingData.carName}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rental Period: {bookingData.days}{' '}
                    {bookingData.days === 1 ? 'day' : 'days'}
                  </p>
                </div>
                <Badge className="bg-secondary">Premium</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Charges Table */}
          <div>
            <h3 className="mb-4">Charges</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">
                  Car Rental ({bookingData.days}{' '}
                  {bookingData.days === 1 ? 'day' : 'days'})
                </span>
                <span>${bookingData.subtotal.toFixed(2)}</span>
              </div>
              {bookingData.insurance && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">
                    Full Insurance Coverage ({bookingData.days}{' '}
                    {bookingData.days === 1 ? 'day' : 'days'} × $15)
                  </span>
                  <span>${bookingData.insuranceFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${bookingData.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-semibold text-primary">
                  ${bookingData.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span>Credit Card (****4242)</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <h4>Terms & Conditions</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Full payment is required at the time of booking</li>
              <li>Valid driver's license and insurance required</li>
              <li>Late returns subject to additional charges</li>
              <li>Fuel should be returned at the same level as pickup</li>
              <li>Any damages will be charged according to our policy</li>
              <li>Cancellations must be made 24 hours in advance for refund</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Thank you for choosing DriveNow Rentals!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              For questions about this invoice, please contact us at support@drivenow.com
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="flex justify-center no-print">
        <Button onClick={onBack} variant="outline" size="lg">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
