/**
 * WordPress dependencies
 */
import { ComponentType, Fragment, useMemo } from '@wordpress/element';

/**
 * External dependencies
 */
import { has } from 'lodash';
import { Control, ControlProps, ControlRootProps } from '../types/control';

/**
 * Internal dependencies
 */
import styled from 'styled-components';
import Border from './border';
import PickColor from './color-picker';
import Colors from './colors';
import Dimension from './dimension';
import Group from './group';
import Height from './height';
import Notice from './notice';
import Number from './number';
import Checkbox from './checkbox';
import Panel from './panel';
import Radio from './radio';
import Repeater from './repeater';
import Row from './row';
import Select from './select';
import Slider from './slider';
import Switch from './switch';
import Tabs from './tabs';
import Text from './text';
import ToggleGroup from './toggle-group';

/**
 * Mapping of control types to their respective components
 * Sorted by control type for consistent rendering order
 */
const defaultComponents: {
	//@ts-ignore
	[ key: string ]: ComponentType< ControlProps >;
} = {
	tabs: Tabs,
	color: PickColor,
	colors: Colors,
	group: Group,
	checkbox: Checkbox,
	border: Border,
	dimension: Dimension,
	height: Height,
	notice: Notice,
	number: Number,
	panel: Panel,
	radio: Radio,
	select: Select,
	slider: Slider,
	switch: Switch,
	text: Text,
	toggleGroup: ToggleGroup,
	repeater: Repeater,
	row: Row,
};

const StyledControls = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

/**
 * Individual control renderer with error handling
 */
const ControlRenderer: React.FC< {
	controlKey: string;
	control: Control;
  //@ts-ignore
	ControlView: ComponentType< ControlProps >;
	props: ControlProps;
} > = ( { controlKey, control, ControlView, props } ) => {
	// Skip rendering if condition is not met
	if (
		has( control, 'condition' ) &&
		control.condition &&
		! control.condition( props.attributes )
	) {
		return null; // Control is hidden based on the condition
	}

	return (
		<ControlView
			{ ...props }
			key={ controlKey } // Use control key for each component to ensure uniqueness
			attrKey={ controlKey }
			control={ control }
		/>
	);
};

/**
 * PrivateControls component that dynamically renders various control components
 * based on the `controls` prop provided.
 *
 * @param {ControlProps} props Component props
 * @returns {JSX.Element | null} Rendered control components or null
 */
export function PrivateControls( props: ControlProps ): JSX.Element | null {
	const { controls, attributes, components } = props;
	/**
	 * Memoized list of control keys to prevent unnecessary recalculation
	 * on re-renders.
	 */
	const processedControls = useMemo( () => {
		const controlEntries = Object.entries( controls );

		if ( controlEntries.length === 0 ) {
			return [];
		}

		return controlEntries
			.filter( ( [ _, control ] ) => {
				// Filter out invalid controls early
				return control && typeof control === 'object' && control.type;
			} )
			.map( ( [ key, control ] ) => {
				const ControlView = components[ control.type ];

				if ( ! ControlView ) {
					console.warn(
						`No control component found for type: "${ control.type }"`
					);
					return null;
				}

				return {
					key,
					control,
					ControlView,
				};
			} )
			.filter( Boolean );
	}, [ controls, components ] );

	// Early return if no controls exist
	if ( processedControls.length === 0 ) {
		return null;
	}
	return (
		<Fragment>
      {/* @ts-ignore */}
			{ processedControls.map( ( { key, control, ControlView } ) => (
				<ControlRenderer
					key={ key }
					controlKey={ key }
					control={ control }
					ControlView={ ControlView }
					props={ props }
				/>
			) ) }
		</Fragment>
	);
}

/**
 * @param {ControlRootProps} props Component props
 * @returns {JSX.Element | null} Rendered control components or null
 */
export default function Controls(
	props: ControlRootProps
): JSX.Element | null {
	const { components = {} } = props;

	// Memoize merged components to prevent unnecessary re-renders
	const mergedComponents = useMemo(
		() => ( { ...defaultComponents, ...components } ),
		[ components ]
	);

	return (
		<StyledControls>
			{ /* @ts-ignore */ }
			<PrivateControls { ...props } components={ mergedComponents } />
		</StyledControls>
	);
}
