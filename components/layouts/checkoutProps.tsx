
type CheckoutProps = {
    params: {
        cost: number;
        shipping: number;
        discount: number;
        payable: number;
        total: number;
    };
};

export default function CheckoutProps({ params }: CheckoutProps) {
    return (
        <div className="flex w-full flex-col space-y-3">
            <span className="flex justify-between">
                <p className="text-gray-400 px-2">
                    Total MRP {"(inclusive of all taxes)"}
                </p>
                <p className="text-black">Rs. {params.cost}</p>
            </span>
            <span className="flex justify-between">
                <p className="text-gray-400">Shipping Charges</p>
                <p className="text-black">Rs. {params.shipping}</p>
            </span>
            <span className="flex justify-between">
                <p className="text-gray-400">Bag Discount</p>
                <p className="text-black">Rs. {params.discount}</p>
            </span>
            <span className="flex justify-between">
                <p className="text-black font-semibold">Payable Amount</p>
                <p className="text-black">Rs. {params.payable}</p>
            </span>
            <span
                className={params.discount > 0 ? "flex justify-between" : "hidden"}
            >
                <p className="text-green-400">
                    You are saving {params.discount} on this Order!
                </p>
            </span>
            <span className="flex justify-between border-t py-2">
                <p className="text-black text-semibold font-serif">Final Amount</p>
                <p className="text-black">Rs. {params.total}</p>
            </span>
        </div>
    )
}