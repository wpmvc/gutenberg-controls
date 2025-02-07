/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import * as React from 'react';

/**
 * External dependencies
 */
import { has } from 'lodash';
import { ControlProps } from './types/control';

/**
 * Internal dependencies
 */
import Checkbox from './controls/panel';
import Border from './controls/border';
import Dimension from './controls/dimension';
import Height from './controls/height';
import Number from './controls/number';
import Panel from './controls/panel';
import PickColor from './controls/color-picker';
import Radio from './controls/radio';
import Select from './controls/select';
import Slider from './controls/slider';
import Switch from './controls/switch';
import Text from './controls/text';
import Colors from './controls/colors';
import ToggleGroup from './controls/toggle-group';

/**
 * Mapping of control types to their respective components
 * Sorted by control type for consistent rendering order
 */
const controlGenerators: {
	[ key: string ]: React.ComponentType< ControlProps >;
} = {
	color: PickColor as React.ComponentType< ControlProps >,
	colors: Colors,
	checkbox: Checkbox,
	border: Border,
	dimension: Dimension,
	height: Height,
	number: Number,
	panel: Panel,
	radio: Radio as React.ComponentType< ControlProps >,
	select: Select,
	slider: Slider,
	switch: Switch,
	text: Text,
	toggle_group: ToggleGroup,
};

/**
 * Controls component that dynamically renders various control components
 * based on the `controls` prop provided.
 *
 * @param {ControlProps} props Component props
 * @returns {JSX.Element | null} Rendered control components or null
 */
const Controls: React.FC< ControlProps > = ( {
	controls,
	attributes,
	...props
}: ControlProps ): JSX.Element | null => {
	/**
	 * Memoized list of control keys to prevent unnecessary recalculation
	 * on re-renders.
	 */
	const _controls = controls ?? {};
	const controlKeys = useMemo(
		() => Object.keys( _controls ),
		[ _controls ]
	);

	// Early return if no controls exist
	if ( controlKeys.length === 0 ) {
		return null;
	}

	return (
		<>
			{ controlKeys.map( ( key ) => {
				const control = _controls[ key ] ?? {};

				// Dynamically select the control component based on the control.type
				const ControlView = controlGenerators[ control?.type ];

				// If no control component exists, log an error and skip rendering
				if ( ! ControlView ) {
					console.error(
						`No control component found for type: ${ control?.type }`
					);
					return null;
				}

				// Skip rendering if the condition for the control is not met
				if (
					has( control, 'condition' ) &&
					control.condition &&
					! control.condition( attributes )
				) {
					return null; // Control is hidden based on the condition
				}

				// Return the actual control component with the necessary props
				return (
					<ControlView
						{ ...props }
						key={ key } // Use control key for each component to ensure uniqueness
						attr_key={ key }
						control={ control }
						attributes={ attributes }
					/>
				);
			} ) }
		</>
	);
};

export { Controls };
