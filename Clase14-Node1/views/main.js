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
	event.preventDefault();
	var produto = {
		title: document.getElementById("title").value,
		price: document.getElementById("price").value,
		thumbnail: document.getElementById("thumbnail").value,
	};
	socket.emit("new-produto", produto);
	document.getElementById("formProd").reset();
	return false;
}

function render(data) {
	var html = data
		.map(function (elem, index) {
			return `<div><strong style="color:blue">${
				elem.email
			}</strong> <span style="color:brown">[${today.toLocaleString("en-US")}]</span>:
				<em style="color:green">${elem.text}</em></div>`;
		})
		.join(" ");
	document.getElementById("messages").innerHTML = html;
}
socket.on("messages", function (data) {
	render(data);
});

function addMessage(e) {
	event.preventDefault();
	var mensaje = {
		email: document.getElementById("email").value,
		text: document.getElementById("texto").value,
	};
	socket.emit("new-message", mensaje);
	document.getElementById("formMess").reset();
	return false;
}
