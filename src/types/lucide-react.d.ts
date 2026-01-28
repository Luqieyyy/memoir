declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  export type Icon = FC<IconProps>;
  
  // Export all icons used in the project
  export const Heart: Icon;
  export const QrCode: Icon;
  export const Camera: Icon;
  export const MessageSquare: Icon;
  export const Sparkles: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const Mail: Icon;
  export const Lock: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const User: Icon;
  export const Download: Icon;
  export const Copy: Icon;
  export const Check: Icon;
  export const Calendar: Icon;
  export const MapPin: Icon;
  export const Image: Icon;
  export const X: Icon;
  export const Send: Icon;
  export const Upload: Icon;
  export const Quote: Icon;
  export const ChevronDown: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Home: Icon;
  export const Settings: Icon;
  export const LogOut: Icon;
  export const Menu: Icon;
  export const Plus: Icon;
  export const PlusCircle: Icon;
  export const Trash2: Icon;
  export const Edit: Icon;
  export const MoreVertical: Icon;
  export const Share2: Icon;
  export const Users: Icon;
  export const Clock: Icon;
  export const CheckCircle: Icon;
  export const RefreshCw: Icon;
  export const Search: Icon;
  export const AlertCircle: Icon;
  export const Info: Icon;
  export const ExternalLink: Icon;
  export const Loader2: Icon;
  export const ImageIcon: Icon;
  export const Maximize2: Icon;
  export const LayoutDashboard: Icon;
  export const TrendingUp: Icon;
}
