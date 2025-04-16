import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { BaseModal } from './BaseModal';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

interface PasswordField {
  value: string;
  visible: boolean;
  error?: string;
}

export function PasswordModal({ visible, onClose }: PasswordModalProps) {
  const { colors } = useThemeStore();
  const [currentPassword, setCurrentPassword] = useState<PasswordField>({
    value: '',
    visible: false,
  });
  const [newPassword, setNewPassword] = useState<PasswordField>({
    value: '',
    visible: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<PasswordField>({
    value: '',
    visible: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;
    const updates: Record<string, PasswordField> = {};

    if (!currentPassword.value) {
      updates.currentPassword = {
        ...currentPassword,
        error: 'Le mot de passe actuel est requis',
      };
      isValid = false;
    }

    if (!newPassword.value) {
      updates.newPassword = {
        ...newPassword,
        error: 'Le nouveau mot de passe est requis',
      };
      isValid = false;
    } else if (newPassword.value.length < 8) {
      updates.newPassword = {
        ...newPassword,
        error: 'Le mot de passe doit contenir au moins 8 caractères',
      };
      isValid = false;
    }

    if (!confirmPassword.value) {
      updates.confirmPassword = {
        ...confirmPassword,
        error: 'La confirmation du mot de passe est requise',
      };
      isValid = false;
    } else if (confirmPassword.value !== newPassword.value) {
      updates.confirmPassword = {
        ...confirmPassword,
        error: 'Les mots de passe ne correspondent pas',
      };
      isValid = false;
    }

    if (!isValid) {
      if (updates.currentPassword) setCurrentPassword(updates.currentPassword);
      if (updates.newPassword) setNewPassword(updates.newPassword);
      if (updates.confirmPassword) setConfirmPassword(updates.confirmPassword);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la modification du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const PasswordInput = ({ 
    label, 
    value, 
    visible, 
    error, 
    onChangeText, 
    onToggleVisibility,
    testID,
  }) => (
    <Animated.View 
      entering={FadeInDown}
      style={styles.inputContainer}
    >
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        { 
          backgroundColor: colors.card,
          borderColor: error ? colors.error : colors.border,
        },
      ]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          placeholderTextColor={colors.muted}
          testID={testID}
        />
        <TouchableOpacity
          style={styles.visibilityToggle}
          onPress={onToggleVisibility}
        >
          {visible ? (
            <EyeOff size={20} color={colors.muted} />
          ) : (
            <Eye size={20} color={colors.muted} />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <AlertCircle size={16} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        </View>
      )}
    </Animated.View>
  );

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Modifier le mot de passe
        </Text>

        {error && (
          <View style={[styles.globalError, { backgroundColor: colors.error + '20' }]}>
            <AlertCircle size={20} color={colors.error} />
            <Text style={[styles.globalErrorText, { color: colors.error }]}>
              {error}
            </Text>
          </View>
        )}

        <PasswordInput
          label="Mot de passe actuel"
          value={currentPassword.value}
          visible={currentPassword.visible}
          error={currentPassword.error}
          onChangeText={(text) => setCurrentPassword({ ...currentPassword, value: text, error: undefined })}
          onToggleVisibility={() => setCurrentPassword({ ...currentPassword, visible: !currentPassword.visible })}
          testID="current-password"
        />

        <PasswordInput
          label="Nouveau mot de passe"
          value={newPassword.value}
          visible={newPassword.visible}
          error={newPassword.error}
          onChangeText={(text) => setNewPassword({ ...newPassword, value: text, error: undefined })}
          onToggleVisibility={() => setNewPassword({ ...newPassword, visible: !newPassword.visible })}
          testID="new-password"
        />

        <PasswordInput
          label="Confirmer le nouveau mot de passe"
          value={confirmPassword.value}
          visible={confirmPassword.visible}
          error={confirmPassword.error}
          onChangeText={(text) => setConfirmPassword({ ...confirmPassword, value: text, error: undefined })}
          onToggleVisibility={() => setConfirmPassword({ ...confirmPassword, visible: !confirmPassword.visible })}
          testID="confirm-password"
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Annuler
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              { backgroundColor: colors.primary },
              loading && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.submitButtonText]}>
              {loading ? 'Modification...' : 'Modifier'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 24,
  },
  globalError: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  globalErrorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 12,
  },
  visibilityToggle: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: '#166534',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  submitButtonText: {
    color: '#ffffff',
  },
});