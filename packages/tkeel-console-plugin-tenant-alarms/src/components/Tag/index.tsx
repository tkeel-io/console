import { Tag, TagLabel } from '@chakra-ui/react';
import React from 'react';

export interface CustomTagProps {
  label: string;
  bgColor: string;
  color?: string;
  iconColor?: string;
  Icon?: React.ElementType;
  borderRadius?: string;
}

export default function CustomTag({
  Icon,
  label,
  bgColor,
  color = 'white',
  iconColor = 'white',
  borderRadius = '0',
}: CustomTagProps) {
  return (
    <Tag
      size="md"
      bgColor={bgColor}
      color={color}
      fontSize={12}
      borderRadius={borderRadius}
      px="3px"
    >
      {Icon && <Icon mr="2px" size={14} color={iconColor || color} />}
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
}
