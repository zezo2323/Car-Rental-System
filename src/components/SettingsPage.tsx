import { useState } from 'react';
import { Building2, DollarSign, FileText, Users, Save, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { toast } from 'sonner@2.0.3';

export function SettingsPage() {
  const [companySettings, setCompanySettings] = useState({
    companyName: 'DriveNow Car Rentals',
    email: 'info@drivenow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Los Angeles, CA 90001',
    website: 'www.drivenow.com',
    taxId: 'TAX-123456789',
  });

  const [financialSettings, setFinancialSettings] = useState({
    taxRate: '10',
    lateFeePerDay: '25',
    securityDeposit: '200',
    cancellationFee: '50',
  });

  const [policySettings, setPolicySettings] = useState({
    cancellationPolicy:
      'Cancellations made 48 hours before the rental start time will receive a full refund. Cancellations made within 48 hours will incur a 50% cancellation fee.',
    termsAndConditions:
      'All drivers must be 21 years or older with a valid driver license. Full insurance coverage is required for all rentals. Late returns will incur additional fees.',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    bookingConfirmations: true,
    paymentReminders: true,
  });

  const handleCompanyChange = (field: string, value: string) => {
    setCompanySettings({ ...companySettings, [field]: value });
  };

  const handleFinancialChange = (field: string, value: string) => {
    setFinancialSettings({ ...financialSettings, [field]: value });
  };

  const handlePolicyChange = (field: string, value: string) => {
    setPolicySettings({ ...policySettings, [field]: value });
  };

  const handleNotificationToggle = (field: string, value: boolean) => {
    setNotificationSettings({ ...notificationSettings, [field]: value });
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your business configuration and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Profile */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <CardTitle>Company Profile</CardTitle>
            </div>
            <CardDescription>Update your business information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companySettings.companyName}
                  onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={companySettings.email}
                  onChange={(e) => handleCompanyChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={companySettings.phone}
                  onChange={(e) => handleCompanyChange('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companySettings.website}
                  onChange={(e) => handleCompanyChange('website', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={companySettings.address}
                onChange={(e) => handleCompanyChange('address', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / Business Number</Label>
              <Input
                id="taxId"
                value={companySettings.taxId}
                onChange={(e) => handleCompanyChange('taxId', e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  handleNotificationToggle('emailNotifications', checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
              </div>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) =>
                  handleNotificationToggle('smsNotifications', checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Booking Confirmations</Label>
                <p className="text-xs text-muted-foreground">Send to customers</p>
              </div>
              <Switch
                checked={notificationSettings.bookingConfirmations}
                onCheckedChange={(checked) =>
                  handleNotificationToggle('bookingConfirmations', checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Reminders</Label>
                <p className="text-xs text-muted-foreground">Auto-send reminders</p>
              </div>
              <Switch
                checked={notificationSettings.paymentReminders}
                onCheckedChange={(checked) =>
                  handleNotificationToggle('paymentReminders', checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <CardTitle>Financial Settings</CardTitle>
            </div>
            <CardDescription>Configure pricing and fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={financialSettings.taxRate}
                onChange={(e) => handleFinancialChange('taxRate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lateFeePerDay">Late Fee (per day)</Label>
              <Input
                id="lateFeePerDay"
                type="number"
                value={financialSettings.lateFeePerDay}
                onChange={(e) => handleFinancialChange('lateFeePerDay', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
              <Input
                id="securityDeposit"
                type="number"
                value={financialSettings.securityDeposit}
                onChange={(e) => handleFinancialChange('securityDeposit', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancellationFee">Cancellation Fee ($)</Label>
              <Input
                id="cancellationFee"
                type="number"
                value={financialSettings.cancellationFee}
                onChange={(e) => handleFinancialChange('cancellationFee', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Policies */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>Policies & Terms</CardTitle>
            </div>
            <CardDescription>Define your business policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
              <Textarea
                id="cancellationPolicy"
                value={policySettings.cancellationPolicy}
                onChange={(e) => handlePolicyChange('cancellationPolicy', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
              <Textarea
                id="termsAndConditions"
                value={policySettings.termsAndConditions}
                onChange={(e) => handlePolicyChange('termsAndConditions', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save className="w-4 h-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
