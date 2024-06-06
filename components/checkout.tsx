import { Button } from "./ui/button";

type CheckoutProps = {
  params: {
    cost: number;
    shipping: number;
    discount: number;
    payable: number;
    total: number;
  };
};

export default function Checkout({ params }: CheckoutProps) {
  return (
    <div className="max-w-fit max-h-fit border p-2 rounded-xl shadow-md flex flex-col space-y-3">
      <h1 className="text-2xl text-start font-bold ">Order Summary</h1>
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
        <Button variant={"default"}>Place Order</Button>
      </div>
    </div>
  );
}
