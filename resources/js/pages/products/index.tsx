import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    products: Product[];
    can: {
        create: boolean;
        update: boolean;
        delete: boolean;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index(),
    },
];

export default function Index({ products: allProducts, can }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(products.destroy(id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Products</h1>
                    {can.create && (
                        <Link href={products.create()}>
                            <Button>Add Product</Button>
                        </Link>
                    )}
                </div>

                <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell className="text-right text-sm font-medium">
                                        <Link href={products.show(product.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            View
                                        </Link>
                                        {can.update && (
                                            <Link href={products.edit(product.id)} className="text-yellow-600 hover:text-yellow-900 mr-4">
                                                Edit
                                            </Link>
                                        )}
                                        {can.delete && (
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 cursor-pointer">
                                                Delete
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
