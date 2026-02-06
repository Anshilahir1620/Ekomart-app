import {API_BASE_URL} from "@/app/config/api.config"
import {Subcategorie} from "@/app/types/Subcategorie"

export const GetSubcategories = async () : Promise<Subcategorie[]>=>
{
    const res = await fetch(`${API_BASE_URL}/subcategory`)

    if(!res.ok)
    {
        throw Error("Failed to fetch Subcategories ")
    }

    const data = await res.json();

    return data
}