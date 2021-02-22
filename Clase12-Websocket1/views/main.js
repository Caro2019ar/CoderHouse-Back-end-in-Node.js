let socket = io.connect();
var today = new Date();

function renderProduto(prodData) {
	var html = prodData
		.map(function (elem, index) {
			return `<tr>
                    <td>${elem.title}</td>
					<td>${elem.price}</td>
					<td><img src=${elem.thumbnail} width=40 height=40></td>
					</tr>`;
		})
		.join(" ");
	document.getElementById("listaProd").innerHTML = html;
}

socket.on("produtos", function (prodData) {
	renderProduto(prodData);
});

function addProduto(e) {
	var produto = {
		title: document.getElementById("title").value,
		price: document.getElementById("price").value,
		thumbnail: document.getElementById("thumbnail").value,
	};
	socket.emit("new-produto", produto);
	document.getElementById("formProd").reset();
	return false;
}
