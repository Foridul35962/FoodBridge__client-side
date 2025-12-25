import React from 'react'
import home from '../assets/home.png'
import scooter from '../assets/scooter.png'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'

const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const DeliveryBoyTracking = ({ currentOrder }) => {

    const deliveryBoyLat = currentOrder.deliveryBoyLocation.lat
    const deliveryBoyLon = currentOrder.deliveryBoyLocation.lon
    const customerLat = currentOrder.customerLocation.lat
    const customerLon = currentOrder.customerLocation.lon

    const path = [
        [deliveryBoyLat, deliveryBoyLon],
        [customerLat, customerLon]
    ]

    const center = [deliveryBoyLat, deliveryBoyLon]

    return (
        <div className='w-full border h-100 mt-3 rounded-xl overflow-hidden shadow-xl'>
            <MapContainer
                className='w-full h-full'
                center={center}
                zoom={16}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
                    <Popup>Delivery Boy</Popup>
                </Marker>
                <Marker position={[customerLat, customerLon]} icon={customerIcon}>
                    <Popup>Customer</Popup>
                </Marker>
                <Polyline positions={path} weight={5} />
            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking