"use client"
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState, ChangeEvent } from 'react';

export default function AddProduct() {
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [numberOfImages, setNumberOfImages] = useState<number>(1);
    const [upload, setUpload] = useState<boolean>(false)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newImages = [...images];
        if (e.target.files) {
            newImages[index] = e.target.files[0];
            setImages(newImages);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setUpload(true)

        if (!productName || !stock || !price || !details || !images) return;

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('details', details);
        formData.append('number', String(numberOfImages));
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        try {
            const response = await axios.post('/api/product/addproduct', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response) {
                setUpload(false)
                // Handle successful response
                alert('Product added successfully');
                console.log('Product added successfully');
            } else {
                // Handle error response
                setUpload(false)
                alert('Failed to add product');
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const renderImageInputs = () => {
        const inputs = [];
        for (let i = 0; i < numberOfImages; i++) {
            inputs.push(
                <div key={i} className="mb-4">
                    <label className="block text-lg font-medium mb-2" htmlFor={`images-${i}`}>
                        Image {i + 1}
                    </label>
                    <input
                        type="file"
                        id={`images-${i}`}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => handleImageChange(e, i)}
                        required
                    />
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="productName">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="details">
                            Details
                        </label>
                        <textarea
                            id="details"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            rows={4}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="numberOfImages">
                            Number of Images
                        </label>
                        <input
                            type="number"
                            id="numberOfImages"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={numberOfImages}
                            onChange={(e) => setNumberOfImages(parseInt(e.target.value, 10))}
                            min={1}
                            required
                        />
                    </div>
                    {renderImageInputs()}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        {upload ? <span className='flex justify-center'>Uploading <Loader2 className='animate-spin' /></span> : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
};

