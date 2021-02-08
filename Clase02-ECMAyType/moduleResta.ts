export default class Resta {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	resultado = () => {
		return this.x - this.y;
	};
}
