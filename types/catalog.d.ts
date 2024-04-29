type BrandVals = {
    id: number;
    name: string;
};
type Filter = {
    id: number;
    name: string;
    slug: string;
    vals: BrandVals[];
};
type CheckBoxStates = {
    [key: string]: number[];
};
type QueryParams = { [key: string]: string | number };

type Pagination = {
    page?: number;
    perpage?: number;
};
