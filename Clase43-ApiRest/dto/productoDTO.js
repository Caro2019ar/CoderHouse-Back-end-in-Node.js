const productoSinInfo = ([producto]) => {
	return {
		title: producto.title,
		price: producto.price,
		thumbnail: producto.thumbnail,
	};
};

export default { productoSinInfo };
