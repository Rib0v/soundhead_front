type CommonObject = {
    [key: string]: any;
};

type CartProduct = {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string;
    count?: number;
};

type Product = {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string;
    [key: string]: any;
};

type Meta = {
    current_page: number;
    last_page: number;
    total: number;
};

type ProductList = {
    data: Product[];
    meta: Meta;
};

type ProductDetail = {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string;
    description: string;
    attributes: CommonObject[];
    photos: string[];
};

type ProductCompare = {
    data: Product[];
    attributes: CommonObject;
};

type User = {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    orders: number;
    orders_total: number;
    permissions: any[];
    created_at: string;
};
