/**
 * WordPress dependencies
 */
//@ts-ignore
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, updateAttribute } from '../utils';

export default function Slider( props: ControlProps ) {
	const { control } = props;

	const { label, max = 100, min = 0 } = control || {};

	return (
		<RangeControl
			label={
				<Label { ...props } control={ control }>
					{ label }
				</Label>
			}
			max={ max }
			min={ min }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
		/>
	);
}
