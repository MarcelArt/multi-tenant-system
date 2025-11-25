import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import useDebounce from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

interface TableHeaderSearchProps {
	button: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export function TableHeaderSearch({ label, value, onChange, button }: TableHeaderSearchProps) {
	const [search, setSearch] = useState(value);
	const searchDebounce = useDebounce(search, 300);

	useEffect(() => {
		onChange(searchDebounce);
	}, [searchDebounce]);

	return (
		<Popover>
			<PopoverTrigger asChild className="flex flex-row gap-1 text-left shrink p-0! m-0 w-fit">
				<Button variant='link' className='text-left shrink p-0 m-0 w-fit text-foreground'>
					{button} {search && `= ${search}`} <Search />
				</Button>
				{/* <Button variant="ghost" className='text-left shrink-1'>Role</Button> */}
			</PopoverTrigger>
			<PopoverContent>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="filter-role">{label}</Label>
					<Input id="filter-role" className="col-span-2 h-8" value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
			</PopoverContent>
		</Popover>
	);
}
