/**
 * WordPress dependencies
 */
//@ts-ignore
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, updateAttribute } from '../utils';

export default function Checkbox( props: ControlProps ): JSX.Element {
	const { control } = props;
	const { label } = control || {};

	return (
		<CheckboxControl
			//@ts-ignore
			label={
				<Label { ...props } control={ control }>
					{ label }
				</Label>
			}
			checked={ getValue( props ) }
			onChange={ ( value: boolean ) => updateAttribute( value, props ) }
		/>
	);
}
