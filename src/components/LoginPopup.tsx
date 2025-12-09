import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { LoginPage } from './LoginPage';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToSignUp: () => void;
}

export function LoginPopup({ isOpen, onClose, onLogin, onSwitchToSignUp }: LoginPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="relative">
          <LoginPage onLogin={onLogin} onSwitchToSignUp={onSwitchToSignUp} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
