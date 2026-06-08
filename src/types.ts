export enum UserRole {
  SUPER_ADMIN = "Super Admin",
  VENDOR = "Vendor/Seller",
  CUSTOMER = "Customer",
  SUPPORT_STAFF = "Support Staff",
  DELIVERY_MANAGER = "Delivery Manager"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  walletBalance: number; // in BDT
  loyaltyPoints: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface VendorStore {
  id: string;
  vendorId: string;
  storeName: string;
  slug: string;
  bannerUrl: string;
  logoUrl: string;
  rating: number;
  followersCount: number;
  featured: boolean;
  vacationMode: boolean;
}

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  weight?: string;
  additionalPrice: number;
  stock: number;
}

export interface Product {
  id: string;
  vendorStoreId: string;
  title: string;
  slug: string;
  description: string;
  price: number; // in BDT
  oldPrice?: number;
  images: string[];
  videoUrl?: string;
  categoryId: string;
  brandId?: string;
  rating: number;
  stockCount: number;
  salesCount: number;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  specifications: Record<string, string>;
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  vendorStoreId: string;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number; // in BDT
  shippingCharge: number;
  discountAmount: number;
  paymentMethod: "SSLCommerz" | "bKash" | "Nagad" | "Stripe" | "COD";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  shippingAddress: {
    division: string;
    district: string;
    upazila: string;
    area: string;
    fullAddress: string;
    phone: string;
  };
  deliveryStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  trackingNumber: string;
  courierName?: "SteadFast" | "Pathao" | "RedX" | "Sundarban" | "Paperfly";
  consignmentId?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  minSpend: number;
  expiryDate: string;
  vendorStoreId?: string; // Nuance: global vs vendor-specific
}

export interface SupportTicket {
  id: string;
  userId: string;
  title: string;
  category: "Billing" | "Technical" | "Seller Inquiry" | "Delivery Issue";
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In_Progress" | "Resolved";
  createdAt: string;
}

export interface Message {
  id: string;
  sender: "user" | "ai" | "admin" | "vendor";
  text: string;
  timestamp: string;
}

export type DevelopmentPhaseId = number;

export interface DevelopmentPhase {
  id: DevelopmentPhaseId;
  title: string;
  objective: string;
  features: string[];
  databaseTables: string[];
  migrations: string[];
  models: string[];
  controllers: string[];
  routes: string[];
  bladePages: string[];
  adminFeatures: string[];
  vendorFeatures: string[];
  customerFeatures: string[];
  validationRules: Record<string, string>;
  securityConsiderations: string[];
  testingChecklist: string[];
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
}
