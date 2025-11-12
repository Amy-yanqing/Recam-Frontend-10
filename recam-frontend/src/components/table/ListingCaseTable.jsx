import { useState } from "react";
import { getPropertyTypeLabel,getListcasesStatusLabel } from "../../utils/listingLabelHelpers";

export default function ListingCaseTable({listings,onEdit,onDelete}) {

    const [openMenuId,setOpenMenuId] = useState(null);

    return (

        <div className="p-8 bg-white min-h-screen">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 text-left text-gray-600">PROPERTY#</th>
                        <th className="p-3 text-left text-gray-600">PROPERTY TYPE</th>
                        <th className="p-3 text-left text-gray-600">PROPERTY ADDRESS</th>
                        <th className="p-3 text-left text-gray-600">CREATED AT</th>
                        <th className="p-3 text-left text-gray-600">STATUS</th>
                        <th className="p-3 text-left text-gray-600">ACTIONS</th>
                    </tr>

                </thead>
                <tbody>
                    {listings.map((item, index) => (
                        <tr key={item.id} className="border-t hover:bg-gray-50">
                            <td className="p-3 font-medium text-blue-600">
                                #{index + 1}
                            </td>
                            <td className="p-3">{getPropertyTypeLabel(item.propertyType)}</td>
                            <td className="p-3">{item.street},{item.city},{item.state},{item.postcode}</td>
                            <td className="p-3">{new Date(item.createdAt).toLocaleDateString('en-AU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</td>
                            <td className="p-3">{getListcasesStatusLabel(item.listcaseStatus)}</td>
                            <td className="relative">
                                <button onClick={() =>
                                    setOpenMenuId(openMenuId === item.id ? null : item.id)
                                }
                                    className="px-2 text-gray-500 hover:text-gray-800 text-xl"

                                >
                                    ...
                                </button>
                                {openMenuId === item.id && (
                                    <div className="absolute right-30 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-10 w-28 ">
                                        <button onClick={() => onEdit(item.id)} className="block w-full px-4 py-2 text-left hover:bg-gray-100 ">Edit</button>
                                        <button onClick={() => onDelete(item.id)} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500">Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );









}