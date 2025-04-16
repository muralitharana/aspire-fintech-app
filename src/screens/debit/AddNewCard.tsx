import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Colors} from '../../configs/Colors';
import {moderateScale, verticalScale} from '../../configs/ScalingSize';
import {Fonts} from '../../configs/Fonts';
import Button from '../../components/Button';
import Modal, {ModalProps} from 'react-native-modalbox';
// Props interface
interface AddNewCardProps extends ModalProps {
  onSave: (text: string) => void;
  onClose: () => void;
}

const AddNewCard = ({onSave, onClose, ...props}: AddNewCardProps) => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Handle input changes
  const handleInputChange = (inputText: string) => {
    if (error) setError('');
    setText(inputText);
  };

  // Save action
  const handleSave = () => {
    if (!text.trim()) {
      setError('Enter card name.');
      return;
    }

    onSave(text.trim());
    setText('');
    setError('');
  };

  // Close modal
  const handleClose = () => {
    onClose();
    setText('');
    setError('');
  };

  const CloseButton = () => (
    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
      <FontAwesome6
        iconStyle="solid"
        name="x"
        size={moderateScale(14)}
        color={Colors.secondary}
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      backdropOpacity={0.1}
      style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      {...props}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add New Card</Text>
            <CloseButton />
          </View>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter card holder name"
            placeholderTextColor={Colors.greyMedium}
            onChangeText={handleInputChange}
            value={text}
          />

          {/* Error */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Save Button */}
          <Button
            buttonStyles={styles.saveButton}
            title="Save"
            onPress={handleSave}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddNewCard;

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContent: {
    width: '80%',
    padding: moderateScale(20),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Fonts.fontSemiBold,
  },

  closeButton: {
    padding: moderateScale(3),
  },

  input: {
    height: verticalScale(50),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: Colors.greyMedium,
    padding: moderateScale(10),
    marginTop: verticalScale(10),
    fontFamily: Fonts.fontRegular,
  },

  errorText: {
    fontFamily: Fonts.fontRegular,
    fontSize: moderateScale(10),
    color: 'red',
    padding: moderateScale(2),
  },

  saveButton: {
    height: verticalScale(35),
    marginTop: verticalScale(40),
  },
});
