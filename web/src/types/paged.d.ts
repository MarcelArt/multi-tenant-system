export type Filters = Array<string | number | Filters>

export interface PaginationParams {
    page?: number;
    size?: number;
    sort?: string;
    filters?: Filters;
}

export interface Page<T> {
    page: number;
    size: number;
    max_page: number;
    total_pages: number;
    total: number;
    last: boolean;
    first: boolean;
    visible: number;
    items: T[];
}

export interface IFiltersBuilder {
    eq(key: string, value: string | number): this;
    ne(key: string, value: string | number): this;
    gt(key: string, value: string | number): this;
    lt(key: string, value: string | number): this;
    gte(key: string, value: string | number): this;
    lte(key: string, value: string | number): this;
    and(): this;
    or(): this;
    in(key: string, range: Array<string | number>): this;
    nin(key: string, range: Array<string | number>): this;
    isNull(key: string): this;
    isNotNull(key: string): this;
    subFilter(filters: Filters[]): this;
    between(cb: (sub: FiltersBuilder) => FiltersBuilder): this;
    like(key: string, value: string): this;
    build(): Filters[];
}

interface FiltersBuilderConfig {
    behaviour?: 'and' | 'or'
}

export class FiltersBuilder implements IFiltersBuilder{
    private filters: Filters[];
    private behaviour?: 'and' | 'or';

    constructor({ behaviour }: FiltersBuilderConfig) {
        this.filters = [];
        this.behaviour = behaviour;
    }

    public eq(key: string, value: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, '=', value]);
        return this;
    }

    public ne(key: string, value: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, '<>', value]);
        return this;
    }

    public gt(key: string, value: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, '>', value]);
        return this;
    }

    public lt(key: string, value: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, '<', value]);
        return this;
    }

    public gte(key: string, value: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, '>=', value]);
        return this;
    }

    public lte(key: string, value: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, '<=', value]);
        return this;
    }

    public between(key: string, min: string | number, max: string | number): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, 'between', [min, max]]);
        return this;
    }

    public and(): this {
        this.filters.push(['AND']);
        return this;
    }

    public or(): this {
        this.filters.push(['OR']);
        return this;
    }

    public in(key: string, range: Array<string | number>): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, 'in', range]);
        return this;
    }

    public nin(key: string, range: Array<string | number>): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, 'not in', range]);
        return this;
    }

    public isNotNull(key: string): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, 'is not', 'null']);
        return this;
    }

    public isNull(key: string): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, 'is', 'null']);
        return this;
    }

    public like(key: string, value: string): this {
        if (this.filters.length && this.behaviour === 'and') this.and();
        this.filters.push([key, 'LIKE', value]);
        return this;
    }

    public subFilter(cb: (sub: FiltersBuilder) => FiltersBuilder): this {
        const subBuilder = new FiltersBuilder();
        this.filters.push(cb(subBuilder).build());
        return this;
    }

    public build(): Filters[] {
        return this.filters;
    }
}
