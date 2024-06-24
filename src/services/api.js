import axios from 'axios';

const API_URL = 'https://acmeinventory.onrender.com'

export async function updateOrder(order) {
    const response = await axios.put(`${API_URL}/pedidos/${order.id}/`, order);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al actualizar el pedido');
    }
}

export async function getOrders(){
    const response = await axios.get(`${API_URL}/pedidos/pedidos_con_proveedor/`);
    return response.data;
}

export async function createOrder(order) {
    const response = await axios.post(`${API_URL}/pedidos/`, order);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al crear el pedido');
    }
}

export async function getProducts() {
    const response = await axios.get(`${API_URL}/productos/`);
    return response.data;
}

export async function getProductsStock(){
    const response = await axios.get(`${API_URL}/productos/stock_bajo/`);
    return response.data;
}

export async function createProduct(product) {
    let data = {
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        stock_minimo: product.stock_minimo,
        precio: product.precio,
        proveedor: product.proveedor
    };

    const response = await axios.post(`${API_URL}/productos/`, data);
    if (response.status === 200) {
        return response;
    } else {
        throw new Error('Error al crear el producto');
    }
}

export async function updateProduct(product) {
    const response = await axios.put(`${API_URL}/productos/${product.id}/`, product);
    return response.data;
}

export async function deleteProduct(productId) {
    const response = await axios.delete(`${API_URL}/productos/${productId}/`);
    return response.data;
}

export async function createProvider(provider) {
    const response = await axios.post(`${API_URL}/proveedores/`, provider);
    console.log(response)
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al crear el proveedor');
    }
}

export async function getProviders() {
    const response = await axios.get(`${API_URL}/proveedores/`);
    return response.data;
}