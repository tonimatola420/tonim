import { Menu, } from 'antd';
import Link from "next/link";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { IoIosCreate, } from "react-icons/io";
import { BsCardList, BsFilterSquareFill, BsJustify } from "react-icons/bs";
// const Paginate = ({ pages, page, searchkey }: IPaginateProps) => {
const LeftMnuItems = ( {collapsed}: {collapsed: boolean}) => {
    return (
        <div>
            <div className="demo-logo-vertical">
                <img src='/images/logo-icon.png' alt="Logo" className='w-[16%] h-[16%]' />
                {!collapsed && (
                    <img src='/images/logo-text.png' alt="Logo" style={{ marginTop: '-8px', marginLeft: '16px' }} />
                )}
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key={'MnuClient'} icon={<BsCardList />}><Link href={`/module/Client/Read`} >Suppliers</Link></Menu.Item>
                <Menu.Item key={'SupplierCreate'} icon={<IoIosCreate />}><Link href={`/module/Client/Create`} >Supplier New</Link></Menu.Item>
                <Menu.Item key={'MnuSector'} icon={<BsFilterSquareFill />}><Link href={`/module/Sector/Read`} >Sectors</Link></Menu.Item>
                <Menu.Item key={'SectorCreate'} icon={<IoIosCreate />}><Link href={`/module/Sector/Create`} >Sector New</Link></Menu.Item>
                <Menu.Item key={'MnuCustomer'} icon={<BsJustify />}><Link href={`/module/Customer/Read`} >Customers</Link></Menu.Item>
                <Menu.Item key={'CustomerCreate'} icon={<IoIosCreate />}><Link href={`/module/Customer/Create`} >Customer New</Link></Menu.Item>
                <Menu.Item key={'MnuSystem'} icon={<BsJustify />}><Link href={`/module/System/Read`} >Systems</Link></Menu.Item>
                <Menu.Item key={'MnuProduct'} icon={<BsFilterSquareFill />}><Link href={`/module/Product/Read`} >Products</Link></Menu.Item>
                <Menu.Item key={'MnuGRN'} icon={<BsJustify />}><Link href={`/module/Grn/Read`} >GRNs</Link></Menu.Item>
                <Menu.Item key={'GRNCreate'} icon={<IoIosCreate />}><Link href={`/module/Grn/CreateItem`} >GRN New</Link></Menu.Item>
            </Menu>
        </div>
    )
}
export default LeftMnuItems;