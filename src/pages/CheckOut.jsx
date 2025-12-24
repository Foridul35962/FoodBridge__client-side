import { LocateFixed, MapPin, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import { setAddressMap, setLocation } from '../store/slice/mapSlice';
import axios from 'axios';
import { placeOrder } from '../store/slice/orderSlice';
import { toast } from 'react-toastify'
import OrderPlaced from './OrderPlaced';

const CheckOut = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)
    const { orderLoading } = useSelector((state) => state.order)

    const [addressInput, setAddressInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const { location, address } = useSelector((state) => state.map);

    const ReCenterMap = ({ location }) => {
        const map = useMap();
        if (location?.lat && location?.lon) {
            map.setView([location.lat, location.lon], 16, { animate: true });
        }
        return null;
    };

    const onDragEnd = (e) => {
        const latitude = e.target._latlng.lat;
        const longitude = e.target._latlng.lng;
        dispatch(setLocation({ latitude, longitude }));
        getAddressByLatLon(latitude, longitude);
    };


    const getAddressByLatLon = async (latitude, longitude) => {
        try {
            const res = await axios.get(`https://api.geoapify.com/v1/geoCODe/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`);
            const addressText = res?.data?.results[0]?.formatted;
            dispatch(setAddressMap(addressText));
        } catch (error) {
            console.error(error);
        }
    };


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            dispatch(setLocation({ latitude, longitude }));
            getAddressByLatLon(latitude, longitude);
        });
    };

    // Suggestion theke address select korle
    const handleSelectAddress = (feature) => {
        const { lat, lon, formatted } = feature.properties;
        dispatch(setLocation({ latitude: lat, longitude: lon }));
        dispatch(setAddressMap(formatted));
        setAddressInput(formatted);
        setSuggestions([]); // List bondho kora
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (addressInput.length > 3 && addressInput !== address) {
                try {
                    const res = await axios.get(
                        `https://api.geoapify.com/v1/geoCODe/autocomplete?text=${encodeURIComponent(addressInput)}&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`
                    );
                    setSuggestions(res.data.features);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timer = setTimeout(fetchSuggestions, 400); // 400ms typing delay
        return () => clearTimeout(timer);
    }, [addressInput, address]);


    useEffect(() => {
        if (address) setAddressInput(address);
    }, [address]);

    const totalAmount = cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0) + 50

    const handleCheckOut = async () => {
        try {
            await dispatch(placeOrder({
                cartItems,
                paymentMethod,
                deliveryAddress: {
                    text: addressInput,
                    latitude: location.lat,
                    longitude: location.lon
                },
                totalAmount
            })).unwrap()
            toast.success('CheckOut successful')
            setOrderPlaced(true)
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <>
            {
                orderPlaced ? <OrderPlaced /> :
                <div className="min-h-screen bg-orange-50 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto flex flex-col gap-3 bg-white rounded-2xl p-5 shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

                    <div className='flex flex-col gap-2 justify-center relative'>
                        <label className='flex gap-2 font-semibold' htmlFor="address">
                            <MapPin className='text-red-500' />
                            Delivery Location
                        </label>

                        <div className='flex gap-2 justify-center items-center'>
                            <div className='relative w-full'>
                                <input
                                    type="text"
                                    placeholder='Search for your address...'
                                    value={addressInput}
                                    onChange={(e) => setAddressInput(e.target.value)}
                                    className='border rounded-xl w-full px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all'
                                    autoComplete="off"
                                />

                                {/* Suggestion Dropdown */}
                                {suggestions.length > 0 && (
                                    <ul className="absolute z-9999 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-2xl max-h-60 overflow-y-auto">
                                        {suggestions.map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectAddress(item)}
                                                className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm border-b last:border-b-0 transition-colors"
                                            >
                                                {item.properties.formatted}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <LocateFixed
                                onClick={getCurrentLocation}
                                className='bg-blue-500 hover:bg-blue-600 transition-all duration-150 rounded-xl p-2 size-10 text-white cursor-pointer shrink-0'
                            />
                        </div>
                    </div>

                    {/* Leaflet Map */}
                    <div className='rounded-2xl border overflow-hidden mt-4 shadow-inner'>
                        <div className='h-80 w-full'>
                            <MapContainer
                                className='w-full h-full'
                                center={[location?.lat || 23.8103, location?.lon || 90.4125]} // Default location if empty
                                zoom={16}
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <ReCenterMap location={location} />
                                {location?.lat && (
                                    <Marker
                                        position={[location.lat, location.lon]}
                                        draggable={true}
                                        eventHandlers={{ dragend: onDragEnd }}
                                    />
                                )}
                            </MapContainer>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Order Summary Section */}
                        <div className="bg-white border rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 border-b pb-2">
                                <ShoppingBag className="text-orange-500" size={20} />
                                <h2 className="font-bold text-gray-700">Order Summary</h2>
                            </div>

                            <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-2 mb-4">
                                {cartItems && cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-gray-700 text-sm">৳{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Calculation Details */}
                            <div className="space-y-2 border-t pt-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳{cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Delivery Charge</span>
                                    <span className="text-green-600 font-medium">৳50</span>
                                </div>

                                <div className="flex justify-between items-center font-bold text-lg text-gray-800 pt-2 border-t border-double">
                                    <span>Total Payable</span>
                                    <span className="text-orange-600">
                                        ৳{totalAmount}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method Div */}
                        <div className="bg-white border rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 border-b pb-2">
                                <CreditCard className="text-orange-500" size={20} />
                                <h2 className="font-bold text-gray-700">Payment Method</h2>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Cash on Delivery Option */}
                                <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <Truck className={paymentMethod === 'COD' ? 'text-orange-500' : 'text-gray-400'} />
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500">Pay when you receive</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="COD"
                                        className="accent-orange-500 w-4 h-4"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        checked={paymentMethod === 'COD'}
                                    />
                                </label>

                                {/* Online Payment Option */}
                                <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <CreditCard className={paymentMethod === 'online' ? 'text-orange-500' : 'text-gray-400'} />
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">Online Payment</p>
                                            <p className="text-xs text-gray-500">Bkash, Nagad or Card</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="online"
                                        className="accent-orange-500 w-4 h-4"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        checked={paymentMethod === 'online'}
                                    />
                                </label>
                            </div>

                            <button
                                onClick={handleCheckOut}
                                disabled={orderLoading}
                                className={`w-full mt-6 ${orderLoading ? 'bg-orange-600 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95`}>
                                {orderLoading ? 'Confirming Order ...' : 'Confirm Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default CheckOut;