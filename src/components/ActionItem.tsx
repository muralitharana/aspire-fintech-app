import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../configs/ScalingSize';
import {Colors} from '../configs/Colors';
import {Fonts} from '../configs/Fonts';
import SVGIcons from './SVGIcons';
import {ActionItems} from '../types/debitCardTypes';

export interface ActionItemProps extends ActionItems {
  onActionPress?: (id: string | number) => void;
  enableAction: boolean;
}

const ActionItem = ({
  id,
  title,
  description,
  actionIconName,
  iconName,
  enableAction,
  onActionPress,
}: ActionItemProps) => {
  return (
    <Pressable style={styles.container} onPress={() => onActionPress?.(id)}>
      <View style={styles.content}>
        <View style={styles.iconPlaceholder}>
          <SVGIcons
            width={horizontalScale(32)}
            height={verticalScale(32)}
            iconName={iconName}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <Pressable
          onPress={() => onActionPress?.(id)}
          style={styles.trailingPlaceholder}>
          {actionIconName && (
            <SVGIcons
              width={horizontalScale(32)}
              height={verticalScale(32)}
              iconName={actionIconName}
              fill={enableAction ? Colors.primary : Colors.greyLight}
            />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ActionItem;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.greyLight, // optional improvement
    borderRadius: moderateScale(8),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  iconPlaceholder: {
    flex: 0.1,
  },
  textContainer: {
    flex: 0.8,
    marginHorizontal: moderateScale(10),
  },
  titleText: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(5),
    fontFamily: Fonts.fontMedium,
    color: Colors.black,
  },
  descriptionText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.fontMedium,
    color: Colors.grey,
  },
  trailingPlaceholder: {
    flex: 0.1,
  },
});
