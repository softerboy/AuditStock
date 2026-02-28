import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: product.title,
        quantity: product.quantity,
        price: product.price,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: products.index().url,
        },
        {
            title: 'Edit Product',
            href: products.edit(product.id).url,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(products.update(product.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.title}`} />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1"
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                            className="mt-1"
                        />
                        {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
                    </div>

                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="mt-1"
                        />
                        {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>Update Product</Button>
                        <Link href={products.index().url} className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
