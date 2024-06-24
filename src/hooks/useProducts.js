import { useState, useEffect } from 'react';
import * as api from '../services/api.js';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [productStock, setProductStock] = useState([]);

    useEffect(() => {
        loadProducts();
        loadProductsStock();
    }, []);

    async function loadProductsStock() {
        try{
            const products = await api.getProductsStock();
            setProductStock(products);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    async function loadProducts() {
        try{
            const products = await api.getProducts();
            setProducts(products);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    async function addProduct(product) {
        try {
            console.log(product)
            const newProduct = await api.createProduct(product);
            setProducts([...products, newProduct]);
        }
        catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    async function updateProduct(product) {
        try {
            const updatedProduct = await api.updateProduct(product);
            setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
        }
        catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    async function removeProduct(productId) {
        try {
            await api.deleteProduct(productId);
            setProducts(products.filter(p => p.id !== productId));
        }
        catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }

    return {
        products,
        productStock,
        addProduct,
        updateProduct,
        loadProducts,
        removeProduct
    };
}