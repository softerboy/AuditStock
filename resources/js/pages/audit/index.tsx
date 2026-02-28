import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
}

interface AuditLog {
    id: number;
    user_id: number | null;
    user: User | null;
    auditable_type: string;
    auditable_id: number;
    event: string;
    old_values: any;
    new_values: any;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    logs: {
        data: AuditLog[];
        links: PaginationLink[];
    };
    filters: {
        from: string;
        to: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Audit Logs',
        href: '/audit',
    },
];

export default function Index({ logs, filters }: Props) {
    const [fromDate, setFromDate] = useState(filters.from || '');
    const [toDate, setToDate] = useState(filters.to || '');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (fromDate !== (filters.from || '') || toDate !== (filters.to || '')) {
                router.get('/audit', { from: fromDate, to: toDate }, {
                    preserveState: true,
                    replace: true
                });
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [fromDate, toDate]);

    const formatValues = (values: any) => {
        if (!values) return '-';
        return (
            <pre className="text-xs max-w-xs overflow-auto">
                {JSON.stringify(values, null, 2)}
            </pre>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Audit Logs" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Audit Logs</h1>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">From:</span>
                            <Input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-40"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">To:</span>
                            <Input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-40"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Old Values</TableHead>
                                <TableHead>New Values</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.data.length > 0 ? (
                                logs.data.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="whitespace-nowrap">
                                            {new Date(log.created_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{log.user?.name || 'System'}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                log.event === 'created' ? 'bg-green-100 text-green-800' :
                                                log.event === 'updated' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {log.event}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {log.auditable_type.split('\\').pop()} ({log.auditable_id})
                                        </TableCell>
                                        <TableCell>{formatValues(log.old_values)}</TableCell>
                                        <TableCell>{formatValues(log.new_values)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No audit logs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {logs.links.length > 3 && (
                    <div className="mt-6 flex justify-center gap-1">
                        {logs.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && router.get(link.url, { from: fromDate, to: toDate })}
                                disabled={!link.url || link.active}
                                className={`px-3 py-1 text-sm rounded border ${
                                    link.active ? 'bg-indigo-600 text-white border-indigo-600' :
                                    link.url ? 'hover:bg-gray-100 dark:hover:bg-neutral-700' : 'text-gray-400 border-gray-200 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
