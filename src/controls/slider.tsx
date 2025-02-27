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
import { getValue, isDisabled, memoCallback, updateAttribute } from '../utils';
import { memo } from 'react';

type SliderControl = Control & {
	max?: number;
	min?: number;
};

type SliderControlProps = ControlProps & {
	control: SliderControl;
};

const Slider = memo( ( props: SliderControlProps ) => {
	const { control } = props;

	const { max = 100, min = 0 } = control;

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
}, memoCallback );

export default Slider;
