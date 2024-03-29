import { Button } from '@/components/ui/button';
import Logo from './logo';

function Footer() {
  return (
    <div className="flex items-center w-full py-6 px-4 sm:p-6 bg-background z-50">
      <Logo />
      <div className="md:ml-auto w-full flex justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}

export default Footer;
