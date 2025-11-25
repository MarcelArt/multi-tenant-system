import { Fragment } from 'react/jsx-runtime';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { isMatch, Link, useMatches } from '@tanstack/react-router';

export function BreadcrumbComponent() {
	const matches = useMatches();

	if (matches.some((match) => match.status === 'pending')) return null;

	const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumbs'));
	const breadcrumbs = matchesWithCrumbs[matchesWithCrumbs.length - 1]?.loaderData?.crumbs ?? [{ title: 'Formigo', link: '#' }];

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, i) => {
					if (i === 0 || i === breadcrumbs.length - 1) {
						return (
							<Fragment key={i}>
								<BreadcrumbItem>
									<BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
								</BreadcrumbItem>
								{i < breadcrumbs.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
							</Fragment>
						);
					} else {
						return (
							<Fragment key={i}>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink><Link to={breadcrumb.link}>{breadcrumb.title}</Link></BreadcrumbLink>
								</BreadcrumbItem>
								{i < breadcrumbs.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
							</Fragment>
						);
					}
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
