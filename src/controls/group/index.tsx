/**
 * WordPress dependencies
 */
import styled from 'styled-components';
import { GroupControlProps } from './types';
import { PrivateControls } from '..';
import { size } from 'lodash';
import Label from '../../components/label';

const GroupControls = styled.div<{
  $perRow?: number;
  $isRow?: boolean;
}>`
  /* Layout */
  display: flex;
  flex-direction: ${({ $isRow }) => ($isRow ? 'row' : 'column')};
  flex-wrap: wrap;
  gap: 20px;

  /* Box Model */
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  padding: 24px;

  ${({ $isRow, $perRow = 2 }) =>
    $isRow
      ? `
        .components-base-control {
          flex: 0 0 100%;

          @media (min-width: 768px) {
            flex: 0 0 calc(${100 / $perRow}% - ${(($perRow - 1) * 20) / $perRow}px);
          }
        }
      `
      : ''}
`;

const StyledGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px
`;

export default function Group( props: GroupControlProps ): JSX.Element {
	const { control } = props;
	return (
		<StyledGroup className="components-base-control">
			{/* @ts-ignore */}
			<label><Label { ...props } /></label>
			<GroupControls $perRow={ size( control.controls ) } $isRow={control.isRow}>
				<PrivateControls { ...props } controls={ control.controls } />
			</GroupControls>
		</StyledGroup>
	);
}
