import { useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { useAuth } from './useAuth';

export function useProtectedRoute() {
  const {
    isAuthenticated,
    isVerified,
    isLoading,
    isDocsNotUploaded,
    isDocsPending,
  } = useAuth();

  const handleNavigation = useCallback(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else if (!isVerified) {
        router.replace('/(auth)/verify-email');
      } else if (isDocsNotUploaded) {
        router.replace('/(auth)/upload-documents');
      } else if (isDocsPending) {
        router.replace('/(auth)/confirmation');
      }
    }
  }, [isAuthenticated, isDocsNotUploaded, isDocsPending, isLoading]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);
}
