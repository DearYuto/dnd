import { css } from 'styled-components';

export const getBorder = ($isDragging: boolean) =>
  $isDragging ? '1px solid #8d9fd9' : '1px solid #d2d7eb';

export const getBoxShadow = ($isDragging: boolean) =>
  $isDragging ? '4px 4px 20px #70738050' : 'none';

export const getFontWeight = ($isDragging: boolean) => ($isDragging ? 'bold' : 'normal');

export const getItemColor = (isDragging: boolean, isSelected?: boolean): string => {
  if (isSelected) return '#9dffe2';
  if (isDragging) return '#8d9fd9';

  return '#cdd7f8';
};

export const conditionalStyles = ($isDragging: boolean) => css`
  opacity: ${$isDragging ? '0.6' : '1'};
  border: ${getBorder($isDragging)};
  font-weight: ${getFontWeight($isDragging)};
  box-shadow: ${getBoxShadow($isDragging)};
`;

export const afterStyles = ($isDragging: boolean, $isSelected: boolean) => css`
  content: '';
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${getItemColor($isDragging, $isSelected)};
  color: white;
  padding: 5px;
`;

export const getMoveNotAllowedStyles = () => css`
  border: 1px solid red;
  background-color: #ffd4d4;
  color: red;
`;
