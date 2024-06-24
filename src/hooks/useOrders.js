import {useEffect, useState} from 'react';
import * as api from '../services/api.js';

export default function useOrders() {
    const [orders, setOrders] = useState([]);
    const [orderDetail] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const orders = await api.getOrders();
            setOrders(orders);
        } catch (error) {
            console.error('Error al cargar las ordenes:', error);
        }
    }

    async function addOrder(order) {
        try {
            const newOrder = await api.createOrder(order);
            setOrders([...orders, newOrder]);
        } catch (error) {
            console.error('Error al agregar orden:', error);
        }
    }

    async function updateOrder(order) {
        try {
            const updatedOrder = await api.updateOrder(order);
            setOrders(orders.map(o => o.id === order.id ? updatedOrder : o));
        } catch (error) {
            console.error('Error al actualizar orden:', error);
        }
    }
    //
    // async function removeOrder(orderId) {
    //     try {
    //         await api.deleteOrder(orderId);
    //         setOrders(orders.filter(o => o.id !== orderId));
    //     } catch (error) {
    //         console.error('Error al eliminar orden:', error);
    //     }
    // }
    //
    // async function loadOrderDetail(orderId) {
    //     try {
    //         const orderDetail = await api.getOrderDetail(orderId);
    //         setOrderDetail(orderDetail);
    //     } catch (error) {
    //         console.error('Error al cargar el detalle de la orden:', error);
    //     }
    // }

    return {
        orders,
        orderDetail,
        addOrder,
        updateOrder,
        // removeOrder,
        // loadOrderDetail,
    };
}