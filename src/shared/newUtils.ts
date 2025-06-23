import { db } from "@root/db/config";
import { Category, Color, Photo, Product, Variant, Volt } from "@root/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export type Volt = {
    id: number
    name: string
}

export type Color = {
    id: number
    color: string
}

export type Photo = {
    id: number
    url: string
    order: number
}

type getProductsProps = Partial<{
    id? : string | string[],
    category_id? : string | string[]
}>;

export const getProducts = async (settings: getProductsProps = {}) => {
    
    const filters = [];
    
    if (settings.id) {
        Array.isArray(settings.id) 
            ? filters.push(inArray(Product.id, settings.id)) 
            : filters.push(eq(Product.id, settings.id));
    }
    
    if (settings.category_id) {
        Array.isArray(settings.category_id) 
            ? filters.push(inArray(Product.category_id, settings.category_id)) 
            : filters.push(eq(Product.category_id, settings.category_id));
    }

    const products = await db.select().from(Product)
        .fullJoin(Variant, eq(Variant.product_id, Product.id))
        .fullJoin(Photo, eq(Photo.variant_id, Variant.id))
        .fullJoin(Category, eq(Category.id, Product.category_id))
        .fullJoin(Color, eq(Color.id, Variant.color_id))
        .fullJoin(Volt, eq(Volt.id, Variant.volt_id))
        .where(and(...filters))

    type Category = {
        id: string
        name: string
        description: string
        shortDescription: string
    }

    type finalProducts = {
        id: string
        name: string
        review: string
        included: string | null
        specs: string
        category: Category
        variants: {
            id: number
            color: Color | null
            volt: Volt | null
            photos: Photo[]
        }[]
    }

    const finalProducts : finalProducts[] = []

    products.forEach(product => {
        const productIndex = finalProducts.findIndex(p => p.id === product.product?.id)

        const photo : Photo = {
            id: product.photo?.id || 0,
            url: product.photo?.url || '',
            order: product.photo?.order || 0
        }

        const color : Color = {
            id: product.color?.id || 0,
            color: product.color?.color || ''
        }

        const volt : Volt = {
            id: product.volt?.id || 0,
            name: product.volt?.name || ''
        }


        if (productIndex === -1) {
            const productToAdd = {
                id: product.product?.id || '',
                name: product.product?.name || '',
                review: product.product?.review || '',
                included: product.product?.included ?? null,
                specs: product.product?.specs || '',
                category: {
                    id: product.category?.id || '',
                    name: product.category?.name || '',
                    description: product.category?.description || '',
                    shortDescription: product.category?.shortDescription || ''
                },
                variants: [
                    {
                        id: product.variant?.id || 0,
                        color: color,
                        volt: volt,
                        photos: [photo]
                    }
                ]
            }

            finalProducts.push(productToAdd)
            
        } else {
            const variantIndex = finalProducts[productIndex].variants.findIndex(v => v.id === product.variant?.id)
            if (variantIndex === -1) {
                finalProducts[productIndex].variants.push({
                    id: product.variant?.id || 0,
                    color: color,
                    volt: volt,
                    photos: [photo]
                })
            } else {
                finalProducts[productIndex].variants[variantIndex].photos.push(photo)
            }
        }
    })

    return finalProducts
};

type getCategoriesProps = Partial<{
    id? : string | string[],
    name? : string | string[]
}>

export const getCategories = async (settings: getCategoriesProps = {}) => {
    const filters = [];
    
    if (settings.id) {
        Array.isArray(settings.id) 
            ? filters.push(inArray(Category.id, settings.id)) 
            : filters.push(eq(Category.id, settings.id));
    }

    if (settings.name) {
        Array.isArray(settings.name) 
            ? filters.push(inArray(Category.name, settings.name)) 
            : filters.push(eq(Category.name, settings.name));
    }

    const categories = await db.select().from(Category).where(and(...filters))

    return categories
}


// ------------------ UTILS ------------------
import { getI18NProducts, getValueFromKey } from "@/i18n";
import { getRelativeLocaleUrl } from "astro:i18n";

const t_products = ({key, currentLocale}: {key: string, currentLocale: string | undefined}) => {

    const i18n = getI18NProducts({ currentLocale });
    const t = (key: string) => getValueFromKey(key, i18n);
    return t(key)

}

export function convertToSlug(text: string) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
}

export type Url = {
    id: string
    name: string
    url: string
}

type getUrlsProps = {
    table: 'products' | 'categories'
    category_id?: string | string[]
    currentLocale: string | undefined
}

export const getUrls = async ({
    currentLocale = 'es',
    table,
    category_id
}: getUrlsProps 
) : Promise<Url[]> => {

    if (table === 'products') {
        const products = await getProducts({category_id})
        return products.map(
            product => ({
                id: product.id,
                name: t_products({key: product.name, currentLocale}),
                url: getRelativeLocaleUrl(
                    currentLocale,
                    `/productos/${convertToSlug(t_products({key: product.category.name, currentLocale}))}/${convertToSlug(t_products({key: product.name, currentLocale}))}`,
                )
            })
        )
    }

    if (table === 'categories') {
        const categories = await getCategories({id: category_id})
        return categories.map(
            category => ({
                id: category.id,
                name: t_products({key: category.name, currentLocale}),
                url: getRelativeLocaleUrl(
                    currentLocale,
                    `/productos/${convertToSlug(t_products({key: category.name, currentLocale}))}`,
                )
            })
        )
    }

    return []
};
