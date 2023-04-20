import { createBrowserRouter } from "react-router-dom";
import Homepage from "../views/Homepage";

const router = createBrowserRouter([
    {
        element: <Homepage/>,
        path:"/",

        action: async ({request}) => {
            let data = await request.formData()
        }
    }
])