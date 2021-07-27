import request from "supertest";
import { expect } from "chai";

describe("test api rest full", () => {
	describe("Probando el GET", () => {
		it("debería retornar un status 200", async () => {
			let response = await request("http://localhost:8080").get(
				"/api/productos/listar"
			);
			expect(response.status).to.eql(200);
		});
	});
	describe("Probando el POST", () => {
		it("debería incorporar un producto", async () => {
			let producto = {
				title: "producto nuevo",
				price: 100,
				thumbnail: "http//www.teste.com",
			};
			let response = await request("http://localhost:8080")
				.post("/api/productos/guardar")
				.send(producto);
			expect(response.status).to.eql(200);

			const prod = response.body;
			expect(prod).to.include.keys("title", "price", "thumbnail");
			expect(prod.title).to.eql("producto nuevo");
			expect(prod.price).to.eql(100);
			expect(prod.title).to.eql(producto.title);
			expect(prod.price).to.eql(producto.price);
			expect(prod.thumbnail).to.eql(producto.thumbnail);
		});
	});
	describe("Probando el PUT", () => {
		it("debería actualizar un producto", async () => {
			let producto = {
				title: "actualizado producto teste",
				price: 90,
				thumbnail: "http//www.teste2.com",
			};
			let response = await request("http://localhost:8080")
				.put("/api/productos/actualizar/60fdd123d404eb2e2bd677a5")
				.send(producto);

			expect(response.status).to.eql(200);

			const prod = response.body;
			expect(prod).to.include.keys("title", "price", "thumbnail");
			expect(prod.title).to.eql("actualizado producto teste");
			expect(prod.price).to.eql(90);
		});
	});
	describe("Probando el DELETE", () => {
		it("debería borrar un producto", async () => {
			let response = await request("http://localhost:8080").delete(
				"/api/productos/borrar/60ffe87d6028055a8d9e5116"
			);
			expect(response.status).to.eql(200);
			const resp = response.body;
			expect(resp).to.include.keys("deletedCount");
			expect(resp.deletedCount).to.eql(1);
		});
	});
});
