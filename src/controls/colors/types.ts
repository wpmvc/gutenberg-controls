import { BaseControl, BaseControlProps } from '../../types/control';

export type ColorsControlType = BaseControl & {
	type: 'colors';
	items: { [ key: string ]: any };
	insidePanel?: boolean;
};

export type ColorsControlProps = BaseControlProps & {
	control: ColorsControlType;
};
