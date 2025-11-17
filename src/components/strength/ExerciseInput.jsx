import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const EXERCISE_INFO = {
  squat: {
    label: '深蹲 (Squat)',
    description: '槓鈴深蹲',
    placeholder: '100'
  },
  bench: {
    label: '臥推 (Bench Press)',
    description: '槓鈴臥推',
    placeholder: '80'
  },
  deadlift: {
    label: '硬舉 (Deadlift)',
    description: '槓鈴硬舉',
    placeholder: '120'
  },
  overheadPress: {
    label: '過頭推舉 (OHP)',
    description: '槓鈴過頭推舉',
    placeholder: '50'
  },
  press: {
    label: '過頭推舉 (Press)',
    description: '槓鈴過頭推舉',
    placeholder: '50'
  },
  row: {
    label: '槓鈴划船 (Row)',
    description: '槓鈴划船',
    placeholder: '70'
  }
};

export default function ExerciseInput({ exercise, value, onChange, unit = 'kg', isMaxWeight = false }) {
  const info = EXERCISE_INFO[exercise] || {
    label: exercise,
    description: exercise,
    placeholder: '0'
  };

  const labelText = isMaxWeight ? `${info.label} (1RM)` : info.label;

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
          placeholder={info.placeholder}
          className="pr-12"
          required
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{info.description}</p>
    </div>
  );
}
