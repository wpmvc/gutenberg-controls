/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	//@ts-ignore
} from '@wordpress/components';
//@ts-ignore
import { __experimentalBorderRadiusControl as BorderRadiusControl } from '@wordpress/block-editor';
//@ts-ignore
import { useViewportMatch } from '@wordpress/compose';

/**
 * External dependencies
 */
import { isEqual } from 'lodash';
import { getValue, updateAttribute } from '../utils';
import { Control, ControlProps } from '../types/control';

/**
 * Types for the props of the Border component.
 */
type BorderControl = Control & {
	options?: string[];
	insidePanel?: boolean;
};

type BorderControlProps = ControlProps & {
	control: BorderControl;
};

export default function Border( props: BorderControlProps ): JSX.Element {
	const { attr_key, control, metaData, placement, offset } = props;
	const options = control.options ?? [ 'border', 'radius' ];
	const panelId = attr_key;
	const defaultValues = metaData.attributes[ attr_key ]?.default ?? {};
	const attribute = getValue( props );

	/**
	 * Checks if a value differs from the default.
	 */
	const hasValue = ( elementName: string ) =>
		! isEqual(
			attribute[ elementName ] ?? {},
			defaultValues[ elementName ] ?? {}
		);

	/**
	 * Handles attribute changes.
	 */
	const onChange = ( key: string, value: any ) => {
		updateAttribute( { ...attribute, [ key ]: value }, props );
	};

	/**
	 * Resets a single attribute to its default value.
	 */
	const onDeselect = ( key: string ) => {
		updateAttribute(
			{ ...attribute, [ key ]: defaultValues[ key ] },
			props
		);
	};
	function dropdownProps() {
		const isMobile = useViewportMatch( 'medium', '<' );
		return ! isMobile
			? {
					popoverProps: {
						placement: placement ? placement : 'left-start',
						// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
						offset: offset ? offset : 259,
					},
			  }
			: {};
	}

	return (
		<ToolsPanel
			label={ control.label ?? __( 'Border' ) }
			resetAll={ () => updateAttribute( defaultValues, props ) }
			panelId={ panelId }
			dropdownMenuProps={ {
				...dropdownProps(),
				label: control.label ?? __( 'Border' ),
			} }
			style={
				control?.insidePanel
					? {
							paddingLeft: 0,
							paddingRight: 0,
							paddingTop: 0,
							border: 0,
					  }
					: {}
			}
		>
			{ options.includes( 'border' ) && (
				<ToolsPanelItem
					hasValue={ () => hasValue( 'border' ) }
					label={ __( 'Border' ) }
					onDeselect={ () => onDeselect( 'border' ) }
					panelId={ panelId }
				>
					<BorderBoxControl
						enableAlpha
						value={ attribute.border ?? {} }
						onChange={ ( value: any ) =>
							onChange( 'border', value )
						}
						popoverOffset={ 40 }
						popoverPlacement="left-start"
						__experimentalIsRenderedInSidebar
						size="__unstable-large"
						label={ __( 'Border' ) }
					/>
				</ToolsPanelItem>
			) }
			{ options.includes( 'radius' ) && (
				<ToolsPanelItem
					hasValue={ () => hasValue( 'radius' ) }
					label={ __( 'Radius' ) }
					onDeselect={ () => onDeselect( 'radius' ) }
					panelId={ panelId }
				>
					<BorderRadiusControl
						values={ attribute.radius ?? {} }
						onChange={ ( value: any ) =>
							onChange( 'radius', value )
						}
					/>
				</ToolsPanelItem>
			) }
		</ToolsPanel>
	);
}
