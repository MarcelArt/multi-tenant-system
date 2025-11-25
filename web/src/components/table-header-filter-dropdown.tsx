import { Funnel, FunnelX } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

interface TableHeaderFilterDropdownProps {
	button: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
  display?: (value: string) => string;
	options: {
		value: string;
		label: string;
	}[];
}

export function TableHeaderFilterDropdown({ label, value, onChange, button, options, display }: TableHeaderFilterDropdownProps) {
	const [filter, setFilter] = useState(value);

	const handleChange = (val: string) => {
    // val === '*' ? '' : val;
		setFilter(val);
		onChange(val);
	};

	return (
		<Popover>
			<PopoverTrigger asChild className="flex flex-row gap-1 text-left shrink p-0! m-0 w-fit">
				<Button variant="link" className="text-left shrink p-0 m-0 w-fit text-foreground">
					{button} {filter && `= ${display ? display(filter) : filter}`} <Funnel />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex flex-row items-center space-x-1">
					<Label>{label}</Label>
					<Select onValueChange={handleChange} value={filter}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder={label} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>{button}</SelectLabel>
                {/* <SelectItem value='*'>All</SelectItem> */}
								{options.map((option, i) => (
									<SelectItem key={i} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button variant="link" className="text-destructive" onClick={() => handleChange('')}>
						<FunnelX />
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
