export class UpdateListingDto {
  title?: string;
  description?: string;
  status?: 'AVAILABLE' | 'PENDING' | 'FROZEN' | 'SOLD' | 'ARCHIVED';
  category?: 'ELECTRONICS' | 'FASHION' | 'HOME' | 'TOYS' | 'BOOKS' | 'SPORTS' | 'OTHER';
  price?: number;
  discountedPrice?: number;
}
