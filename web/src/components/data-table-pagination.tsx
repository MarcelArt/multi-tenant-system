import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './ui/button';
import type { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
	page: number;
	size: number;
	max_page: number;
	total_pages: number;
	total: number;
	last: boolean;
	first: boolean;
	visible: number;
	setSize: (size: number) => void;
	setPage: (page: number) => void;
	table: Table<TData>;
}

export function DataTablePagination<TData>({ page, max_page, total_pages, total, last, first, visible, setPage }: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between px-2 py-4">
			<div className="text-muted-foreground flex-1 text-sm">
				{visible} of {total} row(s) selected.
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					{/* <p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${size}`}
						onValueChange={(value) => {
							setSize(+value);
							// table.setPageSize(+value);
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={size} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 25, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select> */}
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {page + 1} of {total_pages}
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="icon" className="hidden size-8 lg:flex" onClick={() => setPage(0)} disabled={first}>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button variant="outline" size="icon" className="size-8" onClick={() => setPage(page - 1)} disabled={first}>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button variant="outline" size="icon" className="size-8" onClick={() => setPage(page + 1)} disabled={last}>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
					<Button variant="outline" size="icon" className="hidden size-8 lg:flex" onClick={() => setPage(max_page)} disabled={last}>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
