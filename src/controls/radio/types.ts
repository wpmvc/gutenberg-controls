import { BaseControl, BaseControlProps, Options } from '../../types/control';

export type RadioControlType = BaseControl & {
	type: 'radio';
	options: Options;
};

export type RadioControlProps = BaseControlProps & {
	control: RadioControlType;
};
