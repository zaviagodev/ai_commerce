import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paintbrush, Palette, CircleDot, Type, Save, Undo } from 'lucide-react';
import { cn, hexToHSL } from '@/lib/utils';
import { toast } from 'sonner';

interface ThemeSettings {
  radius: number;
  fontSize: number;
  primaryHue: number;
  primarySaturation: number;
  primaryLightness: number;
  backgroundColor: string;
  foregroundColor: string;
  cardColor: string;
  borderColor: string;
}

const defaultTheme: ThemeSettings = {
  radius: 18, // 1.125rem in pixels
  fontSize: 5,
  primaryHue: 221,
  primarySaturation: 83,
  primaryLightness: 53,
  backgroundColor: '#F3F2F7',
  foregroundColor: '#09090B',
  cardColor: "#FFFFFF",
  borderColor: '#e5e7eb'
};

export function ThemeSettingsPage() {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('userTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    // Update CSS variables
    const previewTheme: HTMLElement = document.getElementById("preview-theme")

    previewTheme.style.setProperty('--radius', `${theme.radius}px`);
    previewTheme.style.setProperty('--primary', `${theme.primaryHue} ${theme.primarySaturation}% ${theme.primaryLightness}%`);
    previewTheme.style.setProperty('--lightgray', hexToHSL(theme.backgroundColor));
    previewTheme.style.setProperty('--card', hexToHSL(theme.cardColor));
    previewTheme.style.setProperty('--main', hexToHSL(theme.cardColor));
    previewTheme.style.color = theme.foregroundColor;
    previewTheme.style.setProperty('--font-adjust', String(0.48 + ((theme.fontSize - 5) / 50)));
    previewTheme.style.setProperty('--border', hexToHSL(theme.borderColor));

    // Save to localStorage
    localStorage.setItem('userTheme', JSON.stringify(theme));
  }, [theme]);

  const resetTheme = () => {
    // Reset all CSS variables to default values
    document.documentElement.style.setProperty('--radius', `${defaultTheme.radius}px`);
    document.documentElement.style.setProperty('--primary', `${defaultTheme.primaryHue} ${defaultTheme.primarySaturation}% ${defaultTheme.primaryLightness}%`);
    document.body.style.setProperty('--lightgray', hexToHSL(defaultTheme.backgroundColor));
    document.documentElement.style.setProperty('--card', hexToHSL(defaultTheme.cardColor));
    document.documentElement.style.setProperty('--main', hexToHSL(defaultTheme.cardColor));
    document.body.style.color = defaultTheme.foregroundColor;
    document.documentElement.style.setProperty('--font-adjust', String(0.48));
    document.documentElement.style.setProperty('--border', hexToHSL(defaultTheme.borderColor));
    
    // Update state with default values
    setTheme(defaultTheme);

    // Clear localStorage
    localStorage.removeItem('userTheme');
    toast.success('Theme reset to defaults');
  };

  const saveTheme = () => {
    document.documentElement.style.setProperty('--radius', `${theme.radius}px`);
    document.documentElement.style.setProperty('--primary', `${theme.primaryHue} ${theme.primarySaturation}% ${theme.primaryLightness}%`);
    document.body.style.setProperty('--lightgray', hexToHSL(theme.backgroundColor));
    document.documentElement.style.setProperty('--card', hexToHSL(theme.cardColor));
    document.documentElement.style.setProperty('--main', hexToHSL(theme.cardColor));
    document.body.style.color = theme.foregroundColor;
    document.documentElement.style.setProperty('--font-adjust', String(0.48 + ((theme.fontSize - 5) / 50)));
    document.documentElement.style.setProperty('--border', hexToHSL(theme.borderColor));

    localStorage.setItem('userTheme', JSON.stringify(theme));
    toast.success('Theme settings saved');
  };

  const PreviewCard = ({ className }: { className?: string }) => (
    <div className={cn("p-4 rounded-lg border", className)}>
      <div className="space-y-2">
        <div className="h-2 w-[60%] rounded-lg bg-primary/20" />
        <div className="h-2 w-[80%] rounded-lg bg-muted" />
        <div className="h-2 w-[40%] rounded-lg bg-muted" />
      </div>
      <div className="flex gap-2 mt-4">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">Secondary</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium">Theme Settings</h1>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of your dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetTheme}>
            <motion.div
              whileTap={{ rotate: -180, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Undo className="mr-2 h-4 w-4" />
            </motion.div>
            Reset
          </Button>
          <Button onClick={saveTheme}>
            {/* <Save className="mr-2 h-4 w-4" /> */}
            Save changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Tabs defaultValue="colors">
            <TabsList className="mb-4">
              <TabsTrigger value="colors">
                <Palette className="mr-2 h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="mr-2 h-4 w-4" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="borders">
                <CircleDot className="mr-2 h-4 w-4" />
                Borders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Paintbrush className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">Primary Color</h2>
                    <p className="text-sm text-muted-foreground">
                      Adjust the primary color using HSL values
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Hue</Label>
                    <Slider
                      value={[theme.primaryHue]}
                      min={0}
                      max={360}
                      step={1}
                      onValueChange={([value]) => setTheme(prev => ({ ...prev, primaryHue: value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Saturation</Label>
                    <Slider
                      value={[theme.primarySaturation]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={([value]) => setTheme(prev => ({ ...prev, primarySaturation: value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Lightness</Label>
                    <Slider
                      value={[theme.primaryLightness]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={([value]) => setTheme(prev => ({ ...prev, primaryLightness: value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">Background & Text</h2>
                    <p className="text-sm text-muted-foreground">
                      Adjust the color of the background and the text
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 relative">
                    <Label>Background Color</Label>
                    <label htmlFor="bg-theme" className='color-picker' style={{ background: theme.backgroundColor }}>
                      <Input
                        id="bg-theme"
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) => setTheme(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className='invisible'
                      />
                    </label>
                  </div>
                  <div className="space-y-2 relative">
                    <Label>Card Color</Label>
                    <label htmlFor="card-theme" className='color-picker' style={{ background: theme.cardColor }}>
                      <Input
                        id="card-theme"
                        type="color"
                        value={theme.cardColor}
                        onChange={(e) => setTheme(prev => ({ ...prev, cardColor: e.target.value }))}
                        className='invisible'
                      />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <label htmlFor="fore-theme" className='color-picker' style={{ background: theme.foregroundColor }}>
                      <Input
                        id="fore-theme"
                        type="color"
                        value={theme.foregroundColor}
                        onChange={(e) => setTheme(prev => ({ ...prev, foregroundColor: e.target.value }))}
                        className='invisible'
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">Typography Settings</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Base Font Size (px)</Label>
                    <Slider
                      value={[theme.fontSize]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={([value]) => setTheme(prev => ({ ...prev, fontSize: value }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="borders" className="space-y-4">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">Border Settings</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Border Radius (px)</Label>
                    <Slider
                      value={[theme.radius]}
                      min={0}
                      max={24}
                      step={1}
                      onValueChange={([value]) => setTheme(prev => ({ ...prev, radius: value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Border Color</Label>
                    <label htmlFor='border-theme' className='color-picker' style={{ background: theme.borderColor }}>
                      <Input
                        id="border-theme"
                        type="color"
                        value={theme.borderColor}
                        onChange={(e) => setTheme(prev => ({ ...prev, borderColor: e.target.value }))}
                        className='invisible'
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preview</h3>
          <div className="space-y-4 rounded-lg border p-4 bg-lightgray" id="preview-theme">
            <PreviewCard className="bg-card" />
            <div className="flex gap-2">
              <Button size="sm" className='transition-none'>Primary</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="outline">Outline</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch className='transition-none'/>
                <Label>Toggle</Label>
              </div>
              <Input placeholder="Input field" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}