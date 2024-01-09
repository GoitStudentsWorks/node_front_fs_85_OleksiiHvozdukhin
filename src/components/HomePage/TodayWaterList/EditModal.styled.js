import { theme } from 'components/theme';
import styled from 'styled-components';

export const EditBody = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ItemWrapper = styled.div`
  display: flex;
  padding: 8px 24px;
  align-items: center;
  gap: 12px;
  width: 254px;
  height: 52px;
  border-radius: 10px;
  background: ${theme.colors.light};
`;
