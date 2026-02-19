import { useState } from 'react';
import { DollarSign, Package, ShoppingBag, TrendingUp, Users, Search, Filter, AlertCircle } from 'lucide-react';
import { MetricCard } from '../components/biz/MetricCard';
import { BarChart } from '../components/biz/BarChart';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import type { TimeRange } from '../hooks/useDashboardMetrics';

export const DashboardBiz = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('all');
    const metrics = useDashboardMetrics(timeRange);

    const timeRangeLabels: Record<TimeRange, string> = {
        today: 'Hoje',
        week: '7 Dias',
        month: '30 Dias',
        all: 'Tudo'
    };

    // Dados para o gráfico de pedidos por status
    const statusChartData = [
        { label: 'Pendente', value: metrics.pedidosPorStatus.pendente, color: 'bg-orange-500' },
        { label: 'Cozinha', value: metrics.pedidosPorStatus.preparando, color: 'bg-blue-500' },
        { label: 'Entrega', value: metrics.pedidosPorStatus.enviado, color: 'bg-purple-500' },
        { label: 'Concluído', value: metrics.pedidosPorStatus.concluido, color: 'bg-green-500' },
    ].filter(item => item.value > 0);

    return (
        <div className="container mx-auto px-4 py-8 stagger-container">
            {/* Header com Filtros */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tighter mb-2">
                        Dashboard Empresarial
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Insights e performance do seu negócio
                    </p>
                </div>

                <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm self-start md:self-auto">
                    {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`flex-1 md:flex-none px-3 sm:px-6 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${timeRange === range
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                }`}
                        >
                            {timeRangeLabels[range]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <MetricCard
                    title="Receita no Período"
                    value={`R$ ${metrics.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    subtitle={`Total em ${timeRangeLabels[timeRange]}`}
                    icon={DollarSign}
                    color="green"
                />

                <MetricCard
                    title="Total de Pedidos"
                    value={metrics.totalPedidos}
                    subtitle="Volume de vendas"
                    icon={ShoppingBag}
                    color="blue"
                />

                <MetricCard
                    title="Ticket Médio"
                    value={`R$ ${metrics.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    subtitle="Valor por cliente"
                    icon={TrendingUp}
                    color="purple"
                />

                <MetricCard
                    title="Eficiência"
                    value={`${metrics.taxaConversao.toFixed(1)}%`}
                    subtitle="Conclusão de pedidos"
                    icon={Users}
                    color="orange"
                />
            </div>

            {/* Visualizações Principais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ranking de Produtos */}
                <div className="lg:col-span-2 space-y-8 animate-slide-up">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">
                                    Top 8 Produtos Mais Vendidos
                                </h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                                    Baseado no volume de pedidos
                                </p>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl text-indigo-600">
                                <TrendingUp size={24} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {metrics.pratosMaisVendidos.length > 0 ? (
                                metrics.pratosMaisVendidos.map((prato, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-2 ring-slate-50 dark:ring-slate-800 transition-all group-hover:ring-indigo-500/30 shadow-sm">
                                                <img src={prato.imagem} alt={prato.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg">
                                                {idx + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 transition-colors">
                                                {prato.nome}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                    {prato.quantidade} unidades
                                                </span>
                                                <span className="text-xs font-black text-indigo-500">
                                                    R$ {prato.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-premium"
                                                    style={{ width: `${(prato.quantidade / metrics.pratosMaisVendidos[0].quantidade) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 py-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl opacity-50">
                                    <Package size={32} className="mx-auto text-slate-300 mb-2" />
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nenhuma venda no período</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status e Outros */}
                <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <BarChart
                        title="Fluxo de Pedidos"
                        data={statusChartData}
                    />

                    <div className="bg-slate-900 dark:bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                        <div className="relative z-10">
                            <h4 className="text-sm font-black uppercase tracking-widest opacity-60 mb-1">Dica de Gestão</h4>
                            <p className="text-lg font-bold leading-tight mb-6">
                                {metrics.taxaConversao > 80
                                    ? "Sua operação está voando! Mantenha o foco na agilidade de entrega."
                                    : "Fique atento aos pedidos cancelados. Identifique se o tempo de preparo está adequado."}
                            </p>
                            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                Ver Relatórios
                            </button>
                        </div>
                        <AlertCircle className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
                    </div>
                </div>
            </div>

            {/* Sumário de Pedidos Adicional */}
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">
                        Resumo Operacional
                    </h3>
                    <div className="flex gap-2">
                        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500">
                            <Filter size={18} />
                        </button>
                        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                    {(['pendente', 'preparando', 'enviado', 'concluido', 'cancelado'] as const).map(status => {
                        const config = {
                            pendente: { label: 'Novos', bg: 'bg-orange-50 dark:bg-orange-950/20', text: 'text-orange-500' },
                            preparando: { label: 'Cozinha', bg: 'bg-blue-50 dark:bg-blue-950/20', text: 'text-blue-500' },
                            enviado: { label: 'Logística', bg: 'bg-purple-50 dark:bg-purple-950/20', text: 'text-purple-500' },
                            concluido: { label: 'Sucesso', bg: 'bg-green-50 dark:bg-green-950/20', text: 'text-green-500' },
                            cancelado: { label: 'Perdidos', bg: 'bg-red-50 dark:bg-red-950/20', text: 'text-red-500' },
                        }[status];

                        return (
                            <div key={status} className={`p-6 rounded-3xl ${config.bg} border border-white/50 dark:border-slate-800/50 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300`}>
                                <span className={`text-3xl font-black ${config.text} mb-1 tracking-tighter`}>
                                    {metrics.pedidosPorStatus[status]}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    {config.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

