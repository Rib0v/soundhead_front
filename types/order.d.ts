type OrderProduct = {
    id: number;
    name: string;
    slug: string;
    image: string;
    count: number;
    price: number;
};

type OrderDetail = {
    id: number;
    total: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    comment: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    products: OrderProduct[];
};

type Order = {
    id: number;
    total: number;
    address: string;
    comment: string | null;
    status: string;
    created_at: string;
    updated_at: string;
};

type OrderList = {
    data: Order[];
    links: CommonObject;
    meta: CommonObject;
};

type CreatedOrder = {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    comment?: string;
    products?: any[];
};
