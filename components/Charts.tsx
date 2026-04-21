import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend, AreaChart, Area } from 'recharts';

export const SimpleLineChart: React.FC<{ data: any[]; dataKey: string; color?: string; target?: number }> = ({ data, dataKey, color = "#3b82f6", target }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
      {target && (
        <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={1} dot={false} name="Target" />
      )}
    </LineChart>
  </ResponsiveContainer>
);

export const SimpleAreaChart: React.FC<{ data: any[]; dataKey: string; color?: string }> = ({ data, dataKey, color = "#8b5cf6" }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
          <stop offset="95%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <Tooltip contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
      <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#color${dataKey})`} />
    </AreaChart>
  </ResponsiveContainer>
);

export const SimpleBarChart: React.FC<{ data: any[]; dataKey: string }> = ({ data, dataKey }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
      <XAxis type="number" hide />
      <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
      <Tooltip cursor={{fill: 'transparent'}} />
      <Bar dataKey={dataKey} radius={[0, 4, 4, 0]} barSize={20}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill || '#3b82f6'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const SimpleDonutChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index % 4]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} iconType="circle" />
    </PieChart>
  </ResponsiveContainer>
);
