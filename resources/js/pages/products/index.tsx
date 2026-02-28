import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
    vat: number;
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

export default function Index({ products: allProducts, can, vat }: Props) {
    const { delete: destroy } = useForm();
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const handleDelete = () => {
        if (productToDelete) {
            destroy(products.destroy(productToDelete));
            setProductToDelete(null);
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
                                <TableHead>Total price with VAT</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>
                                        ${(product.quantity * parseFloat(product.price) * (1 + vat)).toFixed(2)}
                                    </TableCell>
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
                                            <button
                                                onClick={() => setProductToDelete(product.id)}
                                                className="text-red-600 hover:text-red-900 cursor-pointer"
                                            >
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

            <AlertDialog open={productToDelete !== null} onOpenChange={(open) => !open && setProductToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} variant="destructive">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
