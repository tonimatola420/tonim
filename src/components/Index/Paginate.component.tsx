import Link from "next/link";

interface IPaginateProps {
    pages: number,
    page: number,
    searchkey: string
}

const Paginate = ({ pages, page, searchkey }: IPaginateProps) => {
    return (
        <div>
         {pages > 1 && (
            <div className="">
                {Array.from(Array(pages).keys()).map((x) => 
                     x + 1 === page
                        ? (
                            <span key={x} className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-light bg-blue-200 text-gray-800">
                                {x + 1}
                            </span>
                        )
                        : (
                            <Link key={x} href={`/?keyword=${searchkey}&pageNumber=${x + 1}`} >
                                    <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {x + 1}
                                    </span>
                            </Link>
                        )
                
                )}
            </div>            
        )}
        </div>
    )
}
export default Paginate;