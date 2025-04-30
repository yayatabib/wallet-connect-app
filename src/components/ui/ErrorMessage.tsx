'use client';

interface ErrorMessageProps {
  message: string;
}

/**
 * Component to display error messages
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm" role="alert">
      {message}
    </div>
  );
} 