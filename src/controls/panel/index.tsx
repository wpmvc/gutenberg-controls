/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { PrivateControls } from '..';
import { PanelControlProps } from './types';

export default function Panel( props: PanelControlProps ): JSX.Element {
	const { control } = props;
	return (
		<PanelBody
			title={ control.label }
			initialOpen={
				! control.label ? true : control?.initialOpen ?? false
			}
		>
			<PrivateControls { ...props } controls={ control.controls } />
		</PanelBody>
	);
}
