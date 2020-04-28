
export class PhotoComparisonError extends Error {
	constructor() {
		super("An error ocurred comparing the photos");
		this.name = 'COMPARISON_ERROR';
		Error.captureStackTrace(this, this.constructor);
	}
}