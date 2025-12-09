import { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface AddEditCarFormProps {
  carId?: number;
  onBack: () => void;
}

interface CarFormData {
  brand: string;
  model: string;
  year: string;
  plateNumber: string;
  price: string;
  description: string;
  status: string;
  image: string;
}

export function AddEditCarForm({ carId, onBack }: AddEditCarFormProps) {
  const isEditing = !!carId;
  
  // Mock data for editing
  const [formData, setFormData] = useState<CarFormData>({
    brand: isEditing ? 'Tesla' : '',
    model: isEditing ? 'Model S' : '',
    year: isEditing ? '2024' : '',
    plateNumber: isEditing ? 'ABC-1234' : '',
    price: isEditing ? '120' : '',
    description: isEditing ? 'Luxury electric sedan with autopilot features' : '',
    status: isEditing ? 'Available' : 'Available',
    image: isEditing
      ? 'https://images.unsplash.com/photo-1712483565373-8edf883a2baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzZWRhbnxlbnwxfHx8fDE3NjE3NTMwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      : '',
  });

  const [imagePreview, setImagePreview] = useState(formData.image);
  const [errors, setErrors] = useState<Partial<Record<keyof CarFormData, string>>>({});

  const handleInputChange = (field: keyof CarFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData({ ...formData, image: '' });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CarFormData, string>> = {};

    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    else if (isNaN(Number(formData.year)) || Number(formData.year) < 1900) {
      newErrors.year = 'Enter a valid year';
    }
    if (!formData.plateNumber.trim()) newErrors.plateNumber = 'Plate number is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Enter a valid price';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Mock submit
    if (isEditing) {
      toast.success('Car updated successfully!');
    } else {
      toast.success('Car added successfully!');
    }
    
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1>{isEditing ? 'Edit Car' : 'Add New Car'}</h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? 'Update vehicle information' : 'Add a new vehicle to your fleet'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Upload */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Vehicle Image</CardTitle>
              <CardDescription>Upload a high-quality image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                </div>
              )}
              {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>Enter the vehicle information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Tesla, BMW, Mercedes"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                  />
                  {errors.brand && <p className="text-sm text-destructive">{errors.brand}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="e.g., Model S, X5, S-Class"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                  />
                  {errors.model && <p className="text-sm text-destructive">{errors.model}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="e.g., 2024"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                  />
                  {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plateNumber">Plate Number *</Label>
                  <Input
                    id="plateNumber"
                    placeholder="e.g., ABC-1234"
                    value={formData.plateNumber}
                    onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                  />
                  {errors.plateNumber && (
                    <p className="text-sm text-destructive">{errors.plateNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price per Day ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                  {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the vehicle features, condition, and any special notes..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[120px]"
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {isEditing ? 'Update Car' : 'Add Car'}
                </Button>
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
