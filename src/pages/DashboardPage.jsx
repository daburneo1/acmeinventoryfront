import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Select,
    MenuItem,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    InputLabel
} from '@mui/material';
import {Link} from 'react-router-dom';
import '../assets/styles/index.css';
import useProducts from '../hooks/useProducts';
import useProviders from '../hooks/useProviders';
import useOrders from "../hooks/useOrders.js";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

export default function Component() {
    const {products, productStock, addProduct, loadProductsStock, loadProducts
    } = useProducts();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0)
    const [stockMinimo, setStockMinimo] = useState(0);
    const [proveedorId, setProveedorId] = useState('');

    const {addProvider, providers} = useProviders();
    const [providerName, setProviderName] = useState('');
    const [providerAddress, setProviderAddress] = useState('');
    const [providerPhone, setProviderPhone] = useState('');
    const [providerEmail, setProviderEmail] = useState('');

    // Estados para los campos del formulario de pedido
    const {addOrder, updateOrder, orders, loadOrders} = useOrders();
    const [orderDate, setOrderDate] = useState('');
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const [orderProvider, setOrderProvider] = useState('');
    const [orderQuantity, setOrderQuantity] = useState('');


    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const getLastDaysOfEachMonth = () => {
        const year = new Date().getFullYear();
        const today = new Date();
        const dates = [];
        for (let month = 0; month < 12; month++) {
            const lastDay = new Date(year, month + 1, 0);
            if (lastDay <= today) {
                dates.push(lastDay);
            }
        }
        return dates;
    };

    //Informes
    const lastDays = getLastDaysOfEachMonth();

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const product = {
            nombre: productName,
            descripcion: description,
            stock: parseInt(stock),
            stock_minimo: parseInt(stockMinimo),
            precio: parseFloat(price).toFixed(2),
            proveedor: proveedorId,
        };
        addProduct(product);
        loadProducts();
        loadProductsStock();
        setProductName('');
        setDescription('');
        setPrice(0);
        setStock(0);
        setStockMinimo(0);
        setProveedorId('');
    };

    const handleProviderSubmit = (e) => {
        e.preventDefault();
        const provider = {
            nombre: providerName,
            direccion: providerAddress,
            telefono: providerPhone,
            correo: providerEmail,
        };
        addProvider(provider);
        setProviderName('');
        setProviderAddress('');
        setProviderPhone('');
        setProviderEmail('');
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const order = {
            proveedor: orderProvider,
            fecha_entrega: orderDate,
            producto: orderProducts,
            cantidad_solicitada: orderQuantity,
            estado: orderStatus,
        };
        try {
            addOrder(order);
            loadOrders();
            setOrderDate('');
            setOrderProducts([]);
            setOrderQuantity('');
            setOrderStatus('');
            setOrderProvider('');
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
    };

    const handleOrderCancel = (e) => {
        e.preventDefault();
        setOrderDate('');
        setOrderProducts([]);
        setOrderQuantity('');
        setOrderStatus('');
        setOrderProvider('');
    }

    const handleOrderReceived = async (orderId) => {
        const order = orders.find(order => order.id === orderId);
        if (!order) {
            console.error('Pedido no encontrado:', orderId);
            return;
        }
        order.estado_entrega = 'ENTREGADO';
        try {
            await updateOrder(order);
            loadOrders();
        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
        }
    };

    const handleLogout = () => {
        console.log('Cerrar sesión');
        logout();
        navigate('/login');
    };


    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex items-center justify-between bg-background px-6 py-4 shadow">
                <div className="flex items-center gap-4">
                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                        <Package2Icon className="h-6 w-6"/>
                        <span>Acme Inventario</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            Productos
                        </Link>
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            Pedidos
                        </Link>
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            Alertas
                        </Link>
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            Informes
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </div>
            </header>
            <main className="flex-1 grid gap-6 p-6 md:p-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Ventas Totales</Typography>
                                    <DollarSignIcon className="h-5 w-5 text-muted-foreground"/>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent>
                            <div className="text-3xl font-bold">$123,456</div>
                            <p className="text-sm text-muted-foreground">+15% desde el mes pasado</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Alertas de Inventario</Typography>
                                    <TriangleAlertIcon className="h-5 w-5 text-muted-foreground"/>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent>
                            <div className="text-3xl font-bold">8</div>
                            <p className="text-sm text-muted-foreground">Artículos con poco stock</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Nuevos pedidos</Typography>
                                    <ShoppingCartIcon className="h-5 w-5 text-muted-foreground"/>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent>
                            <div className="text-3xl font-bold">42</div>
                            <p className="text-sm text-muted-foreground">En los últimos 7 días</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader title="Registrar nuevo producto"/>
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Nombre del producto"
                                variant="outlined"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Descripción"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Precio"
                                variant="outlined"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                variant="outlined"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Stock mínimo"
                                variant="outlined"
                                value={stockMinimo}
                                onChange={(e) => setStockMinimo(e.target.value)}
                            />
                            <TextField
                                select
                                fullWidth
                                label="Proveedor"
                                variant="outlined"
                                value={proveedorId}
                                onChange={(e) => setProveedorId(e.target.value)}
                            >
                                {providers && providers.map((provider) => (
                                    <MenuItem key={provider.id} value={provider.id}>
                                        {provider.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button variant="outline" className="w-full" onClick={handleProductSubmit}>
                                Registrar producto
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Alertas de Inventario</Typography>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent>
                            <div className="grid gap-4">
                                {productStock && productStock.map((product) => (
                                    <div className="flex items-center justify-between" key={product.id}>
                                        <div>
                                            <p className="font-medium">{product.nombre}</p>
                                            <p className="text-sm text-muted-foreground">Solo quedan {product.stock} en
                                                stock</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Reabastecer
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Registrar pedidos</Typography>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="supplier">Proveedor</InputLabel>
                                    <Select id="order-provider" value={orderProvider} onChange={(e) => setOrderProvider(e.target.value)}>
                                        {providers.map((provider) => (
                                            <MenuItem key={provider.id} value={provider.id}>
                                                {provider.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="order-date">Fecha de Pedido</InputLabel>
                                    <Input id="order-date" type="date" value={orderDate}
                                           onChange={(e) => setOrderDate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <InputLabel htmlFor="products">Productos</InputLabel>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Select id="products" value={orderProducts} onChange={(e) => setOrderProducts(e.target.value)}>
                                                    {products.map((product) => (
                                                        <MenuItem key={product.id} value={product.id}>
                                                            {product.nombre}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Input type="number" placeholder="Cantidad" value={orderQuantity} onChange={(e) => setOrderQuantity(e.target.value)}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="status">Estado del Pedido</InputLabel>
                                    <Select id="status" value={orderStatus}
                                            onChange={(e) => setOrderStatus(e.target.value)}>
                                        <MenuItem value="pendiente">Pendiente</MenuItem>
                                        <MenuItem value="recibido">Recibido</MenuItem>
                                    </Select>
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button onClick={handleOrderSubmit}>Guardar Pedido</Button>
                                    <Button variant="outline" onClick={handleOrderCancel}>Cancelar</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Pedidos a proveedores</Typography>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent>
                            <div className="grid gap-4">
                                {orders && orders.map((order) => (
                                    <div className="flex items-center justify-between" key={order.id}>
                                        <div>
                                            <p className="font-medium">Pedido #{order.id}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Proveedor: {order.proveedor.nombre}, Fecha de entrega: {new Date(order.fecha_entrega).toLocaleDateString()}, Estado #{order.estado_entrega}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {order.estado_entrega === 'PENDIENTE' && (
                                                <div>
                                                    <Button onClick={() => handleOrderReceived(order.id)}>Marcar como Recibido</Button>
                                                    <Button variant="outline" size="sm" color="red">
                                                        Cancelar
                                                    </Button>
                                                </div>
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant="h6">Informes</Typography>
                                </div>
                            }
                            subheader=""
                        />
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="report-type">Tipo de Informe</InputLabel>
                                    <Select>
                                        <MenuItem value="ventas-periodo">Ventas por Periodo</MenuItem>
                                        <MenuItem value="rotacion-inventario">Rotación de Inventario</MenuItem>
                                        <MenuItem value="tendencia-productos">Tendencia de Productos</MenuItem>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="report-period">Periodo</InputLabel>
                                    <Select>
                                        {lastDays.map((date, index) => (
                                            <MenuItem key={index} value={date}>
                                                {date.toLocaleDateString()}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button>Exportar informe a Excel</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Registrar nuevo proveedor"/>
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Nombre del proveedor"
                                variant="outlined"
                                value={providerName}
                                onChange={(e) => setProviderName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Dirección del proveedor"
                                variant="outlined"
                                value={providerAddress}
                                onChange={(e) => setProviderAddress(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Teléfono del proveedor"
                                variant="outlined"
                                value={providerPhone}
                                onChange={(e) => setProviderPhone(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Correo del proveedor"
                                variant="outlined"
                                value={providerEmail}
                                onChange={(e) => setProviderEmail(e.target.value)}
                            />
                            <Button variant="outline" className="w-full" onClick={handleProviderSubmit}>
                                Registrar proveedor
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

function DollarSignIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
    )
}

function Package2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
            <path d="M12 3v6"/>
        </svg>
    )
}


function ShoppingCartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
    )
}

function TriangleAlertIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
        </svg>
    )
}