import { useEffect, memo, useCallback } from "react";
import { Service } from "@shared/schema";
import { useSettings, Theme, Language } from "@/hooks/use-settings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor, Sun, Moon } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
}

const SettingsDialog = memo(function SettingsDialog({
  open,
  onOpenChange,
  services,
}: SettingsDialogProps) {
  const { theme, setTheme, language, setLanguage, t } = useSettings();

  // Memoize delle callback per evitare re-render
  const handleThemeChange = useCallback((value: string) => {
    setTheme(value as Theme);
  }, [setTheme]);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value as Language);
  }, [setLanguage]);

  // Applica il tema quando cambia
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Applica la lingua quando cambia
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Listener per aprire il dialog impostazioni da mobile/tablet
  useEffect(() => {
    const openDialog = () => onOpenChange(true);
    window.addEventListener('open-settings-dialog', openDialog);
    return () => window.removeEventListener('open-settings-dialog', openDialog);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>{t.settings}</DialogTitle>
          <DialogDescription>{t.settingsDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-base font-medium">{t.theme}</Label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue placeholder={t.selectTheme} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>{t.system}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="light" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>{t.light}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>{t.dark}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-base font-medium">{t.language}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default SettingsDialog;