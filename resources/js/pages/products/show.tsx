import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    title: string;
    quantity: number;
    price: string;
}

interface Props {
    product: Product;
}

export default function Show({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: products.index(),
        },
        {
            title: product.title,
            href: products.show(product.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.title} />
            <div className="p-6 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <Link href={products.index()} className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">Back to list</Link>
                </div>

                <div className="bg-white dark:bg-neutral-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium">Product Details</h3>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700">
                        <dl>
                            <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-neutral-500">Title</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{product.title}</dd>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-neutral-500">Quantity</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{product.quantity}</dd>
                            </div>
                            <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-neutral-500">Price</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">${product.price}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
