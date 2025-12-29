import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayDeliveries } from '../../store/slice/deliverySlice';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
// Lucide icons import
import { Package, Banknote, Clock, TrendingUp, CalendarDays } from 'lucide-react';

const DeliveryBoyOrderCart = () => {
    const dispatch = useDispatch();
    const { todaysDeliveries = [] } = useSelector((state) => state.delivery);

    useEffect(() => {
        dispatch(getTodayDeliveries());
    }, [dispatch]);

    // Data Calculations
    const totalOrders = todaysDeliveries.reduce((sum, d) => sum + d.count, 0);
    const totalEarning = totalOrders * 50;
    const peakHourData = [...todaysDeliveries].sort((a, b) => b.count - a.count)[0];
    const peakHour = peakHourData ? `${peakHourData.hour}:00` : '--:--';

    return (
        <div className="min-h-screen bg-orange-50 p-4 md:p-10 text-slate-800">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            Delivery Insights
                        </h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <CalendarDays size={16} /> Summary for Today
                        </p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-slate-600">Active Session</span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard 
                        label="Total Deliveries" 
                        value={totalOrders} 
                        icon={<Package size={24} />} 
                        accent="text-orange-600"
                        bg="bg-orange-100"
                    />
                    <StatCard 
                        label="Today's Earnings" 
                        value={`৳${totalEarning}`} 
                        icon={<Banknote size={24} />} 
                        accent="text-emerald-600"
                        bg="bg-emerald-100"
                    />
                    <StatCard 
                        label="Busiest Hour" 
                        value={peakHour} 
                        icon={<Clock size={24} />} 
                        accent="text-blue-600"
                        bg="bg-blue-100"
                    />
                </div>

                {/* Main Chart Card */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Hourly Performance</h3>
                    </div>

                    <div className="h-87.5 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={todaysDeliveries} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff4d2d" stopOpacity={1}/>
                                        <stop offset="95%" stopColor="#ff4d2d" stopOpacity={0.6}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="hour" 
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}}
                                    tickFormatter={(h) => `${h}h`}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{fill: '#64748b', fontSize: 12}}
                                    allowDecimals={false} 
                                />
                                <Tooltip 
                                    cursor={{fill: '#f1f5f9', radius: 8}}
                                    content={<CustomTooltip />}
                                />
                                <Bar 
                                    dataKey="count" 
                                    fill="url(#colorCount)"
                                    radius={[8, 8, 8, 8]} 
                                    barSize={32}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bottom Tip */}
                <p className="text-center text-slate-400 text-sm mt-8">
                    *Earnings and statistics are calculated based on verified completed deliveries.
                </p>
            </div>
        </div>
    );
};

// --- Sub-components ---

const StatCard = ({ label, value, icon, accent, bg }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${bg} ${accent}`}>
                {icon}
            </div>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2 tracking-widest">Time: {label}:00</p>
                <div className="flex flex-col gap-1">
                    <p className="text-sm flex justify-between gap-4">
                        <span>Orders:</span> 
                        <span className="font-bold text-orange-400">{payload[0].value}</span>
                    </p>
                    <p className="text-sm flex justify-between gap-4 border-t border-slate-700 mt-2 pt-2">
                        <span>Earned:</span> 
                        <span className="font-bold text-emerald-400">৳{payload[0].value * 50}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default DeliveryBoyOrderCart;