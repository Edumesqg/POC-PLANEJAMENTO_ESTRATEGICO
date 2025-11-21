import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormBasicoData } from '@/lib/validations/formulario';

const STORAGE_KEY = 'formBasico';

export function useFormProgress(setValue: UseFormSetValue<FormBasicoData>) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as Partial<FormBasicoData>;
        Object.keys(data).forEach((key) => {
          setValue(key as keyof FormBasicoData, data[key as keyof FormBasicoData]!);
        });
      }
    } catch (error) {
      console.error('Error loading form progress:', error);
    }
  }, [setValue]);

  const saveProgress = (data: Partial<FormBasicoData>) => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const parsed = existing ? JSON.parse(existing) : {};
      const updated = { ...parsed, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving form progress:', error);
    }
  };

  const clearProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing form progress:', error);
    }
  };

  return { saveProgress, clearProgress };
}
