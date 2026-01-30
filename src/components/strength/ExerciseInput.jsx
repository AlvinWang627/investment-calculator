import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ExerciseInput({ exercise, value, onChange, unit = 'kg', isMaxWeight = false }) {
  const { t } = useTranslation();

  // Try to get translation, fallback to exercise key
  const label = t(`exercises.${exercise}`, exercise);
  
  const labelText = isMaxWeight ? `${label} (1RM)` : label;

  return (
    <div className="space-y-2">
      <Label htmlFor={exercise} className="text-sm font-medium">
        {labelText}
      </Label>
      <div className="relative">
        <Input
          id={exercise}
          type="number"
          step="0.5"
          min="0"
          value={value}
          onChange={(e) => onChange(exercise, parseFloat(e.target.value) || 0)}
          placeholder="0"
          className="pr-12"
          required
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
    </div>
  );
}
