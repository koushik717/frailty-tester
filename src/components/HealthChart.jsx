import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthChart = ({ data }) => {
    // Transform data for the chart if needed, or expect pre-formatted data
    // For now, let's assume data is passed in a format suitable for the chart
    // or we create some mock data if empty to show the visual

    const chartData = data && data.length > 0 ? data : [
        { date: 'Jan', score: 65 },
        { date: 'Feb', score: 70 },
        { date: 'Mar', score: 68 },
        { date: 'Apr', score: 75 },
        { date: 'May', score: 82 },
        { date: 'Jun', score: 85 },
    ];

    return (
        <div className="w-full h-[300px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 font-montserrat">Health Score Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0fdf4" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: '#16a34a', fontWeight: 'bold' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#16a34a"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HealthChart;
