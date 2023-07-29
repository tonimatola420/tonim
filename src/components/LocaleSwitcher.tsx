'use client';

import { Dropdown } from 'antd';
// import { Link } from 'next-intl';
// import { usePathname } from 'next-intl/client';
import Link from "next/link";
import { usePathname } from 'next/navigation';



// import Icons from './Icons';

export default function LocaleSwitcher() {
	const pathname = usePathname();

	return (
		<Dropdown
			menu={{
			}}
		>
			<div className="btn" role={'button'} tabIndex={0}>
				{/* <Icons.Languages className="h-5 w-5" /> */}
			</div>
		</Dropdown>
	);
}
