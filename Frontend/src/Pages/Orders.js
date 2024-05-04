import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../components/admin/AdminNav';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:4010/admin/get-orders");
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (orderNo, index) => {
        try {
            await axios.delete(`http://localhost:4010/orders/${orderNo}`);
            const updatedOrders = [...orders];
            updatedOrders.splice(index, 1);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error deleting order:', error);
            setError('Failed to delete order');
        }
    };

    const handleAction = async (orderNo, status) => {
        try {

            const index = orders.findIndex(order => order.Order_No === orderNo);
            if (index === -1) {
                console.error('Order not found');
                return;
            }

            const updatedOrders = [...orders];
            updatedOrders[index].status = status;
            setOrders(updatedOrders);

            await axios.put(`http://localhost:4010/orders/${orderNo}`, { status });
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const getColorStatus = (status) => {
        switch (status) {
            case 'shipped':
                return 'bg-yellow-100';
            case 'delivered':
                return 'bg-green-100';
            case 'canceled':
                return 'bg-red-100';
            default:
                return '';
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-4">Orders</h1>
                {error && <p className="text-red-500">{error}</p>}
                {orders.length === 0 ? (
                    <p className='text-lg text-gray-600'>No order found.</p>
                ) : (
                    <div className="flex flex-col-reverse gap-6">
                        {orders.map((order, index) => (
                            <div key={index} className={`border rounded p-4 ${getColorStatus(order.status)}`}>
                                <h2 className="text-lg font-semibold mb-2 flex justify-between">
                                    <span>Order No: {order.Order_No}</span>
                                    <span className="font-bold">Status: {order.status}</span>
                                </h2>
                                <p className="text-sm text-gray-600 mb-1 ml-2">Date & Time: {order.createdAt}</p>
                                <p className="text-lg font-semibold mb-2">User Details:</p>
                                <p className="text-sm text-gray-600 mb-1 ml-2">Name: {order.firstName} {order.lastName}</p>
                                <p className="text-sm text-gray-600 mb-1 ml-2">Email: {order.email}</p>
                                <p className="text-sm text-gray-600 mb-1 ml-2">Contact Number: {order.phone}</p>
                                <p className="text-sm text-gray-600 mb-1 ml-2">Address: {order.address}, {order.postalCode}, {order.city}, {order.country}</p>
                                <p className="text-sm text-gray-600 mb-1 ml-2">News Subscription: {order.newsSub ? 'Yes' : 'No'}</p>
                                <p className="text-sm text-gray-600 mb-1 ml-2">Save Information: {order.saveInfo ? 'Yes' : 'No'}</p>
                                <div className="grid grid-cols-4 gap-2">
                                    <p className="text-lg font-semibold ml-2">Product</p>
                                    <p className="text-lg font-semibold text-right mr-2">Quantity</p>
                                    <p className="text-lg font-semibold text-right mr-2">Size</p>
                                    <p className="text-lg font-semibold text-right mr-2">Price</p>
                                </div>
                                {order.product.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-2">
                                        <p className="text-sm ml-2">{item.title}</p>
                                        <p className="text-sm text-right mr-2">{item.quantity}</p>
                                        <p className="text-sm text-right mr-2">{item.size}</p>
                                        <p className="text-sm text-right mr-2">${item.price}</p>
                                    </div>
                                ))}
                                <hr className="my-2" />
                                <p className="text-sm text-right mr-2">Shipping: ${order.shippingFee}</p>
                                <p className="text-sm font-semibold text-right mr-2">Total: ${order.total}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <button
                                            onClick={() => handleAction(order.Order_No, 'received')}
                                            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Received
                                        </button>
                                        <button
                                            onClick={() => handleAction(order.Order_No, 'shipped')}
                                            className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Shipped
                                        </button>
                                        <button
                                            onClick={() => handleAction(order.Order_No, 'delivered')}
                                            className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delivered
                                        </button>
                                        <button
                                            onClick={() => handleAction(order.Order_No, 'canceled')}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Canceled
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleDelete(order.Order_No, index)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delete Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
