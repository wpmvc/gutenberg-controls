/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import {
	getValue,
	isDisabled,
	memoCallback,
	updateAttribute,
} from '../../utils';
import { memo } from 'react';
import { SliderControlProps } from './types';

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
			required={ control?.required }
		/>
	);
}, memoCallback );

export default Slider;
