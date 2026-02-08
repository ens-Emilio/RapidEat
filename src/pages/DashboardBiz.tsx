import { DollarSign, Package, ShoppingBag, TrendingUp, Users, Clock } from 'lucide-react';
import { MetricCard } from '../components/biz/MetricCard';
import { BarChart } from '../components/biz/BarChart';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';

export const DashboardBiz = () => {
    const metrics = useDashboardMetrics();

    // Dados para o gráfico de pratos mais vendidos
    const chartData = metrics.pratosMaisVendidos.map(prato => ({
        label: prato.nome,
        value: prato.quantidade,
        color: 'bg-indigo-500',
    }));

    // Dados para o gráfico de pedidos por status
    const statusChartData = [
        { label: 'Pendente', value: metrics.pedidosPorStatus.pendente, color: 'bg-orange-500' },
        { label: 'Preparando', value: metrics.pedidosPorStatus.preparando, color: 'bg-blue-500' },
        { label: 'Enviado', value: metrics.pedidosPorStatus.enviado, color: 'bg-purple-500' },
        { label: 'Concluído', value: metrics.pedidosPorStatus.concluido, color: 'bg-green-500' },
    ].filter(item => item.value > 0);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                    Dashboard Empresarial
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Visão geral do seu negócio em tempo real
                </p>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Receita Total"
                    value={`R$ ${metrics.receitaTotal.toFixed(2)}`}
                    subtitle="Todas as vendas"
                    icon={DollarSign}
                    color="green"
                />

                <MetricCard
                    title="Total de Pedidos"
                    value={metrics.totalPedidos}
                    subtitle={`${metrics.pedidosHoje} hoje`}
                    icon={ShoppingBag}
                    color="blue"
                />

                <MetricCard
                    title="Ticket Médio"
                    value={`R$ ${metrics.ticketMedio.toFixed(2)}`}
                    subtitle="Por pedido"
                    icon={TrendingUp}
                    color="purple"
                />

                <MetricCard
                    title="Taxa de Conversão"
                    value={`${metrics.taxaConversao.toFixed(1)}%`}
                    subtitle="Pedidos concluídos"
                    icon={Users}
                    color="orange"
                />
            </div>

            {/* Métricas Secundárias */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <MetricCard
                    title="Receita Hoje"
                    value={`R$ ${metrics.receitaHoje.toFixed(2)}`}
                    subtitle={`${metrics.pedidosHoje} pedidos`}
                    icon={DollarSign}
                    color="green"
                />

                <MetricCard
                    title="Pratos no Cardápio"
                    value={metrics.totalPratos}
                    subtitle="Produtos ativos"
                    icon={Package}
                    color="blue"
                />

                <MetricCard
                    title="Pedidos Ativos"
                    value={metrics.pedidosPorStatus.pendente + metrics.pedidosPorStatus.preparando + metrics.pedidosPorStatus.enviado}
                    subtitle="Aguardando conclusão"
                    icon={Clock}
                    color="orange"
                />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart
                    title="Pratos Mais Vendidos"
                    data={chartData}
                />

                <BarChart
                    title="Pedidos por Status"
                    data={statusChartData}
                />
            </div>

            {/* Resumo de Status */}
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Resumo de Pedidos
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="text-center p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                        <p className="text-2xl font-black text-orange-600 dark:text-orange-400">
                            {metrics.pedidosPorStatus.pendente}
                        </p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                            Pendente
                        </p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                        <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                            {metrics.pedidosPorStatus.preparando}
                        </p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                            Preparando
                        </p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                        <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
                            {metrics.pedidosPorStatus.enviado}
                        </p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                            Enviado
                        </p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-950/30">
                        <p className="text-2xl font-black text-green-600 dark:text-green-400">
                            {metrics.pedidosPorStatus.concluido}
                        </p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                            Concluído
                        </p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-950/30">
                        <p className="text-2xl font-black text-red-600 dark:text-red-400">
                            {metrics.pedidosPorStatus.cancelado}
                        </p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                            Cancelado
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
