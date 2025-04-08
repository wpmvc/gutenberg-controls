/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';
import { Icon, copy, trash } from '@wordpress/icons';

/**
 * External dependencies
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { findIndex, isEmpty } from 'lodash';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { PrivateControls } from '..';
import { SortableItemProps } from './types';
import { splitControls } from './utils';
import {
	Action,
	ItemContainer,
	ItemHeader,
	ItemHeaderActions,
	ItemHeaderContent,
	SortButton,
} from './styles';

const SortableItem = ( {
	item,
	onRemove,
	onDuplicate,
	onToggleCollapse,
	repeaterProps,
	isDisabledRemove,
}: SortableItemProps ) => {
	const {
		attributes: dragAttributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable( { id: item.id } );

	const { attr_key, attributes, control, setAttributes } = repeaterProps;
	const attribute = attributes[ attr_key ];
	const itemIndex = findIndex( attribute, { id: item.id } );

	const updateAttributes = ( newAttributes: any ) => {
		const updatedValues = [ ...attribute ];
		updatedValues[ itemIndex ] = {
			...updatedValues[ itemIndex ],
			...newAttributes,
		};
		setAttributes( { [ attr_key ]: updatedValues } );

		if ( control?.onChange ) {
			control.onChange( {
				...repeaterProps,
				updatedValues,
				repeaterIndex: itemIndex,
			} );
		}
	};

	const { headerControls, bodyControls } = splitControls(
		control.controls as Record< string, any >,
		control?.showControlInHeader
	);

	return (
		<ItemContainer
			ref={ setNodeRef }
			style={ {
				transform: CSS.Transform.toString( transform ),
				transition,
			} }
			dragging={ isDragging ? 1 : 0 }
			className="repeater-item"
		>
			<ItemHeader
				fixed={ control?.fixed ? control.fixed.toString() : 'false' }
				onClick={ () => onToggleCollapse( item.id ) }
				className="repeater-header"
			>
				<ItemHeaderContent className="repeater-header-content">
					<SortButton
						{ ...listeners }
						{ ...dragAttributes }
						className="repeater-sort-button"
					>
						<span className="dashicons dashicons-move"></span>
					</SortButton>
					<span className="repeater-item-label">
						{ ! control?.hideLabel &&
							( item[ control?.labelField ?? 'defaultField' ] ??
								`Item #${ item.id }` ) }
						{ control?.showControlInHeader && (
							<PrivateControls
								{ ...repeaterProps }
								attributes={ attribute[ itemIndex ] }
								setAttributes={ updateAttributes }
								controls={ headerControls }
							/>
						) }
					</span>
				</ItemHeaderContent>
				{ control?.actions && (
					<ItemHeaderActions className="header-actions">
						{ <control.actions /> }
					</ItemHeaderActions>
				) }
				{ ! control?.fixed && ! control?.actions && (
					<ItemHeaderActions className="header-actions">
						{ ( undefined === control?.allowDuplication ||
							control.allowDuplication ) && (
							<Action
								onClick={ ( event ) => {
									event.stopPropagation();
									onDuplicate( item.id );
								} }
								className="copy"
							>
								<Icon icon={ copy } />
							</Action>
						) }
						<Action
							onClick={ ( event ) => {
								event.stopPropagation();
								onRemove( item.id );
							} }
							className={ clsx( 'remove', {
								disabled: isDisabledRemove,
							} ) }
						>
							<Icon icon={ trash } />
						</Action>
					</ItemHeaderActions>
				) }
			</ItemHeader>
			{ ! isEmpty( bodyControls ) && ! item.collapsed && (
				<div
					style={ {
						padding: 10,
						borderTop: '1px solid #e0e0e0',
					} }
					className="repeater-item-content"
				>
					<PrivateControls
						{ ...repeaterProps }
						attributes={ attribute[ itemIndex ] }
						setAttributes={ updateAttributes }
						controls={ bodyControls }
					/>
				</div>
			) }
		</ItemContainer>
	);
};

// Create a named export with explicit typing
export const MemoizedSortableItem = memo(
	SortableItem
) as React.NamedExoticComponent< SortableItemProps >;

// Keep default export for backward compatibility
export default MemoizedSortableItem;
