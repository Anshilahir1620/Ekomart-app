import { API_BASE_URL } from "../config/api.config";
import { Categorie } from "@/app/types/Categorie";

export const getCategories = async (): Promise<Categorie[]> => {

const res = await fetch(`${API_BASE_URL}/category`);

if(!res.ok)
{
    throw new Error("Failed to fetch categories");
}

const data = await res.json();
return data;

}