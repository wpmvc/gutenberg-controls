/**
 * WordPress dependencies
 */
import styled from 'styled-components';
import { GroupControlProps } from './types';
import { PrivateControls } from '..';

const StyledGroup = styled.div< {
	$perRow?: number;
} >`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;

	.components-base-control {
		flex: 0 0
			${ ( { $perRow = 2 } ) =>
				`calc(${ 100 / $perRow }% - ${
					( ( $perRow - 1 ) * 20 ) / $perRow
				}px)` };
	}
`;

export default function Group( props: GroupControlProps ): JSX.Element {
	const { control } = props;
	return (
		<StyledGroup $perRow={ control.perRow }>
			<PrivateControls { ...props } controls={ control.controls } />
		</StyledGroup>
	);
}
