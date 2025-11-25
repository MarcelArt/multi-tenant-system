import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface ComboboxProps extends React.ComponentProps<'div'> {
	placeholder: string;
	searchPlaceholder: string;
	empty: string;
	onSearch: (val: string) => void;
	onValueChange: (vals: string[]) => void;
	initialValues?: string[];
	maxDisplay?: number;
	items: {
		value: string;
		label: string;
	}[];
}

export function Combobox({ placeholder, items, className, searchPlaceholder, empty, onSearch, onValueChange, initialValues, maxDisplay = 2 }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [values, setValues] = React.useState<typeof items>(initialValues ? items.filter(item => initialValues.includes(item.value)) : []);

	const debounceRef = React.useRef<any>(null);

	const handleSearch = (val: string) => {
		clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			onSearch(val);
		}, 300);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className={className}>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
					<div className='flex gap-1'>
						{values.length
							? values.map((v, i) => (i === maxDisplay ? <Badge key={i} variant="secondary">+{values.length - maxDisplay}</Badge> : i < maxDisplay ? <Badge key={i} variant="secondary">{v.label}</Badge> : null))
							: placeholder}
					</div>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn('p-0', className)}>
				<Command shouldFilter={false}>
					<CommandInput onValueChange={handleSearch} placeholder={searchPlaceholder} className="h-9" />
					<CommandList>
						<CommandEmpty>{empty}</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value.toString()}
									onSelect={(currentValue) => {
										const i = values.findIndex((v) => v.value === currentValue);
										let newValues = values;
										if (i > -1) {
											newValues = [...values.slice(0, i), ...values.slice(i + 1)];
										} else {
											const item = items.find((item) => item.value === currentValue);
											newValues = [...values, item!];
										}
										setValues(newValues);
										onValueChange(newValues.map(value => value.value));
										setOpen(false);
									}}
								>
									{item.label}
									<Check className={cn('ml-auto', values.some((value) => value.value === item.value) ? 'opacity-100' : 'opacity-0')} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
