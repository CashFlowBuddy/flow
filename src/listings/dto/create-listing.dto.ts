export class CreateListingDto {
  title: string;
  description: string;
  category: 'ELECTRONICS' | 'FASHION' | 'HOME' | 'TOYS' | 'BOOKS' | 'SPORTS' | 'OTHER';
  price: number;
  discountedPrice?: number;
}
