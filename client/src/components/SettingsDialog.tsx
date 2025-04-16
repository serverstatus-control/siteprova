import { useState, useEffect } from "react";
import { Service } from "@shared/schema";
import { useSettings, Theme, Language } from "@/hooks/use-settings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
}

export default function SettingsDialog({
  open,
  onOpenChange,
  services,
}: SettingsDialogProps) {
  const { theme, setTheme, language, setLanguage, favorites, removeFavorite, t } = useSettings();
  const [activeTab, setActiveTab] = useState("general");
  
  // Servizi preferiti filtrati
  const favoriteServices = services.filter(service => favorites.includes(service.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.settings}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">{t.close}</span>
          </DialogClose>
        </DialogHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="general">{t.settings}</TabsTrigger>
            <TabsTrigger value="favorites">{t.favorites}</TabsTrigger>
          </TabsList>
          
          {/* Impostazioni generali */}
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="theme">{t.theme}</Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">{t.system}</SelectItem>
                  <SelectItem value="light">{t.light}</SelectItem>
                  <SelectItem value="dark">{t.dark}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">{t.language}</Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t.english}</SelectItem>
                  <SelectItem value="it">{t.italian}</SelectItem>
                  <SelectItem value="es">{t.spanish}</SelectItem>
                  <SelectItem value="fr">{t.french}</SelectItem>
                  <SelectItem value="de">{t.german}</SelectItem>
                  <SelectItem value="zh">{t.chinese}</SelectItem>
                  <SelectItem value="ja">{t.japanese}</SelectItem>
                  <SelectItem value="pt">{t.portuguese}</SelectItem>
                  <SelectItem value="ru">{t.russian}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          {/* Servizi preferiti */}
          <TabsContent value="favorites" className="pt-4">
            {favoriteServices.length > 0 ? (
              <div className="space-y-3">
                {favoriteServices.map(service => (
                  <div key={service.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-3">
                      <i className={service.logo + " text-lg"}></i>
                      <span>{service.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(service.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-950"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                {t.noFavorites}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}