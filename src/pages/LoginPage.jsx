import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        } else {
            alert('Login failed. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
        >
            <Box
                bgcolor="background.paper"
                p={4}
                borderRadius={2}
                boxShadow={4}
                maxWidth={400}
                mx="auto"
            >
                <Box mb={2} textAlign="center">
                    <h1 className="text-3xl font-bold">Control de inventario</h1>
                    <p>Inicia sesión para administrar el inventario de tu tienda</p>
                    <p>Credenciales -> admin@admin:admin</p>
                </Box>
                <form onSubmit={handleLogin}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            variant="outlined"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Button fullWidth type="submit" variant="contained">
                        Iniciar sesión
                    </Button>
                </form>
                <Box mt={2} textAlign="center">
                    <p>
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register">
                            Regístrate
                        </Link>
                    </p>
                </Box>
            </Box>
        </Box>
    );
}