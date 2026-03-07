import { AlertCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlertErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function AlertErrorModal({
  isOpen,
  onClose,
  title = 'Ops! Algo deu errado',
  description = 'Não conseguimos processar o seu pagamento no momento. Por favor, tente novamente em alguns instantes.',
}: AlertErrorModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-[400px] p-6 gap-6 rounded-2xl border-none shadow-2xl">
        <AlertDialogHeader className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>

          <div className="space-y-2">
            <AlertDialogTitle className="text-xl font-bold text-slate-900">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-sm leading-relaxed">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center w-full">
          <AlertDialogAction
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 font-medium transition-all shadow-md active:scale-[0.98]"
          >
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
