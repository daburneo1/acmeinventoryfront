import {useEffect, useState} from 'react';
import * as api from '../services/api.js';

export default function useProviders() {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        loadProviders();
    }, []);

    async function loadProviders() {
        try {
            const providers = await api.getProviders();
            setProviders(providers);
        } catch (error) {
            console.error('Error al cargar los proveedores:', error);
        }
    }

    async function addProvider(provider) {
        try {
            const newProvider = await api.createProvider(provider);
            setProviders([...providers, newProvider]);
        } catch (error) {
            console.error('Error al agregar proveedor:', error);
        }
    }

    return {
        providers,
        addProvider,
    };
}