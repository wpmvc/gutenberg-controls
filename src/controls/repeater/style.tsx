import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	max-width: 100%;
`;

export const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	overflow: auto;
`;

export const ItemContainer = styled.div< { dragging: number } >`
	display: flex;
	flex-direction: column;
	position: relative;
	background: #fff;
	border: 1px solid #e0e0e0;
	z-index: ${ ( props ) => ( props.dragging ? 999 : 1 ) };
	transition: all 0.2s ease;
`;

export const ItemHeader = styled.div< { fixed: string } >`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	z-index: ${ ( props ) =>
		'true' === props.fixed ? 'inherit' : 'pointer' };
`;

export const ItemHeaderContent = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const ItemHeaderActions = styled.div`
	display: flex;
	align-items: center;
`;

export const Input = styled.input`
	flex: 1;
	background: #f0f0f0;
	border: 1px solid #ccc;
	padding: 12px;
	color: #333;
	font-size: 14px;
	border-radius: 4px;
	outline: none;
	margin-bottom: 8px;

	&:focus {
		border-color: #007bff;
		box-shadow: 0 0 5px rgba( 0, 123, 255, 0.2 );
	}
`;

export const ButtonBase = styled.div`
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 6px;
	color: #888;
	transition: color 0.2s ease;

	&:hover {
		color: #007bff;
	}
`;

export const SortButton = styled( ButtonBase )`
	cursor: grab;
`;

export const Action = styled( ButtonBase )`
	padding: 10px;
	border-left: 1px solid #e0e0e0;
`;

export const Label = styled.div`
	font-size: 11px;
	font-weight: 500;
	line-height: 1.4;
	text-transform: uppercase;
	margin-bottom: 8px;
	padding: 0;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 12px;
`;
