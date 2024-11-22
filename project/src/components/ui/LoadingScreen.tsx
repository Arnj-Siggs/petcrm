import { PawPrint } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <PawPrint className="h-12 w-12 text-primary mx-auto animate-bounce" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading...</h2>
      </div>
    </div>
  );
};