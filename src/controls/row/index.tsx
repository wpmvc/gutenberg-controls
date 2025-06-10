/**
 * WordPress dependencies
 */
import styled from 'styled-components';
import { PrivateControls } from '..';
import { size } from 'lodash';
import { CommonControlProps } from '../../types/control';

const StyledRow = styled.div< {
	$perRow?: number;
} >`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;

	.components-base-control {
		flex: 0 0 100%;

		@media ( min-width: 768px ) {
			flex: 0 0
				${ ( { $perRow = 2 } ) =>
					`calc(${ 100 / $perRow }% - ${
						( ( $perRow - 1 ) * 20 ) / $perRow
					}px)` };
		}
	}
`;

export default function Row( props: CommonControlProps ): JSX.Element {
	const { control } = props;
	return (
		<StyledRow $perRow={ size( control.controls ) }>
			<PrivateControls { ...props } controls={ control.controls } />
		</StyledRow>
	);
}
