import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { RouteWithNotFound } from "@/utilities/RouteWithNotFound"
import { PrivateRoutes } from "@/models"
import { DeleteProduct, UpdateProduct, ViewProducts, CreateProduct, DetailsProduct } from "./Product"
import { CreateClient, DetailsClient, UpdateClient, ViewClients } from "./Client"
import { CreateCategory, ViewCategories } from "."
import { CreateOrder } from "./Order"
import { DetailsOrder } from "./Order/DetailsOrder"

export const Private = () => {
  return (
    <RouteWithNotFound>
        <Route path="/" element={<Dashboard />} />
        <Route path={PrivateRoutes.CREATE_PRODUCT} element={<CreateProduct/>}/>
        <Route path={`${PrivateRoutes.UPDATE_PRODUCT}/:id`} element={<UpdateProduct />}/>
        <Route path={PrivateRoutes.DELETE_PRODUCT} element={<DeleteProduct />}/>
        <Route path={`${PrivateRoutes.DETAILS_PRODUCT}/:id`} element={<DetailsProduct />}/>
        <Route path={PrivateRoutes.VIEW_PRODUCTS} element={<ViewProducts />}/>
        <Route path={PrivateRoutes.CREATE_CATEGORY} element={<CreateCategory />}/>
        <Route path={PrivateRoutes.UPDATE_CATEGORY} element={<div></div>}/>
        <Route path={PrivateRoutes.DELETE_CATEGORY} element={<div></div>}/>
        <Route path={PrivateRoutes.VIEW_CATEGORIES} element={<ViewCategories />}/>
        <Route path={PrivateRoutes.CREATE_CLIENT} element={<CreateClient />}/>
        <Route path={`${PrivateRoutes.UPDATE_CLIENT}/:id`} element={<UpdateClient /> } />
        <Route path={PrivateRoutes.DELETE_CLIENT} element={<div></div>}/>
        <Route path={PrivateRoutes.VIEW_CLIENTS} element={<ViewClients/>}/>
        <Route path={`${PrivateRoutes.DETAILS_CLIENTS}/:id`} element={<DetailsClient />} />
        <Route path={`/${PrivateRoutes.DETAILS_CLIENTS}/:id/${PrivateRoutes.CREATE_ORDER}`} element={<CreateOrder />}/>
        <Route path={PrivateRoutes.VIEW_ORDERS} element={<div></div>}/>
        <Route path={`${PrivateRoutes.DETAILS_PRODUCT}/:idP/${PrivateRoutes.DETAILS_ORDER}/:id`} element={<DetailsOrder/>}/>
        <Route path={`${PrivateRoutes.DETAILS_CLIENTS}/:idC/${PrivateRoutes.DETAILS_ORDER}/:id`} element={<DetailsOrder/>}/>
        <Route path={PrivateRoutes.UPDATE_ORDER} element={<div></div>}/>
        <Route path={PrivateRoutes.DELETE_ORDER} element={<div></div>}/>
    </RouteWithNotFound>
  )
}

