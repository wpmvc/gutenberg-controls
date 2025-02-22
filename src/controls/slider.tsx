/**
 * WordPress dependencies
 */
//@ts-ignore
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Control, ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

interface SliderControl extends Control {
	max?: number;
	min?: number;
}

interface SliderControlProps extends ControlProps {
	control: SliderControl;
}

export default function Slider( props: SliderControlProps ) {
	const { control } = props;

	const { max = 100, min = 0 } = control || {};

	return (
		<RangeControl
			//@ts-ignore
			label={ <Label { ...props } /> }
			max={ max }
			min={ min }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ control?.className }
		/>
	);
}
