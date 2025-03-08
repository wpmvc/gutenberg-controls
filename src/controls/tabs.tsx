/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { PrivateControls } from '.';
import styled from 'styled-components';
import { Control, ControlProps } from '../types/control';

// Styled component with TypeScript support
const StyledTabPanel = styled( TabPanel )< {
	tabsLength: number;
	selectedTabIndex: number;
} >`
	.components-tab-panel__tabs {
		display: flex;
		border-top: calc( 0.1em + 1px ) solid #f2f4f5;
		position: relative;

		&:after {
			position: absolute;
			content: '';
			width: calc( 100% / ${ ( props ) => props.tabsLength } );
			height: 2px;
			background: #007cba;
			bottom: 0;
			left: calc(
				( 100% / ${ ( props ) => props.tabsLength } ) *
					${ ( props ) => props.selectedTabIndex }
			);
			transition: 0.3s ease;
		}

		.components-button {
			flex: 1;
			height: auto;
			padding: 15px;
			border-right: 1px solid #d6d9dd;

			&:last-child {
				border-right: none;
			}

			&:after {
				content: none;
			}

			svg {
				fill: none;
				width: 18px;
				height: 18px;
			}

			.tab-title {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 6px;
			}

			&.is-active,
			&:hover {
				color: #0085ba;

				svg g path {
					fill: #0085ba;
				}
			}

			&.is-active:after {
				content: none;
			}
		}
	}
`;

type TabsControl = Control & {
	items: {
		[ key: string ]: { controls: any; icon?: JSX.Element; label: string };
	}; // Replace `any` with a more specific type if possible
};

type TabsControlProps = ControlProps & {
	control: TabsControl;
};

export default function Tabs( props: TabsControlProps ): JSX.Element {
	const { control } = props;
	const [ selectedTab, setSelectedTab ] = useState< string >( '' );

	const renderTabContent = ( tabName: string ) => {
		return (
			<PrivateControls
				{ ...props }
				controls={ control.items[ tabName ].controls }
			/>
		);
	};

	const tabs = Object.keys( control.items ).map( ( key ) => ( {
		name: key,
		title: (
			<span className="tab-title">
				{ control.items[ key ]?.icon }
				{ control.items[ key ].label }
			</span>
		),
	} ) );

	const selectedTabIndex = tabs.findIndex(
		( tab ) => tab.name === selectedTab
	);

	return (
		<StyledTabPanel
			className={ `control-tabs control-tabs--${ selectedTab }` }
			//@ts-ignore
			tabs={ tabs }
			onSelect={ setSelectedTab }
			tabsLength={ tabs.length }
			selectedTabIndex={ selectedTabIndex }
		>
			{ ( tab ) => renderTabContent( tab.name ) }
		</StyledTabPanel>
	);
}
