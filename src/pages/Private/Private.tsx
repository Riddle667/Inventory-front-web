import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { RouteWithNotFound } from "@/utilities/RouteWithNotFound"

export const Private = () => {
  return (
    <RouteWithNotFound>
        <Route path="/" element={<Dashboard />} />
    </RouteWithNotFound>
  )
}

